import { ArrowUpRight } from "lucide-react"
import Section from "../Section"
import ProjectArt from "../ProjectArt"
import data from "../../data/portfolioData.json"

export default function Projects() {
  return (
    <Section
      id="projects"
      title="Projects"
      lead="Selected work. More lives on my GitHub."
    >
      <ul className="-mt-10 md:-mt-12">
        {data.projects.map((p) => (
          <li key={p.id} className="border-b border-foam/10 last:border-b-0">
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="group grid items-center gap-8 py-10 md:grid-cols-12 md:gap-10 md:py-12"
            >
              <div className="md:col-span-7">
                <div className="flex items-start justify-between gap-4">
                  <h3
                    className="font-display font-semibold tracking-tight transition-transform duration-500 ease-out group-hover:translate-x-2 group-focus-visible:translate-x-2"
                    style={{ fontSize: "clamp(2.1rem, 4.4vw, 3.5rem)", lineHeight: 1, fontStretch: "84%" }}
                  >
                    {p.title}
                  </h3>
                  <ArrowUpRight
                    aria-hidden="true"
                    className="mt-1 h-7 w-7 shrink-0 text-mist transition-all duration-500 ease-out group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-gold"
                  />
                </div>
                <p className="prose-serif mt-5 max-w-[30rem]">{p.description}</p>
                <p className="mt-5 text-[0.95rem] text-mist">{p.tech.join(", ")}</p>
                <span className="sr-only">Opens the {p.title} repository on GitHub</span>
              </div>

              <div className="md:col-span-5">
                <div className="aspect-[4/3] overflow-hidden rounded-2xl border border-foam/10 bg-deep transition-colors duration-500 group-hover:border-gold/50">
                  <div className="h-full w-full scale-100 transition-transform duration-700 ease-out group-hover:scale-[1.06]">
                    <ProjectArt kind={p.art} seed={p.id} />
                  </div>
                </div>
              </div>
            </a>
          </li>
        ))}
      </ul>
    </Section>
  )
}
