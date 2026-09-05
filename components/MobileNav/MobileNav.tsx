"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import styles from "./MobileNav.module.scss";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    children: [
      { label: "Homepage 1", href: "/" },
      { label: "Homepage 2", href: "/home-2" },
    ],
  },
  {
    label: "Listings",
    href: "/listings",
    children: [
      { label: "Filter Sidebar", href: "/listings/sidebar" },
      { label: "Grid Full Width", href: "/listings" },
      { label: "Half Map Grid", href: "/listings/map" },
      { label: "Top Filter", href: "/listings/top-filter" },
      { label: "Top Map", href: "/listings/top-map" },
    ],
  },
  {
    label: "Property Details",
    href: "/properties/lumina-heights-ikoyi",
  },
  {
    label: "Latest News",
    href: "/blog",
    children: [
      { label: "Blog", href: "/blog" },
      { label: "Blog Post", href: "/blog/luxury-real-estate-lagos" },
    ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
  currentPath?: string;
}

export default function MobileNav({
  isOpen,
  onClose,
  currentPath = "/",
}: MobileNavProps) {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleItem = (label: string) => {
    setOpenItems((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  return (
    <>
      {/* Backdrop */}
      <div
        className={`${styles.overlay} ${isOpen ? styles.isOpen : ""}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        id="menu-mobile"
        className={`${styles.mobileNavWrap} ${isOpen ? styles.isOpen : ""}`}
        aria-label="Mobile navigation"
      >
        <div className={styles.roundedDiv}>
          <div className={styles.roundedDivInner} />
        </div>

        <div className={styles.topNav}>
          <button
            className={styles.btnClose}
            onClick={onClose}
            aria-label="Close navigation"
          >
            <i className="icon-close" />
          </button>
        </div>

        <div className={styles.navBody}>
          {/* Logo */}
          <Link href="/" onClick={onClose} style={{ marginBottom: 24 }}>
            <Image
              src="/images/logo/logo.svg"
              alt="Lumina"
              width={130}
              height={40}
            />
          </Link>

          {/* Nav items */}
          <ul className={styles.menuList}>
            {navItems.map((item) => {
              const isExpanded = openItems.includes(item.label);
              const isCurrent =
                currentPath === item.href ||
                item.children?.some((c) => c.href === currentPath);

              return (
                <li key={item.label}>
                  <div className={styles.menuItem}>
                    <Link
                      href={item.href}
                      onClick={onClose}
                      className={isCurrent ? styles.active : ""}
                    >
                      {item.label}
                    </Link>
                    {item.children && (
                      <button
                        className={`${styles.expandBtn} ${isExpanded ? styles.isOpen : ""}`}
                        onClick={() => toggleItem(item.label)}
                        aria-label={`Toggle ${item.label}`}
                      />
                    )}
                  </div>

                  {item.children && (
                    <ul
                      className={`${styles.subMenu} ${isExpanded ? styles.isOpen : ""}`}
                    >
                      {item.children.map((child) => (
                        <li key={child.label}>
                          <Link href={child.href} onClick={onClose}>
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
          </ul>

          {/* CTA */}
          <Link
            href="/listings"
            className="tf-btn btn-bg-1"
            onClick={onClose}
            style={{ marginBottom: 24 }}
          >
            <i className="icon icon-HouseLine" />
            <span>Find Property</span>
            <span className="bg-effect" />
          </Link>

          {/* Contact info */}
          <div className={styles.contactBlock}>
            <div className={styles.contactItem}>
              <i className="icon icon-PhoneCall" style={{ fontSize: 24 }} />
              <div>
                <div className="text-caption-1 text-secondary">Hotline</div>
                <div className="text-button text-cl-primary">
                  <a href="tel:+2348001234567">+234 800 123 4567</a>
                </div>
              </div>
            </div>
            <div className={styles.contactItem}>
              <i className="icon icon-Email" style={{ fontSize: 24 }} />
              <div>
                <div className="text-caption-1 text-secondary">Email</div>
                <div className="text-button text-cl-primary">
                  <a href="mailto:hello@lumina.ng">hello@lumina.ng</a>
                </div>
              </div>
            </div>
          </div>

          {/* Socials */}
          <div className={styles.socialWrap}>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
            >
              <i className="icon-Facebook" />
            </a>
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
            >
              <i className="icon-Instagram" />
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="X"
            >
              <i className="icon-X" />
            </a>
          </div>
        </div>
      </aside>
    </>
  );
}
