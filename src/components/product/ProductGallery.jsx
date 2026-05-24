"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export default function ProductGallery({ images }) {
  // ── Track which image is currently showing
  const [activeIndex, setActiveIndex] = useState(0);

  // ── Touch swipe tracking refs
  const touchStartX = useRef(null);
  const touchEndX = useRef(null);

  // ── Go to previous image — loops back to last when at first
  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  // ── Go to next image — loops back to first when at last
  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  // ── Record where touch started
  const handleTouchStart = (e) => {
    touchStartX.current = e.targetTouches[0].clientX;
  };

  // ── Record where finger is moving
  const handleTouchMove = (e) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  // ── Calculate swipe direction when finger lifts
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;

    const distance = touchStartX.current - touchEndX.current;

    // ── Swipe left → next image
    if (distance > 50) handleNext();

    // ── Swipe right → previous image
    if (distance < -50) handlePrev();

    // ── Reset touch values
    touchStartX.current = null;
    touchEndX.current = null;
  };

  return (
    <div className="flex gap-0 w-full">
      {/* ── LEFT THUMBNAILS
          Hidden on mobile and tablet
          Only shows on desktop lg+
          Clicking sets that image as active */}
      <div className="hidden lg:flex flex-col gap-2 w-16 shrink-0 px-1 ">
        {images.map((img, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            aria-label={`View image ${index + 1}`}
            className={`
              relative w-full aspect-[3/4] overflow-hidden border-2 sm:rounded-xl
              transition-all duration-200
              ${
                activeIndex === index
                  ? "border-foreground"
                  : "border-transparent hover:border-border"
              }
            `}
          >
            <Image
              src={img}
              alt={`Product view ${index + 1}`}
              fill
              sizes="64px"
              className="object-cover object-center sm:rounded-md"
              quality={80}
            />
          </button>
        ))}
      </div>

      {/* ── MAIN IMAGE
          Full width on mobile — no thumbnails
          Takes remaining space on desktop
          Touch swipe enabled on mobile */}
      <div
        className="relative flex-1 overflow-hidden bg-background"
        style={{ height: "clamp(400px, 75vh, 550px)" }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <Image
          src={images[activeIndex]}
          alt="Product main image"
          width={800}
          height={1000}
          className="w-full h-full object-cover transition-opacity duration-300 sm:rounded-md"
          quality={95}
          priority
        />

        {/* ── LEFT ARROW
            Hidden on mobile — desktop only
            Goes to previous image */}
        <button
          onClick={handlePrev}
          className="hidden lg:flex absolute left-3 top-1/2 -translate-y-1/2 
             w-9 h-9 
             bg-background/60 
             backdrop-blur-md 
             rounded-full 
             items-center justify-center 
             hover:bg-background/80 
             transition-colors"
          aria-label="Previous image"
        >
          <ChevronLeft size={20} strokeWidth={1.75} />
        </button>

        <button
          onClick={handleNext}
          className="hidden lg:flex absolute right-3 top-1/2 -translate-y-1/2 
             w-9 h-9 
             bg-background/60 
             backdrop-blur-md 
             rounded-full 
             items-center justify-center 
             hover:bg-background/80 
             transition-colors"
          aria-label="Next image"
        >
          <ChevronRight size={20} strokeWidth={1.75} />
        </button>

        {/* ── BOTTOM INDICATOR
            Mobile: dots — tap to jump to image
            Desktop: number counter "1 / 3" */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 lg:left-auto lg:translate-x-0 lg:right-3 flex items-center gap-1.5">
          {/* ── Dots — mobile only */}
          <div className="flex lg:hidden items-center gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                aria-label={`Go to image ${index + 1}`}
                className={`
                  h-1.5 rounded-full transition-all duration-200
                  ${
                    activeIndex === index
                      ? "bg-foreground w-3"
                      : "bg-foreground/40 w-1.5"
                  }
                `}
              />
            ))}
          </div>

          {/* ── Number counter — desktop only */}
          <div className="hidden lg:block bg-background/70 dark:bg-background/50 px-2 py-1">
            <span className="font-body text-xs text-foreground">
              {activeIndex + 1} / {images.length}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
