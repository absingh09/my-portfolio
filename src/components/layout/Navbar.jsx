import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { motion, AnimatePresence } from "framer-motion";
import { FiMenu, FiX, FiMessageCircle, FiZap } from "react-icons/fi";
import { SOCIAL_LINKS } from "../../utils/constants";

/* ── Nav link data (overriding to match Part 2 spec exactly) */
const NAV = [
  { label: "Home",     to: "hero" },
  { label: "Services", to: "services" },
  { label: "Work",     to: "works" },
  { label: "About",    to: "about" },
  { label: "Contact",  to: "contact" },
];

/* ── Logo Spark Icon */
const SparkIcon = () => (
  <motion.span
    animate={{ rotate: [0, 15, -15, 10, 0], scale: [1, 1.2, 1] }}
    transition={{ duration: 3, repeat: Infinity, repeatDelay: 4 }}
    className="inline-flex items-center justify-center w-2 h-2 rounded-full bg-gradient-to-br from-primary to-accent-cyan shadow-[0_0_6px_rgba(192,193,255,0.8)] ml-0.5 mb-0.5"
    aria-hidden
  />
);

/* ── Desktop Active Indicator */
const ActivePill = ({ layoutId }) => (
  <motion.span
    layoutId={layoutId}
    className="absolute inset-0 rounded-full bg-primary/10 border border-primary/20"
    transition={{ type: "spring", stiffness: 400, damping: 35 }}
  />
);

const Navbar = () => {
  const [scrolled, setScrolled]     = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive]         = useState("hero");

  /* Scroll detection */
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  /* Lock body scroll when mobile menu open */
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  /* Close on resize */
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setMobileOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);

  return (
    <>
      {/* ══════════ NAVBAR ══════════ */}
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-500 ease-out
          ${scrolled
            ? "py-3 bg-[rgba(5,20,36,0.85)] backdrop-blur-xl border-b border-white/[0.06] shadow-[0_4px_24px_rgba(0,0,0,0.4)]"
            : "py-5 bg-transparent"}
        `}
      >
        <div className="container-custom flex items-center justify-between">

          {/* ── Logo ── */}
          <Link to="hero" smooth duration={700} className="cursor-pointer group flex items-center gap-2.5 select-none">
            {/* Monogram Badge */}
            <div className="relative w-9 h-9 rounded-xl overflow-hidden flex items-center justify-center bg-gradient-to-br from-primary to-[#7879db] shadow-[0_0_16px_rgba(192,193,255,0.35)] group-hover:shadow-[0_0_24px_rgba(192,193,255,0.6)] transition-shadow duration-500">
              <span className="font-display font-black text-background text-sm leading-none tracking-tight select-none">DS</span>
            </div>

            {/* Name */}
            <div className="flex flex-col">
              <span className="font-display font-bold text-white text-[0.95rem] leading-none tracking-wide group-hover:text-primary transition-colors duration-300 flex items-baseline gap-[2px]">
                Deepak Web Studio
                <SparkIcon />
              </span>
              <span className="font-sans text-[9px] text-text-muted tracking-[0.2em] uppercase mt-0.5">
                Digital Growth Partner
              </span>
            </div>
          </Link>

          {/* ── Desktop Nav ── */}
          <nav className="hidden md:flex items-center gap-1" role="navigation" aria-label="Main navigation">
            {NAV.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                smooth
                duration={700}
                offset={-80}
                spy
                onSetActive={() => setActive(to)}
                className="relative px-4 py-2 cursor-pointer"
              >
                {active === to && <ActivePill layoutId="nav-pill" />}
                <span className={`relative z-10 font-sans text-sm font-medium transition-colors duration-300 ${
                  active === to ? "text-primary" : "text-text-muted hover:text-white"
                }`}>
                  {label}
                </span>
              </Link>
            ))}
          </nav>

          {/* ── CTA + Hamburger ── */}
          <div className="flex items-center gap-3">
            {/* Hire Me CTA */}
            <motion.a
              href={SOCIAL_LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-sans font-semibold text-sm text-background
                bg-gradient-to-r from-primary to-[#9394e0]
                shadow-[0_2px_16px_rgba(192,193,255,0.25)]
                hover:shadow-[0_4px_32px_rgba(192,193,255,0.55)]
                transition-shadow duration-300"
            >
              <FiZap size={14} className="shrink-0" />
              Let's Talk
            </motion.a>

            {/* Hamburger */}
            <motion.button
              onClick={() => setMobileOpen(!mobileOpen)}
              whileTap={{ scale: 0.9 }}
              className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center text-text-muted hover:text-white border border-white/10 hover:border-white/20 bg-white/5 hover:bg-white/10 transition-all duration-200"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={mobileOpen ? "x" : "menu"}
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.18 }}
                >
                  {mobileOpen ? <FiX size={19} /> : <FiMenu size={19} />}
                </motion.span>
              </AnimatePresence>
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* ══════════ MOBILE MENU ══════════ */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setMobileOpen(false)}
              className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm"
            />

            {/* Slide-down panel */}
            <motion.div
              key="mobile-panel"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="fixed top-0 left-0 right-0 z-40 pt-20 px-4 pb-6
                bg-[rgba(5,20,36,0.97)] backdrop-blur-2xl
                border-b border-white/[0.08]
                shadow-[0_16px_40px_rgba(0,0,0,0.6)]"
            >
              <nav className="flex flex-col gap-1 mb-6">
                {NAV.map(({ label, to }, i) => (
                  <motion.div
                    key={to}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05 }}
                  >
                    <Link
                      to={to}
                      smooth
                      duration={700}
                      offset={-80}
                      onClick={() => setMobileOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl cursor-pointer transition-all duration-200 font-sans font-medium text-[15px]
                        ${active === to
                          ? "bg-primary/12 text-primary border border-primary/20"
                          : "text-text-muted hover:text-white hover:bg-white/5"
                        }`}
                    >
                      <span className={`w-1.5 h-1.5 rounded-full transition-colors ${active === to ? "bg-primary" : "bg-white/20"}`} />
                      {label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.a
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                href={SOCIAL_LINKS.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl font-sans font-semibold text-sm text-background
                  bg-gradient-to-r from-primary to-[#9394e0]
                  shadow-[0_4px_20px_rgba(192,193,255,0.25)]"
              >
                <FiMessageCircle size={16} />
                KYA Baat Karein? Let's Chat!
              </motion.a>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
