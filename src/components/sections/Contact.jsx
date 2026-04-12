import { motion } from "framer-motion"
import { Send } from "lucide-react"
import { Button } from "../ui/button"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Label } from "../ui/label"

export default function Contact() {
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
        <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thanks for reaching out! (Form integration to be added)") }}>
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input id="name" placeholder="John Doe" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="john@example.com" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea 
              id="message" 
              placeholder="Hi Kunal, I'd like to talk about a project..." 
              className="min-h-[120px] resize-y" 
              required 
            />
          </div>
          <Button type="submit" className="w-full h-11 text-base">
            Send Message <Send className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </motion.div>
    </section>
  )
}
