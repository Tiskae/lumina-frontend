import type { Metadata } from "next";
import { Syne } from "next/font/google";
import "@/styles/globals.scss";
import PageTransition from "@/components/PageTransition/PageTransition";
import SmoothScroll from "@/components/SmoothScroll/SmoothScroll";
import SplashScreen from "@/components/SplashScreen/SplashScreen";

const syne = Syne({
  subsets: ["latin"],
  weight: ["400", "600", "700", "800"],
  variable: "--font-syne",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lumina | Luxury Real Estate in Lagos & Abuja",
  description:
    "Lumina is a luxury real estate company offering premium properties across Lagos, Abuja, and select African cities.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={syne.variable}>
      <head>
        <link rel="icon" href="/images/favicon.svg" />
      </head>
      <body>
        <SplashScreen />
        <SmoothScroll />
        <div id="wrapper">
          <PageTransition>{children}</PageTransition>
        </div>
      </body>
    </html>
  );
}
