"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import styles from "./Header.module.scss";
import clsx from "clsx";

interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string }[];
}

const navItems: NavItem[] = [
  {
    label: "Home",
    href: "/",
    // children: [
    //   { label: "Homepage 1", href: "/" },
    //   { label: "Homepage 2", href: "/home-2" },
    // ],
  },
  {
    label: "Listings",
    href: "/listings",
    // children: [
    //   { label: "Filter Sidebar", href: "/listings/sidebar" },
    //   { label: "Grid Full Width", href: "/listings" },
    //   { label: "Half Map Grid", href: "/listings/map" },
    //   { label: "Top Filter", href: "/listings/top-filter" },
    //   { label: "Top Map", href: "/listings/top-map" },
    // ],
  },
  // {
  //   label: "Property Details",
  //   href: "/properties/lumina-heights-ikoyi",
  // },
  {
    label: "Latest News",
    href: "/blog",
    // children: [
    //   { label: "Blog", href: "/blog" },
    //   { label: "Blog Post", href: "/blog/luxury-real-estate-lagos" },
    // ],
  },
  {
    label: "Contact",
    href: "/contact",
  },
];

export default function Header({
  currentPath = "/",
  isAbsolute = false,
  onMenuOpen,
}: {
  currentPath?: string;
  isAbsolute?: boolean;
  onMenuOpen?: () => void;
}) {
  const [isSticky, setIsSticky] = useState(false);
  const lastScrollTop = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const delta = 10;

      if (scrollTop < 350) {
        setIsSticky(false);
        lastScrollTop.current = scrollTop;
        return;
      }

      if (scrollTop > lastScrollTop.current + delta) {
        setIsSticky(false);
      } else if (scrollTop < lastScrollTop.current - delta) {
        setIsSticky(true);
      }

      lastScrollTop.current = scrollTop;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const headerClasses = [styles.header, styles.headerSticky, styles.styleDefault, isSticky ? styles.isSticky : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <>
      {/* Sticky header — slides in/out on scroll */}
      <header className={headerClasses}>
        <div className="tf-container w-1770">
          <div className={styles.headerInner}>
            <Link href="/" className={styles.siteLogo}>
              <Image src="/images/logo/logo.svg" alt="Lumina" width={160} height={48} priority />
            </Link>

            <Nav items={navItems} currentPath={currentPath} />

            <HeaderRight onMenuOpen={onMenuOpen} />
          </div>
        </div>
      </header>

      {/* Static/absolute header (visible before scroll) */}
      {isAbsolute && (
        <header className={`${styles.header} ${styles.styleDefault} ${styles.styleAbsolute}`}>
          <div className="tf-container w-1770">
            <div className={styles.headerInner}>
              <Link href="/" className={styles.siteLogo}>
                <Image src="/images/logo/logo.svg" alt="Lumina" width={160} height={48} priority />
              </Link>

              <Nav items={navItems} currentPath={currentPath} />

              <HeaderRight onMenuOpen={onMenuOpen} />
            </div>
          </div>
        </header>
      )}
    </>
  );
}

function Nav({ items, currentPath }: { items: NavItem[]; currentPath: string }) {
  console.log({ currentPath });

  return (
    <nav className={styles.mainMenu}>
      <ul className={styles.navigation}>
        {items.map((item) => {
          const isCurrent = currentPath === item.href || item.children?.some((c) => c.href === currentPath);

          return (
            <li
              key={item.label}
              className={clsx([styles.hasMenuA, item.children && styles.hasChild, isCurrent && styles.currentMenu])}
            >
              {item.children ? (
                <span className={styles.textMenu}>
                  <div className={styles.toggle}>
                    <span className={clsx(styles.texat, styles.textA)}>{item.label}</span>
                  </div>
                </span>
              ) : (
                <Link href={item.href}>{item.label}</Link>
              )}

              {item.children && (
                <ul className={styles.submenu}>
                  {item.children.map((child) => (
                    <li key={child.label} className={currentPath === child.href ? styles.currentItem : ""}>
                      <Link href={child.href}>{child.label}</Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

function HeaderRight({ onMenuOpen }: { onMenuOpen?: () => void }) {
  return (
    <div className={styles.headerRight}>
      <div className={styles.hotLine}>
        <div className={styles.iconWrapper}>
          <i className="icon icon-PhoneCall" />
        </div>

        <div className={styles.hotLineText}>
          <div className={styles.label}>Hotline:</div>
          <div className={styles.number}>
            <a href="tel:+2348001234567">+234 800 123 4567</a>
          </div>
        </div>
      </div>

      <Link href="/listings" className="tf-btn">
        <i className="icon icon-HouseLine" />
        <span>Find Property</span>
        <span className="bg-effect" />
      </Link>

      {/* Mobile hamburger — triggers MobileNav */}
      <button className={`${styles.mobileButton} d-xl-none`} onClick={onMenuOpen} aria-label="Open navigation">
        <i className="icon-List" />
      </button>
    </div>
  );
}
