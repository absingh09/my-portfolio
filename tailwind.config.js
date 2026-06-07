/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#051424",
        primary: "#c0c1ff",
        "primary-dark": "#9394e0",
        surface: "#0d1c2d",
        "surface-2": "#112233",
        "accent-cyan": "#67e8f9",
        "accent-cyan-dark": "#22d3ee",
        "text-muted": "#8892a4",
        "border-subtle": "rgba(192,193,255,0.12)",
      },
      fontFamily: {
        display: ["Playfair Display", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "whatsapp-ping": "whatsappPing 2s ease-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-18px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 10px rgba(192,193,255,0.3), 0 0 20px rgba(192,193,255,0.1)" },
          "100%": { boxShadow: "0 0 25px rgba(192,193,255,0.7), 0 0 50px rgba(192,193,255,0.3)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-1000px 0" },
          "100%": { backgroundPosition: "1000px 0" },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
        slideUp: {
          from: { opacity: 0, transform: "translateY(30px)" },
          to: { opacity: 1, transform: "translateY(0)" },
        },
        whatsappPing: {
          "0%": { transform: "scale(1)", opacity: 1 },
          "100%": { transform: "scale(2.2)", opacity: 0 },
        },
      },
      backdropBlur: {
        xs: "2px",
        "4xl": "72px",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "glass-gradient": "linear-gradient(135deg, rgba(192,193,255,0.08) 0%, rgba(103,232,249,0.04) 100%)",
      },
      boxShadow: {
        glass: "0 8px 32px rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.08)",
        "glass-hover": "0 16px 48px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.12)",
        glow: "0 0 30px rgba(192,193,255,0.25)",
        "glow-lg": "0 0 60px rgba(192,193,255,0.35)",
        "cyan-glow": "0 0 30px rgba(103,232,249,0.3)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};
