import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";

// Layout
import Navbar  from "./components/layout/Navbar";
import Footer  from "./components/layout/Footer";

// Sections
import Hero         from "./components/sections/Hero";
import Services     from "./components/sections/Services";
import Works        from "./components/sections/Works";
import About        from "./components/sections/About";
import TechStack    from "./components/sections/TechStack";
import Testimonials from "./components/sections/Testimonials";
import Contact      from "./components/sections/Contact";

// UI
import ChatWidget  from "./components/ui/ChatWidget";
import CursorGlow  from "./components/ui/CursorGlow";

import "./index.css";

/* ════════════════════════════════════════════════════════
   PRELOADER
════════════════════════════════════════════════════════ */
const TypewriterText = ({ text }) => {
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const iv = setInterval(() => {
      setDisplayed(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(iv);
    }, 52);
    return () => clearInterval(iv);
  }, [text]);

  return (
    <div className="font-display font-bold text-2xl text-white tracking-wide">
      {displayed}
      <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
        className="text-primary"
      >|</motion.span>
    </div>
  );
};

const Preloader = ({ onDone }) => {
  const [phase, setPhase] = useState("initials");

  useEffect(() => {
    const t1 = setTimeout(() => setPhase("typing"), 500);
    const t2 = setTimeout(() => setPhase("fade"),   1900);
    const t3 = setTimeout(() => onDone(),            2500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onDone]);

  return (
    <motion.div
      key="preloader"
      initial={{ opacity: 1 }}
      animate={{ opacity: phase === "fade" ? 0 : 1 }}
      transition={{ duration: 0.6 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background"
      aria-label="Loading Deepak Web Studio"
      role="status"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,193,255,0.08) 0%, transparent 70%)", filter: "blur(60px)" }} />
      </div>

      <div className="relative flex flex-col items-center gap-6">
        {/* DS Monogram */}
        <motion.div
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1] }}
          className="relative"
        >
          <div className="w-24 h-24 rounded-full flex items-center justify-center"
            style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #9394e0 100%)",
              boxShadow: "0 0 60px rgba(192,193,255,0.45)",
            }}
          >
            <span className="font-display font-black text-3xl text-background">DS</span>
          </div>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-[-6px] rounded-full border-2 border-transparent"
            style={{ borderTopColor: "rgba(192,193,255,0.7)", borderRightColor: "rgba(103,232,249,0.3)" }}
          />
        </motion.div>

        {/* Brand name typewriter */}
        <AnimatePresence>
          {phase !== "initials" && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <TypewriterText text="Deepak Web Studio" />
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="text-text-muted text-xs font-sans tracking-[0.25em] uppercase mt-1"
              >
                Digital Growth Partner
              </motion.p>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Progress bar */}
        <div className="w-40 h-0.5 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 2, ease: "easeInOut" }}
            className="h-full rounded-full"
            style={{ background: "linear-gradient(90deg, #c0c1ff, #67e8f9)" }}
          />
        </div>
      </div>
    </motion.div>
  );
};

/* ════════════════════════════════════════════════════════
   SCROLL PROGRESS BAR
════════════════════════════════════════════════════════ */
const ScrollProgress = () => {
  const [pct, setPct] = useState(0);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      const total = d.scrollHeight - d.clientHeight;
      setPct(total > 0 ? (d.scrollTop / total) * 100 : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div
      id="scroll-progress"
      role="progressbar"
      aria-valuenow={Math.round(pct)}
      aria-valuemin={0}
      aria-valuemax={100}
      style={{ width: `${pct}%` }}
    />
  );
};

/* ════════════════════════════════════════════════════════
   BACK TO TOP
════════════════════════════════════════════════════════ */
const BackToTop = () => {
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement;
      setVis(d.scrollTop / (d.scrollHeight - d.clientHeight) > 0.5);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <AnimatePresence>
      {vis && (
        <motion.button
          key="btt"
          initial={{ opacity: 0, scale: 0.5, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.5, y: 20 }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-28 right-6 z-40 w-11 h-11 rounded-full flex items-center justify-center text-primary hover:text-white transition-all duration-300"
          style={{
            background: "linear-gradient(135deg, rgba(13,28,45,0.95) 0%, rgba(17,34,51,0.9) 100%)",
            border: "1px solid rgba(192,193,255,0.2)",
            boxShadow: "0 4px 20px rgba(0,0,0,0.4)",
            backdropFilter: "blur(12px)",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.borderColor = "rgba(192,193,255,0.5)";
            e.currentTarget.style.boxShadow   = "0 4px 24px rgba(192,193,255,0.2)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.borderColor = "rgba(192,193,255,0.2)";
            e.currentTarget.style.boxShadow   = "0 4px 20px rgba(0,0,0,0.4)";
          }}
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
};

/* ════════════════════════════════════════════════════════
   WHATSAPP FLOATING BUTTON
════════════════════════════════════════════════════════ */
const WhatsAppButton = () => (
  <motion.a
    href="https://wa.me/917011875494"
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat with Deepak on WhatsApp"
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 2.8, type: "spring", stiffness: 260, damping: 20 }}
    whileHover={{ scale: 1.1 }}
    whileTap={{ scale: 0.95 }}
    className="fixed bottom-6 right-6 z-40 w-14 h-14 rounded-full flex items-center justify-center"
    style={{
      background: "linear-gradient(135deg, #128c7e 0%, #25d366 100%)",
      boxShadow: "0 4px 24px rgba(37,211,102,0.5)",
      transition: "box-shadow 0.3s ease",
    }}
    onMouseEnter={e => e.currentTarget.style.boxShadow = "0 8px 40px rgba(37,211,102,0.7)"}
    onMouseLeave={e => e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.5)"}
  >
    {/* Pulse rings */}
    <span className="whatsapp-ring" aria-hidden />
    <span className="whatsapp-ring" style={{ animationDelay: "0.8s" }} aria-hidden />
    <svg viewBox="0 0 24 24" fill="white" width="26" height="26" className="relative z-10" aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  </motion.a>
);

/* ════════════════════════════════════════════════════════
   SECTION DIVIDER
════════════════════════════════════════════════════════ */
const Divider = () => (
  <div
    aria-hidden
    className="section-divider"
    style={{ margin: "0 auto" }}
  />
);

/* ════════════════════════════════════════════════════════
   NOISE TEXTURE OVERLAY
════════════════════════════════════════════════════════ */
const NoiseOverlay = () => (
  <div
    aria-hidden
    className="pointer-events-none fixed inset-0 z-0"
    style={{
      backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
      opacity: 0.022,
      mixBlendMode: "overlay",
    }}
  />
);

/* ════════════════════════════════════════════════════════
   APP
════════════════════════════════════════════════════════ */
const App = () => {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      {/* Noise texture — always present */}
      <NoiseOverlay />

      {/* Cursor glow — desktop only */}
      <CursorGlow />

      {/* Preloader */}
      <AnimatePresence>
        {!loaded && <Preloader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      {/* Main site */}
      <AnimatePresence>
        {loaded && (
          <motion.div
            key="main-site"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {/* Global persistent UI */}
            <ScrollProgress />
            <BackToTop />
            <WhatsAppButton />
            <ChatWidget />

            {/* Page */}
            <Navbar />

            <main id="main-content">
              <Hero />
              <Divider />
              <Services />
              <Divider />
              <Works />
              <Divider />
              <About />
              <Divider />
              <TechStack />
              <Divider />
              <Testimonials />
              <Divider />
              <Contact />
            </main>

            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default App;
