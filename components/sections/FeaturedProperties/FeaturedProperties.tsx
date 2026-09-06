import PropertyCard from "@/components/PropertyCard/PropertyCard";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import type { Property } from "@/components/PropertyCard/PropertyCard";
import AnimateOnScroll from "@/components/AnimateOnScroll/AnimateOnScroll";
import Link from "next/link";
import styles from "./FeaturedProperties.module.scss";

interface FeaturedPropertiesProps {
  properties: Property[];
}

export default function FeaturedProperties({ properties }: FeaturedPropertiesProps) {
  const featured = properties.slice(0, 6);

  return (
    <section className={styles.section}>
      <div className="tf-container">
        <div className={styles.header}>
          <SectionHeading
            subtitle="Featured Properties"
            title={
              <>
                Handpicked for the <br />
                Discerning Buyer
              </>
            }
          />
          <div className={styles.viewAll}>
            <Link href="/listings" className="tf-btn btn-border btn-px-28">
              <span>View All Properties</span>
              <i className="icon icon-ArowRight" />
              <span className="bg-effect" />
            </Link>
          </div>
        </div>

        <div className={styles.grid}>
          {featured.map((property, i) => (
            <AnimateOnScroll key={property.id} direction={i % 2 === 0 ? "1" : "4"} delay={i * 0.1}>
              <PropertyCard property={property} variant="default" />
            </AnimateOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
