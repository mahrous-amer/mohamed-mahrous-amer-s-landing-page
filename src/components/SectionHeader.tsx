import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface SectionHeaderProps {
  number: string;
  /** Short uppercase label shown in the top breadcrumb (Kong-style "01/ APIOps"). */
  label: string;
  /** Main heading shown below the breadcrumb. */
  heading: ReactNode;
}

/**
 * Kong-style section header: a full-width thin divider with "NN/ Label" breadcrumb,
 * followed by a large bold heading (constrained to the content container).
 */
const SectionHeader = ({ number, label, heading }: SectionHeaderProps) => (
  <>
    {/* Top breadcrumb row with full-width divider */}
    <div className="w-full border-t border-border/50 mb-10">
      <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-3">
        <span className="font-mono text-sm text-muted-foreground">{number}/</span>
        <span className="font-mono text-xs uppercase tracking-[0.25em] text-muted-foreground">
          {label}
        </span>
      </div>
    </div>

    <div className="max-w-4xl mx-auto px-4">
      <motion.h3
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className="text-3xl sm:text-5xl font-bold tracking-tight mb-10"
      >
        {heading}
      </motion.h3>
    </div>
  </>
);

export default SectionHeader;
