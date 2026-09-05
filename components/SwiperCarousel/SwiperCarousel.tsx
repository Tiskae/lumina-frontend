"use client";

import { useEffect, useRef } from "react";

interface SwiperConfig {
  preview?: number;
  xl?: number;
  lg?: number;
  tablet?: number;
  mobile?: number;
  spacing?: number;
  autoplay?: boolean;
  loop?: boolean;
  effect?: "slide" | "fade";
  navigation?: boolean;
  pagination?: boolean;
  speed?: number;
  autoplayDelay?: number;
}

interface SwiperCarouselProps {
  id: string;
  config: SwiperConfig;
  children: React.ReactNode;
  className?: string;
  navigationPrev?: string;
  navigationNext?: string;
  paginationEl?: string;
}

export default function SwiperCarousel({
  id,
  config,
  children,
  className = "",
  navigationPrev,
  navigationNext,
  paginationEl,
}: SwiperCarouselProps) {
  const swiperRef = useRef<{ destroy: (a: boolean, b: boolean) => void } | null>(null);

  useEffect(() => {
    const init = async () => {
      const [
        { default: Swiper },
        { Navigation, Pagination, Autoplay, EffectFade },
      ] = await Promise.all([
        import("swiper"),
        import("swiper/modules"),
      ]);

      const el = document.getElementById(id);
      if (!el) return;

      const modules = [Navigation, Pagination, Autoplay, EffectFade].filter(
        Boolean
      );

      swiperRef.current = new Swiper(el as HTMLElement, {
        modules,
        slidesPerView: config.mobile ?? 1,
        spaceBetween: config.spacing ?? 24,
        loop: config.loop ?? false,
        speed: config.speed ?? 600,
        effect: config.effect ?? "slide",
        fadeEffect:
          config.effect === "fade" ? { crossFade: true } : undefined,
        autoplay: config.autoplay
          ? {
              delay: config.autoplayDelay ?? 3000,
              disableOnInteraction: false,
            }
          : false,
        navigation: config.navigation
          ? {
              prevEl: navigationPrev ?? `.${id}-prev`,
              nextEl: navigationNext ?? `.${id}-next`,
            }
          : false,
        pagination: config.pagination
          ? {
              el: paginationEl ?? `.${id}-pagination`,
              clickable: true,
            }
          : false,
        breakpoints: {
          576: { slidesPerView: config.tablet ?? config.mobile ?? 1 },
          992: { slidesPerView: config.lg ?? config.tablet ?? 2 },
          1200: { slidesPerView: config.xl ?? config.lg ?? 3 },
          1441: { slidesPerView: config.preview ?? config.xl ?? 3 },
        },
      });
    };

    init();

    return () => {
      swiperRef.current?.destroy(true, true);
    };
  }, [id]); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div id={id} className={`swiper ${className}`}>
      <div className="swiper-wrapper">{children}</div>

      {config.navigation && (
        <>
          <button
            className={`swiper-btn-prev ${navigationPrev ?? `${id}-prev`}`}
            aria-label="Previous slide"
          />
          <button
            className={`swiper-btn-next ${navigationNext ?? `${id}-next`}`}
            aria-label="Next slide"
          />
        </>
      )}

      {config.pagination && (
        <div className={paginationEl ?? `${id}-pagination`} />
      )}
    </div>
  );
}
