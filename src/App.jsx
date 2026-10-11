import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import About from "./components/sections/About"
import Experience from "./components/sections/Experience"
import Projects from "./components/sections/Projects"
import Testimonials from "./components/sections/Testimonials"
import Contact from "./components/sections/Contact"

export default function App() {
  return (
    <>
      <a
        href="#about"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[70] focus:rounded-full focus:bg-gold focus:px-5 focus:py-2 focus:text-abyss"
      >
        Skip to content
      </a>
      <Header />
      <main>
        <Hero />
        <About />
        <Experience />
        <Projects />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
