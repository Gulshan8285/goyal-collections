import React from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-14 space-y-16">
      
      {/* Manifesto Hero */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-800">
          <Sparkles className="w-3.5 h-3.5" />
          <span>The GOYAL COLLECTIONS Manifesto</span>
        </div>
        <h1 className="font-serif text-4xl sm:text-6xl font-extrabold text-black leading-tight">
          ARCHITECTURAL COUTURE.<br />UNCOMPROMISING ELEGANCE.
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 max-w-2xl mx-auto font-light leading-relaxed">
          Founded in New Delhi, GOYAL COLLECTIONS was born from a singular obsession: to ground fashion in eternal monochrome structure and exceptional Indian craftsmanship.
        </p>
      </div>

      {/* Brand Imagery Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 group shadow-sm bg-neutral-100">
          <img
            src="https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop"
            alt="Handcrafted Leather Footwear"
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-300 block">CATEGORY 01</span>
            <h3 className="font-serif text-2xl font-bold text-white">Footwear</h3>
            <p className="text-xs text-neutral-200 mt-1">Full-grain leather, Goodyear welting, and ergonomic arch dynamics.</p>
          </div>
        </div>

        <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-neutral-200 group shadow-sm bg-neutral-100">
          <img
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop"
            alt="Ready-Made Tailoring"
            className="w-full h-full object-cover filter grayscale contrast-125 group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 text-white">
            <span className="text-[10px] uppercase font-mono tracking-widest text-neutral-300 block">CATEGORY 02</span>
            <h3 className="font-serif text-2xl font-bold text-white">Ready-Made Clothes</h3>
            <p className="text-xs text-neutral-200 mt-1">Heavyweight Supima cotton, virgin wool blazers, and luxury silhouettes.</p>
          </div>
        </div>
      </div>

      {/* Core Tenets */}
      <div className="bg-white p-8 sm:p-12 rounded-3xl border border-neutral-200 space-y-8 shadow-sm">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-black text-center">
          OUR THREE FOUNDING PRINCIPLES
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
          <div className="space-y-2">
            <span className="text-2xl font-serif font-bold text-neutral-300 block">01</span>
            <h4 className="font-bold text-base text-black">Monochrome Distinction</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              By rejecting noisy logos and fluorescent dyes, our palette of black and white highlights pure proportion, cut, and texture.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-2xl font-serif font-bold text-neutral-300 block">02</span>
            <h4 className="font-bold text-base text-black">Authentic Indian Craftsmanship</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              We collaborate with master shoemakers and generational tailors across India, combining ancestral artisan techniques with modern European silhouettes.
            </p>
          </div>

          <div className="space-y-2">
            <span className="text-2xl font-serif font-bold text-neutral-300 block">03</span>
            <h4 className="font-bold text-base text-black">Zero Compromise Integrity</h4>
            <p className="text-xs text-neutral-600 leading-relaxed font-light">
              Every seam is reinforced. Every leather upper is hand-burnished. Every garment arrives in signature archival packaging ready to stand the test of time.
            </p>
          </div>
        </div>
      </div>

      {/* Atelier Contact Card */}
      <div className="text-center space-y-4 pt-6">
        <h3 className="font-serif text-2xl font-bold text-black">Experience GOYAL COLLECTIONS in Person</h3>
        <p className="text-xs text-neutral-500 max-w-md mx-auto">
          Private appointments at our New Delhi atelier are available upon inquiry through our client concierge.
        </p>
        <Link href="/contact" className="bg-black hover:bg-neutral-800 text-white px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 transition-colors">
          <span>Contact Concierge</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

    </div>
  );
}
