'use client';

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, ArrowRight } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { CATEGORIES, INITIAL_PRODUCTS } from '@/lib/initialData';
import { Product } from '@/lib/types';

export default function ReadyMadeClothesCategoryPage() {
  const category = CATEGORIES.find((c) => c.slug === 'ready-made-clothes')!;
  const [products, setProducts] = useState<Product[]>(() =>
    INITIAL_PRODUCTS.filter((p) => p.category === 'ready-made-clothes')
  );

  useEffect(() => {
    fetch('/api/products?category=ready-made-clothes')
      .then((res) => res.json())
      .then((data) => {
        if (data.success && Array.isArray(data.products) && data.products.length > 0) {
          setProducts(data.products);
        }
      })
      .catch(() => {});
  }, []);

  const [activeSub, setActiveSub] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('newest');

  const filteredProducts = useMemo(() => {
    let list = [...products];
    if (activeSub !== 'all') {
      list = list.filter((p) => p.subcategory === activeSub);
    }
    if (sortBy === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sortBy === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sortBy === 'rating') list.sort((a, b) => b.rating - a.rating);
    else if (sortBy === 'popular') list.sort((a, b) => b.reviewCount - a.reviewCount);
    return list;
  }, [products, activeSub, sortBy]);

  return (
    <div className="bg-black text-white min-h-screen pb-24 w-full max-w-full overflow-x-hidden">
      
      {/* 1. Large Attractive Hero Category Banner */}
      <section className="relative w-full h-[320px] sm:h-[420px] lg:h-[480px] overflow-hidden bg-neutral-900">
        <img
          src={category.image}
          alt={category.name}
          className="w-full h-full object-cover filter contrast-110 brightness-85"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
        
        <div className="absolute inset-0 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-end pb-8 sm:pb-12 text-white">
          <div className="max-w-2xl space-y-2 animate-slide-up">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 backdrop-blur-md text-[11px] font-mono tracking-widest text-white uppercase border border-white/20">
              <Sparkles className="w-3 h-3 text-white" />
              <span>CATEGORY 02 // READY-MADE CLOTHES</span>
            </div>
            <h1 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight">
              READY-MADE CLOTHES
            </h1>
            <p className="text-xs sm:text-sm text-neutral-300 font-light leading-relaxed max-w-xl">
              {category.description} Handcrafted in 320 GSM heavyweight Supima cotton, Italian virgin wool tailoring, and sculptural silhouettes.
            </p>
          </div>
        </div>
      </section>

      {/* Main Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 space-y-10 w-full">
        
        {/* 2. Subcategory Quick Selector Bar */}
        <div>
          <div className="flex items-center justify-between pb-3 mb-4 border-b border-neutral-800">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 font-bold">
              5 CURATED SUBCATEGORIES
            </span>
            <span className="text-xs font-mono text-neutral-400">
              {products.length} Total Styles
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
            {category.subcategories.map((sub) => (
              <Link
                key={sub.slug}
                href={`/category/ready-made-clothes/${sub.slug}`}
                className="group p-3 rounded-2xl bg-neutral-900 border border-neutral-800 hover:border-neutral-600 transition-all shadow-sm hover:shadow flex items-center gap-3"
              >
                <div className="w-12 h-12 rounded-full overflow-hidden shrink-0 border border-neutral-700">
                  <img
                    src={sub.image}
                    alt={sub.name}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <div className="min-w-0">
                  <h4 className="text-xs font-bold text-white truncate group-hover:text-neutral-300">
                    {sub.name}
                  </h4>
                  <span className="text-[10px] text-neutral-400 font-mono block mt-0.5">
                    Explore Line &rarr;
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* 3. Filter and Sort Options Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl bg-neutral-900 border border-neutral-800">
          {/* Subcategory Pills */}
          <div className="flex flex-wrap items-center gap-1.5 text-xs">
            <span className="text-neutral-400 font-mono mr-1 hidden sm:inline">Filter:</span>
            <button
              onClick={() => setActiveSub('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeSub === 'all'
                  ? 'bg-white text-black shadow-sm'
                  : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:border-neutral-500'
              }`}
            >
              All Clothes ({products.length})
            </button>
            {category.subcategories.map((sub) => (
              <button
                key={sub.slug}
                onClick={() => setActiveSub(sub.slug)}
                className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
                  activeSub === sub.slug
                    ? 'bg-white text-black shadow-sm'
                    : 'bg-neutral-800 text-neutral-300 border border-neutral-700 hover:border-neutral-500'
                }`}
              >
                {sub.name}
              </button>
            ))}
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2 self-end sm:self-auto">
            <span className="text-xs font-mono text-neutral-400 whitespace-nowrap">Sort:</span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-neutral-800 border border-neutral-700 text-white rounded-xl px-3 py-1.5 text-xs font-medium focus:outline-none focus:border-white"
            >
              <option value="newest">Newest Arrivals</option>
              <option value="popular">Most Popular</option>
              <option value="rating">Highest Rated</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* 4. Professional Product Grid */}
        <div>
          <div className="flex items-center justify-between mb-6 pb-2 border-b border-neutral-800 text-xs font-mono text-neutral-400">
            <span>SHOWING {filteredProducts.length} PRODUCTS</span>
            <span>READY-MADE ATELIER</span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>

      </div>

    </div>
  );
}
