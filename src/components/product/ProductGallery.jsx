"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "swiper/swiper-bundle.css";

export default function ProductGallery({ images }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef(null);

  if (!images || images.length === 0) return null;

  return (
    <div className="w-full">
      <div className="relative w-full aspect-[3/4]">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
          spaceBetween={0}
          modules={[FreeMode]}
          style={{ height: "100%" }}
          className="w-full h-full sm:rounded-xl"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index} style={{ height: "100%" }}>
              <div className="relative w-full h-full">
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                  className="object-cover object-top sm:rounded-xl"
                  quality={95}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── MOBILE: counter top left */}
        <div className="lg:hidden absolute top-3 left-3 z-10">
          <span className="font-body text-sm text-foreground bg-white/70 backdrop-blur-sm px-2 py-1">
            {activeIndex + 1} / {images.length}
          </span>
        </div>

        {/* ── MOBILE: arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="lg:hidden absolute left-3 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-white/60 backdrop-blur-md
            border border-white/40 flex items-center justify-center
            active:bg-white/80 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="lg:hidden absolute right-3 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-white/60 backdrop-blur-md
            border border-white/40 flex items-center justify-center
            active:bg-white/80 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>

        {/* ── DESKTOP: arrows */}
        <button
          onClick={() => swiperRef.current?.slidePrev()}
          className="hidden lg:flex absolute left-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-white/60 backdrop-blur-md
            border border-white/40 items-center justify-center
            hover:bg-white/80 transition-all"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} strokeWidth={2} />
        </button>
        <button
          onClick={() => swiperRef.current?.slideNext()}
          className="hidden lg:flex absolute right-4 top-1/2 -translate-y-1/2 z-10
            w-10 h-10 rounded-full bg-white/60 backdrop-blur-md
            border border-white/40 items-center justify-center
            hover:bg-white/80 transition-all"
          aria-label="Next image"
        >
          <ChevronRight size={18} strokeWidth={2} />
        </button>

        {/* ── DESKTOP: counter bottom right */}
        <div className="hidden lg:block absolute bottom-4 right-4 z-10">
          <span className="font-body text-sm text-foreground bg-white/70 backdrop-blur-sm px-2 py-1">
            {activeIndex + 1} / {images.length}
          </span>
        </div>
      </div>
    </div>
  );
}
