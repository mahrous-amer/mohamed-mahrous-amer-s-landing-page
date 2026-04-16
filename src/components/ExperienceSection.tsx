import { motion } from "framer-motion";
import SectionHeader from "./SectionHeader";

const timeline = [
  {
    role: "Tech Lead",
    company: "BSE — Business Systems Engineering",
    location: "Cairo, EG",
    period: "Oct 2024 — Present",
    bullets: [
      "Leading cross-functional teams serving clients across Egypt, Saudi Arabia, and Libya — delivering enterprise-scale .NET Core applications on SQL Server with regulatory compliance baked in.",
      "Architecting high-availability database systems: migration strategies, local/cloud replication, and automated failover — dramatically reducing downtime for multi-client workloads.",
    ],
  },
  {
    role: "Senior Software Engineer",
    company: "Deriv",
    location: "Cyberjaya, MY",
    period: "Jun 2021 — Sep 2024",
    bullets: [
      "Designed event-driven microservices for high-volume payment processing and automated reconciliation using AWS, Perl, Go, and SQL Server.",
      "Engineered SQL Server Always On HA clusters for mission-critical cashier systems — cut maintenance windows from >1 hour to ~1 minute.",
      "Built real-time monitoring dashboards, async WebSocket workers, and reliability metrics for event consumers.",
      "Integrated systems into CI/CD with AWS CloudFormation and GitHub Actions.",
      "Conducted GDPR and PCI-DSS compliance audits; remediated critical vulnerabilities in financial data handling.",
      "Mentored junior engineers, led recruitment, and delivered internal SQL/database optimization training.",
    ],
  },
  {
    role: "Software Engineer Intern",
    company: "Deriv",
    location: "Cyberjaya, MY",
    period: "Feb 2021 — Jun 2021",
    bullets: [
      "Introduced a Redis Streams worker into the events service, enabling real-time processing and richer metrics collection.",
      "Delivered internal SQL training as part of the company's development program.",
    ],
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24">
    <SectionHeader number="05" label="Experience" heading={<>Career Path</>} />

    <div className="max-w-4xl mx-auto px-4">
      <div className="relative pl-8 border-l border-border">
        {timeline.map((item, i) => (
          <motion.div
            key={`${item.role}-${item.company}-${item.period}`}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            className="mb-12 last:mb-0 relative"
          >
            {/* Dot */}
            <div className="absolute -left-[calc(2rem+5px)] top-1 w-2.5 h-2.5 rounded-full bg-primary border-2 border-background" />

            <span className="font-mono text-xs text-primary">{item.period}</span>
            <h4 className="text-lg font-semibold mt-1">{item.role}</h4>
            <p className="text-sm text-muted-foreground mb-1">
              {item.company} <span className="text-muted-foreground/60">· {item.location}</span>
            </p>
            <ul className="mt-3 space-y-2 text-sm text-muted-foreground leading-relaxed">
              {item.bullets.map((b, bi) => (
                <li key={bi} className="flex gap-2">
                  <span className="text-primary shrink-0">▸</span>
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;
