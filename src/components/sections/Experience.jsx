import { useRef } from "react"
import { motion, useInView, useReducedMotion, useScroll, useSpring } from "framer-motion"
import Section from "../Section"
import data from "../../data/portfolioData.json"

function Job({ job }) {
  const ref = useRef(null)
  // Lights up while it sits near the middle of the screen.
  const current = useInView(ref, { margin: "-49% 0px -49% 0px" })

  return (
    <li ref={ref} className="relative grid gap-x-8 gap-y-3 pb-16 pl-8 last:pb-0 sm:pl-10 md:grid-cols-12">
      <span
        aria-hidden="true"
        className={`absolute left-0 top-[0.7rem] h-[9px] w-[9px] -translate-x-1/2 rounded-full transition-all duration-500 ${
          current ? "scale-150 bg-gold shadow-[0_0_0_6px_rgb(233_185_73/0.16)]" : "bg-mist/50"
        }`}
      />
      <p
        className={`font-display text-xl font-medium transition-colors duration-500 [font-stretch:84%] md:col-span-3 md:pt-1 ${
          current ? "text-gold" : "text-mist"
        }`}
      >
        {job.duration}
      </p>
      <div className="md:col-span-9">
        <h3 className="font-display text-3xl font-semibold tracking-tight [font-stretch:86%] sm:text-4xl">
          {job.company}
        </h3>
        <p className="mt-1 text-mist">{job.title}</p>
        <p className="prose-serif mt-5 max-w-[34rem]">{job.description}</p>
      </div>
    </li>
  )
}

export default function Experience() {
  const reduce = useReducedMotion()
  const listRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: listRef, offset: ["start 62%", "end 55%"] })
  const draw = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.25 })

  return (
    <Section id="experience" title="Experience" lead="Shipping since 2018, most recently in wealth management.">
      <ol ref={listRef} className="relative">
        <span aria-hidden="true" className="absolute bottom-0 left-0 top-3 w-px bg-foam/15" />
        <motion.span
          aria-hidden="true"
          style={{ scaleY: reduce ? 1 : draw }}
          className="absolute bottom-0 left-0 top-3 w-px origin-top bg-gold"
        />
        {data.experience.map((job) => (
          <Job key={job.id} job={job} />
        ))}
      </ol>
    </Section>
  )
}
