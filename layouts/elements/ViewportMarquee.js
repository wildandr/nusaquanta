"use client";

import { useEffect, useRef, useState } from "react";
import Marquee from "react-fast-marquee";

export default function ViewportMarquee({ children, ...props }) {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { rootMargin: "200px 0px" }
    );

    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="w-full overflow-hidden">
      <Marquee {...props} play={isVisible}>
        {children}
      </Marquee>
    </div>
  );
}
