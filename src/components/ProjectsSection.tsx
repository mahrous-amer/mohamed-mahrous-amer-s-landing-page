import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";

const projects = [
  {
    name: "caaspay-api-go",
    description: "Payment processing API built with Go — scalable fintech backend powering real-time transactions.",
    tech: ["Go", "REST API", "Fintech"],
    github: "https://github.com/mahrous-amer/caaspay-api-go",
  },
  {
    name: "micro",
    description: "Microservice framework and toolkit in Python for building distributed backend systems.",
    tech: ["Python", "Microservices", "Docker"],
    github: "https://github.com/mahrous-amer/micro",
  },
  {
    name: "FYP",
    description: "Final Year Project — a full-stack application showcasing ML-driven data processing pipelines.",
    tech: ["Python", "ML", "Data Pipeline"],
    github: "https://github.com/mahrous-amer/FYP",
  },
  {
    name: "EmailSentinel",
    description: "Intelligent email security tool for detecting phishing, spam, and malicious content using advanced analysis techniques.",
    tech: ["Python", "Security", "Email"],
    github: "https://github.com/mahrous-amer/EmailSentinel",
  },
  {
    name: "octocrypto",
    description: "Cryptocurrency utilities and tooling for blockchain data processing and analysis.",
    tech: ["Crypto", "Blockchain", "API"],
    github: "https://github.com/mahrous-amer/octocrypto",
  },
];

const ProjectsSection = () => (
  <section id="projects" className="py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-primary text-sm mb-2">{"03. // Projects"}</h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-10">Featured Work</h3>
      </motion.div>

      <div className="grid gap-4">
        {projects.map((p, i) => (
          <motion.a
            key={p.name}
            href={p.github}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.08, duration: 0.4 }}
            className="group flex flex-col sm:flex-row sm:items-center gap-4 p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-all"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Github size={16} className="text-primary" />
                <span className="font-mono font-semibold text-foreground group-hover:text-primary transition-colors">
                  {p.name}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{p.description}</p>
              <div className="flex flex-wrap gap-2">
                {p.tech.map((t) => (
                  <span key={t} className="text-xs font-mono px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <ExternalLink size={16} className="text-muted-foreground group-hover:text-primary transition-colors shrink-0" />
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default ProjectsSection;
