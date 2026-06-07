import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FiPhone, FiMail, FiMapPin, FiClock, FiSend, FiCheck, FiMessageCircle,
} from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════
   CONTACT INFO DATA
═══════════════════════════════════════════════════════════ */
const INFO_ITEMS = [
  {
    icon: FiPhone,
    label: "Phone / WhatsApp",
    value: "+91 70118 75494",
    sub: "Call or WhatsApp anytime",
    href: "https://wa.me/917011875494",
    color: "#10b981",
    glowColor: "rgba(16,185,129,",
  },
  {
    icon: FiMail,
    label: "Email",
    value: "deepakwebstudio@gmail.com",
    sub: "Usually replies within 2 hours",
    href: "mailto:deepakwebstudio@gmail.com",
    color: "#c0c1ff",
    glowColor: "rgba(192,193,255,",
  },
  {
    icon: FiMapPin,
    label: "Location",
    value: "New Delhi, Delhi, India",
    sub: "Available for remote projects worldwide",
    href: null,
    color: "#67e8f9",
    glowColor: "rgba(103,232,249,",
  },
  {
    icon: FiClock,
    label: "Availability",
    value: "Mon – Sat, 9AM – 8PM IST",
    sub: "Urgent? WhatsApp me directly",
    href: null,
    color: "#f59e0b",
    glowColor: "rgba(245,158,11,",
  },
];

const SERVICES_OPTIONS = [
  "Custom Website",
  "Landing Page",
  "Portfolio",
  "AI Chatbot",
  "E-Commerce Store",
  "SEO Optimization",
  "Other",
];

const BUDGET_OPTIONS = [
  "Under ₹10,000",
  "₹10,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
];

/* ── Info Card ── */
const InfoCard = ({ item, index, inView }) => {
  const Icon = item.icon;
  const [hovered, setHovered] = useState(false);

  const card = (
    <motion.div
      initial={{ opacity: 0, x: 30 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.1 + index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      className="relative flex items-start gap-4 p-5 rounded-2xl"
      style={{
        background: "linear-gradient(135deg, rgba(13,28,45,0.97) 0%, rgba(5,20,36,0.98) 100%)",
        border: hovered ? `1px solid ${item.glowColor}0.4)` : "1px solid rgba(192,193,255,0.09)",
        boxShadow: hovered ? `0 8px 32px rgba(0,0,0,0.4), 0 0 24px ${item.glowColor}0.1)` : "0 4px 16px rgba(0,0,0,0.25)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
        transition: "all 0.3s cubic-bezier(0.22,1,0.36,1)",
        cursor: item.href ? "pointer" : "default",
      }}
    >
      {/* Icon */}
      <div
        className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
        style={{
          background: `${item.glowColor}0.12)`,
          border: `1px solid ${item.glowColor}0.22)`,
          boxShadow: hovered ? `0 0 16px ${item.glowColor}0.2)` : "none",
          transition: "box-shadow 0.3s",
        }}
      >
        <Icon size={18} style={{ color: item.color }} />
      </div>

      {/* Text */}
      <div className="flex-1 min-w-0">
        <div className="font-sans text-[10px] text-text-muted uppercase tracking-widest mb-0.5">{item.label}</div>
        <div className="font-sans font-semibold text-white text-sm leading-snug break-all mb-1">{item.value}</div>
        <div className="font-sans text-text-muted text-[11px]">{item.sub}</div>
      </div>

      {/* Arrow on hover */}
      {item.href && (
        <motion.div
          animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
          transition={{ duration: 0.2 }}
          style={{ color: item.color }}
          className="text-xs shrink-0 self-center"
        >
          →
        </motion.div>
      )}
    </motion.div>
  );

  return item.href ? (
    <a href={item.href} target={item.href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
      {card}
    </a>
  ) : card;
};

/* ═══════════════════════════════════════════════════════════
   CONTACT SECTION
═══════════════════════════════════════════════════════════ */
const Contact = () => {
  const headingRef = useRef(null);
  const leftRef    = useRef(null);
  const rightRef   = useRef(null);

  const headingInView = useInView(headingRef, { once: true, margin: "-80px" });
  const leftInView    = useInView(leftRef,    { once: true, margin: "-60px" });
  const rightInView   = useInView(rightRef,   { once: true, margin: "-60px" });

  /* ── Form state ── */
  const [form, setForm] = useState({
    name: "", email: "", phone: "", service: "", budget: "", details: "",
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | sent

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim())    errs.name    = "Name is required";
    if (!form.email.trim())   errs.email   = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.phone.trim())   errs.phone   = "Phone number is required";
    if (!form.service)        errs.service = "Please select a service";
    if (!form.budget)         errs.budget  = "Please select a budget range";
    if (!form.details.trim()) errs.details = "Please describe your project";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }

    setStatus("sending");

    const msg =
`Hello Deepak! 👋

*New Project Inquiry*
───────────────────
👤 *Name:* ${form.name}
📧 *Email:* ${form.email}
📱 *Phone:* ${form.phone}
🛠️ *Service:* ${form.service}
💰 *Budget:* ${form.budget}

📋 *Project Details:*
${form.details}
───────────────────
Sent from DeepakWebStudio Portfolio`;

    const encoded = encodeURIComponent(msg);
    const waUrl   = `https://wa.me/917011875494?text=${encoded}`;

    setTimeout(() => {
      setStatus("sent");
      window.open(waUrl, "_blank");
      setTimeout(() => {
        setStatus("idle");
        setForm({ name: "", email: "", phone: "", service: "", budget: "", details: "" });
      }, 4000);
    }, 700);
  };

  /* Shared input style */
  const inputStyle = (field) => ({
    width: "100%",
    background: errors[field] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
    border: errors[field]
      ? "1px solid rgba(239,68,68,0.45)"
      : "1px solid rgba(192,193,255,0.12)",
    borderRadius: "0.875rem",
    padding: "0.875rem 1.1rem",
    color: "white",
    fontSize: "14px",
    fontFamily: "var(--font-sans)",
    outline: "none",
    transition: "all 0.25s ease",
  });

  const selectStyle = (field) => ({
    ...inputStyle(field),
    appearance: "none",
    cursor: "pointer",
    backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%238892a4' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E")`,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "right 1rem center",
    paddingRight: "2.5rem",
    background: errors[field] ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)",
  });

  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      style={{
        padding: "7rem 0 8rem",
        background: "linear-gradient(180deg, #051424 0%, #060d18 55%, #051424 100%)",
      }}
    >
      {/* ── Background decoration ── */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute -bottom-40 -left-40 w-[600px] h-[600px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(192,193,255,0.05) 0%, transparent 70%)", filter: "blur(100px)" }}
        />
        <div
          className="absolute -top-20 -right-20 w-[400px] h-[400px] rounded-full"
          style={{ background: "radial-gradient(circle, rgba(103,232,249,0.04) 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px"
          style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.18), transparent)" }}
        />
        {/* Grid */}
        <div
          className="absolute inset-0 opacity-[0.016]"
          style={{
            backgroundImage: "linear-gradient(rgba(192,193,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,193,255,1) 1px, transparent 1px)",
            backgroundSize: "70px 70px",
          }}
        />
      </div>

      <div className="container-custom relative z-10">

        {/* ── Heading ── */}
        <div ref={headingRef} className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-3 mb-5"
          >
            <div className="h-px w-8" style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.6))" }} />
            <span className="font-sans text-primary text-[11px] font-bold uppercase tracking-[0.3em]">
              Let's Work Together
            </span>
            <div className="h-px w-8" style={{ background: "linear-gradient(270deg, transparent, rgba(192,193,255,0.6))" }} />
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 24 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
            className="font-display font-black text-white leading-tight mb-4"
            style={{ fontSize: "clamp(1.9rem, 4vw, 3rem)" }}
          >
            Ready to{" "}
            <span style={{
              background: "linear-gradient(135deg, #c0c1ff 0%, #67e8f9 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}>
              Grow Your Business
            </span>{" "}
            Online?
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={headingInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-sans text-text-muted text-base md:text-lg leading-relaxed max-w-2xl mx-auto"
          >
            Tell me about your project and I'll get back to you within{" "}
            <span className="text-white font-medium">2 hours</span>. Let's build something that actually grows your business.
          </motion.p>
        </div>

        {/* ── Split Layout ── */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-10 lg:gap-14 items-start">

          {/* ════ LEFT — Contact Form ════ */}
          <motion.div
            ref={leftRef}
            initial={{ opacity: 0, x: -40 }}
            animate={leftInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="lg:col-span-3"
          >
            <div
              className="relative rounded-[1.5rem] overflow-hidden p-8 md:p-10"
              style={{
                background: "linear-gradient(160deg, rgba(13,28,45,0.98) 0%, rgba(5,20,36,0.99) 100%)",
                border: "1px solid rgba(192,193,255,0.10)",
                boxShadow: "0 8px 40px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.05)",
              }}
            >
              {/* Top shimmer */}
              <div
                className="absolute top-0 left-0 right-0 h-px"
                style={{ background: "linear-gradient(90deg, transparent, rgba(192,193,255,0.4), transparent)" }}
              />
              {/* Subtle inner glow */}
              <div
                className="absolute top-0 left-0 right-0 h-40 pointer-events-none"
                style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(192,193,255,0.05) 0%, transparent 70%)" }}
              />

              <h3 className="font-display font-bold text-white text-xl mb-8 relative">
                Send Me a Message
              </h3>

              <form onSubmit={handleSubmit} noValidate className="relative space-y-5">

                {/* Row 1: Name + Email */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Rajesh Kumar"
                      className="form-input"
                      style={inputStyle("name")}
                      onFocus={e => {
                        e.target.style.borderColor = "rgba(192,193,255,0.45)";
                        e.target.style.background  = "rgba(192,193,255,0.06)";
                        e.target.style.boxShadow   = "0 0 0 3px rgba(192,193,255,0.08)";
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = errors.name ? "rgba(239,68,68,0.45)" : "rgba(192,193,255,0.12)";
                        e.target.style.background  = errors.name ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)";
                        e.target.style.boxShadow   = "none";
                      }}
                    />
                    {errors.name && <p className="font-sans text-red-400 text-[11px] mt-1.5">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="form-input"
                      style={inputStyle("email")}
                      onFocus={e => {
                        e.target.style.borderColor = "rgba(192,193,255,0.45)";
                        e.target.style.background  = "rgba(192,193,255,0.06)";
                        e.target.style.boxShadow   = "0 0 0 3px rgba(192,193,255,0.08)";
                      }}
                      onBlur={e => {
                        e.target.style.borderColor = errors.email ? "rgba(239,68,68,0.45)" : "rgba(192,193,255,0.12)";
                        e.target.style.background  = errors.email ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)";
                        e.target.style.boxShadow   = "none";
                      }}
                    />
                    {errors.email && <p className="font-sans text-red-400 text-[11px] mt-1.5">{errors.email}</p>}
                  </div>
                </div>

                {/* Row 2: Phone */}
                <div>
                  <label className="block font-sans text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+91 98765 43210"
                    className="form-input"
                    style={inputStyle("phone")}
                    onFocus={e => {
                      e.target.style.borderColor = "rgba(192,193,255,0.45)";
                      e.target.style.background  = "rgba(192,193,255,0.06)";
                      e.target.style.boxShadow   = "0 0 0 3px rgba(192,193,255,0.08)";
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = errors.phone ? "rgba(239,68,68,0.45)" : "rgba(192,193,255,0.12)";
                      e.target.style.background  = errors.phone ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)";
                      e.target.style.boxShadow   = "none";
                    }}
                  />
                  {errors.phone && <p className="font-sans text-red-400 text-[11px] mt-1.5">{errors.phone}</p>}
                </div>

                {/* Row 3: Service + Budget */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block font-sans text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                      Service Needed *
                    </label>
                    <select
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      style={selectStyle("service")}
                    >
                      <option value="" style={{ background: "#0d1c2d", color: "#8892a4" }}>Select a service…</option>
                      {SERVICES_OPTIONS.map(s => (
                        <option key={s} value={s} style={{ background: "#0d1c2d", color: "white" }}>{s}</option>
                      ))}
                    </select>
                    {errors.service && <p className="font-sans text-red-400 text-[11px] mt-1.5">{errors.service}</p>}
                  </div>
                  <div>
                    <label className="block font-sans text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                      Budget Range *
                    </label>
                    <select
                      name="budget"
                      value={form.budget}
                      onChange={handleChange}
                      style={selectStyle("budget")}
                    >
                      <option value="" style={{ background: "#0d1c2d", color: "#8892a4" }}>Select budget…</option>
                      {BUDGET_OPTIONS.map(b => (
                        <option key={b} value={b} style={{ background: "#0d1c2d", color: "white" }}>{b}</option>
                      ))}
                    </select>
                    {errors.budget && <p className="font-sans text-red-400 text-[11px] mt-1.5">{errors.budget}</p>}
                  </div>
                </div>

                {/* Row 4: Details */}
                <div>
                  <label className="block font-sans text-[10px] font-bold text-text-muted uppercase tracking-widest mb-2">
                    Project Details *
                  </label>
                  <textarea
                    name="details"
                    value={form.details}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Tell me about your project — goals, features you need, timeline, and anything else that's important to you…"
                    style={{
                      ...inputStyle("details"),
                      resize: "none",
                      lineHeight: "1.7",
                    }}
                    onFocus={e => {
                      e.target.style.borderColor = "rgba(192,193,255,0.45)";
                      e.target.style.background  = "rgba(192,193,255,0.06)";
                      e.target.style.boxShadow   = "0 0 0 3px rgba(192,193,255,0.08)";
                    }}
                    onBlur={e => {
                      e.target.style.borderColor = errors.details ? "rgba(239,68,68,0.45)" : "rgba(192,193,255,0.12)";
                      e.target.style.background  = errors.details ? "rgba(239,68,68,0.06)" : "rgba(255,255,255,0.04)";
                      e.target.style.boxShadow   = "none";
                    }}
                  />
                  {errors.details && <p className="font-sans text-red-400 text-[11px] mt-1.5">{errors.details}</p>}
                </div>

                {/* Submit */}
                <motion.button
                  type="submit"
                  disabled={status !== "idle"}
                  whileHover={status === "idle" ? { scale: 1.02, y: -2 } : {}}
                  whileTap={status === "idle" ? { scale: 0.98 } : {}}
                  className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl font-sans font-bold text-sm"
                  style={{
                    background: status === "sent"
                      ? "linear-gradient(135deg, #10b981 0%, #059669 100%)"
                      : "linear-gradient(135deg, #c0c1ff 0%, #9394e0 100%)",
                    color: "#051424",
                    boxShadow: status === "sent"
                      ? "0 6px 28px rgba(16,185,129,0.4)"
                      : "0 6px 28px rgba(192,193,255,0.35)",
                    opacity: status === "sending" ? 0.85 : 1,
                    cursor: status !== "idle" ? "not-allowed" : "pointer",
                    transition: "all 0.3s ease",
                  }}
                >
                  {status === "sending" && (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
                        className="w-4 h-4 rounded-full border-2"
                        style={{ borderColor: "rgba(5,20,36,0.3)", borderTopColor: "#051424" }}
                      />
                      Opening WhatsApp…
                    </>
                  )}
                  {status === "sent" && (
                    <>
                      <FiCheck size={18} />
                      WhatsApp Opened! Check your browser.
                    </>
                  )}
                  {status === "idle" && (
                    <>
                      <FiSend size={16} />
                      Send Message on WhatsApp 💬
                    </>
                  )}
                </motion.button>

                <p className="font-sans text-text-muted text-[11px] text-center">
                  Your message will open in WhatsApp with all details pre-filled. No spam, ever. 🔒
                </p>
              </form>
            </div>
          </motion.div>

          {/* ════ RIGHT — Info Cards + WhatsApp ════ */}
          <div ref={rightRef} className="lg:col-span-2 flex flex-col gap-4">
            {INFO_ITEMS.map((item, i) => (
              <InfoCard key={item.label} item={item} index={i} inView={rightInView} />
            ))}

            {/* Big WhatsApp CTA */}
            <motion.a
              href="https://wa.me/917011875494?text=Hi%20Deepak!%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={rightInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.55 }}
              whileHover={{ scale: 1.03, y: -3 }}
              whileTap={{ scale: 0.97 }}
              className="relative flex items-center justify-center gap-3 py-5 rounded-2xl font-sans font-bold text-base text-white overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #075e54 0%, #128c7e 50%, #25d366 100%)",
                boxShadow: "0 8px 32px rgba(37,211,102,0.35)",
                transition: "box-shadow 0.3s",
              }}
              onMouseEnter={e => e.currentTarget.style.boxShadow = "0 12px 48px rgba(37,211,102,0.55)"}
              onMouseLeave={e => e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.35)"}
            >
              {/* Shimmer overlay */}
              <div
                className="absolute inset-0 opacity-20"
                style={{
                  background: "linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.15) 50%, transparent 70%)",
                  backgroundSize: "200% 200%",
                  animation: "shimmer 3s linear infinite",
                }}
              />
              {/* WhatsApp icon */}
              <svg viewBox="0 0 24 24" fill="white" width="24" height="24" className="relative z-10 shrink-0">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              <span className="relative z-10">Chat on WhatsApp</span>
              <span className="relative z-10 text-xl">💬</span>
            </motion.a>

            {/* Response promise */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={rightInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.7 }}
              className="flex items-center justify-center gap-2 py-3 px-5 rounded-xl"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-sans text-text-muted text-xs">
                Typically responds in{" "}
                <span className="text-white font-semibold">under 2 hours</span>
              </span>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
