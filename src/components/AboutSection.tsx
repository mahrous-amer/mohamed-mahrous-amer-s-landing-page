import { motion } from "framer-motion";
import { MapPin, Building2, Calendar } from "lucide-react";
import SectionHeader from "./SectionHeader";

const AboutSection = () => (
  <section id="about" className="py-24">
    <SectionHeader number="01" label="About" heading={<>Who I Am</>} />

    <div className="max-w-4xl mx-auto px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
      >
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Building2, text: "Tech Lead @ BSE" },
            { icon: MapPin, text: "Cairo, Egypt" },
            { icon: Calendar, text: "5+ Years in Fintech" },
          ].map((item) => (
            <div
              key={item.text}
              className="flex items-center gap-3 p-4 rounded-lg border border-border bg-card"
            >
              <item.icon size={18} className="text-primary shrink-0" />
              <span className="text-sm text-muted-foreground">{item.text}</span>
            </div>
          ))}
        </div>

        <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
          Senior Software Engineer & Tech Lead with{" "}
          <span className="text-foreground font-medium">5+ years in fintech</span>, specializing in
          scalable microservices, payment processing, high-availability databases, and cloud
          infrastructure. I lead cross-functional teams to deliver enterprise solutions with{" "}
          <span className="text-foreground font-medium">
            Go, Python, Perl, C# .NET, Postgres, SQL Server, Docker, and AWS
          </span>{" "}
          — while keeping systems PCI-DSS / GDPR compliant in fast-paced, regulated environments.
        </p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
