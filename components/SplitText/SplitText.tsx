"use client";

import { useEffect, useRef } from "react";
import type { gsap as GsapType } from "gsap";

type SplitEffect =
  | "effect-fade"
  | "split-lines-transform"
  | "split-lines-rotation-x"
  | "split-words-scale"
  | "effect-blur-fade";

interface SplitTextProps {
  children: React.ReactNode;
  effect?: SplitEffect;
  as?: keyof JSX.IntrinsicElements;
  className?: string;
}

export default function SplitText({
  children,
  effect = "split-lines-transform",
  as: Tag = "div",
  className = "",
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let gsapInstance: typeof GsapType;
    let SplitTextPlugin: { new (target: Element, vars: object): { chars: Element[]; words: Element[]; lines: Element[]; split: (vars: object) => void } };

    const init = async () => {
      const [{ gsap }, { ScrollTrigger }, { SplitText: ST }] =
        await Promise.all([
          import("gsap"),
          import("gsap/ScrollTrigger"),
          import("gsap/SplitText"),
        ]);

      gsap.registerPlugin(ScrollTrigger, ST);
      gsapInstance = gsap;
      SplitTextPlugin = ST as unknown as typeof SplitTextPlugin;

      const target = el.querySelector("p, a, h1, h2, h3, h4, h5, h6") ?? el;

      const pxlSplit = new SplitTextPlugin(target, {
        type: "words, chars",
        lineThreshold: 0.5,
        linesClass: "split-line",
      });

      let splitTypeSet = pxlSplit.chars;
      gsap.set(target, { perspective: 400 });

      const triggerSettings = {
        scrollTrigger: {
          trigger: target,
          start: "top 86%",
          once: true,
        },
        duration: 0.9,
        stagger: 0.02,
        ease: "power3.out",
      };

      if (effect === "effect-fade") {
        gsap.from(splitTypeSet, { ...triggerSettings, opacity: 0 });
        return;
      }

      if (effect === "split-lines-transform" || effect === "split-lines-rotation-x") {
        pxlSplit.split({
          type: "lines",
          lineThreshold: 0.5,
          linesClass: "split-line",
        });
        splitTypeSet = pxlSplit.lines;
        const settings = {
          ...triggerSettings,
          opacity: 0,
          stagger: 0.5,
        };

        if (effect === "split-lines-rotation-x") {
          gsap.from(splitTypeSet, {
            ...settings,
            rotationX: -120,
            transformOrigin: "top center -50",
          });
        } else {
          gsap.from(splitTypeSet, {
            ...settings,
            yPercent: 100,
            autoAlpha: 0,
          });
        }
        return;
      }

      if (effect === "split-words-scale") {
        pxlSplit.split({ type: "words" });
        splitTypeSet = pxlSplit.words;
        splitTypeSet.forEach((word: Element, i: number) => {
          gsap.set(word, {
            opacity: 0,
            scale: i % 2 === 0 ? 0 : 2,
          });
        });
        gsap.to(splitTypeSet, {
          scrollTrigger: {
            trigger: el,
            start: "top 86%",
            once: true,
          },
          rotateX: "0",
          scale: 1,
          opacity: 1,
        });
        return;
      }

      if (effect === "effect-blur-fade") {
        pxlSplit.split({ type: "words" });
        splitTypeSet = pxlSplit.words;
        gsap.fromTo(
          splitTypeSet,
          { opacity: 0, filter: "blur(10px)", y: 20 },
          {
            opacity: 1,
            filter: "blur(0px)",
            y: 0,
            duration: 1,
            stagger: 0.1,
            ease: "power3.out",
            scrollTrigger: {
              trigger: target,
              start: "top 86%",
              once: true,
            },
          }
        );
      }
    };

    init();

    return () => {
      // cleanup if needed
    };
  }, [effect]);

  const classes = ["split-text", effect, className].filter(Boolean).join(" ");

  return (
    // @ts-expect-error: dynamic tag
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}
