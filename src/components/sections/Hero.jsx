import { useEffect, useRef } from "react"
import { motion, useReducedMotion } from "framer-motion"
import FlowField from "../FlowField"
import data from "../../data/portfolioData.json"

const { name, role, intro, resumeLink } = data.personal
const WORDS = name.split(" ")
const hasResume = Boolean(resumeLink) && !resumeLink.includes("YOUR_")

const EASE = [0.22, 1, 0.36, 1]

/**
 * The name is set in a variable font. Each letter gets heavier and wider as the
 * pointer approaches, and when nobody is interacting a slow wave runs across it
 * (so touch screens get life too). Updates go straight to the DOM in one rAF
 * loop, with no React re-renders.
 */
function useReactiveLetters(sectionRef, lettersRef, enabled) {
  useEffect(() => {
    if (!enabled) return
    const els = lettersRef.current.filter(Boolean)
    const state = els.map(() => 0)
    const pointer = { x: -9999, y: -9999 }
    let lastMove = -1e9
    let raf = 0

    const onMove = (e) => {
      pointer.x = e.clientX
      pointer.y = e.clientY
      lastMove = performance.now()
    }

    const frame = (now) => {
      const rects = els.map((el) => el.getBoundingClientRect()) // read first
      const fontSize = parseFloat(getComputedStyle(els[0]).fontSize) || 200
      const quiet = Math.min(1, (now - lastMove) / 2500)

      els.forEach((el, i) => {
        const r = rects[i]
        const dx = pointer.x - (r.left + r.width / 2)
        const dy = (pointer.y - (r.top + r.height / 2)) * 0.7
        const near = Math.exp(-Math.pow(Math.hypot(dx, dy) / (fontSize * 1.35), 2))
        const wave = 0.5 + 0.5 * Math.sin(now * 0.0011 - i * 0.7)
        const target = Math.max(near, wave * wave * 0.55 * quiet)
        state[i] += (target - state[i]) * 0.1
        const s = state[i]
        el.style.fontVariationSettings = `"wght" ${Math.round(330 + 470 * s)}, "wdth" ${Math.round(76 + 24 * s)}`
      })
      raf = requestAnimationFrame(frame)
    }

    const start = () => !raf && (raf = requestAnimationFrame(frame))
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }

    const io = new IntersectionObserver(([e]) => (e.isIntersecting ? start() : stop()))
    io.observe(sectionRef.current)
    window.addEventListener("pointermove", onMove, { passive: true })

    return () => {
      stop()
      io.disconnect()
      window.removeEventListener("pointermove", onMove)
    }
  }, [sectionRef, lettersRef, enabled])
}

export default function Hero() {
  const reduce = useReducedMotion()
  const sectionRef = useRef(null)
  const lettersRef = useRef([])
  useReactiveLetters(sectionRef, lettersRef, !reduce)

  let letterIndex = 0

  return (
    <section id="top" ref={sectionRef} className="relative isolate min-h-[100svh] overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <FlowField />
        {/* Soft edges: protect the header and melt into the next section. */}
        <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-abyss to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-abyss to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_25%_55%,rgb(7_15_26/0.55),transparent_60%)]" />
      </div>

      <div className="wrap flex min-h-[100svh] flex-col justify-between pb-12 pt-28 sm:pb-16">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.8, ease: EASE }}
          className="max-w-md text-base text-foam/80 sm:text-lg"
        >
          {role}
        </motion.p>

        <h1 aria-label={name} className="my-10 select-none">
          {WORDS.map((word, wi) => (
            <span key={word} className="block overflow-hidden pb-[0.08em]" aria-hidden="true">
              {word.split("").map((ch, ci) => {
                const idx = letterIndex++
                return (
                  <motion.span
                    key={ci}
                    ref={(el) => (lettersRef.current[idx] = el)}
                    initial={reduce ? false : { y: "108%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.25 + idx * 0.05 + wi * 0.1, duration: 1.1, ease: EASE }}
                    className="inline-block font-display leading-[0.92] tracking-[-0.03em] text-foam"
                    style={{
                      fontSize: "clamp(4.25rem, min(25vw, 31svh), 20rem)",
                      fontVariationSettings: reduce ? '"wght" 560, "wdth" 90' : '"wght" 330, "wdth" 76',
                    }}
                  >
                    {ch}
                  </motion.span>
                )
              })}
            </span>
          ))}
        </h1>

        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.9, ease: EASE }}
          className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between"
        >
          <p className="prose-serif max-w-[34rem] text-foam/85 sm:text-[1.3rem]">{intro}</p>
          <div className="flex flex-wrap gap-3">
            <a href="#contact" className="btn btn-gold">
              Get in touch
            </a>
            {hasResume ? (
              <a href={resumeLink} target="_blank" rel="noreferrer" className="btn btn-line">
                Read my resume
              </a>
            ) : (
              <a href="#projects" className="btn btn-line">
                See my work
              </a>
            )}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
