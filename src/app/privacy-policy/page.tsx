import React from 'react';

export default function PrivacyPolicyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div className="space-y-2 border-b border-neutral-200 pb-6">
        <span className="text-xs uppercase font-mono tracking-widest text-neutral-500">PRIVACY</span>
        <h1 className="font-serif text-3xl sm:text-4xl font-extrabold text-black">
          PRIVACY POLICY
        </h1>
        <p className="text-xs text-neutral-500">Effective Date: November 2026</p>
      </div>

      <div className="bg-white p-6 sm:p-10 rounded-3xl border border-neutral-200 space-y-6 text-xs text-neutral-700 leading-relaxed font-light shadow-sm">
        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">1. Commitment to Privacy</h2>
          <p>
            GOYAL COLLECTIONS values the privacy and confidentiality of our esteemed customers. We never sell, rent, or trade your personal data with third-party advertising networks.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">2. Information We Collect</h2>
          <p>
            We collect only the data necessary to provide seamless shopping and fulfillment: your name, shipping address, 6-digit PIN code, contact phone number, email address, and order histories.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">3. Payment Security &amp; Tokenization</h2>
          <p>
            All online financial transactions are routed through RBI-compliant, PCI-DSS Level 1 certified payment gateways. GOYAL COLLECTIONS servers never store your raw credit/debit card numbers, CVVs, or bank net banking passwords.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">4. Cookies &amp; Local Persistence</h2>
          <p>
            We use essential local session persistence to remember your bag selections, wishlist, recently viewed products, and address preferences.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-serif text-lg font-bold text-black">5. Grievance Contact</h2>
          <p>
            In accordance with the Information Technology Act 2000, for any privacy inquiries or deletion requests, contact our Data Protection Officer at: <strong className="text-black">privacy@mirli.store</strong>.
          </p>
        </section>
      </div>
    </div>
  );
}
