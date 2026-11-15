'use client';

import React, { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowRight, Volume2, VolumeX } from 'lucide-react';

interface MobileVideoBannerProps {
  videoSrc: string;
  posterSrc: string;
  href: string;
  badge: string;
  title: string;
  subtitle: string;
  buttonText: string;
  priority?: boolean;
}

export default function MobileVideoBanner({
  videoSrc,
  posterSrc,
  href,
  badge,
  title,
  subtitle,
  buttonText,
  priority = false,
}: MobileVideoBannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Use IntersectionObserver to play/pause when in view (conserves mobile battery & memory)
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const playPromise = video.play();
            if (playPromise !== undefined) {
              playPromise
                .then(() => setIsPlaying(true))
                .catch(() => {
                  // Auto-play was prevented (e.g. low power mode)
                  setIsPlaying(false);
                });
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      { threshold: 0.3 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  const toggleSound = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(videoRef.current.muted);
    }
  };

  return (
    <div ref={containerRef} className="w-full relative group">
      <Link
        href={href}
        className="block relative w-full h-[400px] sm:h-[440px] rounded-2xl sm:rounded-3xl overflow-hidden bg-neutral-950 border border-neutral-800 shadow-2xl transition-all duration-300 active:scale-[0.99]"
      >
        {/* Cinematic Video Element */}
        <video
          ref={videoRef}
          src={videoSrc}
          poster={posterSrc}
          autoPlay
          muted
          loop
          playsInline
          preload={priority ? 'auto' : 'metadata'}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />

        {/* Sophisticated Dark Gradient Scrim for Legibility */}
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/25 pointer-events-none" />

        {/* Sound Toggle Button (Discreet Floating Control) */}
        <button
          type="button"
          onClick={toggleSound}
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/20 text-white flex items-center justify-center transition-all hover:bg-black/90 active:scale-90"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
        </button>

        {/* Content Overlay */}
        <div className="absolute inset-0 p-5 sm:p-6 flex flex-col justify-between z-10 pointer-events-none">
          {/* Top Badge */}
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-[10px] font-mono uppercase tracking-[0.2em] text-neutral-200">
              <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              {badge}
            </span>
          </div>

          {/* Bottom Headline & Call to Action */}
          <div className="space-y-2 pointer-events-auto">
            <h3 className="font-serif text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-tight uppercase drop-shadow-md">
              {title}
            </h3>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-sm drop-shadow-sm">
              {subtitle}
            </p>

            <div className="pt-2">
              <span className="inline-flex items-center gap-2 bg-white text-black hover:bg-neutral-200 active:scale-95 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider shadow-lg transition-all">
                <span>{buttonText}</span>
                <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
              </span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

