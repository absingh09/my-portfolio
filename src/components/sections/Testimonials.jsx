import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiStar, FiChevronLeft, FiChevronRight } from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════
   TESTIMONIAL DATA
═══════════════════════════════════════════════════════════ */
const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Kumar",
    role: "Restaurant Owner",
    city: "Delhi",
    avatar: "RK",
    avatarGrad: "from-amber-500 to-orange-600",
    stars: 5,
    quote:
      "Deepak didn't just build us a website — he built us a brand. Our online reservations increased by 40% in the first month. Absolutely professional work.",
    highlight: "reservations increased by 40%",
    emoji: "🍽️",
  },
  {
    id: 2,
    name: "Priya Sharma",
    role: "Fitness Studio Owner",
    city: "Noida",
    avatar: "PS",
    avatarGrad: "from-rose-500 to-pink-600",
    stars: 5,
    quote:
      "The website Deepak built for our gym looks better than websites of studios 10x our size. Our membership inquiries doubled. Worth every rupee.",
    highlight: "membership inquiries doubled",
    emoji: "💪",
  },
  {
    id: 3,
    name: "Amit Verma",
    role: "Education Consultant",
    city: "Gurgaon",
    avatar: "AV",
    avatarGrad: "from-blue-500 to-indigo-600",
    stars: 5,
    quote:
      "What impressed me most was that Deepak understood our business first, then built the website. The result was exactly what we needed to grow online.",
    highlight: "understood our business first",
    emoji: "🎓",
  },
];

/* ── Star Rating ── */
const StarRating = ({ count }) => (
  <div className="flex items-center gap-1">
    {Array.from({ length: count }).map((_, i) => (
      <FiStar key={i} size={14} fill="#f59e0b" stroke="#f59e0b" />
    ))}
  </div>
);

/* ── Quote SVG ── */
const QuoteIcon = ({ color = "rgba(192,193,255,0.25)" }) => (
  <svg width="40" height="30" viewBox="0 0 40 30" fill={color}>
    <path d="M0 30V18.75C0 8.125 6.25 2.125 18.75 0L21.25 3.75C15.625 5 12.5 8.125 11.25 13.75H17.5V30H0ZM22.5 30V18.75C22.5 8.125 28.75 2.125 41.25 0L43.75 3.75C38.125 5 35 8.125 33.75 13.75H40V30H22.5Z" />
  </svg>
);

/* ── Testimonial Card ── */
const TestimonialCard = ({ item, isActive }) => {
  // Highlight key phrase in quote
  const renderQuote = (quote, highlight) => {
    if (!highlight) return quote;
    const idx = quote.toLowerCase().indexOf(highlight.toLowerCase());
    if (idx === -1) return quote;
    return (
      <>
        {quote.slice(0, idx)}
        <span
          style={{
            background: "linear-gradient(135deg, #c0c1ff, #67e8f9)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 600,
          }}
        >
          {quote.slice(idx, idx + highlight.length)}
        </span>
        {quote.slice(idx + highlight.length)}
      </>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.96, y: -20 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="relative flex flex-col rounded-[1.5rem] overflow-hidden p-8"
      style={{
        background: "linear-gradient(160deg, rgba(13,28,45,0.98) 0%, rgba(5,20,36,0.99) 100%)",
        border: "1px solid rgba(192,193,255,0.12)",
        boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
        minHeight: "280px",
      }}
    >
      {/* Top glow accent */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.35), transparent)" }}
      />

      {/* Quote icon */}
      <div className="mb-5">
        <QuoteIcon />
      </div>

      {/* Quote text */}
      <p className="font-sans text-white/85 text-base md:text-[17px] leading-[1.75] mb-7 flex-1">
        {renderQuote(item.quote, item.highlight)}
      </p>

      {/* Stars */}
      <div className="mb-5">
        <StarRating count={item.stars} />
      </div>

      {/* Divider */}
      <div
        className="h-px w-full mb-5"
        style={{ background: "linear-gradient(90deg, rgba(192,193,255,0.15), transparent)" }}
      />

      {/* Author row */}
      <div className="flex items-center gap-4">
        {/* Avatar */}
        <div
          className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${item.avatarGrad} flex items-center justify-center font-display font-black text-white text-base shrink-0`}
          style={{ boxShadow: "0 4px 12px rgba(0,0,0,0.3)" }}
        >
          {item.avatar}
        </div>

        {/* Name + role */}
        <div className="flex-1">
          <div className="font-sans font-bold text-white text-sm leading-tight">
            {item.name}
          </div>
          <div className="font-sans text-text-muted text-xs mt-0.5">
            {item.role} · {item.city}
          </div>
        </div>

        {/* Business emoji */}
        <div className="text-2xl select-none">{item.emoji}</div>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TESTIMONIALS SECTION
═══════════════════════════════════════════════════════════ */
const Testimonials = () => {
  const [current, setCurrent] = useState(0);
  const [autoplay, setAutoplay] = useState(true);
  const headingRef = useRef(null);
  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const timerRef = useRef(null);

  const next = useCallback(() => setCurrent(c => (c + 1) % TESTIMONIALS.length), []);
  const prev = useCallback(() => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length), []);

  /* Autoplay */
  useEffect(() => {
    if (!autoplay) return;
    timerRef.current = setInterval(next, 5000);
    return () => clearInterval(timerRef.current);
  }, [autoplay, next]);

  const handleManual = (fn) => {
    setAutoplay(false);
    clearInterval(timerRef.current);
    fn();
    // resume autoplay after 8s
    timerRef.current = setTimeout(() => setAutoplay(true), 8000);
  };

  return (
    <section
      id="testimonials"
      className="relative overflow-hidden"
      style={{
        padding: "7rem 0 8rem",
        background: "linear-gradient(180deg, #051424 0%, #060f1a 55%, #051424 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,193,255,0.05) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.18), transparent)" }}
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
            <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">Client Love</span>
            <div className="h-px w-8" style={{ background: "linear-gradient(270deg, transparent, rgba(192,193,255,0.6))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Results That Speak{" "}
            <span style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Louder Than Words
            </span>
          </motion.h2>

          {/* Overall rating strip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            className="inline-flex items-center gap-3 px-5 py-2.5 rounded-full"
            style={{
              background: "rgba(245,158,11,0.1)",
              border: "1px solid rgba(245,158,11,0.2)",
            }}
          >
            <StarRating count={5} />
            <span className="font-sans text-white/80 text-sm font-semibold">5.0</span>
            <span className="font-sans text-text-muted text-xs">· 100% Client Satisfaction</span>
          </motion.div>
        </div>

        {/* ── Desktop: 3 cards side by side ── */}
        <div className="hidden lg:grid grid-cols-3 gap-6 mb-12">
          {TESTIMONIALS.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 40 }}
              animate={headingInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
            >
              <TestimonialCard item={item} isActive={i === current} />
            </motion.div>
          ))}
        </div>

        {/* ── Mobile/Tablet: carousel ── */}
        <div className="lg:hidden mb-8">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <TestimonialCard key={current} item={TESTIMONIALS[current]} isActive />
            </AnimatePresence>
          </div>

          {/* Carousel controls */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={() => handleManual(prev)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:text-white transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(192,193,255,0.15)",
              }}
              aria-label="Previous"
            >
              <FiChevronLeft size={18} />
            </motion.button>

            {/* Dots */}
            <div className="flex items-center gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => handleManual(() => setCurrent(i))}
                  aria-label={`Go to testimonial ${i + 1}`}
                  className="h-2 rounded-full transition-all duration-300"
                  style={{
                    width: i === current ? "20px" : "8px",
                    background: i === current ? "#c0c1ff" : "rgba(192,193,255,0.25)",
                  }}
                />
              ))}
            </div>

            <motion.button
              onClick={() => handleManual(next)}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.92 }}
              className="w-10 h-10 rounded-full flex items-center justify-center text-text-muted hover:text-white transition-colors"
              style={{
                background: "rgba(255,255,255,0.05)",
                border: "1px solid rgba(192,193,255,0.15)",
              }}
              aria-label="Next"
            >
              <FiChevronRight size={18} />
            </motion.button>
          </div>
        </div>

        {/* ── Bottom trust bar ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={headingInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center"
        >
          <p className="font-sans text-text-muted text-sm">
            Trusted by{" "}
            <span className="text-white font-semibold">25+ businesses</span> across India —{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c0c1ff, #67e8f9)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              100% satisfaction rate
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
