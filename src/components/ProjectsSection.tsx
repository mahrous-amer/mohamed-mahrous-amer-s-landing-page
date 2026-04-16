import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import SectionHeader from "./SectionHeader";

interface Project {
  name: string;
  description: string;
  tech: string[];
  year: string;
  github?: string;
}

const projects: Project[] = [
  {
    name: "EmailSentinel",
    description:
      "Serverless email monitoring and alerting system for enterprise environments — detects anomalies, phishing, and compliance risks in real time.",
    tech: ["AWS Lambda", "SQS", "DynamoDB"],
    year: "2024 – 2025",
    github: "https://github.com/mahrous-amer/EmailSentinel",
  },
  {
    name: "Graphical Authentication (FYP)",
    description:
      "Web-based graphical authentication system resistant to shoulder-surfing, brute-force, dictionary, and CSRF attacks. Published at ICITS2021 and F1000Research.",
    tech: ["Python", "Django", "PostgreSQL", "jQuery"],
    year: "2021",
    github: "https://github.com/mahrous-amer/FYP",
  },
  {
    name: "CryptoBot",
    description:
      "Plugin-based arbitrage trading bot for BTC, ETH, and XRP with a modular architecture — each exchange and strategy is a swappable plugin.",
    tech: ["Docker", "Python", "Postgres"],
    year: "2021",
    github: "https://github.com/mahrous-amer/octocrypto",
  },
  {
    name: "Hydroponics",
    description:
      "IoT system to fully automate the growth of hydroponic plants in a water-based medium — sensor telemetry, control loops, and a web dashboard.",
    tech: ["Docker", "Caddy", "FastAPI", "Redis"],
    year: "2020",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24">
    <SectionHeader number="04" label="Projects" heading={<>Featured Work</>} />

    <div className="max-w-4xl mx-auto px-4">
      <div className="grid gap-4">
        {projects.map((p, i) => {
          const Wrapper = p.github ? motion.a : motion.div;
          const wrapperProps = p.github
            ? { href: p.github, target: "_blank", rel: "noopener noreferrer" }
            : {};
          return (
            <Wrapper
              key={p.name}
              {...wrapperProps}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08, duration: 0.4 }}
              className={`group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-lg border border-border bg-card transition-all ${
                p.github ? "hover:border-primary/50 cursor-pointer" : ""
              }`}
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  {p.github && <Github size={16} className="text-primary" />}
                  <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                    {p.name}
                  </span>
                  <span className="font-mono text-xs text-muted-foreground/60 ml-auto sm:ml-2">
                    {p.year}
                  </span>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {p.github && (
                <ExternalLink
                  size={16}
                  className="text-muted-foreground group-hover:text-primary transition-colors shrink-0"
                />
              )}
            </Wrapper>
          );
        })}
      </div>
    </div>
  </section>
);


export default ProjectsSection;
