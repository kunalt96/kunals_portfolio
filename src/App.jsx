import Header from "./components/layout/Header"
import Footer from "./components/layout/Footer"
import Hero from "./components/sections/Hero"
import Timeline from "./components/sections/Timeline"
import Projects from "./components/sections/Projects"
import Contact from "./components/sections/Contact"

function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-background font-sans antialiased text-foreground selection:bg-primary selection:text-primary-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <Timeline />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
