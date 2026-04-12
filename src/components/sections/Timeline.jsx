import { motion } from "framer-motion"
import portfolioData from "../../data/portfolioData.json"

export default function Timeline() {
  return (
    <section id="timeline" className="container max-w-4xl py-24 md:py-32">
      <div className="space-y-8">
        <div className="mx-auto max-w-[58rem] text-center">
          <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Experience & Timeline</h2>
          <p className="mt-4 text-muted-foreground sm:text-lg">
            A brief look at my professional journey.
          </p>
        </div>
        
        <div className="relative border-l border-muted-foreground/20 pl-6 ml-4 md:ml-0 md:pl-8 space-y-12 after:absolute after:inset-y-0 after:left-[-1px] after:w-[2px] after:bg-gradient-to-b after:from-primary/50 after:to-transparent">
          {portfolioData.experience.map((item, index) => (
            <motion.div 
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, type: "spring", stiffness: 50 }}
              className="relative"
            >
              <div className="absolute -left-[35px] md:-left-[41px] top-1 h-4 w-4 rounded-full border-2 border-background bg-primary" />
              <div className="flex flex-col space-y-1.5">
                <h3 className="text-xl font-bold tracking-tight">{item.title}</h3>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <span className="font-semibold text-primary">{item.company}</span>
                  <span>&bull;</span>
                  <span>{item.duration}</span>
                </div>
              </div>
              <div className="mt-4 text-muted-foreground leading-relaxed">
                {item.description}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
