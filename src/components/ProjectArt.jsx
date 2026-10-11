import { useMemo } from "react"

// Deterministic PRNG so each piece of artwork is identical on every load.
function seeded(str) {
  let h = 1779033703 ^ str.length
  for (let i = 0; i < str.length; i++) {
    h = Math.imul(h ^ str.charCodeAt(i), 3432918353)
    h = (h << 13) | (h >>> 19)
  }
  return () => {
    h = Math.imul(h ^ (h >>> 16), 2246822507)
    h = Math.imul(h ^ (h >>> 13), 3266489909)
    return ((h ^= h >>> 16) >>> 0) / 4294967296
  }
}

const W = 400
const H = 300

/** Fixora: stacked signal traces; the rare spikes are the errors. */
function signal(rnd) {
  const traces = []
  const spikes = []
  for (let i = 0; i < 9; i++) {
    const y = 34 + i * 29
    let d = `M0 ${y}`
    for (let x = 8; x <= W; x += 8) {
      let off = (rnd() - 0.5) * 6
      if (rnd() < 0.055 && x > 24 && x < W - 24) {
        const amp = (rnd() < 0.5 ? -1 : 1) * (20 + rnd() * 18)
        d += ` L${x - 4} ${y} L${x} ${y + amp}`
        spikes.push({ x, y: y + amp })
        off = 0
      }
      d += ` L${x} ${y + off}`
    }
    traces.push(d)
  }
  return { traces, spikes }
}

/** Quizly: rows of answer options, one chosen in each row. */
function choices(rnd) {
  const rows = []
  for (let r = 0; r < 4; r++) {
    const y = 28 + r * 64
    const pills = []
    let x = 20
    const picked = Math.floor(rnd() * 3)
    for (let c = 0; c < 3; c++) {
      const width = 82 + rnd() * 36
      pills.push({ x, y, w: width, on: c === picked })
      x += width + 12
    }
    rows.push(pills)
  }
  return rows
}

/** Fallback: a small flow of curves. */
function flow(rnd) {
  return Array.from({ length: 16 }, (_, i) => {
    const y = 20 + i * 17
    const a = 20 + rnd() * 50
    const b = rnd() * 6
    let d = `M0 ${y}`
    for (let x = 10; x <= W; x += 10) d += ` L${x} ${y + Math.sin(x / 55 + b + i * 0.3) * a * 0.35}`
    return d
  })
}

export default function ProjectArt({ kind, seed }) {
  const art = useMemo(() => {
    const rnd = seeded(seed)
    if (kind === "signal") return { kind, ...signal(rnd) }
    if (kind === "choices") return { kind, rows: choices(rnd) }
    return { kind: "flow", curves: flow(rnd) }
  }, [kind, seed])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="h-full w-full" aria-hidden="true" preserveAspectRatio="xMidYMid slice">
      {art.kind === "signal" && (
        <>
          {art.traces.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgb(95 211 192)" strokeOpacity="0.5" strokeWidth="1" />
          ))}
          {art.spikes.map((s, i) => (
            <circle key={i} cx={s.x} cy={s.y} r="3.2" fill="rgb(233 185 73)" />
          ))}
        </>
      )}
      {art.kind === "choices" &&
        art.rows.flat().map((p, i) => (
          <rect
            key={i}
            x={p.x}
            y={p.y}
            width={p.w}
            height="38"
            rx="19"
            fill={p.on ? "rgb(233 185 73)" : "none"}
            stroke={p.on ? "none" : "rgb(143 163 173)"}
            strokeOpacity="0.45"
          />
        ))}
      {art.kind === "flow" &&
        art.curves.map((d, i) => (
          <path key={i} d={d} fill="none" stroke="rgb(58 107 255)" strokeOpacity="0.55" />
        ))}
    </svg>
  )
}
