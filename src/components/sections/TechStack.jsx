import { useRef } from "react";
import { motion, useInView } from "framer-motion";

/* ═══════════════════════════════════════════════════════════
   TECH BADGE DATA  — colored icons via emoji + brand hex
═══════════════════════════════════════════════════════════ */
const ROW_ONE = [
  { name: "React",         icon: "⚛️",  color: "#61dafb" },
  { name: "Next.js",       icon: "▲",   color: "#ffffff" },
  { name: "JavaScript",    icon: "JS",  color: "#f7df1e", textBg: true },
  { name: "TypeScript",    icon: "TS",  color: "#3178c6", textBg: true },
  { name: "HTML5",         icon: "🌐",  color: "#e34f26" },
  { name: "CSS3",          icon: "🎨",  color: "#264de4" },
  { name: "Tailwind CSS",  icon: "💨",  color: "#38bdf8" },
  { name: "Framer Motion", icon: "🎬",  color: "#bb4bff" },
];

const ROW_TWO = [
  { name: "Node.js",    icon: "🟢",  color: "#68a063" },
  { name: "MongoDB",    icon: "🍃",  color: "#47a248" },
  { name: "Firebase",   icon: "🔥",  color: "#ffca28" },
  { name: "Python",     icon: "🐍",  color: "#3776ab" },
  { name: "Git",        icon: "📦",  color: "#f05032" },
  { name: "GitHub",     icon: "🐙",  color: "#ffffff" },
  { name: "Vercel",     icon: "▲",   color: "#ffffff" },
  { name: "Figma",      icon: "🎭",  color: "#f24e1e" },
  { name: "WordPress",  icon: "🔵",  color: "#21759b" },
  { name: "Shopify",    icon: "🛍️",  color: "#96bf48" },
];

/* ── Single badge ── */
const TechBadge = ({ name, icon, color, textBg }) => (
  <div
    className="flex items-center gap-3 px-5 py-3 rounded-2xl mx-3 shrink-0 select-none"
    style={{
      background: "linear-gradient(135deg, rgba(13,28,45,0.95) 0%, rgba(17,34,51,0.9) 100%)",
      border: `1px solid ${color}28`,
      boxShadow: `0 4px 20px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05), 0 0 12px ${color}18`,
      backdropFilter: "blur(12px)",
    }}
  >
    {/* Icon */}
    {textBg ? (
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center font-black text-xs shrink-0"
        style={{ background: color, color: color === "#f7df1e" ? "#000" : "#fff", fontFamily: "sans-serif" }}
      >
        {icon}
      </div>
    ) : (
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center text-lg shrink-0"
        style={{
          background: `${color}18`,
          border: `1px solid ${color}30`,
        }}
      >
        {icon}
      </div>
    )}
    {/* Name */}
    <span
      className="font-sans font-semibold text-sm whitespace-nowrap"
      style={{ color: "rgba(255,255,255,0.88)" }}
    >
      {name}
    </span>
  </div>
);

/* ── Marquee row — duplicated for seamless loop ── */
const MarqueeRow = ({ items, direction = "left" }) => {
  const doubled = [...items, ...items]; // duplicate for infinite illusion
  return (
    <div className="marquee-outer py-2">
      <div className={direction === "left" ? "marquee-track-left" : "marquee-track-right"}>
        {doubled.map((item, i) => (
          <TechBadge key={`${item.name}-${i}`} {...item} />
        ))}
      </div>
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TECH STACK SECTION
═══════════════════════════════════════════════════════════ */
const TechStack = () => {
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });

  return (
    <section
      id="techstack"
      className="relative overflow-hidden"
      style={{
        padding: "7rem 0 8rem",
        background: "linear-gradient(180deg, #051424 0%, #07121e 55%, #051424 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[900px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(ellipse, rgba(192,193,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.2), transparent)" }}
        />
        <div
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.15), transparent)" }}
        />
      </div>

      <div className="container-custom relative z-10">
        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-14">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.6))" }} />
            <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">My Toolkit</span>
            <div className="h-px w-8" style={{ background: "linear-gradient(270deg, transparent, rgba(192,193,255,0.6))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Built With the Best.{" "}
            <span style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Delivered With Excellence.
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-text-muted text-base md:text-lg max-w-xl mx-auto"
          >
            A modern, battle-tested toolkit — chosen for speed, scalability, and results.
          </motion.p>
        </div>
      </div>

      {/* ── Marquee rows — FULL BLEED (outside container) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={headingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex flex-col gap-4"
      >
        {/* Row 1 — scrolls left */}
        <MarqueeRow items={ROW_ONE} direction="left" />
        {/* Row 2 — scrolls right */}
        <MarqueeRow items={ROW_TWO} direction="right" />
      </motion.div>

      {/* Bottom note */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={headingInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="text-center font-sans text-text-muted text-xs mt-10 tracking-wider"
      >
        + More tools added constantly as the tech landscape evolves
      </motion.p>
    </section>
  );
};

export default TechStack;
