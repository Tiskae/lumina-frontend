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

export default function PropertyCard({
  property,
  variant = "default",
}: PropertyCardProps) {
  const { slug, title, price, status, beds, baths, sqft, image, tag } =
    property;

  const variantClass =
    variant === "style1"
      ? styles.style1
      : variant === "list"
        ? styles.styleList
        : styles.styleDefault;

  if (variant === "list") {
    return (
      <div className={`${styles.cardHouse} ${styles.styleList} hover-image`}>
        <div className={styles.wrapImg}>
          <Link href={`/properties/${slug}`} className={styles.imgStyle}>
            <Image
              src={image}
              alt={title}
              width={280}
              height={220}
              style={{ objectFit: "cover" }}
            />
          </Link>
        </div>

        <div className={styles.content}>
          <div className="d-flex gap_8 mb_8">
            <div className={styles.wrapTag}>
              <span className={styles.tag}>{STATUS_LABELS[status]}</span>
            </div>
            {tag && (
              <div className={styles.wrapTag}>
                <span className={styles.tag}>{tag}</span>
              </div>
            )}
          </div>

          <div className={styles.price}>{price}</div>
          <h5 className={styles.title}>
            <Link href={`/properties/${slug}`}>{title}</Link>
          </h5>

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
          </ul>

          <div className={styles.wrapBtn}>
            <Link href={`/properties/${slug}`} className="tf-btn btn-bg-1">
              <span>View Details</span>
              <span className="bg-effect" />
            </Link>
            <button className="tf-btn btn-border">
              <i className="icon icon-Heart" />
              <span>Save</span>
              <span className="bg-effect" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`${styles.cardHouse} ${variantClass} hover-image`}
    >
      <Link href={`/properties/${slug}`} className={styles.imgStyle}>
        <Image
          src={image}
          alt={title}
          width={400}
          height={280}
          style={{ objectFit: "cover", width: "100%", height: "100%" }}
        />
        <div className={styles.wrapTag}>
          <span className={styles.tag}>{STATUS_LABELS[status]}</span>
          {tag && <span className={styles.tag}>{tag}</span>}
        </div>
      </Link>

      {variant === "default" && (
        <div className={styles.wrapBtn}>
          <Link
            href={`/properties/${slug}`}
            className={`tf-btn btn-bg-white ${styles.quickView}`}
          >
            <span>Quick View</span>
            <span className="bg-effect" />
          </Link>
          <button className={`tf-btn btn-border ${styles.compare}`}>
            <span>Compare</span>
            <span className="bg-effect" />
          </button>
        </div>
      )}

      <div className={variant === "style1" ? styles.content : ""}>
        <div className={styles.price}>{price}</div>
        <h5 className={styles.title}>
          <Link href={`/properties/${slug}`}>{title}</Link>
        </h5>

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
        </ul>
      </div>
    </div>
  );
}
