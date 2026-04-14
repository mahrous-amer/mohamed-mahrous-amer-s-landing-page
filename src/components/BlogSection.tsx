import { motion } from "framer-motion";
import { PenLine } from "lucide-react";

const BlogSection = () => (
  <section id="blog" className="py-24 px-4">
    <div className="max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="font-mono text-primary text-sm mb-2">{"05. // Blog"}</h2>
        <h3 className="text-3xl sm:text-4xl font-bold mb-10">Thoughts & Writing</h3>

        <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-dashed border-border bg-card/50">
          <PenLine size={32} className="text-muted-foreground mb-4" />
          <p className="text-muted-foreground font-mono text-sm mb-1">Coming Soon</p>
          <p className="text-xs text-muted-foreground">
            Articles on backend engineering, system design, and fintech.
          </p>
        </div>
      </motion.div>
    </div>
  </section>
);

export default BlogSection;
