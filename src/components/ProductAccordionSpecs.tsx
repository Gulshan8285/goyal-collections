'use client';

import React, { useState } from 'react';
import { Truck, ShieldCheck, ChevronDown, CheckCircle2, Sparkles, Box, Scissors, HeartHandshake } from 'lucide-react';
import { Product } from '@/lib/types';

interface ProductAccordionSpecsProps {
  product: Product;
}

type TabType = 'details' | 'design' | 'care';

export default function ProductAccordionSpecs({ product }: ProductAccordionSpecsProps) {
  const [activeTab, setActiveTab] = useState<TabType>('details');
  const [isExpanded, setIsExpanded] = useState<boolean>(true);

  // Helper to extract product-specific specification
  const getSpec = (labelKey: string): string | undefined => {
    return product.specifications?.find(
      (s) => s.label.toLowerCase().includes(labelKey.toLowerCase())
    )?.value;
  };

  const isFootwear = product.category === 'footwear';

  // 1. Product Details specifications
  const material = getSpec('upper') || getSpec('fabric') || (isFootwear ? 'Genuine Full-Grain Calfskin Leather' : 'Heavyweight 320 GSM Supima Cotton');
  const interior = getSpec('lining') || getSpec('sole') || (isFootwear ? 'Memory Foam Ergonomic Leather Footbed' : '100% Breathable Cupro Silk');
  const closure = getSpec('closure') || (isFootwear ? 'Slip-On Elastic Gusset' : 'Concealed Horn Button Fastening');
  const origin = getSpec('origin') || 'Handcrafted in Agra & Delhi Ateliers, India';
  const sizeFit = isFootwear
    ? `True to standard UK/India sizing. Available: ${product.sizes.join(', ')}`
    : `Tailored structured fit. Available sizes: ${product.sizes.join(', ')}`;
  const heelHeight = getSpec('heel');

  // 2. Design specifications
  const colorNames = product.colors.map((c) => c.name).join(' / ');
  const silhouette = `${product.subcategoryTitle} Silhouette`;
  const patternWeave = isFootwear
    ? 'Full-Grain Smooth Polish with Matte Elastic Trim'
    : 'High-Density Architectural Weave with Fluid Drape';
  const styleCode = `MRL-${product.category.slice(0, 2).toUpperCase()}-${product.slug.split('-').slice(-2).join('').toUpperCase()}`;

  // 3. Packaging & Care specifications
  const primaryCare = getSpec('care') || (isFootwear ? 'Buff with neutral beeswax cream' : 'Dry clean only or delicate cold wash');
  const cleaning = isFootwear
    ? 'Wipe clean with a soft, slightly damp cloth. Avoid harsh solvents and water immersion.'
    : 'Professional dry cleaning recommended. Warm iron with pressing cloth if required.';
  const storage = isFootwear
    ? 'Store in provided cotton dust bag with cedar shoe trees to retain shape.'
    : 'Store hanging on contoured wide wooden hangers inside the protective dust cover.';

  const tabs: { id: TabType; label: string; icon: React.ReactNode }[] = [
    { id: 'details', label: 'Product Details', icon: <Scissors className="w-3.5 h-3.5" /> },
    { id: 'design', label: 'Design', icon: <Sparkles className="w-3.5 h-3.5" /> },
    { id: 'care', label: 'Packaging & Care', icon: <Box className="w-3.5 h-3.5" /> },
  ];

  return (
    <section
      aria-label="Product Specifications & Details"
      className="rounded-3xl bg-neutral-900 border border-neutral-800 p-5 sm:p-10 shadow-xl space-y-6"
    >
      {/* ================================================================= */}
      {/* 1. TOP ASSURANCE CARDS (Matching Reference Screenshot)            */}
      {/* ================================================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pb-2">
        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <Truck className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block">
              Armored Courier &amp; Insured Delivery
            </span>
            <span className="text-[11px] font-mono text-neutral-400 block">
              Complimentary dispatch across India
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-neutral-950 border border-neutral-800/80">
          <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-4 h-4 text-white" />
          </div>
          <div>
            <span className="text-xs font-semibold text-white block">
              GOYAL COLLECTIONS Certified Atelier Seal
            </span>
            <span className="text-[11px] font-mono text-neutral-400 block">
              100% Genuine luxury craftsmanship guarantee
            </span>
          </div>
        </div>
      </div>

      <div className="border-t border-neutral-800/80 pt-6">
        
        {/* ================================================================= */}
        {/* 2. THE 3 SECTION TABS (Matching Reference Screenshot)             */}
        {/* ================================================================= */}
        <div className="flex items-center justify-between border-b border-neutral-800 pb-px mb-6 overflow-x-auto scrollbar-none">
          <div className="flex items-center gap-4 sm:gap-10 shrink-0">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => {
                    if (activeTab === tab.id && isExpanded) {
                      setIsExpanded(false);
                    } else {
                      setActiveTab(tab.id);
                      setIsExpanded(true);
                    }
                  }}
                  className={`relative pb-3 text-xs sm:text-base font-serif font-bold tracking-wide transition-all whitespace-nowrap flex items-center gap-1.5 sm:gap-2 ${
                    isActive
                      ? 'text-white'
                      : 'text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  <span>{tab.label}</span>
                  {/* Solid White Active Indicator Underline (Matching Screenshot) */}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-white shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Quick Collapse / Expand Toggle */}
          <button
            type="button"
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden sm:inline-flex items-center gap-1.5 text-xs font-mono text-neutral-400 hover:text-white pb-3 transition-colors shrink-0"
            aria-label={isExpanded ? 'Collapse section' : 'Expand section'}
          >
            <span>{isExpanded ? 'Collapse' : 'Expand'}</span>
            <ChevronDown
              className={`w-3.5 h-3.5 transition-transform duration-300 ${
                isExpanded ? 'rotate-180 text-white' : 'text-neutral-400'
              }`}
            />
          </button>
        </div>

        {/* ================================================================= */}
        {/* 3. EXPANDABLE CONTENT PANELS                                      */}
        {/* ================================================================= */}
        {isExpanded && (
          <div className="animate-fade-in space-y-6">
            
            {/* ------------------------------------------------------------- */}
            {/* PANEL 1: PRODUCT DETAILS                                      */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'details' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-1.5">
                    ARCHITECTURAL DESCRIPTION
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl font-light">
                    {product.description}
                  </p>
                </div>

                {/* 2-Column Key-Value Specifications Grid (Matching Screenshot) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-8 pt-2">
                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Primary Material:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {material}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Internal Structure &amp; Lining:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {interior}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Closure &amp; Fastening:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {closure}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Size &amp; Fit Profile:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {sizeFit}
                    </span>
                  </div>

                  {heelHeight && (
                    <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                      <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                        Heel Elevation:
                      </span>
                      <span className="text-xs sm:text-sm font-semibold text-white block">
                        {heelHeight}
                      </span>
                    </div>
                  )}

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Place of Craft:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {origin}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Identification Code:
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-300 block">
                      {styleCode}
                    </span>
                  </div>
                </div>

                {/* Key Highlights */}
                {product.details && product.details.length > 0 && (
                  <div className="pt-2">
                    <h5 className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-3">
                      DISTINGUISHING SPECIFICATIONS
                    </h5>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs text-neutral-300">
                      {product.details.map((detail, idx) => (
                        <div key={idx} className="flex items-center gap-2">
                          <CheckCircle2 className="w-3.5 h-3.5 text-white shrink-0" />
                          <span>{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANEL 2: DESIGN                                              */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'design' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-1.5">
                    DESIGN PHILOSOPHY &amp; FORM
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl font-light">
                    {isFootwear
                      ? 'Engineered around anatomical contours with a sharp, elongated silhouette. Emphasizes clean planes, zero extraneous branding, and seamless tonal transitions.'
                      : 'An avant-garde balance of proportion and drape. Characterized by relaxed drop-shoulder tailoring, concealed seam closures, and pure architectural presence.'}
                  </p>
                </div>

                {/* 2-Column Key-Value Specifications Grid (Matching Screenshot) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-8 pt-2">
                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Design Silhouette:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {silhouette}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Curated Tonal Palette:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {colorNames}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Texture &amp; Surface Treatment:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {patternWeave}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Hardware &amp; Detailing:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {isFootwear ? 'Reinforced tonal stitching with recessed welt joints' : 'Hand-sewn horn buttons with reinforced bar tacking'}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Aesthetic Discipline:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Monochrome Haute Restraint
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Archive Drop:
                    </span>
                    <span className="text-xs sm:text-sm font-mono font-semibold text-neutral-300 block">
                      Season 2026 // Permanent Collection
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* ------------------------------------------------------------- */}
            {/* PANEL 3: PACKAGING & CARE                                    */}
            {/* ------------------------------------------------------------- */}
            {activeTab === 'care' && (
              <div className="space-y-6">
                <div>
                  <h4 className="text-[11px] uppercase font-mono tracking-widest text-neutral-400 font-bold mb-1.5">
                    UNBOXING PRESENTATION &amp; MAINTENANCE
                  </h4>
                  <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-3xl font-light">
                    Every GOYAL COLLECTIONS creation arrives encased in our signature rigid archive box, accompanied by serialized authentication credentials and breathable preservation covers.
                  </p>
                </div>

                {/* 2-Column Key-Value Specifications Grid (Matching Screenshot) */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 sm:gap-y-5 gap-x-8 pt-2">
                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Signature Archive Box:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Rigid Obsidian Magnetic Box with Embossed Silver Seal
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Travel &amp; Preservation Covers:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      100% Breathable Organic Cotton-Canvas Dust Bags
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Authentication Certificate:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      Serialized GOYAL COLLECTIONS Verification Card with RFID Atelier Seal
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Primary Care Protocol:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {primaryCare}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Cleaning &amp; Maintenance:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {cleaning}
                    </span>
                  </div>

                  <div className="space-y-1 border-b border-neutral-800/60 pb-3">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-neutral-400 block">
                      Storage &amp; Handling:
                    </span>
                    <span className="text-xs sm:text-sm font-semibold text-white block">
                      {storage}
                    </span>
                  </div>
                </div>
              </div>
            )}

          </div>
        )}

      </div>
    </section>
  );
}
