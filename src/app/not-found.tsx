import React from 'react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <div className="bg-white p-8 sm:p-14 rounded-3xl border border-neutral-200 max-w-lg w-full space-y-6 shadow-sm">
        <span className="font-mono text-xs uppercase tracking-widest text-neutral-400 block">
          ERROR 404 // PAGE NOT FOUND
        </span>

        <h1 className="font-serif text-4xl sm:text-5xl font-extrabold text-black">
          PAGE NOT FOUND
        </h1>

        <p className="text-xs sm:text-sm text-neutral-500 font-light leading-relaxed">
          The requested page may have been moved, renamed, or retired from our catalog.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/"
            className="bg-black hover:bg-neutral-800 text-white px-6 py-3 rounded-full text-xs uppercase font-bold tracking-wider transition-colors"
          >
            Return to Homepage
          </Link>
          <Link
            href="/shop"
            className="bg-neutral-100 hover:bg-neutral-200 text-black px-6 py-3 rounded-full text-xs uppercase font-semibold tracking-wider transition-colors"
          >
            Explore Collections
          </Link>
        </div>

        <div className="pt-4 border-t border-neutral-200">
          <span className="text-[11px] text-neutral-400 uppercase font-mono block mb-2">Popular Categories</span>
          <div className="flex flex-wrap justify-center gap-2">
            <Link href="/category/footwear" className="bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1 text-xs text-neutral-700 hover:text-black hover:border-black transition-colors">
              Footwear
            </Link>
            <Link href="/category/ready-made-clothes" className="bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1 text-xs text-neutral-700 hover:text-black hover:border-black transition-colors">
              Ready-made Clothes
            </Link>
            <Link href="/category/footwear/shoes" className="bg-neutral-50 border border-neutral-200 rounded-full px-3 py-1 text-xs text-neutral-700 hover:text-black hover:border-black transition-colors">
              Shoes
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
