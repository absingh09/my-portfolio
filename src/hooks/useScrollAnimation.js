import { useInView } from "react-intersection-observer";
import { useAnimation } from "framer-motion";
import { useEffect } from "react";

/**
 * Triggers Framer Motion animation controls when element enters viewport.
 * @param {number} threshold - 0-1, how much of element must be visible
 * @param {boolean} triggerOnce - only animate once
 */
export const useScrollAnimation = (threshold = 0.15, triggerOnce = true) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold, triggerOnce });

  useEffect(() => {
    if (inView) {
      controls.start("visible");
    } else if (!triggerOnce) {
      controls.start("hidden");
    }
  }, [controls, inView, triggerOnce]);

  return { ref, controls, inView };
};

/** Standard fade-up variants */
export const fadeUpVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Stagger container variants */
export const staggerContainer = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.1,
    },
  },
};

/** Stagger child item variants */
export const staggerItem = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Fade-in from left */
export const fadeLeftVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Fade-in from right */
export const fadeRightVariants = {
  hidden: { opacity: 0, x: 50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.65, ease: [0.4, 0, 0.2, 1] },
  },
};

/** Scale in */
export const scaleInVariants = {
  hidden: { opacity: 0, scale: 0.85 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.55, ease: [0.4, 0, 0.2, 1] },
  },
};
