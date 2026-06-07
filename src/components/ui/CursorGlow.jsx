import { useEffect, useRef, useState } from "react";

/**
 * Soft indigo circle that follows the mouse — desktop only.
 * Two layers: a fast small dot + a slow large glow ring.
 */
const CursorGlow = () => {
  const dotRef   = useRef(null);
  const glowRef  = useRef(null);
  const posRef   = useRef({ x: -200, y: -200 });
  const glowPos  = useRef({ x: -200, y: -200 });
  const rafRef   = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMove = (e) => {
      posRef.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);
    };
    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    window.addEventListener("mousemove", onMove, { passive: true });
    document.documentElement.addEventListener("mouseleave", onLeave);
    document.documentElement.addEventListener("mouseenter", onEnter);

    // Lerp animation loop
    const lerp = (a, b, t) => a + (b - a) * t;

    const animate = () => {
      // Dot follows instantly
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${posRef.current.x - 4}px, ${posRef.current.y - 4}px)`;
      }
      // Glow follows with lag (lerp factor 0.09)
      glowPos.current.x = lerp(glowPos.current.x, posRef.current.x, 0.09);
      glowPos.current.y = lerp(glowPos.current.y, posRef.current.y, 0.09);
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowPos.current.x - 200}px, ${glowPos.current.y - 200}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.removeEventListener("mouseleave", onLeave);
      document.documentElement.removeEventListener("mouseenter", onEnter);
      cancelAnimationFrame(rafRef.current);
    };
  }, []); // eslint-disable-line

  if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches) return null;

  return (
    <>
      {/* Large soft glow ring — lags behind */}
      <div
        ref={glowRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "400px",
          height: "400px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9998,
          opacity: visible ? 1 : 0,
          transition: "opacity 0.4s ease",
          background: "radial-gradient(circle, rgba(192,193,255,0.055) 0%, rgba(192,193,255,0.02) 40%, transparent 70%)",
          willChange: "transform",
        }}
      />
      {/* Small precise dot — instant */}
      <div
        ref={dotRef}
        aria-hidden
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          pointerEvents: "none",
          zIndex: 9999,
          opacity: visible ? 0.7 : 0,
          transition: "opacity 0.3s ease",
          background: "rgba(192,193,255,0.8)",
          boxShadow: "0 0 8px rgba(192,193,255,0.6)",
          willChange: "transform",
        }}
      />
    </>
  );
};

export default CursorGlow;
