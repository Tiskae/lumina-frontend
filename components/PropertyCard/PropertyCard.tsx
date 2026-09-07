import Image from "next/image";
import Link from "next/link";
import styles from "./PropertyCard.module.scss";

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
  agent?: string;
  yearBuilt?: number;
  latitude?: number;
  longitude?: number;
}

interface PropertyCardProps {
  property: Property;
  variant?: "default" | "style1" | "list";
}

const STATUS_LABELS: Record<Property["status"], string> = {
  "for-sale": "For Sale",
  "for-rent": "For Rent",
  new: "New",
};

export default function PropertyCard({ property, variant = "default" }: PropertyCardProps) {
  const { slug, title, price, status, type, beds, baths, sqft, image, address, gallery } = property;

  /* ── List variant ─────────────────────────────────────────────────────────── */
  if (variant === "list") {
    const img1 = gallery?.[0] ?? image;
    const img2 = gallery?.[1] ?? image;

    return (
      <div className={`${styles.cardHouse} ${styles.styleList}`}>
        {/* Two images */}
        <div className={styles.imagesWrap}>
          <Link href={`/properties/${slug}`} className={styles.listImgItem}>
            <Image src={img1} alt={title} fill style={{ objectFit: "cover" }} />
          </Link>
          <Link href={`/properties/${slug}`} className={styles.listImgItem}>
            <Image src={img2} alt={title} fill style={{ objectFit: "cover" }} />
          </Link>
        </div>

        {/* Content */}
        <div className={styles.listContent}>
          {/* Price + tags */}
          <div className={styles.listPricingRow}>
            <div className={styles.listPrice}>{price}</div>
            <div className={styles.listTags}>
              <span className={styles.listTag}>{STATUS_LABELS[status]}</span>
              <span className={styles.listTag} style={{ textTransform: "capitalize" }}>{type}</span>
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

          {/* Action buttons */}
          <div className={styles.listBtns}>
            <Link href={`/properties/${slug}`} className="tf-btn btn-bg-1 rounded-8">
              <span>View Details</span>
              <span className="bg-effect" />
            </Link>
            <button className="tf-btn btn-border rounded-8">
              <span>Compare</span>
              <span className="bg-effect" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  /* ── Default / style1 variant ─────────────────────────────────────────────── */
  const variantClass = variant === "style1" ? styles.style1 : styles.styleDefault;

  return (
    <div className={`${styles.cardHouse} ${variantClass} hover-image`}>
      <Link href={`/properties/${slug}`} className={styles.imgStyle}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={280}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
      </Link>

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
            <i className="icon icon-Crop" />
            <span>{price}</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
