'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ChevronDown, HelpCircle, ArrowRight } from 'lucide-react';

interface FAQItem {
  q: string;
  a: string;
  category: string;
}

const FAQS: FAQItem[] = [
  {
    category: 'Orders & Payments',
    q: 'What payment methods does GOYAL COLLECTIONS accept?',
    a: 'We accept all major Indian credit and debit cards (Visa, Mastercard, RuPay, Amex), UPI (Google Pay, PhonePe, Paytm, BHIM, CRED), NetBanking across 50+ Indian banks, and Cash on Delivery (COD) for eligible pin codes up to ₹25,000.',
  },
  {
    category: 'Orders & Payments',
    q: 'How do I apply a promotional coupon code?',
    a: 'You can apply any valid code (such as GOYAL10 or LUXURY20) on both the Cart and Checkout pages. The discount will calculate and reflect dynamically in your total payable amount.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'What are the delivery timelines and shipping charges?',
    a: 'We offer complimentary express shipping across all serviceable Indian pin codes on orders valued at ₹1,999 and above. For orders below ₹1,999, a nominal flat express shipping fee of ₹149 applies. Delivery typically takes 2–4 business days for metro cities and 3–5 business days for other regions.',
  },
  {
    category: 'Shipping & Delivery',
    q: 'How do I verify if my PIN code is serviceable?',
    a: 'Every product page and address form features our automated Indian PIN code verification tool. Entering your 6-digit PIN instantly verifies live courier coverage and provides your exact estimated delivery date.',
  },
  {
    category: 'Returns & Refunds',
    q: 'What is the return policy for footwear and ready-made clothes?',
    a: 'We provide a 7-day hassle-free doorstep return and exchange privilege from the date of delivery. Footwear must be unworn with original dust bags and shoe boxes intact. Ready-made apparel must be unwashed with original tags attached.',
  },
  {
    category: 'Returns & Refunds',
    q: 'How quickly are refunds processed?',
    a: 'Once the returned item is collected and passes our quality inspection, prepaid refunds are initiated to your original payment method within 24–48 hours. For COD orders, refund is issued via direct UPI or bank transfer.',
  },
  {
    category: 'Product Sizing & Care',
    q: 'How does GOYAL COLLECTIONS footwear sizing work?',
    a: 'Our footwear is crafted according to standard UK sizing. We recommend choosing your true formal shoe size. If you are between sizes, we advise sizing up for boots and sizing down for unlined leather loafers.',
  },
  {
    category: 'Product Sizing & Care',
    q: 'How should I care for genuine leather footwear?',
    a: 'Use a dry horsehair brush to remove surface dust. Apply a neutral leather conditioner every 3–4 weeks to condition the hide. Avoid submerging in water and store in a cool, dry place.',
  },
];

export default function FAQPage() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIdx(openIdx === idx ? null : idx);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-100 border border-neutral-200 text-xs font-mono uppercase tracking-widest text-neutral-800">
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Knowledge Base</span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl font-extrabold text-black">
          FREQUENTLY ASKED QUESTIONS
        </h1>
        <p className="text-xs sm:text-sm text-neutral-500 max-w-md mx-auto">
          Clear answers regarding our artisanal footwear, tailoring, payments, and seamless doorstep deliveries.
        </p>
      </div>

      <div className="space-y-3">
        {FAQS.map((item, idx) => {
          const isOpen = openIdx === idx;
          return (
            <div
              key={idx}
              className="bg-white rounded-2xl border border-neutral-200 overflow-hidden shadow-sm transition-all"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                className="w-full text-left p-5 flex items-center justify-between gap-4 text-sm font-semibold text-black hover:bg-neutral-50 transition-colors"
              >
                <span>{item.q}</span>
                <ChevronDown
                  className={`w-4 h-4 text-neutral-400 transition-transform duration-300 shrink-0 ${
                    isOpen ? 'rotate-180 text-black' : ''
                  }`}
                />
              </button>
              {isOpen && (
                <div className="px-5 pb-5 pt-1 text-xs text-neutral-600 leading-relaxed font-light border-t border-neutral-100 animate-fade-in">
                  <p>{item.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="text-center pt-8 space-y-3">
        <p className="text-xs text-neutral-500">Still have a question or need bespoke sizing advice?</p>
        <Link href="/contact" className="bg-black hover:bg-neutral-800 text-white px-7 py-3 rounded-full text-xs uppercase font-bold tracking-wider inline-flex items-center gap-2 transition-colors">
          <span>Speak with Concierge</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>

    </div>
  );
}
