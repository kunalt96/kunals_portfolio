import { useState } from "react"
import { AnimatePresence, motion, useReducedMotion } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Section from "../Section"
import data from "../../data/portfolioData.json"

const items = data.testimonials

export default function Testimonials() {
  const reduce = useReducedMotion()
  const [[index, dir], setPage] = useState([0, 1])
  const t = items[index]
  const long = t.text.length > 380

  const go = (d) => setPage(([i]) => [(i + d + items.length) % items.length, d])

  return (
    <Section id="testimonials" title="Kind words" lead="From managers and teammates I've worked with.">
      <div
        role="region"
        aria-roledescription="carousel"
        aria-label="Testimonials"
        onKeyDown={(e) => {
          if (e.key === "ArrowRight") go(1)
          if (e.key === "ArrowLeft") go(-1)
        }}
      >
        <div className="relative min-h-[22rem] sm:min-h-[19rem]" aria-live="polite">
          <AnimatePresence mode="wait" custom={dir} initial={false}>
            <motion.figure
              key={t.id}
              custom={dir}
              initial={reduce ? { opacity: 0 } : { opacity: 0, x: dir * 36 }}
              animate={{ opacity: 1, x: 0 }}
              exit={reduce ? { opacity: 0 } : { opacity: 0, x: dir * -36 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <blockquote
                className="font-serif italic text-foam"
                style={{
                  fontSize: long ? "clamp(1.3rem, 2.1vw, 1.75rem)" : "clamp(1.6rem, 2.8vw, 2.25rem)",
                  lineHeight: 1.3,
                  letterSpacing: "-0.005em",
                  fontVariationSettings: '"opsz" 36',
                }}
              >
                &ldquo;{t.text}&rdquo;
              </blockquote>
              <figcaption className="mt-8 flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-gold/60 font-display text-sm font-semibold text-gold"
                >
                  {t.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)}
                </span>
                <span>
                  <span className="block font-medium">{t.name}</span>
                  <span className="block text-sm text-mist">{t.role}</span>
                </span>
              </figcaption>
            </motion.figure>
          </AnimatePresence>
        </div>

        <div className="mt-10 flex items-center gap-3 border-t border-foam/10 pt-6">
          <button
            type="button"
            onClick={() => go(-1)}
            aria-label="Previous testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-foam/20 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            type="button"
            onClick={() => go(1)}
            aria-label="Next testimonial"
            className="grid h-11 w-11 place-items-center rounded-full border border-foam/20 transition-colors hover:border-gold hover:text-gold"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
          <p className="ml-3 text-sm tabular-nums text-mist">
            {index + 1} of {items.length}
          </p>
        </div>
      </div>
    </Section>
  )
}
