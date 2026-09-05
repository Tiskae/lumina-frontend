import styles from "./SectionHeading.module.scss";

interface SectionHeadingProps {
  subtitle?: string;
  title: React.ReactNode;
  theme?: "dark" | "light";
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeading({
  subtitle,
  title,
  theme = "dark",
  align = "left",
  className = "",
}: SectionHeadingProps) {
  const classes = [
    styles.headingSection,
    theme === "light" ? styles.light : "",
    align === "center" ? styles.center : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes}>
      {subtitle && (
        <div className={styles.subTitle}>
          <span className={styles.dot} />
          <span>{subtitle}</span>
        </div>
      )}
      <h2 className={styles.title}>{title}</h2>
    </div>
  );
}
