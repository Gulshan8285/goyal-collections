'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BottomFloatingCart from '@/components/BottomFloatingCart';

export default function StoreShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith('/admin');

  if (isAdmin) {
    return <div className="w-full min-h-screen bg-black text-white">{children}</div>;
  }

  return (
    <>
      <Header />
      <main className="flex-1 w-full max-w-full overflow-x-hidden bg-black text-white">
        {children}
      </main>
      <BottomFloatingCart />
      <Footer />
    </>
  );
}

