import { useState, useEffect } from "react";

export function useScrollFade() {
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      // Full opacity in hero, fade from 1.0vh to 1.8vh, gone by 2vh
      const progress = Math.min(Math.max((scrollY - vh * 0.8) / (vh * 1.0), 0), 1);
      setOpacity(1 - progress);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return opacity;
}
