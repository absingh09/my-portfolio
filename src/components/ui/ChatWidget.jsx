import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiX, FiSend } from "react-icons/fi";

/* ═══════════════════════════════════════════════════════════
   CONSTANTS
═══════════════════════════════════════════════════════════ */
const WA_NUMBER = "917011875494";
const WA_MSG    = encodeURIComponent("Hi Deepak! I came from your portfolio and would like to discuss a project. 🙌");
const WA_URL    = `https://wa.me/${WA_NUMBER}?text=${WA_MSG}`;

const BOT_NAME = "Deepak's Assistant";

/* ═══════════════════════════════════════════════════════════
   QUICK REPLY SETS
═══════════════════════════════════════════════════════════ */
const QR_WELCOME = [
  { id: "pricing",   label: "💰 Pricing & Packages" },
  { id: "services",  label: "🛠️ What do you offer?" },
  { id: "timeline",  label: "⏱️ How long does it take?" },
  { id: "contact",   label: "📞 Talk to Deepak directly" },
];
const QR_AFTER_PRICING = [
  { id: "services", label: "🛠️ See all services" },
  { id: "timeline", label: "⏱️ What's the timeline?" },
  { id: "contact",  label: "📞 Get a custom quote" },
];
const QR_AFTER_SERVICES = [
  { id: "pricing",  label: "💰 View pricing" },
  { id: "timeline", label: "⏱️ Timeline for my project?" },
  { id: "contact",  label: "📞 Discuss my project" },
];
const QR_AFTER_TIMELINE = [
  { id: "pricing",  label: "💰 What's the cost?" },
  { id: "services", label: "🛠️ Explore services" },
  { id: "contact",  label: "📞 Start my project" },
];
const QR_AFTER_CONTACT = [
  { id: "pricing",  label: "💰 Check pricing first" },
  { id: "services", label: "🛠️ Browse services" },
];
const QR_MAIN = [
  { id: "pricing",  label: "💰 Pricing" },
  { id: "services", label: "🛠️ Services" },
  { id: "contact",  label: "📞 Contact Deepak" },
];

/* ═══════════════════════════════════════════════════════════
   REPLY ENGINE — handles all intents
═══════════════════════════════════════════════════════════ */
const GREETINGS = ["hi", "hello", "hey", "hii", "helo", "hii there", "hai", "howdy", "yo", "sup", "wassup", "what's up", "whats up", "namaste", "namaskar", "jai shree ram", "radha radha", "ram ram", "jai ram ji ki", "jai mata di", "jai shri krishna", "hare krishna", "hare ram", "good morning", "good afternoon", "good evening", "good night", "gm", "gn", "morning", "evening"];

const WHO_ARE_YOU = ["who are you", "who r u", "who ru", "what are you", "what r u", "tell me about yourself", "introduce yourself", "aap kaun ho", "tum kaun ho", "kya ho tum", "what is this", "what is this bot", "are you a bot", "are you ai", "are you human", "are you real", "are you robot"];

const HOW_ARE_YOU = ["how are you", "how r u", "how ru", "how are u", "kaise ho", "kaisa hai", "kya haal hai", "kya hal hai", "sab theek", "sab thik", "you good", "all good", "you okay", "hows it going", "how's it going", "what's going on", "feeling good"];

const THANKS = ["thanks", "thank you", "thank u", "thanku", "thx", "ty", "shukriya", "dhanyawad", "bahut shukriya", "bohot shukriya", "great", "awesome", "amazing", "nice", "cool", "wow", "perfect", "wonderful", "excellent", "brilliant", "superb", "best", "good", "okay", "ok", "👍", "😊"];

const BYE = ["bye", "goodbye", "see ya", "see you", "later", "take care", "alvida", "phir milenge", "ok bye", "ciao", "tata", "ttyl"];

const YES_NO = ["yes", "no", "yeah", "nope", "yep", "nah", "sure", "ok", "okay", "haan", "nahi", "ha", "na", "hm", "hmm"];

const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];

const getBotReply = (input, intentOverride) => {
  const lower = (input || "").toLowerCase().trim();

  // ── Intent override (quick reply buttons) ──
  if (intentOverride) {
    switch (intentOverride) {
      case "pricing":
        return {
          text: "Here's a quick overview of Deepak's pricing:\n\n💎 Basic Website — ₹5,000–₹8,000\n🚀 Business Site — ₹10,000–₹20,000\n🛒 E-Commerce Store — ₹25,000–₹50,000+\n⚡ SEO Audit — ₹3,000\n🤖 AI Chatbot — ₹5,000+\n\nAll packages include free revisions & mobile-responsive design. Want a custom quote?",
          quickReplies: QR_AFTER_PRICING,
          showWa: false,
        };
      case "services":
        return {
          text: "Deepak specialises in:\n\n🌐 Business Websites\n🚀 Landing Pages\n💼 Portfolio Sites\n🤖 AI-Powered Chatbots\n🛒 E-Commerce Stores\n📈 SEO Optimisation\n📋 Google Forms / Booking Systems\n\nEverything is built with modern tools for speed & quality. Which one sounds right for you?",
          quickReplies: QR_AFTER_SERVICES,
          showWa: false,
        };
      case "timeline":
        return {
          text: "Typical delivery timelines:\n\n📄 Landing page — 3–5 days\n🌐 Business website — 7–14 days\n🛒 E-Commerce store — 10–21 days\n🤖 Chatbot integration — 2–5 days\n\nDeepak always delivers on time or earlier! ⚡ Rush projects can be discussed.",
          quickReplies: QR_AFTER_TIMELINE,
          showWa: false,
        };
      case "contact":
        return {
          text: "You can reach Deepak directly:\n\n📱 WhatsApp: +91 70118 75494\n📧 deepakwebstudio@gmail.com\n🌐 deepak-web-studio.lovable.app\n\nHe replies within 2 hours! Click below to open WhatsApp 👇",
          quickReplies: QR_AFTER_CONTACT,
          showWa: true,
        };
      default:
        break;
    }
  }

  // ── Greeting detection ──
  if (GREETINGS.some(g => lower === g || lower.startsWith(g + " ") || lower.endsWith(" " + g))) {
    const greetReplies = [
      "Hey there! 👋 Great to see you! I'm Deepak's virtual assistant. How can I help you today?",
      "Hello! 😊 Welcome to Deepak Web Studio! What can I do for you?",
      "Hi hi hi! 👋 Namaste! I'm here to help you with anything about Deepak's services. What would you like to know?",
      "Heyy! 🙌 Welcome! Ask me anything about websites, pricing, or how Deepak can help your business grow!",
    ];
    return { text: getRandom(greetReplies), quickReplies: QR_WELCOME, showWa: false };
  }

  // ── Who are you ──
  if (WHO_ARE_YOU.some(p => lower.includes(p))) {
    return {
      text: "I'm Deepak's AI-powered virtual assistant! 🤖✨\n\nI'm here to help you learn about:\n💼 Deepak's web development services\n💰 Pricing & packages\n⏱️ Project timelines\n📞 How to get in touch\n\nDeepak Singh is a professional web developer based in India who builds stunning websites using modern AI-powered tools. What would you like to know?",
      quickReplies: QR_WELCOME,
      showWa: false,
    };
  }

  // ── How are you ──
  if (HOW_ARE_YOU.some(p => lower.includes(p))) {
    const howReplies = [
      "I'm doing great, thanks for asking! 😊 Always energised and ready to help. How about you? What brings you here today?",
      "Ekdum first class! 🚀 All systems go! More importantly — how can I help YOU today?",
      "Fantastic! 🌟 Running at 100% to help you! What can I do for you?",
    ];
    return { text: getRandom(howReplies), quickReplies: QR_MAIN, showWa: false };
  }

  // ── Thanks / positive vibes ──
  if (THANKS.some(p => lower === p || lower.includes(p))) {
    const thankReplies = [
      "You're very welcome! 😊 Is there anything else I can help you with?",
      "Happy to help! 🙌 Feel free to ask anything else!",
      "Anytime! ✨ Deepak's team is always here for you. Anything else?",
    ];
    return { text: getRandom(thankReplies), quickReplies: QR_MAIN, showWa: false };
  }

  // ── Bye ──
  if (BYE.some(p => lower === p || lower.startsWith(p))) {
    return {
      text: "Goodbye! 👋 It was great chatting with you! If you ever need a website or have questions, Deepak is just a WhatsApp message away. Have a wonderful day! 🌟",
      quickReplies: [],
      showWa: true,
    };
  }

  // ── Yes / No ambiguous ──
  if (YES_NO.includes(lower)) {
    return {
      text: "Got it! 😊 Here's what I can help you with — just pick one:",
      quickReplies: QR_MAIN,
      showWa: false,
    };
  }

  // ── Keyword matching for free text ──
  if (/pric|cost|₹|rupee|fee|rate|package|budget|cheap|afford|how much/i.test(lower)) {
    return getBotReply("", "pricing");
  }
  if (/service|offer|what (do|can) you|build|make|creat|develop|design|website|app|chatbot|ecommerce|seo|landing|portfolio/i.test(lower)) {
    return getBotReply("", "services");
  }
  if (/time|long|day|week|deliver|when|fast|quick|rush|urgent/i.test(lower)) {
    return getBotReply("", "timeline");
  }
  if (/contact|whatsapp|call|phone|email|reach|talk|meet|number|mobile/i.test(lower)) {
    return getBotReply("", "contact");
  }
  if (/deepak|who is deepak|about deepak|about him/i.test(lower)) {
    return {
      text: "Deepak Singh is a professional web developer & digital solutions expert based in India. 💼\n\nHe builds beautiful, fast websites using cutting-edge AI-powered tools like Lovable, Cursor, and Replit. With a growing portfolio of 10+ projects across fitness, healthcare, food, beauty, and more — he delivers premium quality at affordable prices.\n\n🌐 Portfolio: deepak-web-studio.lovable.app\n📁 GitHub: github.com/code-by-deepak",
      quickReplies: QR_WELCOME,
      showWa: false,
    };
  }
  if (/portfolio|work|project|previous|example|sample/i.test(lower)) {
    return {
      text: "Deepak has built websites across multiple industries:\n\n💪 IronPeak Fitness & Hunter Gym\n🍽️ Saffron & Smoke (Restaurant)\n💅 Velvet Bloom Studio (Beauty)\n🏥 MediCare Plus (Healthcare)\n🦷 Dental Clinic Booking System\n\nCheck out the full portfolio at:\n🌐 deepak-web-studio.lovable.app",
      quickReplies: QR_AFTER_SERVICES,
      showWa: false,
    };
  }
  if (/guarantee|refund|revision|change|edit|support|after|maintain/i.test(lower)) {
    return {
      text: "Great question! Deepak offers:\n\n✅ Free revisions until you're 100% happy\n🛡️ 30-day post-launch support\n📱 Mobile-responsive design (always)\n⚡ Fast loading & SEO-ready\n🔒 Secure & modern tech stack\n\nYour satisfaction is guaranteed! 🤝",
      quickReplies: QR_MAIN,
      showWa: false,
    };
  }
  if (/location|city|where|india|patna|delhi|mumbai|remote|online/i.test(lower)) {
    return {
      text: "Deepak works 100% remotely and serves clients across India and globally! 🌍\n\nNo matter where you are — he can build your dream website via WhatsApp + video calls. Easy, smooth, and professional.",
      quickReplies: QR_MAIN,
      showWa: false,
    };
  }

  // ── Fallback ──
  return {
    text: "That's a great question! 🤔 For the most accurate answer, I'd recommend reaching out to Deepak directly — he replies within 2 hours on WhatsApp! 💬\n\nOr pick one of the options below and I'll help right away:",
    quickReplies: QR_MAIN,
    showWa: true,
  };
};

/* ═══════════════════════════════════════════════════════════
   HELPERS
═══════════════════════════════════════════════════════════ */
const getTime = () =>
  new Date().toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit", hour12: true });

/* ═══════════════════════════════════════════════════════════
   SVG ROBOT ICON
═══════════════════════════════════════════════════════════ */
const RobotIcon = ({ size = 24, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} aria-hidden>
    <rect x="10" y="18" width="44" height="34" rx="8" fill="currentColor" opacity="0.9" />
    <rect x="30" y="6" width="4" height="12" rx="2" fill="currentColor" opacity="0.7" />
    <circle cx="32" cy="5" r="4" fill="currentColor" />
    <rect x="18" y="28" width="10" height="8" rx="3" fill="#051424" />
    <rect x="36" y="28" width="10" height="8" rx="3" fill="#051424" />
    <rect x="20" y="30" width="6" height="4" rx="2" fill="#67e8f9" opacity="0.9" />
    <rect x="38" y="30" width="6" height="4" rx="2" fill="#67e8f9" opacity="0.9" />
    <rect x="20" y="42" width="24" height="4" rx="2" fill="#051424" opacity="0.7" />
    <rect x="22" y="43" width="4" height="2" rx="1" fill="#c0c1ff" opacity="0.6" />
    <rect x="28" y="43" width="4" height="2" rx="1" fill="#c0c1ff" opacity="0.6" />
    <rect x="34" y="43" width="4" height="2" rx="1" fill="#c0c1ff" opacity="0.6" />
    <rect x="4" y="26" width="6" height="10" rx="3" fill="currentColor" opacity="0.7" />
    <rect x="54" y="26" width="6" height="10" rx="3" fill="currentColor" opacity="0.7" />
  </svg>
);

/* WhatsApp SVG */
const WaIcon = () => (
  <svg viewBox="0 0 24 24" fill="white" width="14" height="14">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

/* ═══════════════════════════════════════════════════════════
   TYPING INDICATOR
═══════════════════════════════════════════════════════════ */
const TypingIndicator = () => (
  <div className="flex items-end gap-2">
    <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-primary"
      style={{ background: "linear-gradient(135deg,rgba(192,193,255,.15),rgba(103,232,249,.1))", border: "1px solid rgba(192,193,255,.2)" }}>
      <RobotIcon size={14} />
    </div>
    <div className="flex items-center gap-1.5 px-4 py-3 rounded-2xl rounded-bl-sm"
      style={{ background: "linear-gradient(135deg,rgba(13,28,45,.98),rgba(17,34,51,.96))", border: "1px solid rgba(192,193,255,.1)" }}>
      {[0, 0.2, 0.4].map((delay, i) => (
        <motion.div key={i} className="w-2 h-2 rounded-full bg-primary/70"
          animate={{ y: [0, -5, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 0.8, repeat: Infinity, delay, ease: "easeInOut" }} />
      ))}
    </div>
  </div>
);

/* ═══════════════════════════════════════════════════════════
   MESSAGE BUBBLE
═══════════════════════════════════════════════════════════ */
const MessageBubble = ({ msg }) => {
  const isBot = msg.from === "bot";
  return (
    <motion.div
      initial={{ opacity: 0, y: 14, scale: 0.97 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={`flex items-end gap-2 ${isBot ? "flex-row" : "flex-row-reverse"}`}
    >
      {/* Bot avatar */}
      {isBot && (
        <div className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 text-primary"
          style={{ background: "linear-gradient(135deg,rgba(192,193,255,.15),rgba(103,232,249,.1))", border: "1px solid rgba(192,193,255,.2)" }}>
          <RobotIcon size={14} />
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[80%] ${isBot ? "items-start" : "items-end"}`}>
        {/* Bubble */}
        <div className="px-4 py-2.5 text-sm leading-relaxed"
          style={{
            borderRadius: isBot ? "1rem 1rem 1rem .25rem" : "1rem 1rem .25rem 1rem",
            background: isBot
              ? "linear-gradient(135deg,rgba(13,28,45,.98),rgba(17,34,51,.96))"
              : "linear-gradient(135deg,#c0c1ff,#9394e0)",
            color: isBot ? "rgba(255,255,255,.88)" : "#051424",
            border: isBot ? "1px solid rgba(192,193,255,.1)" : "none",
            boxShadow: isBot ? "0 2px 12px rgba(0,0,0,.3)" : "0 4px 16px rgba(192,193,255,.25)",
            whiteSpace: "pre-line",
            fontFamily: "inherit",
          }}>
          {msg.text}
        </div>

        {/* WhatsApp CTA */}
        {isBot && msg.showWa && (
          <motion.a
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25 }}
            href={WA_URL} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-3 py-2 rounded-xl font-bold text-xs text-white mt-1"
            style={{ background: "linear-gradient(135deg,#075e54,#25d366)", boxShadow: "0 4px 14px rgba(37,211,102,.35)" }}>
            <WaIcon /> Open WhatsApp
          </motion.a>
        )}

        {/* Time */}
        <span style={{ fontSize: "9px", color: "rgba(136,146,164,.6)", paddingLeft: "4px" }}>{msg.time}</span>
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   QUICK REPLIES
═══════════════════════════════════════════════════════════ */
const QuickReplies = ({ replies, onSelect, disabled }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.35, delay: 0.1 }}
    className="flex flex-wrap gap-2 px-3 pb-1"
  >
    {replies.map(r => (
      <motion.button key={r.id}
        onClick={() => !disabled && onSelect(r)}
        whileHover={disabled ? {} : { scale: 1.04, y: -1 }}
        whileTap={disabled ? {} : { scale: 0.97 }}
        disabled={disabled}
        className="px-3 py-2 rounded-xl font-semibold text-[11px] leading-snug transition-all duration-200 text-left"
        style={{
          background: "linear-gradient(135deg,rgba(192,193,255,.1),rgba(103,232,249,.05))",
          border: "1px solid rgba(192,193,255,.2)",
          color: disabled ? "rgba(136,146,164,.4)" : "#c0c1ff",
          cursor: disabled ? "not-allowed" : "pointer",
          boxShadow: disabled ? "none" : "0 2px 8px rgba(192,193,255,.08)",
        }}>
        {r.label}
      </motion.button>
    ))}
  </motion.div>
);

/* ═══════════════════════════════════════════════════════════
   CHAT WINDOW
═══════════════════════════════════════════════════════════ */
const ChatWindow = ({ onClose }) => {
  const [messages,        setMessages]        = useState([]);
  const [quickReplies,    setQuickReplies]    = useState([]);
  const [inputVal,        setInputVal]        = useState("");
  const [isTyping,        setIsTyping]        = useState(false);
  const [repliesDisabled, setRepliesDisabled] = useState(false);
  const bottomRef = useRef(null);
  const inputRef  = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  /* Welcome on mount */
  useEffect(() => {
    const t1 = setTimeout(() => setIsTyping(true), 500);
    const t2 = setTimeout(() => {
      setIsTyping(false);
      setMessages([{
        id: Date.now(), from: "bot", time: getTime(), showWa: false,
        text: "Hey there! 👋 I'm Deepak's virtual assistant.\n\nI can help you with pricing, services, timelines, and getting in touch. What would you like to know? 😊",
      }]);
      setQuickReplies(QR_WELCOME);
    }, 1800);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  const pushBotReply = useCallback((text, intentId) => {
    setRepliesDisabled(true);
    setQuickReplies([]);
    setIsTyping(true);
    const delay = 700 + Math.random() * 600;
    setTimeout(() => {
      setIsTyping(false);
      const reply = getBotReply(text, intentId);
      setMessages(prev => [...prev, { id: Date.now(), from: "bot", text: reply.text, time: getTime(), showWa: reply.showWa }]);
      setQuickReplies(reply.quickReplies || []);
      setRepliesDisabled(false);
    }, delay);
  }, []);

  /* Quick reply button click */
  const handleQuickReply = useCallback((reply) => {
    if (repliesDisabled) return;
    setMessages(prev => [...prev, { id: Date.now(), from: "user", text: reply.label, time: getTime() }]);
    pushBotReply("", reply.id);
  }, [repliesDisabled, pushBotReply]);

  /* Free text send */
  const handleSend = useCallback(() => {
    const text = inputVal.trim();
    if (!text) return;
    setInputVal("");
    setMessages(prev => [...prev, { id: Date.now(), from: "user", text, time: getTime() }]);
    pushBotReply(text, null);
  }, [inputVal, pushBotReply]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <motion.div
      key="chat-window"
      initial={{ opacity: 0, scale: 0.88, y: 24 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.88, y: 24 }}
      transition={{ type: "spring", stiffness: 340, damping: 28 }}
      className="fixed z-50 flex flex-col overflow-hidden"
      style={{
        bottom: "calc(5rem + 1.25rem)",
        left: "1.5rem",
        width: "min(370px, calc(100vw - 2rem))",
        height: "min(500px, calc(100vh - 8rem))",
        background: "linear-gradient(160deg,rgba(7,16,28,.98),rgba(5,13,22,.99))",
        backdropFilter: "blur(24px)",
        WebkitBackdropFilter: "blur(24px)",
        border: "1px solid rgba(192,193,255,.12)",
        borderRadius: "1.5rem",
        boxShadow: "0 24px 80px rgba(0,0,0,.7),0 0 0 1px rgba(192,193,255,.06),0 0 60px rgba(192,193,255,.06)",
      }}
    >
      {/* Top glow line */}
      <div className="absolute top-0 left-4 right-4 h-px pointer-events-none"
        style={{ background: "linear-gradient(90deg,transparent,rgba(192,193,255,.5),transparent)" }} />

      {/* ── HEADER ── */}
      <div className="flex items-center gap-3 px-4 py-3.5 shrink-0"
        style={{ background: "linear-gradient(135deg,rgba(192,193,255,.08),rgba(103,232,249,.04))", borderBottom: "1px solid rgba(192,193,255,.09)" }}>
        <div className="w-10 h-10 rounded-xl flex items-center justify-center text-primary shrink-0"
          style={{ background: "linear-gradient(135deg,rgba(192,193,255,.2),rgba(103,232,249,.12))", border: "1px solid rgba(192,193,255,.25)", boxShadow: "0 0 16px rgba(192,193,255,.15)" }}>
          <RobotIcon size={22} />
        </div>
        <div className="flex-1 min-w-0">
          <div style={{ fontWeight: 700, color: "white", fontSize: "14px", lineHeight: 1.2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
            {BOT_NAME}
          </div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"
              style={{ boxShadow: "0 0 6px rgba(52,211,153,.8)", display: "inline-block" }} />
            <span style={{ fontSize: "10px", color: "#34d399", fontWeight: 500 }}>Online</span>
            <span style={{ fontSize: "10px", color: "rgba(136,146,164,.7)" }}>· Replies instantly</span>
          </div>
        </div>
        <motion.button onClick={onClose}
          whileHover={{ scale: 1.1, rotate: 90 }} whileTap={{ scale: 0.9 }}
          className="w-8 h-8 rounded-xl flex items-center justify-center transition-colors"
          style={{ background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.08)", color: "rgba(136,146,164,.8)" }}
          aria-label="Close chat">
          <FiX size={15} />
        </motion.button>
      </div>

      {/* ── MESSAGES ── */}
      <div className="flex-1 overflow-y-auto px-3 py-4 space-y-3"
        style={{ scrollbarWidth: "thin", scrollbarColor: "rgba(192,193,255,.2) transparent" }}>
        <AnimatePresence initial={false}>
          {messages.map(msg => <MessageBubble key={msg.id} msg={msg} />)}
        </AnimatePresence>
        <AnimatePresence>
          {isTyping && (
            <motion.div key="typing"
              initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 8 }} transition={{ duration: 0.25 }}>
              <TypingIndicator />
            </motion.div>
          )}
        </AnimatePresence>
        <div ref={bottomRef} />
      </div>

      {/* ── QUICK REPLIES ── */}
      <AnimatePresence>
        {quickReplies.length > 0 && (
          <motion.div key="qr"
            initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.3 }}
            style={{ borderTop: "1px solid rgba(192,193,255,.07)", paddingTop: "10px" }}>
            <QuickReplies replies={quickReplies} onSelect={handleQuickReply} disabled={repliesDisabled} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── INPUT ── */}
      <div className="flex items-center gap-2 px-3 py-3 shrink-0"
        style={{ borderTop: "1px solid rgba(192,193,255,.08)" }}>
        <div className="flex-1 flex items-center rounded-xl px-3 py-2.5"
          style={{ background: "rgba(255,255,255,.05)", border: "1px solid rgba(192,193,255,.12)" }}>
          <input ref={inputRef} type="text" value={inputVal}
            onChange={e => setInputVal(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message…"
            className="flex-1 bg-transparent text-white text-sm outline-none"
            style={{ minWidth: 0, color: "rgba(255,255,255,.9)", fontFamily: "inherit" }}
          />
        </div>
        <motion.button onClick={handleSend}
          whileHover={inputVal.trim() ? { scale: 1.1 } : {}}
          whileTap={inputVal.trim() ? { scale: 0.92 } : {}}
          disabled={!inputVal.trim()}
          className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
          style={{
            background: inputVal.trim() ? "linear-gradient(135deg,#c0c1ff,#9394e0)" : "rgba(255,255,255,.06)",
            border: inputVal.trim() ? "none" : "1px solid rgba(192,193,255,.1)",
            color: inputVal.trim() ? "#051424" : "rgba(136,146,164,.5)",
            boxShadow: inputVal.trim() ? "0 4px 14px rgba(192,193,255,.3)" : "none",
          }}
          aria-label="Send">
          <FiSend size={15} />
        </motion.button>
      </div>

      {/* Powered by */}
      <div style={{ textAlign: "center", fontSize: "9px", color: "rgba(136,146,164,.35)", paddingBottom: "10px", letterSpacing: "0.05em" }}>
        ⚡ Powered by Deepak Web Studio
      </div>
    </motion.div>
  );
};

/* ═══════════════════════════════════════════════════════════
   TRIGGER BUTTON
═══════════════════════════════════════════════════════════ */
const TriggerButton = ({ isOpen, onClick, showDot }) => (
  <motion.button onClick={onClick}
    initial={{ scale: 0, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ delay: 1.5, type: "spring", stiffness: 260, damping: 20 }}
    whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.93 }}
    aria-label={isOpen ? "Close chat" : "Open chat"}
    className="fixed z-50 w-14 h-14 rounded-full flex items-center justify-center"
    style={{
      bottom: "1.5rem", left: "1.5rem",
      background: "linear-gradient(135deg,#c0c1ff,#8b5cf6 60%,#7c3aed)",
      boxShadow: "0 4px 24px rgba(139,92,246,.5)",
    }}>
    {/* Pulse rings */}
    {!isOpen && (
      <>
        <motion.span className="absolute inset-0 rounded-full"
          style={{ background: "rgba(192,193,255,.3)" }}
          animate={{ scale: [1, 1.7, 1.7], opacity: [0.6, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut" }} />
        <motion.span className="absolute inset-0 rounded-full"
          style={{ background: "rgba(192,193,255,.2)" }}
          animate={{ scale: [1, 2.0, 2.0], opacity: [0.4, 0, 0] }}
          transition={{ duration: 2.2, repeat: Infinity, ease: "easeOut", delay: 0.4 }} />
      </>
    )}

    {/* Icon */}
    <AnimatePresence mode="wait" initial={false}>
      {isOpen ? (
        <motion.span key="close"
          initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ color: "#051424" }}>
          <FiX size={22} />
        </motion.span>
      ) : (
        <motion.span key="robot"
          initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
          exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}
          style={{ color: "#051424" }}>
          <RobotIcon size={26} />
        </motion.span>
      )}
    </AnimatePresence>

    {/* Notification dot */}
    <AnimatePresence>
      {showDot && !isOpen && (
        <motion.div key="dot"
          initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
          transition={{ type: "spring", stiffness: 400, damping: 20 }}
          className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-red-500 flex items-center justify-center"
          style={{ boxShadow: "0 0 8px rgba(239,68,68,.6)", border: "2px solid #051424" }}>
          <span style={{ fontSize: "8px", fontWeight: 900, color: "white", lineHeight: 1 }}>1</span>
        </motion.div>
      )}
    </AnimatePresence>
  </motion.button>
);

/* ═══════════════════════════════════════════════════════════
   TOOLTIP
═══════════════════════════════════════════════════════════ */
const Tooltip = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.div
        initial={{ opacity: 0, x: -8, scale: 0.95 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        exit={{ opacity: 0, x: -8, scale: 0.95 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="fixed z-40 flex items-center gap-2 px-4 py-2.5 rounded-2xl font-semibold text-xs text-white pointer-events-none"
        style={{
          bottom: "calc(1.5rem + 4rem)", left: "1.5rem",
          background: "linear-gradient(135deg,rgba(13,28,45,.98),rgba(17,34,51,.96))",
          border: "1px solid rgba(192,193,255,.2)",
          boxShadow: "0 8px 32px rgba(0,0,0,.5)",
          whiteSpace: "nowrap",
        }}>
        <span style={{ fontSize: "16px" }}>👋</span>
        Need help? Ask me anything!
        <div className="absolute -bottom-1.5 left-6 w-3 h-3 rotate-45"
          style={{ background: "rgba(13,28,45,.98)", border: "1px solid rgba(192,193,255,.2)", borderTop: "none", borderLeft: "none" }} />
      </motion.div>
    )}
  </AnimatePresence>
);

/* ═══════════════════════════════════════════════════════════
   MAIN — ChatWidget
═══════════════════════════════════════════════════════════ */
const ChatWidget = () => {
  const [isOpen,    setIsOpen]    = useState(false);
  const [showDot,   setShowDot]   = useState(false);
  const [showTip,   setShowTip]   = useState(false);
  const [hasOpened, setHasOpened] = useState(false);

  useEffect(() => {
    const t1 = setTimeout(() => setShowDot(true),  3000);
    const t2 = setTimeout(() => setShowTip(true),  4500);
    const t3 = setTimeout(() => setShowTip(false), 9500);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, []);

  const handleOpen  = useCallback(() => { setIsOpen(true);  setShowDot(false); setShowTip(false); setHasOpened(true); }, []);
  const handleClose = useCallback(() => setIsOpen(false), []);
  const handleToggle = useCallback(() => { isOpen ? handleClose() : handleOpen(); }, [isOpen, handleOpen, handleClose]);

  return (
    <>
      <Tooltip show={showTip && !isOpen && !hasOpened} />
      <AnimatePresence>{isOpen && <ChatWindow onClose={handleClose} />}</AnimatePresence>
      <TriggerButton isOpen={isOpen} onClick={handleToggle} showDot={showDot} />
    </>
  );
};

export default ChatWidget;