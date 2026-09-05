"use client";

import { useEffect, useRef, useState } from "react";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import styles from "./StatsBar.module.scss";

const stats = [
  { number: 500, suffix: "+", label: "Properties Listed" },
  { number: 12, suffix: "+", label: "Years in Market" },
  { number: 98, suffix: "%", label: "Client Satisfaction" },
  { number: 4, suffix: "", label: "Cities Covered" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1800;
          const steps = 60;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className={styles.number}>
      {count}
      {suffix}
    </span>
  );
}

export default function StatsBar() {
  return (
    <section className={styles.statsSection}>
      <div className="tf-container">
        <div className={styles.grid}>
          {stats.map((stat, i) => (
            <AnimateOnScroll key={stat.label} direction="3" delay={i * 0.1}>
              <div className={styles.statItem}>
                <Counter target={stat.number} suffix={stat.suffix} />
                <p className={styles.label}>{stat.label}</p>
              </div>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
