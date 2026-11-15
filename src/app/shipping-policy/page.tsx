import React from 'react';

export default function ShippingPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      <div className="space-y-2 border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">FULFILLMENT</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
          SHIPPING &amp; DELIVERY POLICY
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: November 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-6 text-xs text-neutral-700 leading-relaxed font-light shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">1. Complimentary Express Logistics</h2>
          <p>
            GOYAL COLLECTIONS delivers across all major and Tier-1, Tier-2, and Tier-3 Indian postal pin codes. Orders with a net cart value of ₹1,999 or more qualify for complimentary Express Air Delivery. For orders below ₹1,999, a flat logistics fee of ₹149 is applied during checkout.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">2. Delivery Timeframes &amp; Tracking</h2>
          <p>
            • Metro Cities (Delhi NCR, Mumbai, Bengaluru, Chennai, Hyderabad, Kolkata): 2 to 3 business days.<br />
            • Rest of India: 3 to 5 business days.<br />
            • Remote or North-Eastern areas: 5 to 7 business days.
          </p>
          <p>
            Every order is dispatched via our verified logistics partners (Blue Dart, Delhivery, Express Air) with active AWB tracking. You will receive live SMS and WhatsApp notifications upon dispatch.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">3. Signature Packaging</h2>
          <p>
            All footwear and clothing items are hand-inspected by master artisans and packed inside rigid black gift boxes, enclosed with breathable cotton dust bags and tamper-evident security tape.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">4. Cash on Delivery (COD) Rules</h2>
          <p>
            Cash on Delivery is available for serviceable Indian pin codes for order values up to ₹25,000. For COD orders, please ensure the exact payable amount is ready at the time of delivery or pay digitally using the courier executive&apos;s dynamic UPI QR code.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">5. Undelivered Shipments</h2>
          <p>
            Our logistics partners will attempt delivery up to three (3) consecutive times. If the recipient is unavailable or unreachable, the parcel will be safely returned to our New Delhi fulfillment atelier, and our client concierge will reach out to schedule re-delivery.
          </p>
        </section>
      </div>

    </div>
  );
}
