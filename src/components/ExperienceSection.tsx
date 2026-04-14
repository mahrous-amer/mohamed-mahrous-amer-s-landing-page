import { motion } from "framer-motion";

const timeline = [
  {
    role: "Senior Software Engineer",
    company: "BSE Business Systems Engineering",
    period: "2022 — Present",
    description: "Leading backend architecture for fintech platforms. Designing scalable payment systems and microservice infrastructure using Go and Python.",
  },
  {
    role: "Software Engineer",
    company: "Fintech Startup",
    period: "2020 — 2022",
    description: "Built core transaction processing pipelines and REST APIs. Implemented CI/CD workflows and containerized deployments.",
  },
  {
    role: "Junior Developer",
    company: "Tech Company",
    period: "2018 — 2020",
    description: "Developed backend services in Java and Python. Contributed to database design and API integrations.",
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-primary text-sm mb-2">{"04. // Experience"}</h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-10">Career Path</h3>
      </motion.div>

      <div className="relative pl-8 border-l border-border">
        {timeline.map((item, i) => (
          <motion.div
            key={item.role}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="mb-12 last:mb-0 relative"
          >
            {/* Dot */}
            <div className="absolute -left-[calc(2rem+5px)] w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />

            <span className="font-mono text-xs text-primary">{item.period}</span>
            <h4 className="text-lg font-semibold mt-1">{item.role}</h4>
            <p className="text-sm text-muted-foreground mb-2">{item.company}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
