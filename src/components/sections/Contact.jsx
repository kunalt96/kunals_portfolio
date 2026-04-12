import { useState } from "react"
import { motion } from "framer-motion"
import { Send, CheckCircle2 } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"
import portfolioData from "../../data/portfolioData.json"

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target)
    formData.append("access_key", portfolioData.personal.web3formsKey)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData
      })
      const data = await response.json()
      if (data.success) {
        setIsSuccess(true)
        e.target.reset()
      } else {
        alert("Something went wrong. Please email directly")
      }
    } catch (error) {
      alert("Something went wrong. Please email directly.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="container max-w-4xl py-24 md:py-32">
      <motion.div
        className="mx-auto max-w-[58rem] text-center"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <h2 className="font-bold text-3xl leading-[1.1] sm:text-3xl md:text-5xl">Let's Connect</h2>
        <p className="mt-4 text-muted-foreground sm:text-lg">
          Interested in working together or have a question? Drop me a message!
        </p>
      </motion.div>

      <motion.div
        className="mx-auto mt-12 max-w-lg"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
      >
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-4 rounded-lg border bg-card p-12 text-center text-card-foreground shadow-sm">
            <CheckCircle2 className="h-12 w-12 text-green-500" />
            <h3 className="text-xl font-bold">Message Sent!</h3>
            <p className="text-muted-foreground">Thank you for reaching out. I'll get back to you soon.</p>
            <Button variant="outline" className="mt-4" onClick={() => setIsSuccess(false)}>Send Another Message</Button>
          </div>
        ) : (
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input id="name" name="name" placeholder="John Doe" required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="john@example.com" required disabled={isSubmitting} />
            </div>
            <div className="space-y-2">
              <Label htmlFor="message">Message</Label>
              <Textarea
                id="message"
                name="message"
                placeholder="Hi Kunal, I'd like to talk about a project..."
                className="min-h-[120px] resize-y"
                required
                disabled={isSubmitting}
              />
            </div>
            <Button type="submit" className="w-full h-11 text-base" disabled={isSubmitting}>
              {isSubmitting ? "Sending..." : "Send Message"} {!isSubmitting && <Send className="ml-2 h-4 w-4" />}
            </Button>
          </form>
        )}
      </motion.div>
    </section>
  )
}
