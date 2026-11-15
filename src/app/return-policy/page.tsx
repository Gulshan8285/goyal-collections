import React from 'react';
import Link from 'next/link';

export default function ReturnPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-2 border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">CLIENT SERVICES</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
          7-DAY RETURN &amp; REFUND POLICY
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: November 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-6 text-xs text-neutral-700 leading-relaxed font-light shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">1. Seven (7) Days Return Window</h2>
          <p>
            At GOYAL COLLECTIONS, your satisfaction with our fit and craftsmanship is paramount. We offer a generous 7-day hassle-free doorstep return and exchange privilege from the date of physical delivery.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">2. Eligible Condition for Returns</h2>
          <p>
            To qualify for a refund or replacement:
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li><strong>Footwear:</strong> Must be unworn, unscratched on the soles, and returned in the original branded shoe box with dust bags intact. Please try shoes indoors on a clean carpet.</li>
            <li><strong>Ready-Made Clothes:</strong> Must be in unwashed, unworn condition with all original security tags and labels attached.</li>
          </ul>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">3. How to Initiate a Return</h2>
          <p>
            Returns can be initiated in seconds:
          </p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>Visit the <Link href="/order-tracking" className="text-black underline font-semibold">Track Order</Link> page or your <Link href="/account" className="text-black underline font-semibold">Account Dashboard</Link>.</li>
            <li>Locate your delivered order and select &ldquo;Request 7-Day Return&rdquo;.</li>
            <li>State your reason for return and choose between a Size Exchange or a Direct Refund.</li>
            <li>Our courier partner will arrive at your address within 24–48 hours for doorstep collection.</li>
          </ol>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">4. Refund Settlement</h2>
          <p>
            • <strong>Prepaid Orders:</strong> Refunds are credited directly back to the original source method (Credit Card, Debit Card, NetBanking, or UPI) within 24 to 48 business hours after the returned product passes our inspection.<br />
            • <strong>Cash on Delivery (COD) Orders:</strong> Our concierge will verify your preferred UPI ID or Bank Account Details, and the refund will be transmitted via NEFT/IMPS within 2 business days.
          </p>
        </section>
      </div>

    </div>
  );
}
