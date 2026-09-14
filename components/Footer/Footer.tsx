"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import styles from "./Footer.module.scss";

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "All Properties", href: "/properties" },
  { label: "Our Agents", href: "/agents" },
  { label: "Blog & News", href: "/blog" },
  { label: "Contact Us", href: "/contact" },
];

const propertyLinks = [
  { label: "Apartments", href: "/properties?type=apartment" },
  { label: "Villas & Estates", href: "/properties?type=villa" },
  { label: "Townhouses", href: "/properties?type=townhouse" },
  { label: "For Sale", href: "/properties?status=for-sale" },
  { label: "For Rent", href: "/properties?status=for-rent" },
];

const locationLinks = [
  { label: "Ikoyi, Lagos", href: "/properties?city=Ikoyi" },
  { label: "Lekki, Lagos", href: "/properties?city=Lekki" },
  { label: "Victoria Island", href: "/properties?city=Victoria Island" },
  { label: "Maitama, Abuja", href: "/properties?city=Maitama" },
  { label: "Camps Bay, Cape Town", href: "/properties?city=Camps Bay" },
  { label: "East Legon, Accra", href: "/properties?city=East Legon" },
];

interface ColBlockProps {
  title: string;
  links: { label: string; href: string }[];
}

function ColBlock({ title, links }: ColBlockProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    setIsMobile(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className={`${styles.footerColBlock} ${isOpen ? styles.open : ""}`}>
      <div
        className={`${styles.footerHeading} ${styles.footerHeadingMobile}`}
        onClick={() => isMobile && setIsOpen((v) => !v)}
      >
        {title}
      </div>
      <div className={styles.collapseContent}>
        <ul className={styles.footerMenuList}>
          {links.map((l) => (
            <li key={l.label}>
              <Link href={l.href}>{l.label}</Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className="tf-container">
        <div className={styles.footerBody}>
          <div className={styles.footerInner}>
            {/* Brand column */}
            <div className={styles.footerAbout}>
              <Link href="/" className={styles.footerLogo}>
                <Image src="/images/logo/logo-1.svg" alt="Lumina" width={140} height={42} />
              </Link>
              <p className={styles.text}>
                Lumina curates luxury real estate across Lagos, Abuja, and select African cities. Exceptional properties
                for discerning buyers.
              </p>
              <div style={{ marginTop: 20 }}>
                <div className={styles.wgSocial}>
                  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
                    <i className="icon-Facebook" />
                  </a>
                  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
                    <i className="icon-Instagram" />
                  </a>
                  <a href="https://x.com" target="_blank" rel="noopener noreferrer" aria-label="X">
                    <i className="icon-X" />
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="YouTube">
                    <i className="icon-Youtube" />
                  </a>
                </div>
              </div>
            </div>

            {/* Link columns */}
            <div className={styles.footerContent}>
              <ColBlock title="Quick Links" links={quickLinks} />
              <ColBlock title="Property Types" links={propertyLinks} />
              <ColBlock title="Locations" links={locationLinks} />
            </div>

            {/* Newsletter */}
            <div className={styles.newsletter}>
              <div className={styles.footerHeading}>Newsletter</div>
              <p className={styles.text}>
                Get exclusive property listings and market insights delivered to your inbox.
              </p>
              <form className={styles.newsletterForm} onSubmit={handleNewsletter}>
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <button type="submit" className="tf-btn btn-bg-1">
                  <span>Subscribe</span>
                  <span className="bg-effect" />
                </button>
              </form>
            </div>
          </div>
        </div>

        <div className={styles.logoWatermarkCont}>
          <Image
            className={styles.logoWatermark}
            src="/images/logo/logo-wide-cropped.png"
            width={1000}
            height={400}
            alt="Lumina watermark"
          />
        </div>

        {/* Disclaimer */}
        <p className={styles.disclaimer}>
          Lumina is a fictional brand created for demonstration purposes. All property listings, agents, prices, and
          content on this site are AI-generated and do not represent real properties or individuals.
        </p>

        {/* Footer bottom bar */}
        <div className={styles.footerBottom}>
          <p className={styles.copyright}>&copy; {new Date().getFullYear()} Lumina Real Estate. All rights reserved.</p>
          <div style={{ display: "flex", gap: 24, alignItems: "center", flexWrap: "wrap" }}>
            <span className={styles.credit}>
              Carefully handcrafted by{" "}
              <a
                href="https://tiskae.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.creditLink}
              >
                Tiskae Studio
              </a>
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
