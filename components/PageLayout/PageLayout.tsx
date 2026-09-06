"use client";

import { useState } from "react";
import Header from "@/components/Header/Header";
import MobileNav from "@/components/MobileNav/MobileNav";
import Footer from "@/components/Footer/Footer";
import ScrollToTop from "@/components/ScrollToTop/ScrollToTop";
import NewsletterPopup from "@/components/NewsletterPopup/NewsletterPopup";

interface PageLayoutProps {
  children: React.ReactNode;
  currentPath?: string;
  isAbsolute?: boolean;
  showNewsletter?: boolean;
}

export default function PageLayout({
  children,
  currentPath = "/",
  isAbsolute = false,
  showNewsletter = true,
}: PageLayoutProps) {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  return (
    <>
      <Header currentPath={currentPath} isAbsolute={isAbsolute} onMenuOpen={() => setMobileNavOpen(true)} />

      <MobileNav isOpen={mobileNavOpen} onClose={() => setMobileNavOpen(false)} currentPath={currentPath} />

      <main>{children}</main>

      <Footer />

      <ScrollToTop />

      {showNewsletter && <NewsletterPopup />}
    </>
  );
}
