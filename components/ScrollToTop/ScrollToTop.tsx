"use client";

import { useEffect, useRef, useState } from "react";

export default function ScrollToTop() {
  const [active, setActive] = useState(false);
  const pathRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;

    const pathLength = path.getTotalLength();
    path.style.strokeDasharray = `${pathLength} ${pathLength}`;
    path.style.strokeDashoffset = String(pathLength);

    const update = () => {
      const scroll = window.scrollY;
      const height = document.body.scrollHeight - window.innerHeight;
      const progress = pathLength - (scroll * pathLength) / height;
      path.style.strokeDashoffset = String(progress);
      setActive(scroll > 200);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <div
      className={`progress-wrap ${active ? "active-progress" : ""}`}
      onClick={scrollTop}
      role="button"
      tabIndex={0}
      aria-label="Scroll to top"
      onKeyDown={(e) => e.key === "Enter" && scrollTop()}
    >
      <span className="icon">
        <i className="icon-CaretLeft" style={{ transform: "rotate(90deg)" }} />
      </span>
      <svg
        className="progress-circle"
        width="48"
        height="48"
        viewBox="0 0 100 100"
      >
        <path
          ref={pathRef}
          d="M 50,50 m -45,0 a 45,45 0 1,1 90,0 a 45,45 0 1,1 -90,0"
        />
      </svg>
    </div>
  );
}
