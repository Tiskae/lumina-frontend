import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/SectionHeading/SectionHeading";
import styles from "./GallerySection.module.scss";

//
//  Layout — 6 cols × 4 rows:
//
//  Col:  1      2      3      4      5      6
//  Row1: [p1] [  m1   ] [sm1] [sm2] [p2]
//  Row2: [p1] [  m1   ] [sm3] [sm4] [p2]
//  Row3: [sm5][sm6]  [p3]  [  m2   ] [p4]
//  Row4: [sm7][sm8]  [p3]  [  m2   ] [p4]
//
//  p  = portrait (1 col × 2 rows) ≈ square
//  m  = medium   (2 cols × 2 rows) ≈ 2:1 landscape
//  sm = small    (1 col × 1 row)   ≈ 2:1 landscape

const items = [
  {
    image: "/images/properties/09-camps-bay-beach-house/01.jpeg",
    title: "Camps Bay Mansion, Cape Town",
    href: "/properties/camps-bay-beach-house",
    span: "p1",
  },
  {
    image: "/images/properties/05-banana-island-penthouse/02.jpeg",
    title: "Banana Island Penthouse",
    href: "/properties/banana-island-penthouse",
    span: "m1",
  },
  {
    image: "/images/properties/01-lumina-heights-ikoyi/04.jpeg",
    title: "Lumina Heights, Ikoyi",
    href: "/properties/lumina-heights-ikoyi",
    span: "sm1",
  },
  {
    image: "/images/properties/02-meridian-villa-lekki/01.jpeg",
    title: "Meridian Villa, Lekki",
    href: "/properties/meridian-villa-lekki",
    span: "sm2",
  },
  {
    image: "/images/properties/10-east-legon-mansion-accra/01.jpeg",
    title: "East Legon Mansion, Accra",
    href: "/properties/east-legon-mansion-accra",
    span: "p2",
  },
  {
    image: "/images/properties/04-asokoro-manor-abuja/03.jpeg",
    title: "Asokoro Manor, Abuja",
    href: "/properties/asokoro-manor-abuja",
    span: "sm3",
  },
  {
    image: "/images/properties/03-victoria-crown/02.jpeg",
    title: "Victoria Crown, VI",
    href: "/properties/victoria-crown-vi",
    span: "sm4",
  },
  {
    image: "/images/properties/08-guzape-residence-abuja/04.jpeg",
    title: "Guzape Residence, Abuja",
    href: "/properties/guzape-residence-abuja",
    span: "sm5",
  },
  {
    image: "/images/properties/07-oniru-estate/03.jpeg",
    title: "Oniru Estate, Lagos",
    href: "/properties/oniru-estate-lagos",
    span: "sm6",
  },
  {
    image: "/images/properties/06-maitama-townhouse/04.jpeg",
    title: "Maitama Townhouse, Abuja",
    href: "/properties/maitama-townhouse-abuja",
    span: "p3",
  },
  {
    image: "/images/properties/09-camps-bay-beach-house/07.jpeg",
    title: "Camps Bay Mansion, Cape Town",
    href: "/properties/camps-bay-beach-house",
    span: "m2",
  },
  {
    image: "/images/properties/05-banana-island-penthouse/06.jpeg",
    title: "Banana Island Penthouse",
    href: "/properties/banana-island-penthouse",
    span: "p4",
  },
  {
    image: "/images/properties/01-lumina-heights-ikoyi/07.jpeg",
    title: "Lumina Heights, Ikoyi",
    href: "/properties/lumina-heights-ikoyi",
    span: "sm7",
  },
  {
    image: "/images/properties/10-east-legon-mansion-accra/04.jpeg",
    title: "East Legon Mansion, Accra",
    href: "/properties/east-legon-mansion-accra",
    span: "sm8",
  },
];

export default function GallerySection() {
  return (
    <section className={styles.section}>
      <div className="tf-container">
        <SectionHeading
          subtitle="Our Portfolio"
          title="A Glimpse of Lumina"
          align="center"
          className={styles.heading}
        />
      </div>

      <div className={styles.gridWrap}>
        <div className={styles.grid}>
          {items.map((item) => (
            <Link key={`${item.href}-${item.span}`} href={item.href} className={`${styles.item} ${styles[item.span]}`}>
              <Image
                src={item.image}
                alt={item.title}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 50vw, 25vw"
              />
              <div className={styles.overlay} />
              <div className={styles.label}>
                <span>{item.title}</span>
                <i className="icon icon-ArrowRight" />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
