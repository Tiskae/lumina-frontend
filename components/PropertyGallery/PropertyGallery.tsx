"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import styles from "./PropertyGallery.module.scss";

interface Props {
  images: string[];
  title: string;
}

export default function PropertyGallery({ images, title }: Props) {
  const [active, setActive] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const total = images.length;

  const goPrev = useCallback((i: number) => (i - 1 + total) % total, [total]);
  const goNext = useCallback((i: number) => (i + 1) % total, [total]);

  // Keyboard on main gallery (must be focused)
  function handleGalleryKey(e: React.KeyboardEvent) {
    if (e.key === "ArrowLeft") setActive((i) => goPrev(i));
    if (e.key === "ArrowRight") setActive((i) => goNext(i));
    if (e.key === "Enter") openLightbox(active);
  }

  // Keyboard for lightbox — global listener while open
  useEffect(() => {
    if (!lightboxOpen) return;
    function onKey(e: KeyboardEvent) {
      if (e.key === "ArrowLeft") setLightboxIndex((i) => goPrev(i));
      if (e.key === "ArrowRight") setLightboxIndex((i) => goNext(i));
      if (e.key === "Escape") setLightboxOpen(false);
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxOpen, goPrev, goNext]);

  // Touch swipe on main image
  function onTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX;
  }
  function onTouchEnd(e: React.TouchEvent) {
    if (touchStartX.current === null) return;
    const delta = touchStartX.current - e.changedTouches[0].clientX;
    if (Math.abs(delta) > 40) setActive((i) => (delta > 0 ? goNext(i) : goPrev(i)));
    touchStartX.current = null;
  }

  function openLightbox(idx: number) {
    setLightboxIndex(idx);
    setLightboxOpen(true);
  }

  return (
    <>
      <div className={styles.gallery}>
        {/* ── Main image ──────────────────────────────────────────────── */}
        <div
          className={styles.mainWrap}
          tabIndex={0}
          onKeyDown={handleGalleryKey}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          onClick={() => openLightbox(active)}
          role="button"
          aria-label="Open fullscreen gallery"
        >
          <Image
            src={images[active]}
            alt={`${title} — image ${active + 1}`}
            fill
            style={{ objectFit: "cover" }}
            priority
          />

          {/* Expand hint */}
          <div className={styles.expandHint} aria-hidden>
            <i className="icon icon-ArrowsOut" />
          </div>

          {/* Prev / Next arrows */}
          {total > 1 && (
            <>
              <button
                className={`${styles.navBtn} ${styles.navPrev}`}
                onClick={(e) => { e.stopPropagation(); setActive((i) => goPrev(i)); }}
                aria-label="Previous image"
              >
                <i className="icon icon-CaretLeft" />
              </button>
              <button
                className={`${styles.navBtn} ${styles.navNext}`}
                onClick={(e) => { e.stopPropagation(); setActive((i) => goNext(i)); }}
                aria-label="Next image"
              >
                <i className="icon icon-CaretRight" />
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div className={styles.dots} onClick={(e) => e.stopPropagation()}>
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.dot} ${i === active ? styles.dotActive : ""}`}
                  onClick={() => setActive(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* ── Thumbnail strip ─────────────────────────────────────────── */}
        {total > 1 && (
          <div className={styles.thumbStrip}>
            {images.map((img, i) => (
              <button
                key={i}
                className={`${styles.thumb} ${i === active ? styles.thumbActive : ""}`}
                onMouseEnter={() => setActive(i)}
                onClick={() => openLightbox(i)}
                aria-label={`View image ${i + 1}`}
              >
                <Image src={img} alt={`${title} thumbnail ${i + 1}`} fill style={{ objectFit: "cover" }} />
              </button>
            ))}
          </div>
        )}
      </div>

      {/* ── Lightbox ──────────────────────────────────────────────────── */}
      {lightboxOpen && (
        <div
          className={styles.lightboxOverlay}
          onClick={() => setLightboxOpen(false)}
          role="dialog"
          aria-modal
          aria-label="Image lightbox"
        >
          {/* Close */}
          <button
            className={styles.lightboxClose}
            onClick={() => setLightboxOpen(false)}
            aria-label="Close"
          >
            <i className="icon icon-close" />
          </button>

          {/* Counter */}
          <div className={styles.lightboxCounter}>
            {lightboxIndex + 1} / {total}
          </div>

          {/* Image */}
          <div
            className={styles.lightboxImgWrap}
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={images[lightboxIndex]}
              alt={`${title} — image ${lightboxIndex + 1}`}
              fill
              style={{ objectFit: "contain" }}
              priority
            />
          </div>

          {/* Prev / Next */}
          {total > 1 && (
            <>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxPrev}`}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => goPrev(i)); }}
                aria-label="Previous image"
              >
                <i className="icon icon-CaretLeft" />
              </button>
              <button
                className={`${styles.lightboxNav} ${styles.lightboxNext}`}
                onClick={(e) => { e.stopPropagation(); setLightboxIndex((i) => goNext(i)); }}
                aria-label="Next image"
              >
                <i className="icon icon-CaretRight" />
              </button>
            </>
          )}

          {/* Dots */}
          {total > 1 && (
            <div
              className={styles.lightboxDots}
              onClick={(e) => e.stopPropagation()}
            >
              {images.map((_, i) => (
                <button
                  key={i}
                  className={`${styles.lightboxDot} ${i === lightboxIndex ? styles.lightboxDotActive : ""}`}
                  onClick={() => setLightboxIndex(i)}
                  aria-label={`Image ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}
