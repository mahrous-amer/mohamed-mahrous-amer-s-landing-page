import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const categories = [
  {
    title: "Core",
    skills: ["Perl", "Python", "PL/pgSQL", "T-SQL", "Bash", "C# .NET Core", "AWS CloudFormation", "Docker", "Redis", "Node.js", "Chef"],
  },
  {
    title: "Proficient",
    skills: ["Go", "GCP BigQuery", "Terraform", "Vault", "TypeScript", "Metabase"],
  },
  {
    title: "Familiar",
    skills: ["Rust", "C", "Lua", "LaTeX"],
  },
  {
    title: "Domain",
    skills: ["Fintech", "Payment Systems", "Microservices", "Event-Driven", "High Availability", "PCI-DSS", "GDPR"],
  },
];

const SkillsSection = () => (
  <section id="skills" className="py-24">
    <SectionHeader number="03" label="Skills" heading={<>Tech Stack</>} />

    <div className="max-w-4xl mx-auto px-4">
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
    </div>
  </section>
);

export default SkillsSection;
