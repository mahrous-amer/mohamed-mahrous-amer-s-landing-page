import { PenLine } from "lucide-react";
import SectionHeader from "./SectionHeader";

const BlogSection = () => (
  <section id="blog" className="py-24">
    <SectionHeader number="06" label="Blog" heading={<>Thoughts & Writing</>} />

    <div className="max-w-4xl mx-auto px-4">
      <div className="flex flex-col items-center justify-center py-16 rounded-lg border border-dashed border-border bg-card/50">
        <PenLine size={32} className="text-muted-foreground mb-4" />
        <p className="text-muted-foreground font-mono text-sm mb-1">Coming Soon</p>
        <p className="text-xs text-muted-foreground">
          Articles on backend engineering, system design, and fintech.
        </p>
      </div>
    </div>
  </section>
);

export default BlogSection;
