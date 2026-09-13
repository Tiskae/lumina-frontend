"use client";

import { useEffect, useRef } from "react";
import { usePathname, useRouter } from "next/navigation";
import gsap from "gsap";

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const isFirst = useRef(true);
  const isAnimating = useRef(false);

  // Enter animation whenever the page mounts / pathname changes
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    if (isFirst.current) {
      isFirst.current = false;
      gsap.fromTo(el,
        { opacity: 0, y: 20 },
        {
          opacity: 1, y: 0, duration: 1.1, ease: "power2.out", delay: 0.05,
          // Clear transform after animation so position:fixed children work normally
          onComplete: () => gsap.set(el, { clearProps: "transform" }),
        }
      );
      return;
    }

    window.scrollTo(0, 0);
    gsap.fromTo(el,
      { opacity: 0, y: 20 },
      {
        opacity: 1, y: 0, duration: 1.1, ease: "power2.out",
        onComplete: () => gsap.set(el, { clearProps: "transform" }),
      }
    );
  }, [pathname]);

  // Intercept link clicks → play exit animation → then navigate
  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (isAnimating.current) return;

      const anchor = (e.target as Element).closest("a[href]") as HTMLAnchorElement | null;
      if (!anchor) return;

      const href = anchor.getAttribute("href") ?? "";

      // Skip external, mailto, tel, hash-only, same page, new-tab, modifier keys
      if (
        !href ||
        href.startsWith("http") ||
        href.startsWith("mailto") ||
        href.startsWith("tel") ||
        href.startsWith("#") ||
        href === pathname ||
        anchor.target === "_blank" ||
        anchor.hasAttribute("download") ||
        e.metaKey || e.ctrlKey || e.shiftKey || e.altKey
      ) return;

      e.preventDefault();
      isAnimating.current = true;

      const el = wrapperRef.current;
      if (!el) {
        router.push(href);
        return;
      }

      gsap.to(el, {
        opacity: 0,
        y: -16,
        duration: 0.55,
        ease: "power1.inOut",
        onComplete: () => {
          isAnimating.current = false;
          router.push(href);
        },
      });
    };

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, [pathname, router]);

  return (
    // No will-change:transform — avoids creating a containing block for position:fixed children
    <div ref={wrapperRef} style={{ willChange: "opacity" }}>
      {children}
    </div>
  );
}
