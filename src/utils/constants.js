// ─── Services ───────────────────────────────────────────────
export const SERVICES = [
  {
    id: 1,
    icon: "globe",
    title: "Custom Business Websites",
    description:
      "Fully bespoke websites tailored to your brand identity — fast, responsive, and built to convert visitors into loyal clients.",
    highlights: ["Mobile-first design", "Lightning fast load", "SEO ready"],
    color: "primary",
  },
  {
    id: 2,
    icon: "layout",
    title: "Landing Pages",
    description:
      "High-converting landing pages engineered with persuasive copy, strategic CTAs, and conversion-focused UX that drives real action.",
    highlights: ["A/B test ready", "CTA optimized", "Analytics integrated"],
    color: "cyan",
  },
  {
    id: 3,
    icon: "user",
    title: "Personal & Professional Portfolios",
    description:
      "Stunning portfolio sites that showcase your expertise and make recruiters and clients say yes before even meeting you.",
    highlights: ["Unique design", "Project showcase", "Personal branding"],
    color: "primary",
  },
  {
    id: 4,
    icon: "cpu",
    title: "AI-Powered Chatbots",
    description:
      "Intelligent chatbots that engage visitors 24/7, answer queries, qualify leads, and book appointments automatically.",
    highlights: ["24/7 availability", "Lead qualification", "CRM integration"],
    color: "cyan",
  },
  {
    id: 5,
    icon: "shopping",
    title: "E-Commerce Stores",
    description:
      "Complete online stores with seamless payment gateways, inventory management, and UX designed to maximize your revenue.",
    highlights: ["Payment gateway", "Inventory system", "Order management"],
    color: "primary",
  },
  {
    id: 6,
    icon: "trending",
    title: "SEO & Performance Optimization",
    description:
      "Get found on Google and keep visitors engaged. I audit, optimize, and accelerate sites for maximum organic growth.",
    highlights: ["Core Web Vitals", "Rank higher", "Traffic growth"],
    color: "cyan",
  },
];

// ─── Portfolio Works ─────────────────────────────────────────
export const WORKS = [
  {
    id: 1,
    title: "IronPeak Fitness",
    category: "Gym & Fitness",
    description:
      "A high-energy fitness website with bold typography, animated stats, membership plans, class schedules, and trainer profiles built to motivate and convert.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-orange-500 via-red-600 to-rose-700",
    accentColor: "#f97316",
    emoji: "💪",
    features: ["Membership CTA", "Class schedule", "Trainer profiles", "Animated stats"],
    liveUrl: "https://ironpeak-fitness-showcase.vercel.app/",
    status: "Live Demo",
  },
  {
    id: 2,
    title: "Saffron & Smoke",
    category: "Premium Restaurant",
    description:
      "An elegant restaurant website with rich photography layouts, interactive menus, online reservation system, and a warm premium atmosphere.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-amber-500 via-orange-600 to-yellow-700",
    accentColor: "#f59e0b",
    emoji: "🍽️",
    features: ["Online reservations", "Menu showcase", "Chef stories", "Gallery"],
    liveUrl: "https://saffron-smoke-demo.vercel.app/",
    status: "Live Demo",
  },
  {
    id: 3,
    title: "Velvet Bloom Studio",
    category: "Luxury Salon",
    description:
      "A luxurious salon website with soft pastel elegance, service menus, booking integration, and a visual gallery that showcases transformations.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-pink-400 via-rose-500 to-fuchsia-600",
    accentColor: "#ec4899",
    emoji: "✂️",
    features: ["Online booking", "Service menu", "Before/after gallery", "Stylist profiles"],
    liveUrl: "https://radhika-salons-brown.vercel.app/",
    status: "Live Demo",
  },
  {
    id: 4,
    title: "MediCare Plus",
    category: "Multi-Specialty Clinic",
    description:
      "A trustworthy clinic website with doctor directories, department listings, appointment booking, patient portal, and health blog.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-cyan-500 via-teal-500 to-blue-600",
    accentColor: "#06b6d4",
    emoji: "🏥",
    features: ["Doctor directory", "Appointment booking", "Departments", "Health blog"],
    liveUrl: "https://medicare-plus-showcase.vercel.app",
    status: "Live Demo",
  },
  {
    id: 5,
    title: "Eternal Moments Co.",
    category: "Wedding Planning",
    description:
      "A romantic wedding planning website with cinematic photo galleries, package plans, vendor directories, and real couple story showcases.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-violet-400 via-purple-500 to-indigo-600",
    accentColor: "#8b5cf6",
    emoji: "💍",
    features: ["Photo galleries", "Packages", "Venue showcase", "Testimonials"],
    liveUrl: "https://eternal-moments-showcase.vercel.app",
    status: "Live Demo",
  },
  {
    id: 6,
    title: "BrightMind Academy",
    category: "EdTech & Coaching",
    description:
      "A feature-rich EdTech platform with course listings, instructor profiles, success metrics, student reviews, and enrollment flows.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-green-400 via-emerald-500 to-teal-600",
    accentColor: "#10b981",
    emoji: "🎓",
    features: ["Course catalog", "Instructor profiles", "Success stats", "Enrollment flow"],
    liveUrl: "https://brightmind-demo-showcase.vercel.app",
    status: "Live Demo",
  },
  {
    id: 7,
    title: "Prestige Properties",
    category: "Real Estate Agency",
    description:
      "A premium real estate website with property listings, interactive map search, agent profiles, mortgage calculator, and virtual tour links.",
    tags: ["React", "Tailwind CSS", "Framer Motion", "Vite"],
    gradient: "from-slate-400 via-blue-600 to-indigo-700",
    accentColor: "#3b82f6",
    emoji: "🏡",
    features: ["Property listings", "Map search", "Agent profiles", "Mortgage calculator"],
    liveUrl: "https://prestige-properties-showcase.vercel.app/",
    status: "Live Demo",
  },
];

// ─── Tech Stack ──────────────────────────────────────────────
export const TECH_STACK = [
  { name: "React", category: "Frontend", icon: "⚛️", level: 95 },
  { name: "Next.js", category: "Frontend", icon: "▲", level: 90 },
  { name: "TypeScript", category: "Frontend", icon: "🔷", level: 85 },
  { name: "Tailwind CSS", category: "Styling", icon: "🎨", level: 95 },
  { name: "Framer Motion", category: "Animation", icon: "🎬", level: 88 },
  { name: "Node.js", category: "Backend", icon: "🟢", level: 85 },
  { name: "Python", category: "Backend", icon: "🐍", level: 90 },
  { name: "FastAPI", category: "Backend", icon: "⚡", level: 88 },
  { name: "Flask", category: "Backend", icon: "🌶️", level: 85 },
  { name: "MongoDB", category: "Database", icon: "🍃", level: 85 },
  { name: "PostgreSQL", category: "Database", icon: "🐘", level: 80 },
  { name: "TensorFlow", category: "AI/ML", icon: "🧠", level: 82 },
  { name: "PyTorch", category: "AI/ML", icon: "🔥", level: 80 },
  { name: "LangChain", category: "AI/ML", icon: "🔗", level: 85 },
  { name: "Docker", category: "DevOps", icon: "🐳", level: 82 },
  { name: "AWS", category: "Cloud", icon: "☁️", level: 78 },
  { name: "Vercel", category: "Deployment", icon: "▲", level: 92 },
  { name: "Git", category: "Tools", icon: "📦", level: 95 },
];

export const TECH_CATEGORIES = ["All", "Frontend", "Backend", "AI/ML", "Database", "DevOps", "Cloud"];

// ─── Testimonials ────────────────────────────────────────────
export const TESTIMONIALS = [
  {
    id: 1,
    name: "Rajesh Sharma",
    role: "Owner",
    company: "FitZone Gym, Delhi",
    avatar: "RS",
    avatarColor: "from-orange-500 to-red-600",
    rating: 5,
    text: "Deepak transformed our outdated website into a stunning, high-converting platform. Member inquiries went up by 180% in the first month alone. He doesn't just build websites — he builds growth engines.",
  },
  {
    id: 2,
    name: "Priya Malhotra",
    role: "Head Chef & Co-Founder",
    company: "Spice Route, Gurugram",
    avatar: "PM",
    avatarColor: "from-amber-500 to-orange-600",
    rating: 5,
    text: "Working with Deepak was exceptional. He understood our brand instantly and created a website that felt luxurious yet warm. Our online reservations tripled within weeks. Highly recommend!",
  },
  {
    id: 3,
    name: "Anita Joshi",
    role: "Director",
    company: "BrightPath Academy, Noida",
    avatar: "AJ",
    avatarColor: "from-green-500 to-emerald-600",
    rating: 5,
    text: "The EdTech platform Deepak built for us is world-class. Students love it, parents trust it, and our enrollment has grown 3x since launch. The AI chatbot alone saves us hours every day.",
  },
  {
    id: 4,
    name: "Vikram Nair",
    role: "Managing Director",
    company: "Prestige Realty, Mumbai",
    avatar: "VN",
    avatarColor: "from-blue-500 to-indigo-600",
    rating: 5,
    text: "Deepak delivered a real estate portal that rivals industry leaders in UX. The property search, filters, and lead capture system are phenomenal. Our digital leads have multiplied significantly.",
  },
  {
    id: 5,
    name: "Meera Kapoor",
    role: "Founder",
    company: "Velvet Bloom Salon, Pune",
    avatar: "MK",
    avatarColor: "from-pink-500 to-rose-600",
    rating: 5,
    text: "I wanted a salon website that felt like walking into a luxury spa — Deepak nailed it. The booking system is seamless, the gallery is gorgeous, and our Instagram traffic to website has doubled.",
  },
  {
    id: 6,
    name: "Dr. Suresh Patel",
    role: "Chief Medical Officer",
    company: "MediCare Hospital, Ahmedabad",
    avatar: "SP",
    avatarColor: "from-cyan-500 to-teal-600",
    rating: 5,
    text: "Our new hospital website by Deepak is professional, accessible, and beautifully designed. Patient inquiries have surged and the appointment booking system runs flawlessly. A true professional.",
  },
];

// ─── Stats ───────────────────────────────────────────────────
export const STATS = [
  { value: 30, suffix: "+", label: "Projects Delivered" },
  { value: 25, suffix: "+", label: "Happy Clients" },
  { value: 3, suffix: "+", label: "Years Experience" },
  { value: 100, suffix: "%", label: "Client Satisfaction" },
];

// ─── Social Links ────────────────────────────────────────────
export const SOCIAL_LINKS = {
  whatsapp: "https://wa.me/917011875494",
  email: "mailto:deepakwebstudio@gmail.com",
  github: "https://github.com/CodeWithDks",
  linkedin: "https://www.linkedin.com/in/deepaksinghai",
  instagram: "https://instagram.com/deepakwebstudio",
};

// ─── Contact Info ────────────────────────────────────────────
export const CONTACT_INFO = {
  name: "Deepak Singh",
  brand: "Deepak Web Studio",
  phone: "+91 70118 75494",
  whatsapp: "+917011875494",
  email: "deepakwebstudio@gmail.com",
  location: "New Delhi, Delhi, India",
  availability: "Mon – Sat, 9 AM – 8 PM IST",
};

// ─── Nav Links ────────────────────────────────────────────────
export const NAV_LINKS = [
  { label: "Home", to: "hero" },
  { label: "Services", to: "services" },
  { label: "Works", to: "works" },
  { label: "About", to: "about" },
  { label: "Tech", to: "techstack" },
  { label: "Contact", to: "contact" },
];
