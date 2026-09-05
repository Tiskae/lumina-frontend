"use client";

import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./NewsletterPopup.module.scss";

const SESSION_KEY = "lumina_popup_shown";

export default function NewsletterPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    const alreadyShown = sessionStorage.getItem(SESSION_KEY);
    if (alreadyShown) return;

    const timer = setTimeout(() => setIsOpen(true), 3000);
    return () => clearTimeout(timer);
  }, []);

  const close = () => {
    setIsOpen(false);
    sessionStorage.setItem(SESSION_KEY, "true");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
    close();
  };

  return (
    <>
      <div
        className={`${styles.backdrop} ${isOpen ? styles.isOpen : ""}`}
        onClick={close}
        aria-hidden="true"
      />

      <div
        className={`${styles.modal} ${isOpen ? styles.isOpen : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Newsletter signup"
      >
        <button
          className={styles.btnClose}
          onClick={close}
          aria-label="Close"
        >
          <i className="icon-close" />
        </button>

        <div className={styles.inner}>
          {/* Image side */}
          <div className={styles.imageCol}>
            <Image
              src="/images/background/popup-bg.jpg"
              alt="Luxury property"
              fill
              style={{ objectFit: "cover" }}
            />
          </div>

          {/* Content side */}
          <div className={styles.contentCol}>
            <div className={styles.badge}>Exclusive Access</div>
            <h4 className={styles.title}>
              Discover Lagos&apos;s Finest Properties
            </h4>
            <p className={styles.desc}>
              Join our private list and be the first to see new luxury
              listings across Lagos, Abuja, and beyond.
            </p>

            <form className={styles.form} onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Your full name"
                required
              />
              <input
                type="email"
                placeholder="Your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <button type="submit" className="tf-btn btn-bg-1">
                <span>Get Exclusive Access</span>
                <span className="bg-effect" />
              </button>
            </form>

            <button className={styles.dismiss} onClick={close}>
              No thanks, I&apos;ll browse publicly
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
