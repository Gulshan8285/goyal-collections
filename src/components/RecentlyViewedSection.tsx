'use client';

import React from 'react';
import { History, ArrowRight } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import ProductCard from './ProductCard';
import Link from 'next/link';

export default function RecentlyViewedSection() {
  const { recentlyViewed } = useAuth();

  if (!recentlyViewed || recentlyViewed.length === 0) {
    return null;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 w-full text-white">
      <div className="flex items-center justify-between mb-6 pb-3 border-t border-neutral-800 pt-8">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-mono tracking-widest uppercase text-neutral-400 mb-1">
            <History className="w-3.5 h-3.5 text-white" />
            <span>Browsing History</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            RECENTLY VIEWED
          </h2>
        </div>
        <Link
          href="/shop"
          className="text-xs font-bold uppercase tracking-wider text-white hover:text-neutral-300 flex items-center gap-1"
        >
          <span>Continue Browsing</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
        {recentlyViewed.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
