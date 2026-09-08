import Link from "next/link";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import styles from "./CategorySection.module.scss";

const categories = [
  { name: "Apartments", count: 124, icon: "icon-Apartments", href: "/properties?type=apartment" },
  { name: "Villas", count: 48, icon: "icon-Villa", href: "/properties?type=villa" },
  { name: "Townhouses", count: 36, icon: "icon-Townhouse", href: "/properties?type=townhouse" },
  { name: "Commercial", count: 21, icon: "icon-Commercial", href: "/properties?type=commercial" },
  { name: "Warehouses", count: 12, icon: "icon-Warehouse", href: "/properties?type=warehouse" },
];

export default function CategorySection() {
  return (
    <section className={styles.section}>
      <div className="tf-container">
        <SectionHeading
          className={styles.heading}
          subtitle="Browse by Type"
          title="Find the Property That Fits Your Life"
          align="center"
        />

        <div className={styles.grid}>
          {categories.map((cat, i) => (
            <AnimateOnScroll key={cat.name} direction="2" delay={i * 0.08}>
              <Link href={cat.href} className={styles.catCard}>
                <div className={styles.iconWrap}>
                  <i className={`icon ${cat.icon}`} />
                </div>
                <div className={styles.catName}>{cat.name}</div>
                <div className={styles.catCount}>{cat.count} properties</div>
              </Link>
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
