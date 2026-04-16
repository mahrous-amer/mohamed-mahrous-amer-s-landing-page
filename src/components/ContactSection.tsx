import { Github, Linkedin, Instagram, Send, Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import SectionHeader from "./SectionHeader";

const CONTACT_EMAIL = "mahrous-amer@pm.me";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Compose a mailto link that opens the visitor's mail client with the form
    // contents pre-filled. Until we have a proper backend (Cloudflare Worker + Email
    // Routing), this is the only way that actually delivers the message.
    const subject = encodeURIComponent(`Portfolio contact — ${form.name}`);
    const body = encodeURIComponent(
      `${form.message}\n\n— ${form.name} <${form.email}>`
    );
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    toast("Opening your mail client…", {
      description: `If nothing happens, email ${CONTACT_EMAIL} directly.`,
    });
  };

  return (
    <section id="contact" className="py-24">
      <SectionHeader number="07" label="Contact" heading={<>Get In Touch</>} />

      <div className="max-w-4xl mx-auto px-4">
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
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 font-mono text-sm text-primary hover:text-primary/80 mb-6 w-fit"
              >
                <Mail size={14} />
                {CONTACT_EMAIL}
              </a>
              <div className="flex gap-4">
                {[
                  { icon: Github, href: "https://github.com/mahrous-amer", label: "GitHub" },
                  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-mahrous-amer/", label: "LinkedIn" },
                  { icon: Instagram, href: "https://www.instagram.com/m.mahrous.amer/", label: "Instagram" },
                ].map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.label}
                    className="p-3 rounded-lg border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all"
                  >
                    <s.icon size={20} />
                  </a>
                ))}
              </div>
            </div>
          </div>
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
