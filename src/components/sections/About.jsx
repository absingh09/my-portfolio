import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import CountUpRaw from "react-countup";
const CountUp = typeof CountUpRaw === "function" ? CountUpRaw : (CountUpRaw.default || (() => null));
import { useInView as useIOInView } from "react-intersection-observer";
import { FiMessageCircle, FiCode, FiZap, FiGlobe, FiBriefcase } from "react-icons/fi";


/* ─────────────────────────────────────────────────────────
   STATS DATA
───────────────────────────────────────────────────────── */
const STATS = [
  { value: 7,   suffix: "+",  label: "Projects Delivered", icon: "🚀" },
  { value: 5,   suffix: "+",  label: "Happy Clients",      icon: "😊" },
  { value: 3,   suffix: "+",  label: "Years Experience",   icon: "💻" },
  { value: 100, suffix: "%",  label: "Client Success",     icon: "🎯" },
];

/* ─────────────────────────────────────────────────────────
   FLOATING TECH CHIPS
───────────────────────────────────────────────────────── */
const TECH_CHIPS = [
  { label: "React",   icon: "⚛️",  pos: "top-[8%]   left-[4%]",   delay: 0,    dur: 5.5 },
  { label: "Node.js", icon: "🟢",  pos: "top-[12%]  right-[2%]",  delay: 0.4,  dur: 6.5 },
  { label: "AI/ML",   icon: "🤖",  pos: "top-[42%]  left-[-2%]",  delay: 0.8,  dur: 5   },
  { label: "Figma",   icon: "🎨",  pos: "top-[38%]  right-[-3%]", delay: 0.3,  dur: 7   },
  { label: "Python",  icon: "🐍",  pos: "bottom-[14%] left-[6%]", delay: 1,    dur: 6   },
  { label: "AWS",     icon: "☁️",  pos: "bottom-[10%] right-[4%]",delay: 0.6,  dur: 5.8 },
];

const TechChip = ({ label, icon, pos, delay, dur }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.7 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5, delay: delay + 0.8 }}
    className={`absolute ${pos} z-20`}
    style={{ animation: `float ${dur}s ease-in-out ${delay}s infinite` }}
  >
    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans font-semibold text-[11px] text-white/90 select-none"
      style={{
        background: "linear-gradient(135deg, rgba(13,28,45,0.95) 0%, rgba(17,34,51,0.9) 100%)",
        backdropFilter: "blur(12px)",
        border: "1px solid rgba(192,193,255,0.18)",
        boxShadow: "0 4px 16px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
      }}
    >
      <span className="text-sm leading-none">{icon}</span>
      {label}
    </div>
  </motion.div>
);

/* ─────────────────────────────────────────────────────────
   ANIMATED STAT COUNTER
───────────────────────────────────────────────────────── */
const StatCounter = ({ value, suffix, label, icon, inView, delay }) => (
  <div className="relative flex flex-col items-center text-center gap-2 p-5 rounded-2xl group"
    style={{
      background: "linear-gradient(135deg, rgba(192,193,255,0.06) 0%, rgba(103,232,249,0.02) 100%)",
      border: "1px solid rgba(192,193,255,0.10)",
      transition: "border-color 0.3s, box-shadow 0.3s",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.borderColor = "rgba(192,193,255,0.28)";
      e.currentTarget.style.boxShadow   = "0 8px 32px rgba(192,193,255,0.1)";
    }}
    onMouseLeave={e => {
      e.currentTarget.style.borderColor = "rgba(192,193,255,0.10)";
      e.currentTarget.style.boxShadow   = "none";
    }}
  >
    <span className="text-2xl leading-none">{icon}</span>
    <div className="font-display font-black text-3xl leading-none"
      style={{
        background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent",
        backgroundClip: "text",
      }}
    >
      {inView
        ? <CountUp end={value} duration={2.2} delay={delay} suffix={suffix} />
        : `0${suffix}`}
    </div>
    <div className="font-sans text-xs text-text-muted font-medium leading-tight">{label}</div>
  </div>
);

/* ─────────────────────────────────────────────────────────
   LEFT VISUAL — Avatar + floating chips
───────────────────────────────────────────────────────── */
const AboutVisual = ({ inView }) => (
  <motion.div
    initial={{ opacity: 0, x: -50 }}
    animate={inView ? { opacity: 1, x: 0 } : {}}
    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    className="relative flex items-center justify-center"
    style={{ minHeight: "520px" }}
  >
    {/* Floating tech chips */}
    {TECH_CHIPS.map(chip => <TechChip key={chip.label} {...chip} />)}

    {/* Outer glow rings */}
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <div
        className="absolute w-[360px] h-[360px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(103,232,249,0.1) 0%, transparent 70%)",
          filter: "blur(40px)",
          animation: "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        }}
      />
      <div
        className="absolute w-[260px] h-[260px] rounded-full"
        style={{
          background: "radial-gradient(circle, rgba(192,193,255,0.12) 0%, transparent 70%)",
          filter: "blur(30px)",
          animation: "float 7s ease-in-out infinite",
        }}
      />
    </div>

    {/* Orbit rings */}
    <div
      className="absolute w-[320px] h-[320px] rounded-full pointer-events-none"
      style={{
        border: "1px solid rgba(103,232,249,0.12)",
        animation: "spin 18s linear infinite",
      }}
    />
    <div
      className="absolute w-[260px] h-[260px] rounded-full pointer-events-none"
      style={{
        border: "1px dashed rgba(192,193,255,0.1)",
        animation: "spin 12s linear infinite reverse",
      }}
    />

    {/* Small orbit dots */}
    {[0, 72, 144, 216, 288].map((deg, i) => (
      <motion.div
        key={deg}
        className="absolute w-1.5 h-1.5 rounded-full"
        style={{
          background: i % 2 === 0 ? "rgba(192,193,255,0.7)" : "rgba(103,232,249,0.7)",
          boxShadow: i % 2 === 0 ? "0 0 6px rgba(192,193,255,0.6)" : "0 0 6px rgba(103,232,249,0.6)",
          top: "50%",
          left: "50%",
          transform: `rotate(${deg}deg) translateX(155px) translateY(-50%)`,
        }}
        animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
        transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.25 }}
      />
    ))}

    {/* Main avatar card */}
    <motion.div
      animate={{ y: [0, -14, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative z-10 flex flex-col items-center gap-0"
    >
      {/* Image container */}
      <div
        className="relative w-56 h-56 md:w-64 md:h-64 rounded-[2rem] overflow-hidden flex items-center justify-center"
        style={{
          background: "linear-gradient(135deg, #0d1c2d 0%, #112233 100%)",
          border: "2px solid rgba(103,232,249,0.2)",
          boxShadow: "0 0 60px rgba(103,232,249,0.15), 0 0 120px rgba(192,193,255,0.08), inset 0 0 40px rgba(0,0,0,0.4)",
        }}
      >
        {/* Image with graceful fallback */}
        <img
          src="/src/assets/robot1.png"
          alt="Deepak's AI Robot mascot"
          className="w-full h-full object-cover"
          onError={e => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback */}
        <div
          className="w-full h-full hidden flex-col items-center justify-center gap-3"
          style={{ display: "none" }}
        >
          <div className="text-7xl">🤖</div>
          <div className="font-display font-black text-4xl leading-none"
            style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            DS
          </div>
        </div>

        {/* Cyan scan-line shimmer effect */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "linear-gradient(180deg, transparent 0%, rgba(103,232,249,0.04) 50%, transparent 100%)",
            animation: "shimmer 3s linear infinite",
          }}
        />
      </div>

      {/* Name tag below avatar */}
      <div
        className="relative -mt-4 z-20 px-5 py-2.5 rounded-2xl flex flex-col items-center gap-0.5"
        style={{
          background: "linear-gradient(135deg, rgba(13,28,45,0.98) 0%, rgba(17,34,51,0.95) 100%)",
          backdropFilter: "blur(20px)",
          border: "1px solid rgba(192,193,255,0.15)",
          boxShadow: "0 8px 32px rgba(0,0,0,0.5)",
        }}
      >
        <span className="font-display font-bold text-white text-base leading-snug tracking-wide">
          Deepak Singh
        </span>
        <span className="font-sans text-[10px] text-text-muted tracking-[0.18em] uppercase">
          Web Developer & AI Engineer
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          <span className="font-sans text-[9px] text-emerald-400 font-semibold tracking-widest uppercase">
            Open to Projects
          </span>
        </div>
      </div>
    </motion.div>

    {/* Corner accent dots */}
    {[
      "top-[15%] left-[15%]",
      "top-[15%] right-[15%]",
      "bottom-[15%] left-[15%]",
      "bottom-[15%] right-[15%]",
    ].map((pos, i) => (
      <motion.div
        key={i}
        className={`absolute ${pos} w-1 h-1 rounded-full bg-primary/40`}
        animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.6, 1] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
      />
    ))}
  </motion.div>
);

/* ─────────────────────────────────────────────────────────
   ABOUT SECTION
───────────────────────────────────────────────────────── */
const About = () => {
  const sectionRef   = useRef(null);
  const headingRef   = useRef(null);
  const contentRef   = useRef(null);

  const leftInView    = useInView(sectionRef, { once: true, margin: "-100px" });
  const contentInView = useInView(contentRef,  { once: true, margin: "-60px" });

  /* CountUp trigger */
  const [statsRef, statsInView] = useIOInView({ threshold: 0.4, triggerOnce: true });

  /* Right-side content stagger */
  const contentVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  };
  const itemVariants = {
    hidden:   { opacity: 0, y: 24 },
    visible:  { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{
        padding: "7rem 0 8rem",
        background: "linear-gradient(180deg, #051424 0%, #07111e 60%, #051424 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div
          className="absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/3 w-[500px] h-[500px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,0.06) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-0 left-0 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,193,255,0.04) 0%, transparent 70%)", filter: "blur(60px)" }}
        />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.018]"
          style={{
            backgroundImage: "linear-gradient(rgba(192,193,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,193,255,1) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ══════════ LEFT — Visual ══════════ */}
          <AboutVisual inView={leftInView} />

          {/* ══════════ RIGHT — Content ══════════ */}
          <motion.div
            ref={contentRef}
            variants={contentVariants}
            initial="hidden"
            animate={contentInView ? "visible" : "hidden"}
            className="flex flex-col gap-6"
          >
            {/* Label */}
            <motion.div variants={itemVariants} className="flex items-center gap-3">
              <div className="h-px w-8 bg-gradient-to-r from-transparent to-primary/60" />
              <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
                About Me
              </span>
              <div className="h-px w-8 bg-gradient-to-l from-transparent to-primary/60" />
            </motion.div>

            {/* Heading */}
            <motion.h2
              ref={headingRef}
              variants={itemVariants}
              className="font-display font-black text-white leading-[1.08]"
              style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)" }}
            >
              A Developer Who Thinks Like a{" "}
              <span
                style={{
                  background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  backgroundClip: "text",
                }}
              >
                Business Owner
              </span>
            </motion.h2>

            {/* Paragraphs */}
            <motion.div variants={itemVariants} className="space-y-4">
              <p className="font-sans text-text-muted text-sm md:text-[15px] leading-[1.8]">
                <span className="text-white font-semibold">Deepak Web Studio</span> is an independent, founder-led digital studio based in{" "}
                <span className="text-primary font-medium">New Delhi, India</span>. Directed by <span className="text-white font-semibold">Deepak Singh</span> as the Founder & Principal Developer, we design and engineer high-performance platforms that align with your strategic business goals. We don't just write code — we build digital assets that drive growth.
              </p>
              <p className="font-sans text-text-muted text-sm md:text-[15px] leading-[1.8]">
                Our philosophy is centered on clarity, speed, and business outcomes. Every visual detail, line of code, and conversion path is engineered to establish trust with your audience. As the lead developer, Deepak ensures that your platform is a high-yielding business asset rather than a decorative expense.
              </p>
              <p className="font-sans text-text-muted text-sm md:text-[15px] leading-[1.8]">
                Our mission is to help businesses compete and succeed in the digital world. Under Deepak's dedicated execution, we deliver custom web experiences that match the quality of large-scale agencies while offering the precision and communication of a dedicated founder-led partner.
              </p>
            </motion.div>

            {/* Skills strip */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-2">
              {[
                { icon: <FiCode size={12} />, text: "Full-Stack Dev" },
                { icon: <FiZap size={12} />,  text: "AI Engineer" },
                { icon: <FiGlobe size={12} />, text: "SEO Optimiser" },
                { icon: <FiBriefcase size={12} />, text: "Business-First" },
              ].map(({ icon, text }) => (
                <div
                  key={text}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full font-sans font-medium text-xs text-primary/90"
                  style={{
                    background: "rgba(192,193,255,0.08)",
                    border: "1px solid rgba(192,193,255,0.15)",
                  }}
                >
                  {icon}
                  {text}
                </div>
              ))}
            </motion.div>

            {/* ── Stats grid ── */}
            <motion.div
              ref={statsRef}
              variants={itemVariants}
              className="grid grid-cols-2 sm:grid-cols-4 gap-3"
            >
              {STATS.map((stat, i) => (
                <StatCounter
                  key={stat.label}
                  {...stat}
                  inView={statsInView}
                  delay={i * 0.15}
                />
              ))}
            </motion.div>

            {/* ── CTA Buttons ── */}
            <motion.div variants={itemVariants} className="flex flex-wrap gap-3 pt-1">
              {/* Let's Connect — WhatsApp */}
              <motion.a
                href={`https://wa.me/917011875494?text=${encodeURIComponent("Hi Deepak! I'd like to connect and discuss working together.")}`}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-sans font-semibold text-sm text-background"
                style={{
                  background: "linear-gradient(135deg, #c0c1ff 0%, #9394e0 100%)",
                  boxShadow: "0 4px 20px rgba(192,193,255,0.3)",
                  transition: "box-shadow 0.3s",
                }}
                onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 36px rgba(192,193,255,0.55)"}
                onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 20px rgba(192,193,255,0.3)"}
              >
                <FiMessageCircle size={16} />
                Let's Connect
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
