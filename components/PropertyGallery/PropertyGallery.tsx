"use client";

import { useState } from "react";
import Image from "next/image";
import styles from "./PropertyGallery.module.scss";

interface Props {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);

  return (
    <div className={styles.gallery}>
      {/* Main image */}
      <div className={styles.mainWrap}>
        <Image
          src={images[active]}
          alt={`${title} — image ${active + 1}`}
          fill
          style={{ objectFit: "cover" }}
          priority
        />
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className={styles.thumbStrip}>
          {images.map((img, i) => (
            <button
              key={i}
              className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
              onClick={() => setActive(i)}
              onMouseEnter={() => setActive(i)}
              aria-label={`View image ${i + 1}`}
            >
              <Image src={img} alt={`${title} thumbnail ${i + 1}`} fill style={{ objectFit: "cover" }} />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
