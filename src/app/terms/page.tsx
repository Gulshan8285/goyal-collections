import React from 'react';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">TERMS</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
          TERMS &amp; CONDITIONS
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: November 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-6 text-xs text-neutral-700 leading-relaxed font-light shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">1. Scope of Agreement</h2>
          <p>
            Welcome to GOYAL COLLECTIONS (the &ldquo;Platform&rdquo;), New Delhi, India. By accessing our platform, purchasing our footwear or ready-made clothes, you agree to be bound by these terms.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">2. Product Pricing &amp; Taxation</h2>
          <p>
            All prices listed on GOYAL COLLECTIONS are quoted in Indian Rupees (INR) and are inclusive of Goods &amp; Services Tax (GST) as mandated by Indian Law. We reserve the right to alter pricing, discounts, and promotional privileges without prior notice.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">3. Intellectual Property Rights</h2>
          <p>
            The GOYAL COLLECTIONS brand name, trademark, typography, bespoke footwear and apparel silhouettes, and photography are the exclusive intellectual property of GOYAL COLLECTIONS. Reproduction, imitation, or redistribution is strictly prohibited.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">4. Jurisdiction &amp; Governing Law</h2>
          <p>
            These terms shall be governed by and construed in accordance with the laws of the Republic of India. Any disputes arising shall be subject to the exclusive jurisdiction of the courts of New Delhi, India.
          </p>
        </section>
      </div>
    </div>
  );
}
