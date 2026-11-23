"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import { Icon } from "@/components/shared/Icon";
import type { SliderImage } from "@/lib/types";

export type ImageSliderProps = {
  images: SliderImage[];
  title?: string;
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  className?: string;
};

export function ImageSlider({
  images,
  title,
  autoPlayInterval = 5000,
  showThumbnails = false,
  className = "",
}: ImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const total = images.length;

  const goTo = useCallback(
    (index: number) => {
      if (total === 0) return;
      setCurrentIndex((index + total) % total);
    },
    [total]
  );

  const prev = useCallback(() => goTo(currentIndex - 1), [goTo, currentIndex]);
  const next = useCallback(() => goTo(currentIndex + 1), [goTo, currentIndex]);

  // Autoplay
  useEffect(() => {
    if (total <= 1 || isPaused || autoPlayInterval <= 0) return;
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % total);
    }, autoPlayInterval);
    return () => clearInterval(timer);
  }, [total, isPaused, autoPlayInterval]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  if (!images || images.length === 0) return null;

  const activeImage = images[currentIndex];

  return (
    <div
      ref={containerRef}
      className={`slider ${className}`}
      role="region"
      aria-roledescription="carousel"
      aria-label={title || "Image gallery"}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      <div className="slider__stage">
        <div className="slider__image-wrapper">
          <Image
            key={activeImage.src}
            src={activeImage.src}
            alt={activeImage.alt || title || "Photograph"}
            fill
            sizes="(max-width: 48rem) 95vw, (max-width: 64rem) 45vw, 36rem"
            className="slider__image"
            priority={currentIndex === 0}
            unoptimized
          />
        </div>

        {total > 1 && (
          <>
            <button
              type="button"
              className="slider__btn slider__btn--prev"
              onClick={prev}
              aria-label="Previous photograph"
            >
              <Icon name="chevronLeft" size={22} />
            </button>
            <button
              type="button"
              className="slider__btn slider__btn--next"
              onClick={next}
              aria-label="Next photograph"
            >
              <Icon name="chevronRight" size={22} />
            </button>
          </>
        )}

        <div className="slider__badge">
          {currentIndex + 1} / {total}
        </div>

        {activeImage.caption && (
          <div className="slider__caption">
            <p>{activeImage.caption}</p>
          </div>
        )}
      </div>

      {total > 1 && (
        <div className="slider__nav">
          <div className="slider__dots" role="tablist" aria-label="Slides">
            {images.map((img, idx) => (
              <button
                key={img.src + idx}
                type="button"
                role="tab"
                aria-selected={idx === currentIndex}
                aria-label={`Go to photograph ${idx + 1}`}
                className={`slider__dot ${idx === currentIndex ? "is-active" : ""}`}
                onClick={() => goTo(idx)}
              />
            ))}
          </div>

          {showThumbnails && (
            <div className="slider__thumbs">
              {images.map((img, idx) => (
                <button
                  key={`thumb-${img.src}-${idx}`}
                  type="button"
                  aria-label={`Thumbnail ${idx + 1}`}
                  className={`slider__thumb ${idx === currentIndex ? "is-active" : ""}`}
                  onClick={() => goTo(idx)}
                >
                  <Image
                    src={img.src}
                    alt=""
                    width={72}
                    height={54}
                    className="slider__thumb-img"
                    unoptimized
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
