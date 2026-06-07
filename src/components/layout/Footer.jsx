import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Link } from "react-scroll";
import {
  FiGithub, FiLinkedin, FiInstagram, FiMail, FiPhone, FiMapPin, FiClock,
  FiArrowRight, FiHeart,
} from "react-icons/fi";
import { SOCIAL_LINKS, CONTACT_INFO } from "../../utils/constants";

/* ─────────────────────────────────────────────────────────
   DATA
───────────────────────────────────────────────────────── */
const SERVICES_LINKS = [
  "Custom Websites",
  "Landing Pages",
  "Portfolios",
  "AI Chatbots",
  "E-Commerce",
  "SEO",
];

const QUICK_LINKS = [
  { label: "Home",     to: "hero" },
  { label: "About",    to: "about" },
  { label: "Work",     to: "works" },
  { label: "Services", to: "services" },
  { label: "Contact",  to: "contact" },
];

const SOCIAL_ITEMS = [
  {
    icon: FiGithub,
    href: SOCIAL_LINKS.github,
    label: "GitHub",
    hoverColor: "#ffffff",
    hoverGlow: "rgba(255,255,255,0.25)",
  },
  {
    icon: FiLinkedin,
    href: SOCIAL_LINKS.linkedin,
    label: "LinkedIn",
    hoverColor: "#0a66c2",
    hoverGlow: "rgba(10,102,194,0.35)",
  },
  {
    icon: FiInstagram,
    href: SOCIAL_LINKS.instagram,
    label: "Instagram",
    hoverColor: "#e1306c",
    hoverGlow: "rgba(225,48,108,0.35)",
  },
  {
    icon: () => (
      <svg viewBox="0 0 24 24" fill="currentColor" width="16" height="16">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
    href: SOCIAL_LINKS.whatsapp,
    label: "WhatsApp",
    hoverColor: "#25d366",
    hoverGlow: "rgba(37,211,102,0.35)",
  },
];

const CONTACT_ITEMS = [
  { icon: FiPhone,   value: CONTACT_INFO.phone,        href: SOCIAL_LINKS.whatsapp, sub: "Call or WhatsApp" },
  { icon: FiMail,    value: CONTACT_INFO.email,         href: SOCIAL_LINKS.email,    sub: "Email me directly" },
  { icon: FiMapPin,  value: "Noida, India",              href: null,                  sub: "Remote worldwide" },
  { icon: FiClock,   value: "Mon–Sat, 9AM–8PM IST",     href: null,                  sub: "Available now" },
];

/* ─────────────────────────────────────────────────────────
   SOCIAL ICON BUTTON
───────────────────────────────────────────────────────── */
const SocialIcon = ({ icon: Icon, href, label, hoverColor, hoverGlow }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    aria-label={label}
    whileHover={{ scale: 1.15, y: -3 }}
    whileTap={{ scale: 0.92 }}
    className="w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-300"
    style={{
      background: "rgba(255,255,255,0.05)",
      border: "1px solid rgba(255,255,255,0.1)",
      color: "rgba(136,146,164,0.9)",
    }}
    onMouseEnter={e => {
      e.currentTarget.style.color      = hoverColor;
      e.currentTarget.style.background = `${hoverGlow.replace("0.35)", "0.12)")}`;
      e.currentTarget.style.borderColor = hoverColor + "55";
      e.currentTarget.style.boxShadow  = `0 0 16px ${hoverGlow}`;
    }}
    onMouseLeave={e => {
      e.currentTarget.style.color       = "rgba(136,146,164,0.9)";
      e.currentTarget.style.background  = "rgba(255,255,255,0.05)";
      e.currentTarget.style.borderColor = "rgba(255,255,255,0.1)";
      e.currentTarget.style.boxShadow   = "none";
    }}
  >
    <Icon size={16} />
  </motion.a>
);

/* ─────────────────────────────────────────────────────────
   STAGGER VARIANTS
───────────────────────────────────────────────────────── */
const colVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};
const itemVariants = {
  hidden:  { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

/* ─────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────── */
const Footer = () => {
  const ctaRef   = useRef(null);
  const mainRef  = useRef(null);
  const btmRef   = useRef(null);

  const ctaInView  = useInView(ctaRef,  { once: true, margin: "-60px" });
  const mainInView = useInView(mainRef, { once: true, margin: "-40px" });
  const btmInView  = useInView(btmRef,  { once: true, margin: "-20px" });

  const year = new Date().getFullYear();

  return (
    <footer
      aria-label="Site footer"
      style={{ background: "#010f1f", position: "relative", overflow: "hidden" }}
    >
      {/* ── Ambient top glow ── */}
      <div
        aria-hidden
        className="pointer-events-none absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          width: "700px",
          height: "300px",
          background: "radial-gradient(ellipse at 50% 0%, rgba(192,193,255,0.07) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* ══════ CTA STRIP ══════ */}
      <div
        ref={ctaRef}
        className="relative z-10"
        style={{ padding: "5rem 0 4rem", borderBottom: "1px solid rgba(255,255,255,0.05)" }}
      >
        <div className="container-custom text-center">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.5))" }} />
            <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
              Ready to start?
            </span>
            <div className="h-px w-8" style={{ background: "linear-gradient(270deg, transparent, rgba(192,193,255,0.5))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 28 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-tight mb-8"
            style={{ fontSize: "clamp(2rem, 5vw, 3.5rem)" }}
          >
            Let's Build Something{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              Amazing Together
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={ctaInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <motion.a
              href={`https://wa.me/917011875494?text=${encodeURIComponent("Hi Deepak! I'd like to start a project with you.")}`}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-sans font-bold text-sm text-background"
              style={{
                background: "linear-gradient(135deg, #c0c1ff 0%, #9394e0 100%)",
                boxShadow: "0 6px 28px rgba(192,193,255,0.35)",
                transition: "box-shadow 0.3s ease",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 48px rgba(192,193,255,0.6)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 6px 28px rgba(192,193,255,0.35)"}
            >
              Start a Project
              <FiArrowRight size={16} />
            </motion.a>

            <Link
              to="works"
              smooth
              duration={700}
              offset={-80}
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-text-muted hover:text-white transition-colors duration-300 cursor-pointer"
            >
              View Portfolio First →
            </Link>
          </motion.div>
        </div>
      </div>

      {/* ══════ MAIN FOOTER GRID ══════ */}
      <div
        ref={mainRef}
        className="relative z-10 container-custom"
        style={{ padding: "4rem 1.5rem 3rem" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">

          {/* ── Col 1: Brand ── */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            animate={mainInView ? "visible" : "hidden"}
            className="sm:col-span-2 lg:col-span-1"
          >
            <motion.div variants={itemVariants} className="mb-5">
              <Link to="hero" smooth duration={700} className="cursor-pointer inline-flex items-center gap-3 mb-4 group">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center font-display font-black text-background text-sm shrink-0"
                  style={{
                    background: "linear-gradient(135deg, #c0c1ff 0%, #9394e0 100%)",
                    boxShadow: "0 0 20px rgba(192,193,255,0.3)",
                    transition: "box-shadow 0.3s",
                  }}
                >
                  DS
                </div>
                <div>
                  <div className="font-display font-bold text-white text-sm leading-tight tracking-wide group-hover:text-primary transition-colors duration-300">
                    Deepak Web Studio
                  </div>
                  <div className="font-sans text-[9px] text-text-muted tracking-[0.2em] uppercase mt-0.5">
                    Digital Growth Partner
                  </div>
                </div>
              </Link>
              <p className="font-sans text-text-muted text-sm leading-relaxed max-w-xs">
                Turning ideas into powerful digital experiences that grow your business — with clean code, beautiful design, and real results.
              </p>
            </motion.div>

            {/* Social icons */}
            <motion.div variants={itemVariants} className="flex items-center gap-2.5 mt-6">
              {SOCIAL_ITEMS.map((item) => (
                <SocialIcon key={item.label} {...item} />
              ))}
            </motion.div>

            {/* Availability badge */}
            <motion.div
              variants={itemVariants}
              className="inline-flex items-center gap-2 px-3 py-2 rounded-full mt-5"
              style={{
                background: "rgba(16,185,129,0.08)",
                border: "1px solid rgba(16,185,129,0.2)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans text-emerald-400 text-[10px] font-semibold uppercase tracking-widest">
                Open for projects
              </span>
            </motion.div>
          </motion.div>

          {/* ── Col 2: Services ── */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            animate={mainInView ? "visible" : "hidden"}
          >
            <motion.h4 variants={itemVariants} className="font-display font-bold text-white text-sm mb-5 tracking-wide">
              Services
            </motion.h4>
            <ul className="space-y-3">
              {SERVICES_LINKS.map((service) => (
                <motion.li key={service} variants={itemVariants}>
                  <a
                    href={`https://wa.me/917011875494?text=${encodeURIComponent(`Hi Deepak! I'm interested in your ${service} service.`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-sans text-text-muted text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <span
                      className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0"
                    />
                    {service}
                  </a>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* ── Col 3: Quick Links ── */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            animate={mainInView ? "visible" : "hidden"}
          >
            <motion.h4 variants={itemVariants} className="font-display font-bold text-white text-sm mb-5 tracking-wide">
              Quick Links
            </motion.h4>
            <ul className="space-y-3">
              {QUICK_LINKS.map(({ label, to }) => (
                <motion.li key={to} variants={itemVariants}>
                  <Link
                    to={to}
                    smooth
                    duration={700}
                    offset={-80}
                    className="font-sans text-text-muted text-sm hover:text-primary transition-colors duration-300 flex items-center gap-2 group cursor-pointer"
                  >
                    <span className="w-1 h-1 rounded-full bg-primary/40 group-hover:bg-primary transition-colors duration-300 shrink-0" />
                    {label}
                  </Link>
                </motion.li>
              ))}
              <motion.li variants={itemVariants}>
                <a
                  href={SOCIAL_LINKS.whatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-primary text-sm font-semibold hover:text-white transition-colors duration-300 flex items-center gap-2 group"
                >
                  <span className="w-1 h-1 rounded-full bg-primary group-hover:bg-white transition-colors duration-300 shrink-0" />
                  Hire Me ✨
                </a>
              </motion.li>
            </ul>
          </motion.div>

          {/* ── Col 4: Contact ── */}
          <motion.div
            variants={colVariants}
            initial="hidden"
            animate={mainInView ? "visible" : "hidden"}
          >
            <motion.h4 variants={itemVariants} className="font-display font-bold text-white text-sm mb-5 tracking-wide">
              Contact
            </motion.h4>
            <ul className="space-y-4">
              {CONTACT_ITEMS.map(({ icon: Icon, value, href, sub }) => (
                <motion.li key={value} variants={itemVariants}>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="flex items-start gap-3 group"
                    >
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5 transition-all duration-300"
                        style={{
                          background: "rgba(192,193,255,0.08)",
                          border: "1px solid rgba(192,193,255,0.12)",
                        }}
                      >
                        <Icon size={12} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-sans text-text-muted text-xs group-hover:text-white transition-colors duration-300 leading-snug break-all">
                          {value}
                        </div>
                        <div className="font-sans text-[10px] text-text-muted/50 mt-0.5">{sub}</div>
                      </div>
                    </a>
                  ) : (
                    <div className="flex items-start gap-3">
                      <div
                        className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0 mt-0.5"
                        style={{
                          background: "rgba(192,193,255,0.08)",
                          border: "1px solid rgba(192,193,255,0.12)",
                        }}
                      >
                        <Icon size={12} className="text-primary" />
                      </div>
                      <div>
                        <div className="font-sans text-text-muted text-xs leading-snug">{value}</div>
                        <div className="font-sans text-[10px] text-text-muted/50 mt-0.5">{sub}</div>
                      </div>
                    </div>
                  )}
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </div>
      </div>

      {/* ══════ BOTTOM BAR ══════ */}
      <motion.div
        ref={btmRef}
        initial={{ opacity: 0 }}
        animate={btmInView ? { opacity: 1 } : {}}
        transition={{ duration: 0.6 }}
        className="relative z-10 container-custom"
        style={{
          padding: "1.25rem 1.5rem 1.75rem",
          borderTop: "1px solid rgba(255,255,255,0.05)",
        }}
      >
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-sans text-text-muted text-xs text-center sm:text-left">
            © {year} Deepak Web Studio. All Rights Reserved.
          </p>
          <p className="font-sans text-text-muted text-xs flex items-center gap-1.5">
            Crafted with{" "}
            <FiHeart className="text-primary animate-pulse" size={11} aria-hidden />{" "}
            in Noida, India
          </p>
        </div>
      </motion.div>

      {/* Bottom fade-out */}
      <div
        aria-hidden
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.08), transparent)" }}
      />
    </footer>
  );
};

export default Footer;
