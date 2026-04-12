import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa"
import portfolioData from "../../data/portfolioData.json"
import packageData from "../../../package.json"
import { BiLogoDevTo } from "react-icons/bi";

export default function Footer() {
  return (
    <footer className="border-t py-6 md:py-0">
      <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
        <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
          Built by{" "}
          <a href="#" className="font-medium underline underline-offset-4">
            {portfolioData.personal.name}
          </a>
          <span className="ml-1 text-xs opacity-70">
            v{packageData.version}
          </span>
          .
        </p>
        <div className="flex items-center space-x-4">
          <a href={portfolioData.social.find(s => s.platform === "DEVTO")?.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <BiLogoDevTo className="h-5 w-5" />
            <span className="sr-only">DEVTO</span>
          </a>
          <a href={portfolioData.social.find(s => s.platform === "GitHub")?.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <FaGithub className="h-5 w-5" />
            <span className="sr-only">GitHub</span>
          </a>
          <a href={portfolioData.social.find(s => s.platform === "Twitter")?.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <FaTwitter className="h-5 w-5" />
            <span className="sr-only">Twitter</span>
          </a>
          <a href={portfolioData.social.find(s => s.platform === "LinkedIn")?.url} target="_blank" rel="noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
            <FaLinkedin className="h-5 w-5" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  )
}
