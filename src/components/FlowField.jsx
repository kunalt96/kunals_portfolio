import { useEffect, useRef } from "react"
import { noise3 } from "../lib/noise"

// Palette stops as [r, g, b]. Mostly cobalt and sea, with rare gold.
const COBALT = [58, 107, 255]
const SEA = [95, 211, 192]
const GOLD = [233, 185, 73]
const BG = "7,15,26"

const mix = (a, b, t) => a.map((v, i) => Math.round(v + (b[i] - v) * t))

// 96-step lookup so we never build color strings inside the frame loop.
const RAMP = Array.from({ length: 96 }, (_, i) => {
  const n = i / 95
  const c = n < 0.82 ? mix(COBALT, SEA, n / 0.82) : mix(SEA, GOLD, (n - 0.82) / 0.18)
  return `rgba(${c[0]},${c[1]},${c[2]},0.75)`
})

/**
 * Full-bleed generative flow field. Thousands of short strokes follow a slowly
 * evolving noise field and swirl around the pointer.
 * Pauses off-screen and in hidden tabs; renders one still frame when the
 * visitor prefers reduced motion.
 */
export default function FlowField({ className = "" }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext("2d")
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let w = 0
    let h = 0
    let dpr = 1
    let particles = []
    let t = 0
    let raf = 0
    let visible = true
    const pointer = { x: -9999, y: -9999, active: false }

    const spawn = (p, anywhere = true) => {
      p.x = Math.random() * w
      p.y = anywhere ? Math.random() * h : Math.random() < 0.5 ? 0 : h
      p.px = p.x
      p.py = p.y
      p.life = 120 + Math.random() * 260
      p.age = 0
      return p
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      w = Math.max(1, Math.floor(rect.width * dpr))
      h = Math.max(1, Math.floor(rect.height * dpr))
      canvas.width = w
      canvas.height = h
      ctx.fillStyle = `rgb(${BG})`
      ctx.fillRect(0, 0, w, h)
      const count = Math.min(1100, Math.max(260, Math.floor((w * h) / (2600 * dpr * dpr))))
      particles = Array.from({ length: count }, () => spawn({}))
      if (reduced) paintStill()
    }

    const step = (drawFade) => {
      if (drawFade) {
        ctx.globalCompositeOperation = "source-over"
        ctx.fillStyle = `rgba(${BG},0.035)`
        ctx.fillRect(0, 0, w, h)
      }
      ctx.globalCompositeOperation = "lighter"
      ctx.lineWidth = Math.max(0.8, 0.9 * dpr)
      ctx.lineCap = "round"

      const scale = 0.0016 / dpr
      const swirlR = 190 * dpr
      const speed = 1.15 * dpr

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        const n = noise3(p.x * scale, p.y * scale, t)
        let a = n * Math.PI * 3.2

        if (pointer.active) {
          const dx = p.x - pointer.x * dpr
          const dy = p.y - pointer.y * dpr
          const d = Math.hypot(dx, dy)
          if (d < swirlR) {
            const k = 1 - d / swirlR
            const tangent = Math.atan2(dy, dx) + Math.PI / 2
            // Shortest-angle blend toward the tangent so strokes orbit the pointer.
            let diff = tangent - a
            diff = Math.atan2(Math.sin(diff), Math.cos(diff))
            a += diff * k * k * 0.95
          }
        }

        p.px = p.x
        p.py = p.y
        p.x += Math.cos(a) * speed
        p.y += Math.sin(a) * speed
        p.age++

        const ci = Math.min(95, Math.max(0, Math.floor(((n + 0.75) / 1.5) * 95)))
        ctx.strokeStyle = RAMP[ci]
        ctx.beginPath()
        ctx.moveTo(p.px, p.py)
        ctx.lineTo(p.x, p.y)
        ctx.stroke()

        if (p.age > p.life || p.x < 0 || p.x > w || p.y < 0 || p.y > h) spawn(p)
      }
      ctx.globalCompositeOperation = "source-over"
    }

    function paintStill() {
      ctx.fillStyle = `rgb(${BG})`
      ctx.fillRect(0, 0, w, h)
      t = 0.4
      for (let i = 0; i < 260; i++) step(false)
    }

    const frame = () => {
      raf = 0
      if (!visible || document.hidden) return
      t += 0.00055
      step(true)
      raf = requestAnimationFrame(frame)
    }
    const start = () => {
      if (!raf && !reduced) raf = requestAnimationFrame(frame)
    }
    const stop = () => {
      if (raf) cancelAnimationFrame(raf)
      raf = 0
    }

    const onMove = (e) => {
      const r = canvas.getBoundingClientRect()
      pointer.x = e.clientX - r.left
      pointer.y = e.clientY - r.top
      pointer.active = pointer.y > -100 && pointer.y < r.height + 100
    }
    const onLeave = () => {
      pointer.active = false
    }
    const onVisibility = () => (document.hidden ? stop() : start())

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting
      visible ? start() : stop()
    })
    io.observe(canvas)

    if (!reduced) {
      window.addEventListener("pointermove", onMove, { passive: true })
      document.addEventListener("pointerleave", onLeave)
      document.addEventListener("visibilitychange", onVisibility)
    }
    start()

    return () => {
      stop()
      ro.disconnect()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
      document.removeEventListener("pointerleave", onLeave)
      document.removeEventListener("visibilitychange", onVisibility)
    }
  }, [])

  return <canvas ref={canvasRef} className={`block h-full w-full ${className}`} aria-hidden="true" />
}
