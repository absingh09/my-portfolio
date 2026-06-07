import { motion } from "framer-motion";
import { useScrollAnimation, fadeUpVariants } from "../../hooks/useScrollAnimation";

const SectionHeading = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  centered = true,
  className = "",
}) => {
  const { ref, controls } = useScrollAnimation(0.2);

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeUpVariants}
      className={["mb-16", centered ? "text-center" : "", className]
        .filter(Boolean)
        .join(" ")}
    >
      {eyebrow && (
        <div
          className={`flex items-center gap-3 mb-4 ${
            centered ? "justify-center" : ""
          }`}
        >
          <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
          <span className="text-primary text-xs font-semibold uppercase tracking-[0.2em] font-sans">
            {eyebrow}
          </span>
          <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
        </div>
      )}

      <h2 className="font-display text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight mb-4">
        {title}{" "}
        {highlight && <span className="gradient-text">{highlight}</span>}
      </h2>

      {subtitle && (
        <p
          className={`text-text-muted text-base md:text-lg leading-relaxed max-w-2xl ${
            centered ? "mx-auto" : ""
          }`}
        >
          {subtitle}
        </p>
      )}
    </motion.div>
  );
};

export default SectionHeading;
