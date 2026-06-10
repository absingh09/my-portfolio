import { useRef, useEffect, useCallback } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { TypeAnimation } from "react-type-animation";

import { FiArrowDown, FiMessageCircle, FiEye } from "react-icons/fi";
import CountUpRaw from "react-countup";
const CountUp = typeof CountUpRaw === "function" ? CountUpRaw : (CountUpRaw.default || (() => null));
import { useInView } from "react-intersection-observer";
import { SOCIAL_LINKS } from "../../utils/constants";
import { FiCalendar } from "react-icons/fi";

/* ════════════════════════════════════════════════
   PARTICLE CANVAS
════════════════════════════════════════════════ */
const ParticleCanvas = () => {
  const canvasRef = useRef(null);
  const animRef = useRef(null);
  const particles = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      init();
    };

    const COLORS = [
      "rgba(192,193,255,",
      "rgba(103,232,249,",
      "rgba(147,148,224,",
      "rgba(255,255,255,",
    ];

    const init = () => {
      const count = Math.min(Math.floor((canvas.width * canvas.height) / 9000), 120);
      particles.current = Array.from({ length: count }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        opacity: Math.random() * 0.5 + 0.15,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: Math.random() * 0.015 + 0.008,
        size: Math.random() > 0.85 ? "star" : "dot",
      }));
    };

    const drawStar = (ctx, x, y, r, opacity) => {
      ctx.save();
      ctx.translate(x, y);
      ctx.beginPath();
      for (let i = 0; i < 4; i++) {
        const angle = (i * Math.PI) / 2;
        const outerX = Math.cos(angle) * r * 2;
        const outerY = Math.sin(angle) * r * 2;
        if (i === 0) ctx.moveTo(outerX, outerY);
        else ctx.lineTo(outerX, outerY);
        const innerAngle = angle + Math.PI / 4;
        ctx.lineTo(Math.cos(innerAngle) * r * 0.7, Math.sin(innerAngle) * r * 0.7);
      }
      ctx.closePath();
      ctx.fillStyle = `rgba(192,193,255,${opacity})`;
      ctx.fill();
      ctx.restore();
    };

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += p.pulseSpeed;
        const currentOpacity = p.opacity * (0.6 + 0.4 * Math.sin(p.pulse));

        if (p.x < -5) p.x = canvas.width + 5;
        if (p.x > canvas.width + 5) p.x = -5;
        if (p.y < -5) p.y = canvas.height + 5;
        if (p.y > canvas.height + 5) p.y = -5;

        if (p.size === "star") {
          drawStar(ctx, p.x, p.y, p.r, currentOpacity);
        } else {
          // Draw dot with soft glow for larger particles
          if (p.r > 1.2) {
            const grd = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3);
            grd.addColorStop(0, `${p.color}${currentOpacity})`);
            grd.addColorStop(1, `${p.color}0)`);
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2);
            ctx.fillStyle = grd;
            ctx.fill();
          }
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
          ctx.fillStyle = `${p.color}${currentOpacity})`;
          ctx.fill();
        }
      });

      // Draw soft connection lines for nearby particles
      particles.current.forEach((a, i) => {
        particles.current.slice(i + 1, i + 5).forEach((b) => {
          const dx = a.x - b.x, dy = a.y - b.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 120) {
            ctx.beginPath();
            ctx.strokeStyle = `rgba(192,193,255,${0.04 * (1 - dist / 120)})`;
            ctx.lineWidth = 0.5;
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      animRef.current = requestAnimationFrame(tick);
    };

    resize();
    animRef.current = requestAnimationFrame(tick);
    window.addEventListener("resize", resize, { passive: true });

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden
    />
  );
};

/* ════════════════════════════════════════════════
   STAT ITEM
════════════════════════════════════════════════ */
const StatItem = ({ value, suffix, label, inView, delay }) => (
  <div className="flex flex-col items-center sm:items-start gap-0.5">
    <div className="font-display font-black text-2xl leading-none gradient-text">
      {inView ? (
        <CountUp end={value} duration={2} delay={delay} suffix={suffix} />
      ) : `0${suffix}`}
    </div>
    <div className="font-sans text-xs text-text-muted font-medium whitespace-nowrap">{label}</div>
  </div>
);

/* ════════════════════════════════════════════════
   HERO AVATAR — right side with 3D mouse tracking
════════════════════════════════════════════════ */
const HeroAvatar = () => {
  const cardRef = useRef(null);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const springX = useSpring(rotateX, { stiffness: 100, damping: 20 });
  const springY = useSpring(rotateY, { stiffness: 100, damping: 20 });

  const handleMouseMove = useCallback((e) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / (rect.width / 2);
    const dy = (e.clientY - cy) / (rect.height / 2);
    rotateY.set(dx * 10);
    rotateX.set(-dy * 10);
  }, [rotateX, rotateY]);

  const handleMouseLeave = useCallback(() => {
    rotateX.set(0);
    rotateY.set(0);
  }, [rotateX, rotateY]);

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: springX,
        rotateY: springY,
        transformStyle: "preserve-3d",
        perspective: 800,
      }}
      animate={{ y: [0, -18, 0] }}
      transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      className="relative flex items-center justify-center select-none"
    >
      {/* Glow layers */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 md:w-80 md:h-80 rounded-full bg-primary/15 blur-[60px] animate-pulse-slow" />
      </div>
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-56 h-56 rounded-full bg-accent-cyan/10 blur-[40px]"
          style={{ animation: "float 8s ease-in-out infinite reverse" }} />
      </div>

      {/* Rotating orbit ring */}
      <div
        className="absolute w-[340px] h-[340px] md:w-[380px] md:h-[380px] rounded-full border border-primary/12 pointer-events-none"
        style={{ animation: "spin 20s linear infinite" }}
      />
      <div
        className="absolute w-[280px] h-[280px] md:w-[310px] md:h-[310px] rounded-full border border-accent-cyan/10 pointer-events-none"
        style={{ animation: "spin 14s linear infinite reverse" }}
      />

      {/* Orbit dots */}
      {[0, 60, 120, 180, 240, 300].map((deg, i) => (
        <motion.div
          key={deg}
          className="absolute w-2 h-2 rounded-full"
          style={{
            background: i % 2 === 0 ? "rgba(192,193,255,0.7)" : "rgba(103,232,249,0.6)",
            boxShadow: i % 2 === 0 ? "0 0 8px rgba(192,193,255,0.6)" : "0 0 8px rgba(103,232,249,0.5)",
            top: "50%",
            left: "50%",
            transform: `rotate(${deg}deg) translateX(170px) translateY(-50%)`,
          }}
          animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
          transition={{ duration: 2 + i * 0.3, repeat: Infinity, delay: i * 0.2 }}
        />
      ))}

      {/* Avatar image or fallback */}
      <div className="relative z-10 w-64 h-64 md:w-72 md:h-72 rounded-full overflow-hidden border-2 border-primary/20 shadow-[0_0_40px_rgba(192,193,255,0.2),inset_0_0_40px_rgba(0,0,0,0.3)]">
        <div className="w-full h-full bg-gradient-to-br from-surface via-surface-2 to-background flex items-center justify-center">
          {/* Try loading boy.png — graceful fallback */}
          <img
            src="/boy.png"
            alt="Deepak Singh"
            className="w-full h-full object-cover"
          />
          {/* Fallback avatar */}
          <div
            className="w-full h-full hidden items-center justify-center bg-gradient-to-br from-primary/20 via-surface to-background"
            style={{ display: "none" }}
          >
            <div className="text-center">
              <div className="font-display font-black text-7xl gradient-text leading-none mb-2">DS</div>
              <div className="font-sans text-xs text-text-muted tracking-widest uppercase">Deepak Singh</div>
            </div>
          </div>
        </div>
      </div>

      {/* Floating badges around avatar */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
        className="absolute -top-4 -right-4 glass-card px-3 py-2 flex items-center gap-2 shadow-glow text-xs font-sans whitespace-nowrap z-20"
      >
        <span className="text-base">⚡</span>
        <span className="text-white font-semibold">UX/UI Strategy</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 3.5, repeat: Infinity, delay: 1 }}
        className="absolute -bottom-4 -left-4 glass-card px-3 py-2 flex items-center gap-2 text-xs font-sans whitespace-nowrap z-20"
      >
        <span className="text-base">🤖</span>
        <span className="text-white font-semibold">Web Engineering</span>
      </motion.div>

      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 4, repeat: Infinity, delay: 1.5 }}
        className="absolute top-1/2 -translate-y-1/2 -right-8 glass-card px-3 py-2 flex items-center gap-2 text-xs font-sans whitespace-nowrap z-20"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
        <span className="text-emerald-400 font-semibold">Open for Projects</span>
      </motion.div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════
   WORD HEADLINE ANIMATION
════════════════════════════════════════════════ */
const AnimatedHeadline = () => {
  const words = ["Scale Your Business.", "Dominate Online."];
  return (
    <div className="font-display font-black leading-[1.05] text-white">
      {words.map((phrase, pi) => (
        <div key={pi} className="overflow-hidden">
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.75, delay: 0.5 + pi * 0.18, ease: [0.22, 1, 0.36, 1] }}
            className={pi === 1 ? "gradient-text-warm" : ""}
          >
            {phrase.split(" ").map((word, wi) => (
              <motion.span
                key={wi}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 + pi * 0.2 + wi * 0.08 }}
                className="inline-block mr-3"
              >
                {word}
              </motion.span>
            ))}
          </motion.div>
        </div>
      ))}
    </div>
  );
};

/* ════════════════════════════════════════════════
   SCROLL INDICATOR
════════════════════════════════════════════════ */
const ScrollIndicator = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    transition={{ delay: 2.2, duration: 0.8 }}
    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
  >
    <span className="font-sans text-[10px] text-text-muted tracking-[0.3em] uppercase">Scroll</span>
    <div className="relative w-5 h-8 rounded-full border border-white/20 flex items-start justify-center pt-1.5">
      <motion.div
        animate={{ y: [0, 10, 0], opacity: [1, 0, 1] }}
        transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        className="w-1 h-1.5 rounded-full bg-primary"
      />
    </div>
    <motion.div
      animate={{ y: [0, 6, 0] }}
      transition={{ duration: 1.2, repeat: Infinity, delay: 0.3 }}
    >
      <FiArrowDown size={14} className="text-primary/60" />
    </motion.div>
  </motion.div>
);

/* ════════════════════════════════════════════════
   MAIN HERO
════════════════════════════════════════════════ */
const Hero = () => {
  const [statsRef, statsInView] = useInView({ threshold: 0.3, triggerOnce: true });

  /* Stagger delays for left-side content */
  const delays = {
    badge: 0.3,
    headline: 0.5,
    typing: 0.95,
    subtitle: 1.15,
    buttons: 1.35,
    stats: 1.55,
  };

  const fadeUp = (delay, duration = 0.65) => ({
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration, delay, ease: [0.22, 1, 0.36, 1] },
  });

  const fadeLeft = (delay) => ({
    initial: { opacity: 0, x: -36 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  });

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex items-center overflow-hidden bg-background"
    >
      {/* ── Particle Field ── */}
      <ParticleCanvas />

      {/* ── Ambient Gradient Blobs ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-60 -left-40 w-[700px] h-[700px] rounded-full bg-primary/5 blur-[140px]" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] rounded-full bg-accent-cyan/5 blur-[110px]" />
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[300px] rounded-full bg-primary/4 blur-[100px]" />
      </div>

      {/* ── Subtle Grid ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.022]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(192,193,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,193,255,1) 1px, transparent 1px)",
          backgroundSize: "70px 70px",
        }}
      />

      {/* ══════════ MAIN CONTENT ══════════ */}
      <div className="container-custom relative z-10 pt-24 pb-20 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center min-h-[calc(100vh-6rem)]">

          {/* ── LEFT SIDE ── */}
          <div className="flex flex-col gap-6 lg:gap-7 order-2 lg:order-1">

            {/* 1. Glass badge */}
            <motion.div {...fadeLeft(delays.badge)}>
              <div className="inline-flex items-center gap-2.5 glass-card px-4 py-2.5 max-w-max">
                <motion.span
                  animate={{ rotate: [0, 20, -20, 10, 0] }}
                  transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
                  className="text-xl leading-none"
                >
                  👋
                </motion.span>
                <span className="font-sans text-sm font-medium text-white/90">
                  <span className="text-primary font-semibold">Deepak Singh</span> · Founder & Principal Developer
                </span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              </div>
            </motion.div>

            {/* 2. Animated headline */}
            <div className="text-4xl sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
              <AnimatedHeadline />
            </div>

            {/* 3. Typing animation */}
            <motion.div {...fadeUp(delays.typing)}>
              <div className="glass-card px-5 py-3.5 border-l-2 border-l-primary/60 rounded-xl max-w-max">
                <div className="font-sans text-sm md:text-base text-text-muted leading-relaxed">
                  <TypeAnimation
                    sequence={[
                      "We build websites that attract clients 🌐",
                      2400,
                      "We create landing pages that convert visitors 🚀",
                      2400,
                      "We design portfolios that showcase your brand 💼",
                      2400,
                      "We develop AI chatbots that automate leads 🤖",
                      2400,
                    ]}
                    wrapper="span"
                    speed={52}
                    deletionSpeed={65}
                    repeat={Infinity}
                    className="text-white/95"
                  />
                </div>
              </div>
            </motion.div>

            {/* 4. Subtitle */}
            <motion.p {...fadeUp(delays.subtitle)} className="font-sans text-text-muted text-sm md:text-base leading-relaxed max-w-lg">
              Helping businesses establish a powerful online presence, build customer trust, and scale their revenue through conversion-engineered digital platforms.
            </motion.p>

            {/* 5. Buttons */}
            <motion.div {...fadeUp(delays.buttons)} className="flex flex-wrap gap-3">
              {/* View Our Work */}
              <button
                onClick={() => document.getElementById("works")?.scrollIntoView({ behavior: "smooth" })}
                className="group relative inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-sans font-semibold text-sm text-background overflow-hidden
                  bg-gradient-to-r from-primary to-[#9394e0]
                  shadow-[0_4px_20px_rgba(192,193,255,0.3)]
                  hover:shadow-[0_8px_40px_rgba(192,193,255,0.55)]
                  transition-all duration-300 hover:-translate-y-0.5"
              >
                {/* Shimmer sweep on hover */}
                <span className="absolute inset-0 translate-x-[-100%] group-hover:translate-x-[100%] bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-600 pointer-events-none" />
                <FiEye size={16} className="shrink-0" />
                View Our Work
              </button>

              {/* Book a Call — WhatsApp */}
              <a
              href="https://calendly.com/deepakwebstudio/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2.5 px-6 py-3.5 rounded-full font-sans font-semibold text-sm text-primary
                border border-primary/35 bg-transparent
                hover:border-primary hover:bg-primary/10
                hover:-translate-y-0.5
                transition-all duration-300"
            >
              <FiCalendar size={16} className="shrink-0" />
             Book a Free 30-Min Call ✨
              <svg
                className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-300"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </a>
            </motion.div>

            {/* 6. Trust stats */}
            <motion.div
              ref={statsRef}
              {...fadeUp(delays.stats)}
              className="flex items-center gap-0 pt-2"
            >
              {/* Stat items with vertical dividers */}
              {[
                { value: 7, suffix: "+", label: "Projects Delivered" },
                { value: 100, suffix: "%", label: "Client Success" },
              ].map((s, i) => (
                <div key={s.label} className="flex items-center gap-0">
                  <StatItem {...s} inView={statsInView} delay={0.2 + i * 0.1} />
                  <div className="w-px h-8 bg-white/10 mx-5" />
                </div>
              ))}
              {/* Non-count stat */}
              <div className="flex flex-col gap-0.5">
                <div className="font-display font-black text-2xl leading-none gradient-text">📍</div>
                <div className="font-sans text-xs text-text-muted font-medium">New Delhi, India</div>
              </div>
            </motion.div>
          </div>

          {/* ── RIGHT SIDE ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.88, x: 40 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className="flex justify-center items-center order-1 lg:order-2 py-8 lg:py-0"
          >
            <HeroAvatar />
          </motion.div>
        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <ScrollIndicator />

      {/* ── Bottom gradient fade ── */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none"
        style={{ background: "linear-gradient(to top, #051424 0%, transparent 100%)" }}
      />
    </section>
  );
};

export default Hero;
