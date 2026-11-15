'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Search, Sparkles } from 'lucide-react';
import ProductCard from '@/components/ProductCard';
import { Product } from '@/lib/types';

function SearchContent() {
  const searchParams = useSearchParams();
  const q = searchParams.get('q') || '';

  const [query, setQuery] = useState(q);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setQuery(q);
    if (!q.trim()) {
      setProducts([]);
      setLoading(false);
      return;
    }

    async function searchCatalog() {
      setLoading(true);
      try {
        const res = await fetch(`/api/products?q=${encodeURIComponent(q.trim())}`);
        const data = await res.json();
        if (data.success) {
          setProducts(data.products || []);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }

    searchCatalog();
  }, [q]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Search Input Bar */}
      <div className="max-w-2xl mx-auto text-center space-y-4">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-500 block">
          CATALOG SEARCH
        </span>
        <h1 className="font-serif text-3xl font-extrabold text-black">
          SEARCH RESULTS
        </h1>

        <form onSubmit={handleSearchSubmit} className="relative">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search footwear, chelsea boots, blazers, dress..."
            className="w-full bg-neutral-50 border border-neutral-300 rounded-2xl py-3.5 pl-12 pr-28 text-sm text-black placeholder-neutral-400 focus:outline-none focus:border-black"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-neutral-400" />
          <button
            type="submit"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-black hover:bg-neutral-800 text-white px-5 py-2 rounded-xl text-xs font-bold transition-colors"
          >
            Search
          </button>
        </form>
      </div>

      {/* Results stage */}
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200 text-xs font-mono text-neutral-500 mb-6">
          <span>
            {loading ? 'SEARCHING CATALOG...' : `FOUND ${products.length} RESULTS FOR “${q}”`}
          </span>
          <Link href="/shop" className="text-black hover:underline font-medium">
            View All Products →
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 animate-pulse">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-neutral-100 rounded-3xl h-80" />
            ))}
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-16 bg-white rounded-3xl p-8 max-w-lg mx-auto border border-neutral-200 shadow-sm">
            <div className="w-16 h-16 rounded-full bg-neutral-100 flex items-center justify-center mx-auto mb-4 text-neutral-400">
              <Sparkles className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-xl text-black mb-2 font-bold">No Matching Products Found</h3>
            <p className="text-xs text-neutral-500 mb-6">
              We couldn&apos;t find any items matching &ldquo;{q}&rdquo;. Try searching for &ldquo;boots&rdquo;, &ldquo;jacket&rdquo;, &ldquo;sneakers&rdquo;, or &ldquo;sandals&rdquo;.
            </p>
            <Link href="/shop" className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs font-bold transition-colors">
              Explore Complete Collection
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-neutral-500 text-xs">Searching...</div>}>
      <SearchContent />
    </Suspense>
  );
}
