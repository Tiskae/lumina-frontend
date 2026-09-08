import Link from "next/link";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import styles from "./CategorySection.module.scss";

const categories = [
  { name: "Apartments", count: 4, icon: "icon-Apartments", href: "/properties?type=apartment" },
  { name: "Villas & Estates", count: 5, icon: "icon-Villa", href: "/properties?type=villa" },
  { name: "Townhouses", count: 1, icon: "icon-Townhouse", href: "/properties?type=townhouse" },
  { name: "For Sale", count: 8, icon: "icon-Heart", href: "/properties?status=for-sale" },
  { name: "For Rent", count: 2, icon: "icon-House", href: "/properties?status=for-rent" },
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
