import { FaGithub, FaLinkedinIn, FaXTwitter, FaDev } from "react-icons/fa6"
import { ArrowUp } from "lucide-react"
import data from "../../data/portfolioData.json"

const ICONS = { GitHub: FaGithub, LinkedIn: FaLinkedinIn, X: FaXTwitter, DEV: FaDev }

export default function Footer() {
  return (
    <footer className="border-t border-foam/10">
      <div className="wrap flex flex-col gap-6 py-10 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-sm text-mist">
          &copy; {new Date().getFullYear()} {data.personal.name}. Designed and built by hand with React.
        </p>

        <div className="flex items-center gap-1">
          {data.social.map((s) => {
            const Icon = ICONS[s.platform]
            return (
              <a
                key={s.platform}
                href={s.url}
                target="_blank"
                rel="noreferrer"
                className="grid h-11 w-11 place-items-center text-mist transition-colors hover:text-gold"
                aria-label={s.platform}
              >
                <Icon className="h-[1.1rem] w-[1.1rem]" />
              </a>
            )
          })}
          <a
            href="#top"
            className="ml-2 inline-flex h-11 items-center gap-2 pl-3 text-sm text-mist transition-colors hover:text-gold"
          >
            Back to top <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  )
}
