import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Send } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Message sent! I'll get back to you soon.");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section id="contact" className="py-24 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="font-mono text-primary text-sm mb-2">{"06. // Contact"}</h2>
          <h3 className="text-3xl sm:text-4xl font-bold mb-10">Get In Touch</h3>

          <div className="grid md:grid-cols-2 gap-10">
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                required
                className="bg-card border-border focus:border-primary"
              />
              <Input
                type="email"
                placeholder="Your Email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                required
                className="bg-card border-border focus:border-primary"
              />
              <Textarea
                placeholder="Your Message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                required
                rows={5}
                className="bg-card border-border focus:border-primary"
              />
              <Button type="submit" className="w-full gap-2">
                <Send size={16} /> Send Message
              </Button>
            </form>

            <div className="flex flex-col justify-center">
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Whether you have a project idea, want to collaborate, or just want to say hello — 
                I'd love to hear from you. Let's build something great together.
              </p>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/mahrous-amer" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-mahrous-amer/" },
                  { icon: Instagram, href: "https://www.instagram.com/m.mahrous.amer/" },
                ].map((s, i) => (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-lg border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <div className="max-w-4xl mx-auto mt-24 pt-8 border-t border-border text-center">
        <p className="font-mono text-xs text-muted-foreground">
          © {new Date().getFullYear()} Mohamed Mahrous Amer — Built with conviction.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
