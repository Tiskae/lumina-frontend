"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import styles from "./PropertyImageCarousel.module.scss";

interface Props {
  images: string[];
  href: string;
  alt: string;
  /** Unique per card — used to scope navigation buttons */
  id: string;
}

export default function PropertyImageCarousel({ images, href, alt, id }: Props) {
  const swiperRef = useRef<SwiperType | null>(null);
  const prevClass = `c-prev-${id}`;
  const nextClass = `c-next-${id}`;
  const hasMultiple = images.length > 1;

  return (
    <div
      className={styles.wrap}
      onMouseEnter={() => swiperRef.current?.autoplay?.pause()}
      onMouseLeave={() => swiperRef.current?.autoplay?.resume()}
    >
      <Swiper
        modules={[Autoplay, Navigation]}
        slidesPerView={1}
        loop={hasMultiple}
        speed={700}
        autoplay={hasMultiple ? { delay: 3500, disableOnInteraction: false } : false}
        navigation={
          hasMultiple
            ? { prevEl: `.${prevClass}`, nextEl: `.${nextClass}` }
            : false
        }
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        className={styles.swiper}
        touchStartPreventDefault={false}
      >
        {images.map((img, i) => (
          <SwiperSlide key={i} className={styles.slide}>
            <Link href={href} className={styles.imgLink} tabIndex={i === 0 ? 0 : -1}>
              <Image
                src={img}
                alt={`${alt} – photo ${i + 1}`}
                fill
                style={{ objectFit: "cover" }}
                sizes="(max-width: 767px) 100vw, (max-width: 1199px) 50vw, 400px"
              />
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {hasMultiple && (
        <>
          <button className={`${styles.navBtn} ${styles.navPrev} ${prevClass}`} aria-label="Previous photo">
            <i className="icon icon-CaretLeft" />
          </button>
          <button className={`${styles.navBtn} ${styles.navNext} ${nextClass}`} aria-label="Next photo">
            <i className="icon icon-CaretRight" />
          </button>
        </>
      )}
    </div>
  );
}
