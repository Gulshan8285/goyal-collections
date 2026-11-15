'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';

interface MobilePromoBannerProps {
  badge: string;
  title: string;
  subtitle: string;
  ctaText: string;
  href: string;
  imageUrl: string;
  tagline?: string;
}

export default function MobilePromoBanner({
  badge,
  title,
  subtitle,
  ctaText,
  href,
  imageUrl,
  tagline,
}: MobilePromoBannerProps) {
  return (
    <div className="w-full">
      <Link
        href={href}
        className="block relative rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-xl group active:scale-[0.99] transition-all duration-300"
      >
        {/* Background Image Container */}
        <div className="relative h-[320px] sm:h-[360px] w-full overflow-hidden">
          <img
            src={imageUrl}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          />

          {/* Luxury Monochrome Gradient Scrim */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/55 to-black/20" />

          {/* Content Overlay */}
          <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10">
            {/* Top Badge */}
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/75 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-200">
                <Sparkles className="w-3 h-3 text-white" />
                <span>{badge}</span>
              </span>
              {tagline && (
                <span className="text-[9px] font-mono tracking-widest uppercase text-neutral-400 font-semibold bg-neutral-900/80 px-2 py-0.5 rounded border border-neutral-800">
                  {tagline}
                </span>
              )}
            </div>

            {/* Bottom Content */}
            <div className="space-y-2">
              <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight uppercase drop-shadow-md">
                {title}
              </h3>
              <p className="text-xs text-neutral-300 font-light leading-relaxed max-w-sm line-clamp-2">
                {subtitle}
              </p>

              <div className="pt-2">
                <span className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 active:scale-95 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-md transition-all">
                  <span>{ctaText}</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

