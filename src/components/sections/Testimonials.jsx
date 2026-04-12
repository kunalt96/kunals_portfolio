import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"
import portfolioData from "../../data/portfolioData.json"

export default function Testimonials() {
  const items = portfolioData.testimonials
  const [index, setIndex] = useState(0)
  const [direction, setDirection] = useState(1)

  const paginate = (dir) => {
    setDirection(dir)
    setIndex((prev) => (prev + dir + items.length) % items.length)
  }

  const variants = {
    enter: (dir) => ({ opacity: 0, x: dir > 0 ? 60 : -60 }),
    center: { opacity: 1, x: 0 },
    exit: (dir) => ({ opacity: 0, x: dir > 0 ? -60 : 60 }),
  }

  return (
    <section id="testimonials" className="py-24 md:py-32 bg-slate-50/50">
      <div className="container max-w-4xl">
        {/* Header */}
        <motion.div
          className="mx-auto max-w-[58rem] text-center mb-16"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">
            Kind Words
          </h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            What colleagues and collaborators say about working with me.
          </p>
        </motion.div>

        {/* Carousel */}
        <motion.div
          className="relative flex flex-col items-center"
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
        >
          <div className="w-full overflow-hidden relative min-h-[260px] flex items-center justify-center">
            <AnimatePresence custom={direction} mode="wait">
              <motion.div
                key={index}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ type: "spring", stiffness: 260, damping: 30 }}
                className="w-full max-w-2xl mx-auto"
              >
                <div className="rounded-2xl border bg-background p-8 shadow-sm text-center space-y-6">
                  {/* Quote icon */}
                  <Quote className="h-8 w-8 text-primary/30 mx-auto" />

                  {/* Text */}
                  <p className="text-lg leading-relaxed text-foreground italic">
                    &ldquo;{items[index].text}&rdquo;
                  </p>

                  {/* Author */}
                  <div className="flex flex-col items-center gap-2 pt-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                      {items[index].avatar}
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{items[index].name}</p>
                      <p className="text-xs text-muted-foreground">{items[index].role}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Controls */}
          <div className="flex items-center gap-6 mt-8">
            <button
              onClick={() => paginate(-1)}
              className="h-9 w-9 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {items.map((_, i) => (
                <button
                  key={i}
                  onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i) }}
                  className={`h-2 rounded-full transition-all duration-300 ${i === index ? "w-6 bg-primary" : "w-2 bg-muted-foreground/30"}`}
                  aria-label={`Go to slide ${i + 1}`}
                />
              ))}
            </div>

            <button
              onClick={() => paginate(1)}
              className="h-9 w-9 rounded-full border flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-foreground transition-colors"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
