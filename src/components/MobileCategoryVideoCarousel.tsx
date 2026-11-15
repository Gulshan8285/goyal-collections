'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';

interface CategoryVideo {
  id: string;
  name: string;
  href: string;
  videoSrc: string;
  posterSrc: string;
}

const CATEGORY_VIDEOS: CategoryVideo[] = [
  {
    id: 'mens-fashion',
    name: "Men's Fashion",
    href: '/category/ready-made-clothes/mens-wear',
    videoSrc: '/videos/cat-mens-fashion.mp4',
    posterSrc: '/videos/poster-mens-fashion.jpg',
  },
  {
    id: 'womens-fashion',
    name: "Women's Fashion",
    href: '/category/ready-made-clothes/womens-wear',
    videoSrc: '/videos/cat-womens-fashion.mp4',
    posterSrc: '/videos/poster-womens-fashion.jpg',
  },
  {
    id: 'mens-footwear',
    name: "Men's Footwear",
    href: '/category/footwear/mens-footwear',
    videoSrc: '/videos/cat-mens-footwear.mp4',
    posterSrc: '/videos/poster-mens-footwear.jpg',
  },
  {
    id: 'womens-footwear',
    name: "Women's Footwear",
    href: '/category/footwear/womens-footwear',
    videoSrc: '/videos/cat-womens-footwear.mp4',
    posterSrc: '/videos/poster-womens-footwear.jpg',
  },
  {
    id: 'kids-fashion',
    name: "Kids' Fashion",
    href: '/category/ready-made-clothes/kids-wear',
    videoSrc: '/videos/cat-kids-fashion.mp4',
    posterSrc: '/videos/poster-kids-fashion.jpg',
  },
];

export default function MobileCategoryVideoCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Duplicate items for continuous seamless loop without jump
  const duplicatedItems = [...CATEGORY_VIDEOS, ...CATEGORY_VIDEOS];

  useEffect(() => {
    // Ensure all videos play muted continuously
    if (containerRef.current) {
      const videos = containerRef.current.querySelectorAll('video');
      videos.forEach((video) => {
        video.muted = true;
        const playPromise = video.play();
        if (playPromise !== undefined) {
          playPromise.catch(() => {});
        }
      });
    }
  }, []);

  return (
    <div className="w-full relative py-2 overflow-hidden select-none" ref={containerRef}>
      {/* Track that smoothly glides infinitely from right to left */}
      <div className="animate-infinite-video-scroll flex gap-3 sm:gap-4 -ml-2">
        {duplicatedItems.map((item, index) => (
          <Link
            key={`${item.id}-${index}`}
            href={item.href}
            className="group relative flex flex-col shrink-0 w-[148px] sm:w-[165px] transition-transform active:scale-95"
          >
            {/* Video Container */}
            <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden bg-neutral-950 border border-neutral-800 group-hover:border-white shadow-lg transition-all">
              <video
                src={item.videoSrc}
                poster={item.posterSrc}
                autoPlay
                muted
                loop
                playsInline
                preload="auto"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Bottom Scrim for Category Name */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent pointer-events-none" />

              {/* Clean Category Name Overlay at Bottom */}
              <div className="absolute inset-x-0 bottom-0 p-3 text-center">
                <span className="font-serif text-xs font-bold text-white tracking-wide block uppercase drop-shadow-md">
                  {item.name}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

