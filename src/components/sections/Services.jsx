import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowRight } from "react-icons/fi";


/* ─────────────────────────────────────────────────────────
   SERVICE DATA
───────────────────────────────────────────────────────── */
const SERVICES_DATA = [
  {
    id: 1,
    emoji: "🌐",
    title: "High-Performance Corporate Websites",
    description:
      "Your website is your digital storefront. We engineer custom, high-speed, and conversion-optimized websites that turn visitors into loyal clients.",
    price: "Starting ₹8,000",
    badge: "Most Popular",
    badgeColor: "primary",
    accentColor: "rgba(192,193,255,",
    glowColor: "rgba(192,193,255,0.15)",
    borderGlow: "rgba(192,193,255,0.4)",
    wa: "Hi Deepak! I'm interested in a High-Performance Corporate Website.",
  },
  {
    id: 2,
    emoji: "🚀",
    title: "Conversion-Optimized Landing Pages",
    description:
      "One clear message. One focused action. We design landing pages engineered to maximize conversions and generate high-quality leads.",
    price: "Starting ₹4,000",
    badge: null,
    accentColor: "rgba(103,232,249,",
    glowColor: "rgba(103,232,249,0.12)",
    borderGlow: "rgba(103,232,249,0.35)",
    wa: "Hi Deepak! I'm interested in a Conversion-Optimized Landing Page.",
  },
  {
    id: 3,
    emoji: "💼",
    title: "Premium Portfolios & Personal Brands",
    description:
      "Stand out in your industry. We build modern, elegant portfolio sites that establish credibility and showcase your expertise to decision-makers.",
    price: "Starting ₹5,000",
    badge: null,
    accentColor: "rgba(192,193,255,",
    glowColor: "rgba(192,193,255,0.12)",
    borderGlow: "rgba(192,193,255,0.35)",
    wa: "Hi Deepak! I'm interested in a Premium Portfolio Website.",
  },
  {
    id: 4,
    emoji: "🤖",
    title: "AI Automation & Conversational Chatbots",
    description:
      "Engage and qualify leads 24/7. We integrate intelligent, conversational AI agents that automate customer service and lead capture.",
    price: "Starting ₹6,000",
    badge: "AI-Powered",
    badgeColor: "cyan",
    accentColor: "rgba(103,232,249,",
    glowColor: "rgba(103,232,249,0.12)",
    borderGlow: "rgba(103,232,249,0.35)",
    wa: "Hi Deepak! I'm interested in an AI Chatbot for my business.",
  },
  {
    id: 5,
    emoji: "🛒",
    title: "Conversion-Focused E-Commerce",
    description:
      "Sell seamlessly online. We build high-converting online stores with secure payment flows, fast checkouts, and clean product discovery.",
    price: "Starting ₹12,000",
    badge: "Full-Stack",
    badgeColor: "primary",
    accentColor: "rgba(192,193,255,",
    glowColor: "rgba(192,193,255,0.12)",
    borderGlow: "rgba(192,193,255,0.35)",
    wa: "Hi Deepak! I'm interested in an E-Commerce Store.",
  },
  {
    id: 6,
    emoji: "⚡",
    title: "Speed & Search Engine Optimization",
    description:
      "Get found, stay fast. We audit, accelerate, and optimize platforms for top Google rankings and frictionless user experiences.",
    price: "Starting ₹3,000",
    badge: null,
    accentColor: "rgba(103,232,249,",
    glowColor: "rgba(103,232,249,0.12)",
    borderGlow: "rgba(103,232,249,0.35)",
    wa: "Hi Deepak! I'm interested in Speed & SEO Optimization.",
  },
];

/* ─────────────────────────────────────────────────────────
   BADGE COMPONENT
───────────────────────────────────────────────────────── */
const CardBadge = ({ text, color }) => {
  if (!text) return null;
  const styles = {
    primary: "bg-primary/20 text-primary border-primary/30",
    cyan:    "bg-accent-cyan/20 text-accent-cyan border-accent-cyan/30",
  };
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[10px] font-sans font-bold uppercase tracking-widest border ${styles[color] || styles.primary}`}>
      {text}
    </span>
  );
};

/* ─────────────────────────────────────────────────────────
   SINGLE SERVICE CARD
───────────────────────────────────────────────────────── */
const ServiceCard = ({ service, index }) => {
  const [hovered, setHovered] = useState(false);
  const waUrl = `https://wa.me/917011875494?text=${encodeURIComponent(service.wa)}`;

  const cardVariants = {
    hidden: { opacity: 0, y: 48, scale: 0.96 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        duration: 0.6,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="group relative flex flex-col rounded-[1.25rem] overflow-hidden cursor-default"
      style={{
        background: "linear-gradient(135deg, rgba(192,193,255,0.06) 0%, rgba(103,232,249,0.02) 100%)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: hovered
          ? `1px solid ${service.borderGlow}`
          : "1px solid rgba(192,193,255,0.10)",
        boxShadow: hovered
          ? `0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px ${service.borderGlow}, 0 0 40px ${service.glowColor}`
          : "0 8px 32px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.06)",
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "all 0.35s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
    >
      {/* Top accent line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px] transition-opacity duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${service.accentColor}0.7), transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Card number watermark */}
      <div
        className="absolute -bottom-2 -right-2 font-display font-black text-[6rem] leading-none select-none pointer-events-none transition-opacity duration-400"
        style={{
          color: `${service.accentColor}0.035)`,
          opacity: hovered ? 1 : 0.5,
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </div>

      {/* Content */}
      <div className="relative z-10 p-7 flex flex-col gap-5 flex-1">
        {/* Icon + badge row */}
        <div className="flex items-start justify-between gap-3">
          <motion.div
            animate={hovered ? { scale: 1.15, rotate: [0, -8, 8, 0] } : { scale: 1, rotate: 0 }}
            transition={{ duration: 0.5 }}
            className="relative w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 select-none"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${service.accentColor}0.25), ${service.glowColor})`,
              border: `1px solid ${service.accentColor}0.2)`,
              boxShadow: hovered ? `0 0 24px ${service.glowColor}, inset 0 1px 0 rgba(255,255,255,0.1)` : "none",
              transition: "box-shadow 0.35s ease",
            }}
          >
            {service.emoji}
          </motion.div>

          {service.badge && (
            <CardBadge text={service.badge} color={service.badgeColor} />
          )}
        </div>

        {/* Title */}
        <div>
          <h3 className="font-display font-bold text-white text-xl leading-snug mb-3 group-hover:text-white transition-colors">
            {service.title}
          </h3>
          <p className="font-sans text-text-muted text-sm leading-relaxed">
            {service.description}
          </p>
        </div>

        {/* Divider */}
        <div
          className="h-px w-full transition-opacity duration-300"
          style={{
            background: `linear-gradient(90deg, ${service.accentColor}0.3), transparent)`,
            opacity: hovered ? 1 : 0.4,
          }}
        />

        {/* Price + CTA row */}
        <div className="flex items-center justify-between gap-3 mt-auto">
          <div>
            <div className="font-sans text-[10px] text-text-muted uppercase tracking-widest mb-0.5">
              Investment
            </div>
            <div
              className="font-display font-bold text-base"
              style={{
                background: `linear-gradient(135deg, ${service.accentColor}1), #ffffff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              {service.price}
            </div>
          </div>

          <motion.a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ x: 4 }}
            whileTap={{ scale: 0.95 }}
            className="inline-flex items-center gap-1.5 font-sans font-semibold text-xs transition-colors duration-300 group/link"
            style={{ color: hovered ? service.accentColor.replace(",", ",").replace("rgba(", "").split(",").length > 3 ? "#c0c1ff" : "#c0c1ff" : "#8892a4" }}
          >
            Discuss Project
            <motion.span
              animate={hovered ? { x: [0, 4, 0] } : { x: 0 }}
              transition={{ duration: 0.6, repeat: hovered ? Infinity : 0 }}
            >
              <FiArrowRight size={13} />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  );
};

/* ─────────────────────────────────────────────────────────
   SERVICES SECTION
───────────────────────────────────────────────────────── */
const Services = () => {
  const sectionRef = useRef(null);
  const headingRef = useRef(null);
  const gridRef    = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const gridInView    = useInView(gridRef,    { once: true, margin: "-60px" });

  return (
    <section
      id="services"
      className="relative overflow-hidden"
      style={{
        padding: "7rem 0 8rem",
        background: "linear-gradient(180deg, #051424 0%, #060f1a 50%, #051424 100%)",
      }}
      ref={sectionRef}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        {/* Top-left orb */}
        <div
          className="absolute -top-32 -left-32 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,193,255,0.06) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        {/* Bottom-right orb */}
        <div
          className="absolute -bottom-32 -right-32 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,0.05) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        {/* Center top shimmer line */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.25), transparent)" }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Section Heading ── */}
        <div ref={headingRef} className="text-center mb-16">

          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
            <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
              What I Offer
            </span>
            <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
          </motion.div>

          {/* Main heading */}
          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-tight mb-5"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            I Don't Just Build Websites —{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              I Build Growth Engines
            </span>
          </motion.h2>

          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Every solution I deliver is designed with one goal: to help your business{" "}
            <span className="text-white font-medium">attract more customers</span>,
            build trust, and{" "}
            <span className="text-white font-medium">generate more revenue</span> online.
          </motion.p>
        </div>

        {/* ── Cards Grid ── */}
        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
          }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
        >
          {SERVICES_DATA.map((service, i) => (
            <ServiceCard key={service.id} service={service} index={i} />
          ))}
        </motion.div>

        {/* ── Bottom CTA strip ── */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={gridInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.75 }}
          className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <p className="font-sans text-text-muted text-sm">
            Not sure which service fits your needs?
          </p>
          <a
            href={`https://wa.me/917011875494?text=${encodeURIComponent("Hi Deepak! I'd like to discuss my project requirements.")}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-sans font-semibold text-sm text-background bg-gradient-to-r from-primary to-primary-dark shadow-[0_4px_20px_rgba(192,193,255,0.3)] hover:shadow-[0_8px_36px_rgba(192,193,255,0.5)] hover:-translate-y-0.5 transition-all duration-300"
          >
            Discuss Your Project
            <FiArrowRight size={14} />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default Services;
