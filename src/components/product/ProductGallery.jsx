"use client";
import { useState, useRef } from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Thumbs } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/swiper-bundle.css";

export default function ProductGallery({ images }) {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const swiperRef = useRef(null);

  return (
    <div className="flex flex-col gap-2 w-full sm:mt-4">
      {/* ── MAIN SWIPER */}
      <div className="relative w-full">
        <Swiper
          onSwiper={(swiper) => (swiperRef.current = swiper)}
          spaceBetween={10}
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Thumbs]}
          className="w-full"
        >
          {images.map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full" style={{ aspectRatio: "3 / 4" }}>
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 45vw"
                  className="object-cover"
                  quality={95}
                  priority={index === 0}
                />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* ── CUSTOM ARROWS — bottom left, blur, fully rounded */}
        <div className="absolute bottom-4 left-4 z-10 flex gap-2">
          <button
            onClick={() => swiperRef.current?.slidePrev()}
            className="w-9 h-9 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center hover:bg-white/60 transition-colors"
            aria-label="Previous image"
          >
            <ChevronLeft size={18} strokeWidth={1.75} />
          </button>
          <button
            onClick={() => swiperRef.current?.slideNext()}
            className="w-9 h-9 rounded-full bg-white/40 backdrop-blur-md flex items-center justify-center hover:bg-white/60 transition-colors"
            aria-label="Next image"
          >
            <ChevronRight size={18} strokeWidth={1.75} />
          </button>
        </div>
      </div>

      {/* ── THUMBNAIL SWIPER */}
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={8}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Thumbs]}
        className="w-full "
      >
        {images.map((img, index) => (
          <SwiperSlide
            key={index}
            className="cursor-pointer opacity-50 [&.swiper-slide-thumb-active]:opacity-100 [&.swiper-slide-thumb-active]:border-2 [&.swiper-slide-thumb-active]:border-black"
          >
            <div className="relative w-full " style={{ aspectRatio: "3 / 4" }}>
              <Image
                src={img.url}
                alt={img.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 45vw"
                className="object-cover"
                quality={70}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
