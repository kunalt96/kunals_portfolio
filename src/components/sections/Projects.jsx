import { motion } from "framer-motion"
import { ExternalLink } from "lucide-react"
import { FaGithub } from "react-icons/fa"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card"
import { buttonVariants } from "../ui/button"
import portfolioData from "../../data/portfolioData.json"

export default function Projects() {
  return (
    <section id="projects" className="container py-24 md:py-32 bg-slate-50/50 dark:bg-slate-900/10">
      <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Selected Projects</h2>
        <p className="max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          Here are some of the things I've built. Check out my GitHub for more.
        </p>
      </div>
      
      <div className="mx-auto grid justify-center gap-6 sm:grid-cols-2 md:max-w-[64rem] lg:grid-cols-2 pt-12">
        {portfolioData.projects.map((project, index) => (
          <motion.div
            key={project.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, type: "spring", stiffness: 80 }}
          >
            <Card className="flex flex-col h-full bg-background transition-shadow hover:shadow-md">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-1">
                <CardDescription className="text-sm mt-2 mb-4">
                  {project.description}
                </CardDescription>
                <div className="flex flex-wrap gap-2">
                  {project.tech.map((tech) => (
                    <span key={tech} className="inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2">
                      {tech}
                    </span>
                  ))}
                </div>
              </CardContent>
              <CardFooter className="flex gap-4 border-t pt-4">
                <a href={project.link} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "outline", size: "sm" })}>
                  <FaGithub className="mr-2 h-4 w-4" /> Code
                </a>
                <a href={project.link} target="_blank" rel="noreferrer" className={buttonVariants({ variant: "default", size: "sm" })}>
                  <ExternalLink className="mr-2 h-4 w-4" /> Visit
                </a>
              </CardFooter>
            </Card>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
