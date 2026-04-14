import { motion } from "framer-motion";

const categories = [
  {
    title: "Languages",
    skills: ["Go", "Python", "Java", "TypeScript", "SQL"],
  },
  {
    title: "Backend & Infra",
    skills: ["Microservices", "REST APIs", "gRPC", "Docker", "Kubernetes", "CI/CD"],
  },
  {
    title: "Databases",
    skills: ["PostgreSQL", "Redis", "MongoDB", "Elasticsearch"],
  },
  {
    title: "Domain",
    skills: ["Fintech", "Payment Systems", "System Design", "Event-Driven Architecture"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-primary text-sm mb-2">{"02. // Skills"}</h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-10">Tech Stack</h3>

        <div className="grid sm:grid-cols-2 gap-6">
          {categories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className="p-6 rounded-lg border border-border bg-card"
            >
              <h4 className="font-mono text-primary text-xs mb-4">{`{ ${cat.title} }`}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-mono rounded-md bg-secondary text-foreground border border-border hover:border-primary hover:text-primary transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);

export default SkillsSection;
