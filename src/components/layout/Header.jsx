import { useEffect, useRef, useState } from "react"
import { AnimatePresence, motion, useReducedMotion, useScroll, useSpring } from "framer-motion"
import { Menu, X } from "lucide-react"
import useActiveSection from "../../hooks/useActiveSection"
import data from "../../data/portfolioData.json"

const LINKS = [
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "testimonials", label: "Kind words" },
]
const IDS = LINKS.map((l) => l.id).concat("contact")

export default function Header() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const reduce = useReducedMotion()
  const active = useActiveSection(IDS)
  const firstLink = useRef(null)

  const { scrollYProgress } = useScroll()
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28, mass: 0.2 })

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Lock page scroll and close on Escape while the mobile menu is open.
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = "hidden"
    const onKey = (e) => e.key === "Escape" && setOpen(false)
    window.addEventListener("keydown", onKey)
    firstLink.current?.focus()
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener("keydown", onKey)
    }
  }, [open])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
        scrolled || open ? "bg-abyss/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="wrap flex h-16 items-center justify-between">
        <a href="#top" className="font-display text-lg font-semibold tracking-tight [font-stretch:85%]">
          {data.personal.name}
        </a>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Primary">
          {LINKS.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              aria-current={active === l.id ? "true" : undefined}
              className={`relative text-[0.95rem] transition-colors duration-300 ${
                active === l.id ? "text-foam" : "text-mist hover:text-foam"
              }`}
            >
              {l.label}
              {active === l.id && (
                <motion.span
                  layoutId="nav-underline"
                  className="absolute -bottom-1.5 left-0 right-0 h-px bg-gold"
                  transition={reduce ? { duration: 0 } : { type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
            </a>
          ))}
          <a href="#contact" className="btn btn-line h-10 px-5 text-sm">
            Contact
          </a>
        </nav>

        <button
          type="button"
          className="-mr-2 grid h-11 w-11 place-items-center md:hidden"
          onClick={() => setOpen((o) => !o)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Reading progress */}
      <motion.div
        aria-hidden="true"
        style={{ scaleX: reduce ? 0 : progress }}
        className="absolute inset-x-0 bottom-0 h-px origin-left bg-gold"
      />

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-x-0 bottom-0 top-16 bg-abyss md:hidden"
          >
            <nav className="wrap flex h-full flex-col justify-center gap-2 pb-24" aria-label="Mobile">
              {LINKS.concat({ id: "contact", label: "Contact" }).map((l, i) => (
                <motion.a
                  key={l.id}
                  ref={i === 0 ? firstLink : undefined}
                  href={`#${l.id}`}
                  onClick={() => setOpen(false)}
                  initial={reduce ? false : { opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className={`font-display text-5xl font-semibold tracking-tight [font-stretch:84%] ${
                    active === l.id ? "text-gold" : "text-foam"
                  }`}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}
