import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";

const socials = [
  { icon: Github, href: "https://github.com/mahrous-amer", label: "GitHub" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/mohamed-mahrous-amer/", label: "LinkedIn" },
  { icon: Instagram, href: "https://www.instagram.com/m.mahrous.amer/", label: "Instagram" },
];

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-grid overflow-hidden">
      {/* Radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,hsl(217_91%_60%/0.08)_0%,transparent_70%)]" />

      <div className="relative z-10 text-center px-4">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="font-mono text-sm text-primary mb-4"
        >
          {"// Hello, world"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-glow"
        >
          Mohamed Mahrous
          <br />
          <span className="text-primary">Amer</span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="font-mono text-muted-foreground text-sm sm:text-base mb-8"
        >
          Senior Software Engineer & Tech Lead · Fintech · Payments at Scale
          <span className="cursor-blink text-primary ml-1">▌</span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="flex flex-col sm:flex-row justify-center items-center gap-4 mb-12"
        >
          <div className="flex gap-4">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-lg border border-border hover:border-primary hover:text-primary text-muted-foreground transition-all hover:border-glow"
                aria-label={s.label}
              >
                <s.icon size={20} />
              </a>
            ))}
          </div>

          <Button asChild className="gap-2 font-mono text-sm">
            <a href="/Mohamed_Mahrous_Amer_CV.pdf" download>
              <Download size={16} /> Download CV
            </a>
          </Button>
        </motion.div>

        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="inline-flex animate-float text-muted-foreground hover:text-primary transition-colors"
        >
          <ChevronDown size={28} />
        </motion.a>
      </div>
    </section>
  );
};

export default HeroSection;
