const Badge = ({
  children,
  variant = "primary",
  size = "sm",
  className = "",
}) => {
  const variants = {
    primary:
      "bg-primary/15 text-primary border border-primary/25",
    cyan:
      "bg-accent-cyan/15 text-accent-cyan border border-accent-cyan/25",
    green:
      "bg-emerald-500/15 text-emerald-400 border border-emerald-500/25",
    orange:
      "bg-orange-500/15 text-orange-400 border border-orange-500/25",
    subtle:
      "bg-white/5 text-text-muted border border-white/10",
  };

  const sizes = {
    xs: "px-2 py-0.5 text-[10px]",
    sm: "px-3 py-1 text-xs",
    md: "px-4 py-1.5 text-sm",
  };

  return (
    <span
      className={[
        "inline-flex items-center gap-1 font-medium rounded-full tracking-wide",
        variants[variant] || variants.primary,
        sizes[size] || sizes.sm,
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {children}
    </span>
  );
};

export default Badge;
