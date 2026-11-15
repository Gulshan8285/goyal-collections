'use client';

import React from 'react';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { useWishlist } from '@/context/WishlistContext';
import ProductCard from '@/components/ProductCard';

export default function WishlistPage() {
  const { wishlist } = useWishlist();

  if (wishlist.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center text-white">
        <div className="w-20 h-20 rounded-full bg-neutral-900 border border-neutral-800 flex items-center justify-center mx-auto mb-6 text-neutral-400">
          <Heart className="w-10 h-10 stroke-[1.5]" />
        </div>
        <h1 className="font-serif text-3xl font-bold text-white mb-3">YOUR WISHLIST IS EMPTY</h1>
        <p className="text-sm text-neutral-400 max-w-md mx-auto mb-8">
          Save your favourite pieces to curate your bespoke wardrobe.
        </p>
        <Link href="/shop" className="bg-white hover:bg-neutral-200 text-black px-8 py-3.5 rounded-full text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 transition-colors shadow-lg">
          <span>Discover The Collection</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10 text-white">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-6 border-b border-neutral-800">
        <div>
          <span className="text-xs uppercase font-mono tracking-widest text-neutral-400">
            CURATION
          </span>
          <h1 className="font-serif text-3xl font-extrabold text-white">
            MY WISHLIST ({wishlist.length} {wishlist.length === 1 ? 'PIECE' : 'PIECES'})
          </h1>
        </div>

        <Link
          href="/shop"
          className="text-xs font-semibold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1.5 transition-colors"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      {/* Grid of Wishlist Items */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
        {wishlist.map((product) => (
          <div key={product.id} className="relative group flex flex-col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>

    </div>
  );
}
