import { useState } from "react"
import { Check, Copy } from "lucide-react"
import data from "../../data/portfolioData.json"

const { email, web3formsKey } = data.personal

const field =
  "w-full border-0 border-b border-foam/25 bg-transparent px-0 py-3 text-lg text-foam placeholder:text-mist/60 transition-colors focus:border-gold focus:outline-none focus:ring-0 disabled:opacity-50"

export default function Contact() {
  const [status, setStatus] = useState("idle") // idle | sending | sent | error
  const [copied, setCopied] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${email}`
    }
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    setStatus("sending")
    const body = new FormData(form)
    body.append("access_key", web3formsKey)
    body.append("subject", "New message from your portfolio")
    try {
      const res = await fetch("https://api.web3forms.com/submit", { method: "POST", body })
      const json = await res.json()
      if (!json.success) throw new Error("rejected")
      form.reset()
      setStatus("sent")
    } catch {
      setStatus("error")
    }
  }

  return (
    <section id="contact" className="relative overflow-hidden border-t border-foam/10">
      <div className="wrap grid gap-16 py-24 md:grid-cols-12 md:gap-10 md:py-36">
        <div className="md:col-span-6">
          <h2
            className="font-display font-semibold text-foam"
            style={{
              fontSize: "clamp(3.5rem, 10vw, 9rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              fontStretch: "80%",
            }}
          >
            Let&rsquo;s talk.
          </h2>
          <p className="prose-serif mt-8 max-w-md">
            Have a product to build, a team to join or a question about my work? Send a note and I&rsquo;ll reply by
            email.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-3">
            <a
              href={`mailto:${email}`}
              className="font-display text-xl font-medium underline decoration-gold decoration-1 underline-offset-[6px] transition-colors hover:text-gold sm:text-2xl"
            >
              {email}
            </a>
            <button
              type="button"
              onClick={copyEmail}
              className="inline-flex h-10 items-center gap-2 rounded-full border border-foam/20 px-4 text-sm text-mist transition-colors hover:border-gold hover:text-gold"
            >
              {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              {copied ? "Copied" : "Copy email"}
            </button>
          </div>
        </div>

        <div className="md:col-span-6 lg:col-span-5 lg:col-start-8">
          {status === "sent" ? (
            <div role="status" className="rounded-2xl border border-gold/40 p-10">
              <Check className="h-8 w-8 text-gold" />
              <h3 className="mt-5 font-display text-3xl font-semibold [font-stretch:86%]">Message sent</h3>
              <p className="prose-serif mt-3">Thanks for reaching out. I&rsquo;ll get back to you soon.</p>
              <button type="button" onClick={() => setStatus("idle")} className="btn btn-line mt-8">
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={onSubmit} className="space-y-8" noValidate={false}>
              {/* Spam trap read by Web3Forms. Real visitors never see it. */}
              <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />

              <div>
                <label htmlFor="name" className="text-sm text-mist">
                  Your name
                </label>
                <input id="name" name="name" required autoComplete="name" disabled={status === "sending"} className={field} />
              </div>
              <div>
                <label htmlFor="email" className="text-sm text-mist">
                  Your email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  autoComplete="email"
                  disabled={status === "sending"}
                  className={field}
                />
              </div>
              <div>
                <label htmlFor="message" className="text-sm text-mist">
                  What would you like to build?
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  disabled={status === "sending"}
                  className={`${field} resize-y`}
                />
              </div>

              <div className="flex flex-wrap items-center gap-5">
                <button type="submit" disabled={status === "sending"} className="btn btn-gold disabled:opacity-60">
                  {status === "sending" ? "Sending message" : "Send message"}
                </button>
                {status === "error" && (
                  <p role="alert" className="text-sm text-[#ff8f7a]">
                    The message didn&rsquo;t send. Try again, or email {email} directly.
                  </p>
                )}
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
