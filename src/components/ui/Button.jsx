import { motion } from "framer-motion";

const Button = ({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  target,
  rel,
  disabled = false,
  type = "button",
  icon,
  ...props
}) => {
  const baseClasses =
    "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 cursor-pointer border-0 outline-none focus-visible:ring-2 focus-visible:ring-primary/60";

  const variants = {
    primary:
      "bg-gradient-to-r from-primary to-primary-dark text-background shadow-[0_4px_24px_rgba(192,193,255,0.3)] hover:shadow-[0_8px_40px_rgba(192,193,255,0.5)] hover:-translate-y-0.5",
    outline:
      "bg-transparent text-primary border border-primary/35 hover:border-primary hover:bg-primary/10 hover:-translate-y-0.5",
    ghost:
      "bg-transparent text-primary hover:bg-primary/10 hover:-translate-y-0.5",
    cyan:
      "bg-gradient-to-r from-accent-cyan to-cyan-400 text-background shadow-[0_4px_24px_rgba(103,232,249,0.3)] hover:shadow-[0_8px_40px_rgba(103,232,249,0.5)] hover:-translate-y-0.5",
  };

  const sizes = {
    sm: "px-5 py-2.5 text-sm",
    md: "px-7 py-3.5 text-sm",
    lg: "px-9 py-4 text-base",
    xl: "px-11 py-5 text-lg",
  };

  const classes = [
    baseClasses,
    variants[variant] || variants.primary,
    sizes[size] || sizes.md,
    disabled ? "opacity-50 cursor-not-allowed" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const motionProps = {
    whileHover: disabled ? {} : { scale: 1.02 },
    whileTap: disabled ? {} : { scale: 0.98 },
    transition: { type: "spring", stiffness: 400, damping: 20 },
  };

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        className={classes}
        {...motionProps}
        {...props}
      >
        {icon && <span className="text-lg">{icon}</span>}
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={classes}
      {...motionProps}
      {...props}
    >
      {icon && <span className="text-lg">{icon}</span>}
      {children}
    </motion.button>
  );
};

export default Button;
