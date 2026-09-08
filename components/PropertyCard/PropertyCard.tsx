import Link from "next/link";
import PropertyImageCarousel from "@/components/PropertyImageCarousel/PropertyImageCarousel";
import styles from "./PropertyCard.module.scss";
import clsx from "clsx";

export interface PropertyDetail {
  label: string;
  value: string;
}

export interface PropertyNearby {
  place: string;
  distance: string;
}

export interface Property {
  id: string;
  slug: string;
  title: string;
  price: string;
  priceRaw?: number;
  status: "for-sale" | "for-rent" | "new";
  type: "apartment" | "villa" | "townhouse" | "commercial";
  city: string;
  state?: string;
  address?: string;
  beds: number;
  baths: number;
  sqft: number;
  garages?: number;
  image: string;
  gallery?: string[];
  tag?: string;
  featured?: boolean;
  description?: string;
  amenities?: string[];
  details?: PropertyDetail[];
  utilities?: string[];
  nearby?: PropertyNearby[];
  agent?: string;
  yearBuilt?: number;
  latitude?: number;
  longitude?: number;
  currencyCode?: string;
}

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "style1" | "list";
  whiteBg?: boolean;
}

const STATUS_LABELS: Record<Property["status"], string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  new: "New",
};

function getImages(property: Property): string[] {
  const gallery = property.gallery?.filter(Boolean) ?? [];
  return gallery.length > 0 ? gallery : [property.image];
}

export default function PropertyCard({ property, variant = "default", whiteBg }: PropertyCardProps) {
  const { slug, title, price, status, type, beds, baths, sqft, address } = property;
  const images = getImages(property);

  /* ── List variant ─────────────────────────────────────────────────────────── */
  if (variant === "list") {
    return (
      <div className={clsx(styles.cardHouse, styles.styleList, whiteBg && styles.whiteBg)}>
        {/* Carousel — fills the left image column */}
        <div className={styles.imagesWrap}>
          <PropertyImageCarousel images={images} href={`/properties/${slug}`} alt={title} id={`list-${slug}`} />
        </div>

        {/* Content */}
        <div className={styles.listContent}>
          {/* Price + tags */}
          <div className={styles.listPricingRow}>
            <div className={styles.listPrice}>{price}</div>
            <div className={styles.listTags}>
              <span className={styles.listTag}>{STATUS_LABELS[status]}</span>
              <span className={styles.listTag} style={{ textTransform: "capitalize" }}>
                {type}
              </span>
            </div>
          </div>

          {/* Title + address */}
          <Link href={`/properties/${slug}`} className={styles.listTitle}>
            {title}
          </Link>
          {address && <div className={styles.listPlace}>{address}</div>}

          {/* Info row */}
          <ul className={styles.listInfo}>
            <li>
              <i className="icon icon-Bed" />
              {beds} Bed
            </li>
            <li>
              <i className="icon icon-Bathtub" />
              {baths} Bath
            </li>
            <li>
              <i className="icon icon-Ruler" />
              {sqft.toLocaleString()} Sqft
            </li>
          </ul>

          {/* Buttons */}
          <div className={styles.listBtns}>
            <Link href={`/properties/${slug}`} className="tf-btn rounded-8">
              <span>View Details</span>
              <span className="bg-effect" />
            </Link>
            {/* <button className="tf-btn btn-border rounded-8">
              <span>Compare</span>
              <span className="bg-effect" />
            </button> */}
          </div>
        </div>
      </div>
    );
  }

  /* ── Default / style1 variant ─────────────────────────────────────────────── */
  const variantClass = variant === "style1" ? styles.style1 : styles.styleDefault;

  return (
    <div className={clsx(styles.cardHouse, variantClass, "hover-image", whiteBg && styles.whiteBg)}>
      {/* Image carousel fills the 280px top grid slot */}
      <div className={styles.imgStyle}>
        <PropertyImageCarousel images={images} href={`/properties/${slug}`} alt={title} id={`grid-${slug}`} />
      </div>

      <div className={styles.title}>
        <h5>{title}</h5>
      </div>

      <div className={styles.content}>
        <ul className={styles.info}>
          <li>
            <i className="icon icon-Bed" />
            <span>{beds} Beds</span>
          </li>
          <li>
            <i className="icon icon-Bathtub" />
            <span>{baths} Baths</span>
          </li>
          <li>
            <i className="icon icon-Crop" />
            <span>{sqft.toLocaleString()} sqft</span>
          </li>
          <li>
            <i className="icon icon-CurrencyCircleDollar" />
            <span>{price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
