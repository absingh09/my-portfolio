import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView, LayoutGroup } from "framer-motion";
import { FiExternalLink, FiInfo, FiArrowRight, FiX } from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════
   PROJECT DATA
═══════════════════════════════════════════════════════════ */
const PROJECTS = [
  {
    id: 1,
    title: "IronPeak Fitness",
    category: "Fitness",
    description:
      "A high-energy gym website with aggressive animations, membership plans, trainer profiles, and class booking system.",
    tags: ["React", "Framer Motion", "Tailwind"],
    accent: "#f97316",
    accentDark: "#c2410c",
    accentLight: "rgba(249,115,22,",
    liveUrl: "https://ironpeak-fitness-showcase.vercel.app/",
    // Visual design tokens
    visual: {
      bg: "linear-gradient(145deg, #0f0500 0%, #1a0800 40%, #2d0f00 100%)",
      headerBg: "linear-gradient(90deg, #f97316 0%, #dc2626 100%)",
      emoji: "💪",
      navColor: "rgba(249,115,22,0.9)",
      heroText: "TRAIN HARD",
      subText: "PEAK PERFORMANCE",
      bars: ["#f97316", "#dc2626", "#ea580c"],
      shapes: "fitness",
    },
  },
  {
    id: 2,
    title: "Saffron & Smoke",
    category: "Restaurant",
    description:
      "A cinematic fine-dining restaurant website with animated menu, reservation system, and chef profiles.",
    tags: ["React", "Animation", "UI/UX"],
    accent: "#f59e0b",
    accentDark: "#92400e",
    accentLight: "rgba(245,158,11,",
    liveUrl: "https://saffron-smoke-demo.vercel.app/",
    visual: {
      bg: "linear-gradient(145deg, #0d0800 0%, #1a1000 40%, #2d1f00 100%)",
      headerBg: "linear-gradient(90deg, #f59e0b 0%, #d97706 100%)",
      emoji: "🍽️",
      navColor: "rgba(245,158,11,0.9)",
      heroText: "FINE DINING",
      subText: "CRAFTED WITH LOVE",
      bars: ["#f59e0b", "#d97706", "#b45309"],
      shapes: "restaurant",
    },
  },
  {
    id: 3,
    title: "Velvet Bloom Studio",
    category: "Salon",
    description:
      "A luxury unisex salon website with service booking, stylist profiles, and before/after gallery.",
    tags: ["React", "Booking System", "Responsive"],
    accent: "#ec4899",
    accentDark: "#9d174d",
    accentLight: "rgba(236,72,153,",
    liveUrl: "https://radhika-salons-brown.vercel.app/",
    visual: {
      bg: "linear-gradient(145deg, #0d0009 0%, #1a0012 40%, #2d0020 100%)",
      headerBg: "linear-gradient(90deg, #ec4899 0%, #a21caf 100%)",
      emoji: "✂️",
      navColor: "rgba(236,72,153,0.9)",
      heroText: "YOUR GLOW",
      subText: "REDEFINED",
      bars: ["#ec4899", "#db2777", "#be185d"],
      shapes: "salon",
    },
  },
  {
    id: 4,
    title: "MediCare Plus",
    category: "Healthcare",
    description:
      "A trustworthy multi-specialty clinic website with doctor profiles, health packages, and appointment booking.",
    tags: ["React", "Healthcare", "Trust Design"],
    accent: "#06b6d4",
    accentDark: "#0e7490",
    accentLight: "rgba(6,182,212,",
    liveUrl: "https://medicare-plus-showcase.vercel.app/",
    visual: {
      bg: "linear-gradient(145deg, #00080d 0%, #001018 40%, #001f2d 100%)",
      headerBg: "linear-gradient(90deg, #06b6d4 0%, #0284c7 100%)",
      emoji: "🏥",
      navColor: "rgba(6,182,212,0.9)",
      heroText: "YOUR HEALTH",
      subText: "OUR PRIORITY",
      bars: ["#06b6d4", "#0284c7", "#0369a1"],
      shapes: "healthcare",
    },
  },
  {
    id: 5,
    title: "Eternal Moments Co.",
    category: "Wedding",
    description:
      "An ultra-romantic wedding planning website with real weddings gallery, packages, and consultation booking.",
    tags: ["React", "Elegant UI", "Animation"],
    accent: "#d4a848",
    accentDark: "#92400e",
    accentLight: "rgba(212,168,72,",
    liveUrl: "https://eternal-moments-showcase.vercel.app/",
    visual: {
      bg: "linear-gradient(145deg, #0d0a00 0%, #1a1400 40%, #261d00 100%)",
      headerBg: "linear-gradient(90deg, #d4a848 0%, #c084fc 100%)",
      emoji: "💍",
      navColor: "rgba(212,168,72,0.9)",
      heroText: "YOUR STORY",
      subText: "BEGINS HERE",
      bars: ["#d4a848", "#c084fc", "#f472b6"],
      shapes: "wedding",
    },
  },
  {
    id: 6,
    title: "BrightMind Academy",
    category: "Education",
    description:
      "A full EdTech platform with course catalog, faculty profiles, results showcase, and enrollment system.",
    tags: ["React", "LMS Design", "Framer Motion"],
    accent: "#10b981",
    accentDark: "#065f46",
    accentLight: "rgba(16,185,129,",
    liveUrl: "https://brightmind-demo-showcase.vercel.app/",
    visual: {
      bg: "linear-gradient(145deg, #000d08 0%, #001a10 40%, #002618 100%)",
      headerBg: "linear-gradient(90deg, #10b981 0%, #3b82f6 100%)",
      emoji: "🎓",
      navColor: "rgba(16,185,129,0.9)",
      heroText: "LEARN & GROW",
      subText: "YOUR FUTURE STARTS NOW",
      bars: ["#10b981", "#3b82f6", "#8b5cf6"],
      shapes: "education",
    },
  },
  {
    id: 7,
    title: "Prestige Properties",
    category: "Real Estate",
    description:
      "A premium real estate agency website with property listings, EMI calculator, agent profiles, and lead capture.",
    tags: ["React", "Property Listing", "EMI Calculator"],
    accent: "#94a3b8",
    accentDark: "#1e293b",
    accentLight: "rgba(148,163,184,",
    liveUrl: "https://prestige-properties-showcase.vercel.app",
    visual: {
      bg: "linear-gradient(145deg, #050a0f 0%, #0a1520 40%, #0f2035 100%)",
      headerBg: "linear-gradient(90deg, #64748b 0%, #d4a848 100%)",
      emoji: "🏡",
      navColor: "rgba(148,163,184,0.8)",
      heroText: "FIND YOUR",
      subText: "DREAM HOME",
      bars: ["#94a3b8", "#d4a848", "#64748b"],
      shapes: "realestate",
    },
  },
];

const FILTER_TABS = ["All", "Fitness", "Restaurant", "Salon", "Healthcare", "Education", "Real Estate", "Wedding"];

/* ═══════════════════════════════════════════════════════════
   PROJECT VISUAL — CSS-crafted mini screenshot per project
═══════════════════════════════════════════════════════════ */
const ProjectVisual = ({ visual, title, accent, accentLight }) => {
  const shapes = {
    fitness: (
      <>
        {/* Barbell icon */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg width="160" height="60" viewBox="0 0 160 60" fill="none">
            <rect x="0" y="22" width="160" height="16" rx="8" fill={accent} />
            <rect x="0" y="10" width="30" height="40" rx="6" fill={accent} />
            <rect x="20" y="4" width="16" height="52" rx="4" fill={accent} opacity="0.7" />
            <rect x="130" y="10" width="30" height="40" rx="6" fill={accent} />
            <rect x="124" y="4" width="16" height="52" rx="4" fill={accent} opacity="0.7" />
          </svg>
        </div>
        {/* Diagonal energy lines */}
        {[...Array(5)].map((_, i) => (
          <div key={i} className="absolute" style={{
            top: `${10 + i * 18}%`, left: "-10%", width: "120%", height: "1px",
            background: `${accentLight}0.12)`,
            transform: "rotate(-15deg)",
          }} />
        ))}
        {/* Power badge */}
        <div className="absolute bottom-4 right-4 px-2 py-1 rounded text-[8px] font-bold uppercase tracking-wider"
          style={{ background: accent, color: "#000", fontFamily: "sans-serif" }}>
          POWER UP
        </div>
      </>
    ),

    restaurant: (
      <>
        {/* Plate/cutlery silhouette */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.08]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill={accent}>
            <circle cx="50" cy="50" r="40" stroke={accent} strokeWidth="3" fill="none" />
            <circle cx="50" cy="50" r="28" stroke={accent} strokeWidth="1.5" fill="none" opacity="0.6" />
            <rect x="20" y="10" width="4" height="60" rx="2" />
            <ellipse cx="22" cy="18" rx="8" ry="10" />
            <rect x="74" y="10" width="4" height="35" rx="2" />
            <path d="M72 10 L72 30 Q80 30 80 20 Q80 10 72 10Z" />
          </svg>
        </div>
        {/* Candle lights */}
        {[25, 50, 75].map((x, i) => (
          <div key={i} className="absolute bottom-8" style={{ left: `${x}%`, transform: "translateX(-50%)" }}>
            <div className="w-1.5 h-8 rounded-sm mx-auto" style={{ background: accent, opacity: 0.3 }} />
            <div className="w-3 h-3 rounded-full -mt-1 mx-auto" style={{
              background: accent, opacity: 0.6,
              boxShadow: `0 0 8px ${accent}`,
            }} />
          </div>
        ))}
        {/* Menu lines */}
        <div className="absolute top-6 left-6 space-y-1">
          {[60, 40, 50].map((w, i) => (
            <div key={i} className="h-1 rounded-full" style={{ width: `${w}px`, background: `${accentLight}0.25)` }} />
          ))}
        </div>
      </>
    ),

    salon: (
      <>
        {/* Scissors watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <svg width="120" height="120" viewBox="0 0 120 120" fill={accent}>
            <circle cx="30" cy="30" r="18" stroke={accent} strokeWidth="4" fill="none" />
            <circle cx="90" cy="30" r="18" stroke={accent} strokeWidth="4" fill="none" />
            <line x1="42" y1="42" x2="78" y2="78" stroke={accent} strokeWidth="4" />
            <line x1="78" y1="42" x2="42" y2="78" stroke={accent} strokeWidth="4" />
            <circle cx="30" cy="90" r="18" stroke={accent} strokeWidth="4" fill="none" />
            <circle cx="90" cy="90" r="18" stroke={accent} strokeWidth="4" fill="none" />
          </svg>
        </div>
        {/* Pink sparkles */}
        {[[15, 20], [80, 15], [10, 70], [85, 75], [45, 10]].map(([x, y], i) => (
          <div key={i} className="absolute text-xs" style={{ left: `${x}%`, top: `${y}%`, color: accent, opacity: 0.5 }}>✦</div>
        ))}
        {/* Wavy decorative line */}
        <div className="absolute bottom-0 left-0 right-0 h-12 opacity-20">
          <svg viewBox="0 0 300 48" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0 24 Q37.5 0 75 24 Q112.5 48 150 24 Q187.5 0 225 24 Q262.5 48 300 24 L300 48 L0 48Z"
              fill={accent} />
          </svg>
        </div>
      </>
    ),

    healthcare: (
      <>
        {/* Cross watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <svg width="100" height="100" viewBox="0 0 100 100" fill={accent}>
            <rect x="40" y="10" width="20" height="80" rx="4" />
            <rect x="10" y="40" width="80" height="20" rx="4" />
          </svg>
        </div>
        {/* Heart pulse line */}
        <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center opacity-30">
          <svg width="200" height="40" viewBox="0 0 200 40" fill="none" stroke={accent} strokeWidth="2">
            <polyline points="0,20 40,20 50,5 60,35 70,10 80,30 90,20 200,20" />
          </svg>
        </div>
        {/* Stat boxes */}
        {["98%", "4.9★", "24/7"].map((v, i) => (
          <div key={i} className="absolute text-center" style={{
            top: "10%", left: `${12 + i * 32}%`,
            fontSize: "9px", color: accent, fontFamily: "sans-serif", fontWeight: "bold", opacity: 0.5,
          }}>
            <div style={{ fontSize: "13px" }}>{v}</div>
            <div style={{ opacity: 0.6 }}>{["Success", "Rating", "Support"][i]}</div>
          </div>
        ))}
      </>
    ),

    wedding: (
      <>
        {/* Ring watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <svg width="110" height="80" viewBox="0 0 110 80" fill="none" stroke={accent} strokeWidth="3">
            <circle cx="35" cy="40" r="28" />
            <circle cx="75" cy="40" r="28" />
          </svg>
        </div>
        {/* Floating hearts */}
        {[[20, 15], [75, 20], [10, 65], [85, 60], [50, 8]].map(([x, y], i) => (
          <div key={i} className="absolute text-sm" style={{ left: `${x}%`, top: `${y}%`, color: accent, opacity: 0.35 }}>♥</div>
        ))}
        {/* Petal dots arc */}
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <div key={i} className="absolute w-1 h-1 rounded-full" style={{
              top: `${50 + 38 * Math.sin(angle)}%`,
              left: `${50 + 38 * Math.cos(angle)}%`,
              background: accent, opacity: 0.25,
            }} />
          );
        })}
      </>
    ),

    education: (
      <>
        {/* Graduation cap watermark */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
          <svg width="110" height="90" viewBox="0 0 110 90" fill={accent}>
            <polygon points="55,5 110,35 55,55 0,35" />
            <rect x="47" y="55" width="16" height="25" rx="2" />
            <ellipse cx="47" cy="80" rx="14" ry="8" />
          </svg>
        </div>
        {/* Progress bars (course completion) */}
        <div className="absolute bottom-6 left-6 right-6 space-y-1.5">
          {[85, 65, 90, 45].map((w, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="h-1.5 rounded-full flex-1 bg-white/5">
                <div className="h-full rounded-full" style={{ width: `${w}%`, background: visual.bars[i % 3], opacity: 0.6 }} />
              </div>
              <span style={{ fontSize: "7px", color: accent, fontFamily: "sans-serif", opacity: 0.5 }}>{w}%</span>
            </div>
          ))}
        </div>
        {/* Star rating */}
        <div className="absolute top-5 right-5" style={{ color: accent, fontSize: "10px", opacity: 0.45, letterSpacing: "2px" }}>
          ★★★★★
        </div>
      </>
    ),

    realestate: (
      <>
        {/* Building skyline */}
        <div className="absolute bottom-0 left-0 right-0 h-24 flex items-end justify-center gap-1 opacity-[0.12] px-2">
          {[28, 50, 38, 60, 32, 42, 25, 55, 30].map((h, i) => (
            <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${h}%`, background: accent }} />
          ))}
        </div>
        {/* Location pins */}
        {[[30, 25], [65, 35], [50, 20]].map(([x, y], i) => (
          <div key={i} className="absolute text-lg" style={{ left: `${x}%`, top: `${y}%`, color: accent, opacity: 0.4 }}>📍</div>
        ))}
        {/* Price tag */}
        <div className="absolute top-5 right-4 px-2 py-1 rounded text-[8px] font-bold"
          style={{ background: `${accentLight}0.3)`, border: `1px solid ${accentLight}0.4)`, color: accent, fontFamily: "sans-serif" }}>
          ₹45L — ₹2.5Cr
        </div>
      </>
    ),
  };

  return (
    <div
      className="relative w-full overflow-hidden"
      style={{
        height: "200px",
        background: visual.bg,
        borderRadius: "1rem 1rem 0 0",
      }}
    >
      {/* Browser chrome mockup */}
      {/* Nav bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center gap-2 px-3 py-2 z-10"
        style={{ background: "rgba(0,0,0,0.55)", backdropFilter: "blur(6px)" }}>
        {/* Traffic lights */}
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 rounded-full bg-red-500/70" />
          <div className="w-2 h-2 rounded-full bg-yellow-500/70" />
          <div className="w-2 h-2 rounded-full bg-green-500/70" />
        </div>
        {/* URL bar */}
        <div className="flex-1 h-4 rounded-full flex items-center px-2 gap-1"
          style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)" }}>
          <div className="w-2 h-2 rounded-full opacity-40" style={{ background: accent }} />
          <div className="h-1 rounded-full opacity-30" style={{ width: "60%", background: "rgba(255,255,255,0.5)" }} />
        </div>
        {/* Nav links simulation */}
        <div className="hidden sm:flex items-center gap-2">
          {[40, 35, 30].map((w, i) => (
            <div key={i} className="h-1 rounded-full opacity-25" style={{ width: `${w}px`, background: accent }} />
          ))}
        </div>
      </div>

      {/* Hero block */}
      <div className="absolute top-9 left-0 right-0 flex items-center px-4 py-3"
        style={{ background: visual.headerBg, opacity: 0.85 }}>
        <div className="flex-1">
          <div className="font-black text-white leading-tight" style={{ fontSize: "11px", fontFamily: "sans-serif", letterSpacing: "0.1em" }}>
            {visual.heroText}
          </div>
          <div className="text-white/70" style={{ fontSize: "7px", fontFamily: "sans-serif", letterSpacing: "0.08em" }}>
            {visual.subText}
          </div>
        </div>
        <div className="text-2xl leading-none">{visual.emoji}</div>
      </div>

      {/* Content area */}
      <div className="absolute" style={{ top: "85px", left: 0, right: 0, bottom: 0 }}>
        {/* Shape-specific decoration */}
        {shapes[visual.shapes]}

        {/* Card row at bottom */}
        <div className="absolute bottom-3 left-3 right-3 flex gap-1.5">
          {visual.bars.map((color, i) => (
            <div key={i} className="flex-1 h-8 rounded-md flex flex-col justify-end pb-1 px-1.5"
              style={{ background: `${color}22`, border: `1px solid ${color}33` }}>
              <div className="h-1 rounded-full" style={{ width: `${60 + i * 15}%`, background: color, opacity: 0.6 }} />
            </div>
          ))}
        </div>
      </div>

      {/* Gradient fade to card body */}
      <div className="absolute bottom-0 left-0 right-0 h-8 pointer-events-none"
        style={{ background: "linear-gradient(to top, rgba(13,28,45,0.9) 0%, transparent 100%)" }} />
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   PROJECT CARD
═══════════════════════════════════════════════════════════ */
const ProjectCard = ({ project, index }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 40, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.94 }}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex flex-col rounded-[1.25rem] overflow-hidden"
      style={{
        background: "linear-gradient(160deg, rgba(13,28,45,0.98) 0%, rgba(5,20,36,0.99) 100%)",
        border: hovered
          ? `1px solid ${project.accentLight}0.45)`
          : "1px solid rgba(192,193,255,0.09)",
        boxShadow: hovered
          ? `0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px ${project.accentLight}0.3), 0 0 60px ${project.accentLight}0.08)`
          : "0 4px 24px rgba(0,0,0,0.35)",
        transform: hovered ? "translateY(-7px)" : "translateY(0)",
        transition: "all 0.38s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* ── Visual Thumbnail ── */}
      <div className="relative overflow-hidden">
        <ProjectVisual
          visual={project.visual}
          title={project.title}
          accent={project.accent}
          accentLight={project.accentLight}
        />

        {/* Hover overlay */}
        <motion.div
          initial={false}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="absolute inset-0 flex items-center justify-center gap-3 z-20"
          style={{ background: "rgba(5,20,36,0.75)", backdropFilter: "blur(4px)", borderRadius: "1rem 1rem 0 0" }}
        >
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-sans font-bold text-xs text-background"
            style={{
              background: `linear-gradient(135deg, ${project.accent} 0%, ${project.accentDark} 100%)`,
              boxShadow: `0 4px 16px ${project.accentLight}0.4)`,
            }}
          >
            <FiExternalLink size={13} />
            Live Preview
          </motion.a>
          <motion.button
            whileHover={{ scale: 1.08 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full font-sans font-bold text-xs"
            style={{
              background: "rgba(255,255,255,0.1)",
              border: "1px solid rgba(255,255,255,0.2)",
              color: "rgba(255,255,255,0.9)",
              backdropFilter: "blur(8px)",
            }}
          >
            <FiInfo size={13} />
            Details
          </motion.button>
        </motion.div>

        {/* Category badge */}
        <div className="absolute top-12 left-3 z-10">
          <span
            className="inline-flex items-center px-2.5 py-1 rounded-full font-sans font-bold text-[9px] uppercase tracking-widest"
            style={{
              background: `${project.accentLight}0.2)`,
              border: `1px solid ${project.accentLight}0.35)`,
              color: project.accent,
              backdropFilter: "blur(8px)",
            }}
          >
            {project.category}
          </span>
        </div>
      </div>

      {/* ── Card Body ── */}
      <div className="flex flex-col flex-1 p-5 gap-4">

        {/* Title + accent bar */}
        <div className="flex items-start gap-3">
          <div
            className="w-0.5 h-full min-h-[2.5rem] rounded-full shrink-0 mt-0.5"
            style={{ background: `linear-gradient(180deg, ${project.accent} 0%, transparent 100%)` }}
          />
          <h3 className="font-display font-bold text-white text-lg leading-snug">
            {project.title}
          </h3>
        </div>

        {/* Description */}
        <p className="font-sans text-text-muted text-sm leading-relaxed flex-1">
          {project.description}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-1.5">
          {project.tags.map(tag => (
            <span
              key={tag}
              className="px-2.5 py-1 rounded-full font-sans font-medium text-[10px] text-primary/80"
              style={{
                background: "rgba(192,193,255,0.07)",
                border: "1px solid rgba(192,193,255,0.14)",
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Bottom row */}
        <div
          className="flex items-center justify-between pt-3"
          style={{ borderTop: "1px solid rgba(192,193,255,0.07)" }}
        >
          <a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs transition-all duration-200 group/btn"
            style={{ color: project.accent }}
            onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
            onMouseLeave={e => e.currentTarget.style.opacity = "1"}
          >
            <FiExternalLink size={12} />
            Live Preview
          </a>

          <button
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs text-text-muted hover:text-white transition-colors duration-200"
          >
            <FiInfo size={12} />
            Details
          </button>
        </div>
      </div>

      {/* Bottom accent glow line */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${project.accent}, transparent)`,
          opacity: hovered ? 0.7 : 0,
        }}
      />
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   FILTER TABS
═══════════════════════════════════════════════════════════ */
const FilterTabs = ({ active, onChange }) => {
  const tabsRef = useRef(null);

  return (
    <div
      ref={tabsRef}
      className="flex flex-wrap justify-center gap-2"
      role="tablist"
      aria-label="Filter projects by category"
    >
      {FILTER_TABS.map(tab => {
        const isActive = active === tab;
        return (
          <motion.button
            key={tab}
            onClick={() => onChange(tab)}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            role="tab"
            aria-selected={isActive}
            className="relative px-4 py-2 rounded-full font-sans font-semibold text-xs transition-all duration-250"
            style={{
              background: isActive
                ? "linear-gradient(135deg, rgba(192,193,255,0.18) 0%, rgba(192,193,255,0.08) 100%)"
                : "rgba(255,255,255,0.04)",
              border: isActive
                ? "1px solid rgba(192,193,255,0.35)"
                : "1px solid rgba(255,255,255,0.08)",
              color: isActive ? "#c0c1ff" : "#8892a4",
              boxShadow: isActive ? "0 0 16px rgba(192,193,255,0.12)" : "none",
            }}
          >
            {tab}
            {/* Active underline */}
            {isActive && (
              <motion.div
                layoutId="filter-underline"
                className="absolute -bottom-0.5 left-3 right-3 h-[2px] rounded-full"
                style={{
                  background: "linear-gradient(90deg, transparent, #c0c1ff, transparent)",
                }}
                transition={{ type: "spring", stiffness: 380, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

/* ═══════════════════════════════════════════════════════════
   CTA STRIP
═══════════════════════════════════════════════════════════ */
const CTAStrip = ({ inView }) => (
  <motion.div
    initial={{ opacity: 0, y: 32 }}
    animate={inView ? { opacity: 1, y: 0 } : {}}
    transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
    className="mt-16 relative rounded-[1.75rem] overflow-hidden"
    style={{
      background: "linear-gradient(135deg, rgba(192,193,255,0.08) 0%, rgba(103,232,249,0.04) 50%, rgba(192,193,255,0.06) 100%)",
      border: "1px solid rgba(192,193,255,0.14)",
      boxShadow: "0 8px 40px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
    }}
  >
    {/* Decorative background */}
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(192,193,255,0.08) 0%, transparent 70%)", filter: "blur(30px)" }} />
      <div className="absolute -bottom-12 -left-12 w-40 h-40 rounded-full"
        style={{ background: "radial-gradient(circle, rgba(103,232,249,0.06) 0%, transparent 70%)", filter: "blur(25px)" }} />
      {/* Shimmer line */}
      <div className="absolute top-0 left-[10%] right-[10%] h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.4), transparent)" }} />
    </div>

    <div className="relative z-10 py-12 px-8 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
      {/* Text */}
      <div className="text-center md:text-left">
        <div className="flex items-center gap-2 justify-center md:justify-start mb-3">
          <div className="h-px w-6 bg-primary/60" />
          <span className="font-sans text-primary text-[10px] font-bold uppercase tracking-[0.3em]">
            Ready to Start?
          </span>
        </div>
        <h3 className="font-display font-black text-white text-2xl md:text-3xl leading-tight mb-2">
          Have a project in mind?
        </h3>
        <p className="font-sans text-text-muted text-sm md:text-base">
          Let's bring it to life — <span className="text-white font-medium">beautifully, fast, and built to grow</span>.
        </p>
      </div>

      {/* Button */}
      <motion.a
        href="https://wa.me/917011875494?text=Hi%20Deepak!%20I%20saw%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.05, y: -2 }}
        whileTap={{ scale: 0.97 }}
        className="shrink-0 inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-sans font-bold text-sm text-background"
        style={{
          background: "linear-gradient(135deg, #c0c1ff 0%, #9394e0 100%)",
          boxShadow: "0 6px 28px rgba(192,193,255,0.35)",
          transition: "box-shadow 0.3s",
          whiteSpace: "nowrap",
        }}
        onMouseEnter={e => e.currentTarget.style.boxShadow = "0 10px 44px rgba(192,193,255,0.6)"}
        onMouseLeave={e => e.currentTarget.style.boxShadow = "0 6px 28px rgba(192,193,255,0.35)"}
      >
        Start a Project
        <FiArrowRight size={16} />
      </motion.a>
    </div>
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   WORKS SECTION
═══════════════════════════════════════════════════════════ */
const Works = () => {
  const [activeFilter, setActiveFilter] = useState("All");
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const ctaRef = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const ctaInView = useInView(ctaRef, { once: true, margin: "-60px" });

  const filtered = activeFilter === "All"
    ? PROJECTS
    : PROJECTS.filter(p => p.category === activeFilter);

  return (
    <section
      id="works"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: "7rem 0 8rem",
        background: "linear-gradient(180deg, #051424 0%, #060d18 55%, #051424 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[2px]"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.2), transparent)" }} />
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-32"
          style={{ background: "radial-gradient(ellipse, rgba(192,193,255,0.05) 0%, transparent 70%)", filter: "blur(20px)" }} />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,0.04) 0%, transparent 70%)", filter: "blur(80px)" }} />
        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(192,193,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,193,255,1) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-12">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.6))" }} />
            <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
              My Portfolio
            </span>
            <div className="h-px w-8" style={{ background: "linear-gradient(270deg, transparent, rgba(192,193,255,0.6))" }} />
          </motion.div>

          {/* Headline */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Projects That{" "}
            <span style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Speak For Themselves
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto mb-10"
          >
            Every project below is a fully functional demo website built to showcase{" "}
            <span className="text-white font-medium">real-world solutions</span> across different industries.
          </motion.p>

          {/* Filter tabs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <LayoutGroup id="filter-group">
              <FilterTabs active={activeFilter} onChange={setActiveFilter} />
            </LayoutGroup>
          </motion.div>
        </div>

        {/* ── Cards Grid ── */}
        <LayoutGroup id="cards-group">
          <motion.div
            layout
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((project, i) => (
                <ProjectCard key={project.id} project={project} index={i} />
              ))}
            </AnimatePresence>
          </motion.div>
        </LayoutGroup>

        {/* ── CTA Strip ── */}
        <div ref={ctaRef}>
          <CTAStrip inView={ctaInView} />
        </div>
      </div>
    </section>
  );
};

export default Works;
