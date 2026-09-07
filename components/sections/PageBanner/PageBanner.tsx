import Link from "next/link";
import styles from "./PageBanner.module.scss";
import clsx from "clsx";

interface BreadcrumbItem {
  label: string;
  href?: string;
}

interface PageBannerProps {
  title: string;
  subtitle?: string;
  breadcrumbs: BreadcrumbItem[];
  style?: "default" | "style2";
}

export default function PageBanner({ title, subtitle, breadcrumbs, style = "default" }: PageBannerProps) {
  return (
    <section className={`${styles.pageBanner} ${style === "style2" ? styles.style2 : ""}`}>
      <div className={clsx("tf-container", styles.contentWrap)}>
        <h1 className={styles.title}>{title}</h1>

        {subtitle && <p className={styles.subtitle}>{subtitle}</p>}

        {/* <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          {breadcrumbs.map((crumb, i) => (
            <span key={crumb.label} style={{ display: "inline-flex", gap: 8, alignItems: "center" }}>
              {i > 0 && <span className={styles.sep}>/</span>}
              {crumb.href ? (
                <Link href={crumb.href}>{crumb.label}</Link>
              ) : (
                <span className={styles.current}>{crumb.label}</span>
              )}
            </span>
          ))}
        </nav> */}
      </div>
    </section>
  );
}
