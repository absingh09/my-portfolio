import { motion } from "framer-motion";

const Card = ({
  children,
  className = "",
  hover = true,
  glow = false,
  onClick,
  style,
  ...props
}) => {
  return (
    <motion.div
      onClick={onClick}
      className={[
        "glass-card",
        hover ? "cursor-pointer" : "",
        glow ? "shadow-glow" : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      whileHover={hover ? { y: -4, scale: 1.01 } : {}}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      style={style}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
