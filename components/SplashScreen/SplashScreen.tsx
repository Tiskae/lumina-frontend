"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import styles from "./SplashScreen.module.scss";

export default function SplashScreen() {
  const [hiding, setHiding] = useState(false);
  const [gone, setGone] = useState(false);

  useEffect(() => {
    const dismiss = () => {
      setHiding(true);
      setTimeout(() => setGone(true), 600);
    };

    if (document.readyState === "complete") {
      // Already loaded — short grace period so the splash is visible
      const t = setTimeout(dismiss, 400);
      return () => clearTimeout(t);
    }

    window.addEventListener("load", dismiss, { once: true });
    return () => window.removeEventListener("load", dismiss);
  }, []);

  if (gone) return null;

  return (
    <div className={`${styles.splash} ${hiding ? styles.hide : ""}`}>
      <Image
        src="/images/logo/logo.svg"
        alt="Lumina"
        width={320}
        height={320}
        priority
        className={styles.logo}
      />
      <div className={styles.spinner} />
    </div>
  );
}
