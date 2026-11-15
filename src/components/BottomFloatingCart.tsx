'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '@/context/CartContext';

export default function BottomFloatingCart() {
  const pathname = usePathname();
  const { totalItems, finalTotal, lastAddedTime } = useCart();
  const [highlight, setHighlight] = useState(false);

  useEffect(() => {
    if (lastAddedTime > 0) {
      setHighlight(true);
      const timer = setTimeout(() => setHighlight(false), 800);
      return () => clearTimeout(timer);
    }
  }, [lastAddedTime]);

  // Hide floating View Cart button when cart is empty or user is already on cart/checkout pages
  if (
    totalItems === 0 ||
    pathname === '/cart' ||
    pathname === '/checkout' ||
    pathname?.startsWith('/order-confirmation')
  ) {
    return null;
  }

  return (
    <aside
      aria-label="Shopping Cart Quick Access"
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 pointer-events-auto"
    >
      <Link
        href="/cart"
        className={`group flex items-center gap-3 bg-neutral-900/95 backdrop-blur-md text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-full shadow-2xl border border-neutral-700 hover:border-white transition-all duration-300 transform active:scale-95 whitespace-nowrap ${
          highlight ? 'scale-105 ring-2 ring-white ring-offset-2 ring-offset-black' : ''
        }`}
      >
        {/* Shopping bag circular icon */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white text-black flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform shadow-xs">
          <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-black" />
        </div>

        {/* Details: View Bag • Items • Amount */}
        <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wide">
          <span className="uppercase tracking-wider font-bold">VIEW BAG</span>
          <span className="bg-neutral-800 text-white font-mono text-[10px] sm:text-[11px] px-2 py-0.5 rounded-full border border-neutral-700">
            {totalItems}
          </span>
          <span className="text-neutral-500">•</span>
          <span className="font-mono font-bold tracking-tight text-white">
            ₹{finalTotal.toLocaleString('en-IN')}
          </span>
        </div>

        {/* Trailing arrow */}
        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-neutral-800 flex items-center justify-center group-hover:translate-x-1 transition-transform border border-neutral-700">
          <ArrowRight className="w-3 h-3 text-white" />
        </div>
      </Link>
    </aside>
  );
}
