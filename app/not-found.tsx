import Link from "next/link";
import PageLayout from "@/components/PageLayout/PageLayout";
import styles from "./NotFound.module.scss";

export const metadata = {
  title: "Page Not Found | Lumina Real Estate",
};

export default function NotFoundPage() {
  return (
    <PageLayout currentPath="/" isAbsolute>
      <div className={styles.wrap}>
        {/* Decorative background number */}
        <div className={styles.bgNumber} aria-hidden>404</div>

        <div className={styles.inner}>
          {/* Icon */}
          <div className={styles.iconWrap}>
            <i className="icon icon-HouseLine" />
          </div>

          {/* Copy */}
          <h1 className={styles.heading}>This address doesn&apos;t exist on our books.</h1>
          <p className={styles.sub}>
            The page you are looking for may have been moved, renamed, or never existed.
            Let us help you find what you are looking for.
          </p>

          {/* CTAs */}
          <div className={styles.btns}>
            <Link href="/" className="tf-btn btn-bg-1">
              <i className="icon icon-House" />
              <span>Back to Home</span>
              <span className="bg-effect" />
            </Link>
            <Link href="/properties" className="tf-btn btn-border">
              <i className="icon icon-MagnifyingGlass" />
              <span>Browse Properties</span>
              <span className="bg-effect" />
            </Link>
          </div>

          {/* Quick links */}
          <div className={styles.quickLinks}>
            <span className={styles.quickLabel}>Or try one of these:</span>
            <div className={styles.linkRow}>
              {[
                { label: "Agents", href: "/agents" },
                { label: "Blog", href: "/blog" },
                { label: "Contact", href: "/contact" },
              ].map((l) => (
                <Link key={l.href} href={l.href} className={styles.quickLink}>
                  {l.label}
                  <i className="icon icon-ArrowRight" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </PageLayout>
  );
}
