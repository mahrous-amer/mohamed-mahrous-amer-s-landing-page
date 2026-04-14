import { motion } from "framer-motion";
import { MapPin, Building2, Calendar } from "lucide-react";

const AboutSection = () => (
  <section id="about" className="py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-primary text-sm mb-2">{"01. // About"}</h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-8">Who I Am</h3>

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {[
            { icon: Building2, text: "Senior Software Engineer @ BSE" },
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
          I'm a backend-focused software engineer who thrives on building scalable, 
          resilient systems. With deep expertise in <span className="text-foreground font-medium">Go, Python, and Java</span>, 
          I architect solutions that handle real-world complexity — from payment processing 
          pipelines to microservice ecosystems. I believe great software is invisible: 
          it just works, reliably, at scale.
        </p>
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
