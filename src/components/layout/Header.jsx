import { useState } from "react"
import { Menu, X } from "lucide-react"
import { buttonVariants } from "../ui/button"

export default function Header() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        {/* Logo Section */}
        <div className="flex items-center space-x-2">
          <a className="font-bold flex items-center" href="/">
            Kunal Tiwari
          </a>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden md:flex flex-1 items-center justify-between pl-6 text-sm font-medium">
          <nav className="flex space-x-6">
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#about">About</a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#projects">Projects</a>
            <a className="transition-colors hover:text-foreground/80 text-foreground/60" href="#timeline">Timeline</a>
          </nav>
          <a href="#contact" className={buttonVariants({ variant: "default", size: "sm" })}>
            Contact Me
          </a>
        </div>

        {/* Mobile Navigation Toggle */}
        <div className="flex md:hidden flex-1 items-center justify-end space-x-2">
          <a href="#contact" className={buttonVariants({ variant: "default", size: "sm", className: "h-8" })}>
            Contact Me
          </a>
          <button 
            className="p-1 -mr-1" 
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div className="md:hidden border-b bg-background px-4 py-4 space-y-4">
          <nav className="flex flex-col space-y-4 text-sm font-medium">
            <a className="transition-colors hover:text-primary text-foreground/70" href="#about" onClick={() => setIsOpen(false)}>About</a>
            <a className="transition-colors hover:text-primary text-foreground/70" href="#projects" onClick={() => setIsOpen(false)}>Projects</a>
            <a className="transition-colors hover:text-primary text-foreground/70" href="#timeline" onClick={() => setIsOpen(false)}>Timeline</a>
          </nav>
        </div>
      )}
    </header>
  )
}
