"use client";

import { useEffect, useRef } from "react";

type AnimateDirection = "1" | "2" | "3" | "4";

interface AnimateOnScrollProps {
  children: React.ReactNode;
  direction?: AnimateDirection;
  delay?: number;
  slow?: boolean;
  className?: string;
  as?: keyof JSX.IntrinsicElements;
}

export default function AnimateOnScroll({
  children,
  direction = "1",
  delay = 0,
  slow = false,
  className = "",
  as: Tag = "div",
}: AnimateOnScrollProps) {
  const ref = useRef<HTMLElement>(null);
  const delayRef = useRef(delay);
  delayRef.current = delay;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already revealed (e.g. HMR or double-mount in strict mode)
    if (el.classList.contains("active-animate")) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          observer.unobserve(el);
          const ms = delayRef.current * 1000;
          if (ms > 0) {
            setTimeout(() => el.classList.add("active-animate"), ms);
          } else {
            el.classList.add("active-animate");
          }
        }
      },
      { threshold: 0 },
    );

    observer.observe(el);
    return () => observer.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const classes = [
    `tf-animate-${direction}`,
    slow ? "transition-1s" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    // @ts-expect-error: dynamic tag ref type
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
