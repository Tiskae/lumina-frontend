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
  smallerHeading?: boolean;
  hasBg?: boolean;
  bgURL?: string;
}

export default function PageBanner({
  title,
  subtitle,
  breadcrumbs,
  style = "default",
  smallerHeading,
  hasBg,
  bgURL,
}: PageBannerProps) {
  return (
    <section
      className={clsx(
        styles.pageBanner,
        style === "style2" && styles.style2,
        smallerHeading && styles.smallerHeading,
        hasBg && styles.hasBg,
      )}
      style={hasBg && bgURL ? { backgroundImage: `url(${bgURL})` } : undefined}
    >
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
