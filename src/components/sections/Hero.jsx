import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import { Button, buttonVariants } from "../ui/button"
import portfolioData from "../../data/portfolioData.json"

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      mass: 1
    }
  },
}

export default function Hero() {
  return (
    <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 py-24 text-center md:py-32">
      <motion.div 
        className="space-y-4"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.15,
              delayChildren: 0.1,
            },
          },
        }}
      >
        <motion.div variants={itemVariants} className="mx-auto flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-[inset_10px_-50px_94px_0_rgb(199,199,199,0.2)] backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50 dark:border-gray-800 dark:bg-black dark:hover:bg-black/50">
          <p className="text-sm font-semibold text-gray-700 dark:text-gray-300">
            {portfolioData.personal.role}
          </p>
        </motion.div>
        
        <motion.h1 variants={itemVariants} className="bg-gradient-to-br from-black from-30% to-black/40 bg-clip-text py-6 text-5xl font-medium leading-none tracking-tighter text-transparent sm:text-6xl md:text-7xl lg:text-8xl dark:from-white dark:to-white/40">
          {portfolioData.personal.tagline}
        </motion.h1>
        
        <motion.p variants={itemVariants} className="mx-auto max-w-[700px] text-lg text-muted-foreground sm:text-xl">
          {portfolioData.personal.bio}
        </motion.p>
        
        <motion.div variants={itemVariants} className="flex flex-col justify-center space-y-4 sm:flex-row sm:space-x-4 sm:space-y-0 pt-8">
          <a href="#contact" className={buttonVariants({ size: "lg", className: "h-12 px-8 flex items-center justify-center" })}>
            Hire Me <ArrowRight className="ml-2 h-4 w-4" />
          </a>
          <Button size="lg" variant="outline" className="h-12 px-8 flex items-center justify-center">
            <Download className="mr-2 h-4 w-4" /> Resume
          </Button>
        </motion.div>
      </motion.div>
    </section>
  )
}
