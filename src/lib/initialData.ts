import { CategoryItem, Product, Coupon } from './types';

export const CATEGORIES: CategoryItem[] = [
  {
    id: 'footwear',
    slug: 'footwear',
    name: 'Footwear',
    description: 'Mastercrafted luxury footwear designed for uncompromising comfort and statement elegance.',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1200&auto=format&fit=crop',
    subcategories: [
      {
        slug: 'mens-footwear',
        name: "Men's Footwear",
        description: 'Bespoke leather oxfords, monk straps, chelsea boots and tailored loafers.',
        image: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'womens-footwear',
        name: "Women's Footwear",
        description: 'Sculptural heels, couture mules, minimalist ballet flats and ankle boots.',
        image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'kids-footwear',
        name: "Kids' Footwear",
        description: 'Comfortable, ultra-durable and ergonomic luxury footwear for young explorers.',
        image: 'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'shoes',
        name: 'Shoes',
        description: 'Monochrome luxury sneakers, dress shoes and contemporary trainers.',
        image: 'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'sandals-slippers',
        name: 'Sandals & Slippers',
        description: 'Full-grain leather slides, architectural strap sandals and plush lounge slippers.',
        image: 'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },
  {
    id: 'ready-made-clothes',
    slug: 'ready-made-clothes',
    name: 'Ready-made Clothes',
    description: 'Minimalist high-fashion apparel tailored from premium Egyptian cotton, silk blends and structured wool.',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1200&auto=format&fit=crop',
    subcategories: [
      {
        slug: 'mens-wear',
        name: "Men's Wear",
        description: 'Tailored oversized blazers, monochrome shirts, raw denim and relaxed trousers.',
        image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'womens-wear',
        name: "Women's Wear",
        description: 'Architectural trench coats, silk slip dresses, sculpted tops and pleated skirts.',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'kids-wear',
        name: "Kids' Wear",
        description: 'Hypoallergenic organic cotton coordinates and modern unisex essentials.',
        image: 'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'boys-wear',
        name: "Boys' Wear",
        description: 'Smart structured shirts, tailored shorts, varsity jackets and casual tees.',
        image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=800&auto=format&fit=crop',
      },
      {
        slug: 'girls-wear',
        name: "Girls' Wear",
        description: 'Bespoke occasion dresses, effortless linen sets and delicate knits.',
        image: 'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=800&auto=format&fit=crop',
      },
    ],
  },
];

export const INITIAL_PRODUCTS: Product[] = [
  // ================= FOOTWEAR =================
  // 1. Men's Footwear
  {
    id: 'mirli-fw-001',
    slug: 'mirli-onyx-chelsea-boot',
    name: 'Onyx Sovereign Leather Chelsea Boot',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'mens-footwear',
    subcategoryTitle: "Men's Footwear",
    price: 6499,
    mrp: 9999,
    discountPercent: 35,
    description: 'Handcrafted in genuine calfskin leather with a sleek silhouette, elastic side gussets, and Goodyear-welted rubber lug sole for unmatched poise and comfort.',
    details: [
      '100% Genuine Full-Grain Calfskin Leather',
      'Goodyear Welt Construction for lifetime durability',
      'Memory Foam cushioned leather insole',
      'Anti-slip dual density rubber lug outsole'
    ],
    specifications: [
      { label: 'Upper Material', value: 'Calfskin Leather' },
      { label: 'Sole Material', value: 'Lugged Vibram Rubber' },
      { label: 'Closure', value: 'Slip-On with Elastic Gusset' },
      { label: 'Heel Height', value: '30 mm' },
      { label: 'Origin', value: 'Handcrafted in Agra, India' },
      { label: 'Care', value: 'Buff with neutral beeswax cream' }
    ],
    images: [
      'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Obsidian Black', hex: '#0a0a0a' },
      { name: 'Smoked Umber', hex: '#2b211b' }
    ],
    stock: 24,
    rating: 4.9,
    reviewCount: 38,
    isTrending: true,
    isBestSeller: true,
    featured: true,
    createdAt: '2026-01-10T10:00:00.000Z'
  },
  {
    id: 'mirli-fw-002',
    slug: 'mirli-imperial-monk-strap',
    name: 'Imperial Double Monk Strap Shoe',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'mens-footwear',
    subcategoryTitle: "Men's Footwear",
    price: 5299,
    mrp: 7999,
    discountPercent: 33,
    description: 'Precision Italian silhouette crafted with hand-burnished crust leather and brushed silver buckles for sophisticated black-tie and executive tailoring.',
    details: [
      'Hand-burnished vegetable tanned leather',
      'Dual silver hardware buckle closures',
      'Breathable sheepskin leather lining',
      'Leather outsole with reinforced rubber injection heel'
    ],
    specifications: [
      { label: 'Upper Material', value: 'Vegetable Tanned Crust Leather' },
      { label: 'Sole Material', value: 'Hand-Finished Leather Sole' },
      { label: 'Hardware', value: 'Brushed Silver Alloy' },
      { label: 'Origin', value: 'Made in India' }
    ],
    images: [
      'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Classic Black', hex: '#000000' },
      { name: 'Burgundy Shadow', hex: '#2c1015' }
    ],
    stock: 18,
    rating: 4.8,
    reviewCount: 22,
    isNewArrival: true,
    createdAt: '2026-02-01T10:00:00.000Z'
  },

  // 2. Women's Footwear
  {
    id: 'mirli-fw-003',
    slug: 'mirli-aerona-stiletto-mule',
    name: 'Aërona Sculptural Stiletto Mule',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'womens-footwear',
    subcategoryTitle: "Women's Footwear",
    price: 4599,
    mrp: 6999,
    discountPercent: 34,
    description: 'A daring celebration of geometric minimalism. Featuring an architectural 85mm kitten heel, pointed vamp, and featherlight padded leather footbed.',
    details: [
      'Matte obsidian kidskin leather finish',
      'Architectural high-tensile composite heel',
      'Ergonomic arch support cushion'
    ],
    specifications: [
      { label: 'Upper', value: 'Kidskin Leather' },
      { label: 'Heel Height', value: '85 mm Architectural Stiletto' },
      { label: 'Toe Style', value: 'Sculpted Pointed Toe' }
    ],
    images: [
      'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515347619252-60a4bf4fff4f?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 3', 'UK 4', 'UK 5', 'UK 6', 'UK 7', 'UK 8'],
    colors: [
      { name: 'Onyx Noir', hex: '#0e0e0e' },
      { name: 'Bone White', hex: '#f0ede6' }
    ],
    stock: 15,
    rating: 4.9,
    reviewCount: 41,
    isBestSeller: true,
    isTrending: true,
    createdAt: '2026-01-15T12:00:00.000Z'
  },
  {
    id: 'mirli-fw-004',
    slug: 'mirli-celeste-monochrome-loafers',
    name: 'Céleste Chunky Sole Loafer',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'womens-footwear',
    subcategoryTitle: "Women's Footwear",
    price: 4999,
    mrp: 7499,
    discountPercent: 33,
    description: 'Bold statement loafers pairing high-shine patent calf leather with a feather-weight cleated flatform sole and subtle silver MIRLI monogram plaque.',
    details: [
      'Mirror-finish patent leather',
      'Ultralight EVA lug sole',
      'Padded collar for zero break-in blisters'
    ],
    specifications: [
      { label: 'Sole Height', value: '45 mm Platform' },
      { label: 'Material', value: 'Patent Calfskin' }
    ],
    images: [
      'https://images.unsplash.com/photo-1535043934128-cf0b28d52f95?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 4', 'UK 5', 'UK 6', 'UK 7'],
    colors: [
      { name: 'Pitch Black', hex: '#000000' },
      { name: 'Chalk White', hex: '#e8e8e8' }
    ],
    stock: 20,
    rating: 4.7,
    reviewCount: 19,
    isNewArrival: true,
    createdAt: '2026-02-05T10:00:00.000Z'
  },

  // 3. Kids' Footwear
  {
    id: 'mirli-fw-005',
    slug: 'mirli-kids-swift-runner',
    name: "Junior Swift Breathable Sneaker",
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'kids-footwear',
    subcategoryTitle: "Kids' Footwear",
    price: 2499,
    mrp: 3999,
    discountPercent: 37,
    description: 'Engineered for playground agility and ergonomic foot development. Breathable knit upper, quick-lock elastic toggle, and non-marking shock absorbing sole.',
    details: [
      'Orthopedic cushioned arch insole',
      'Reflective safety strip on heel',
      'One-touch elastic bungee strap closure'
    ],
    specifications: [
      { label: 'Upper', value: 'Recycled Engineered Air Mesh' },
      { label: 'Sole', value: 'Shock-Absorb Phylon Rubber' },
      { label: 'Weight', value: 'Featherlight 140g per shoe' }
    ],
    images: [
      'https://images.unsplash.com/photo-1514989940723-e8e51635b782?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1507464098880-e367bc5d2c08?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['Kids UK 10', 'Kids UK 11', 'Kids UK 12', 'Kids UK 13', 'Kids UK 1', 'Kids UK 2'],
    colors: [
      { name: 'Monochrome Black/White', hex: '#111111' },
      { name: 'Silver Frost', hex: '#cccccc' }
    ],
    stock: 35,
    rating: 4.8,
    reviewCount: 29,
    isTrending: true,
    createdAt: '2026-01-20T10:00:00.000Z'
  },

  // 4. Shoes (General / Luxury Sneaker / Formal)
  {
    id: 'mirli-fw-006',
    slug: 'mirli-lumina-minimalist-court-sneaker',
    name: 'Lumina Minimalist Monochrome Court Sneaker',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'shoes',
    subcategoryTitle: 'Shoes',
    price: 4999,
    mrp: 7999,
    discountPercent: 37,
    description: 'The definitive luxury daily sneaker. Stripped of loud logos, focusing on pure architectural lines, Italian Nappa leather, and an elevated vulcanized rubber cupsole.',
    details: [
      'Supple Italian Nappa leather upper',
      'Margom-style durable stitched rubber cupsole',
      'Calfskin leather lined interior with wax cotton laces',
      'Subtle debossed silver serial number on heel tab'
    ],
    specifications: [
      { label: 'Upper', value: 'Full-Grain Italian Nappa' },
      { label: 'Lining', value: '100% Breathable Calfskin' },
      { label: 'Sole', value: 'Anti-slip Vulcanized Rubber' },
      { label: 'Fit', value: 'True to Size' }
    ],
    images: [
      'https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1597045566677-8cf032ed6634?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10', 'UK 11'],
    colors: [
      { name: 'Pure White & Jet Black', hex: '#ffffff' },
      { name: 'Obsidian Monolith', hex: '#0f0f0f' }
    ],
    stock: 45,
    rating: 5.0,
    reviewCount: 64,
    isBestSeller: true,
    isTrending: true,
    featured: true,
    createdAt: '2026-01-05T10:00:00.000Z'
  },
  {
    id: 'mirli-fw-007',
    slug: 'mirli-apex-derby-dress-shoe',
    name: 'Apex Handcrafted Wholecut Derby Shoe',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'shoes',
    subcategoryTitle: 'Shoes',
    price: 5999,
    mrp: 8999,
    discountPercent: 33,
    description: 'Cut from a single flawless hide of French box-calf leather. Without seams or interruptions, this wholecut derby commands total prestige in every room.',
    details: [
      'Single piece seamless wholecut pattern',
      'Hand-beveled waist and painted sole edge',
      'Goodyear stitched leather sole'
    ],
    specifications: [
      { label: 'Construction', value: 'Goodyear Welted Wholecut' },
      { label: 'Leather', value: 'Grade-A French Box Calf' },
      { label: 'Sole', value: 'Oiled Argentinian Oak Bark Sole' }
    ],
    images: [
      'https://images.unsplash.com/photo-1533867617858-e7b97e060509?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Midnight Jet', hex: '#080808' }
    ],
    stock: 12,
    rating: 4.9,
    reviewCount: 16,
    isSpecialOffer: true,
    createdAt: '2026-02-02T10:00:00.000Z'
  },

  // 5. Sandals & Slippers
  {
    id: 'mirli-fw-008',
    slug: 'mirli-athena-strappy-leather-sandal',
    name: 'Athena Architectural Criss-Cross Sandal',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'sandals-slippers',
    subcategoryTitle: 'Sandals & Slippers',
    price: 2999,
    mrp: 4499,
    discountPercent: 33,
    description: 'Modernist leather strap sandals engineered with an anatomical contour footbed, supple oiled harness straps and secure gunmetal micro-buckle.',
    details: [
      'Oiled vegetable tanned leather straps',
      'Contoured cork and latex footbed wrapped in suede',
      'Lightweight ripple tread EVA outsole'
    ],
    specifications: [
      { label: 'Strap Material', value: 'Full-Grain Harness Leather' },
      { label: 'Footbed', value: 'Natural Suede Cushioned Ergonomic Footbed' }
    ],
    images: [
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1562183241-b937e95585b6?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 5', 'UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Onyx Black', hex: '#111111' },
      { name: 'Alabaster White', hex: '#f4f4f4' }
    ],
    stock: 30,
    rating: 4.7,
    reviewCount: 28,
    isTrending: true,
    createdAt: '2026-01-25T10:00:00.000Z'
  },
  {
    id: 'mirli-fw-009',
    slug: 'mirli-zenith-pillow-slide-slipper',
    name: 'Zenith Padded Leather Lounge Slide',
    
    category: 'footwear',
    categoryTitle: 'Footwear',
    
    subcategory: 'sandals-slippers',
    subcategoryTitle: 'Sandals & Slippers',
    price: 2299,
    mrp: 3499,
    discountPercent: 34,
    description: 'Sumptuous cloud-like comfort. Quilted puffy leather band lined with ultra-soft shearling and an injection-molded flex outsole.',
    details: [
      'Quilted lambskin padded wide strap',
      'Deep heel cup with arch stability support',
      'Indoor & luxury resort outdoor ready'
    ],
    specifications: [
      { label: 'Upper', value: 'Quilted Nappa Lambskin' },
      { label: 'Sole', value: 'High-Density Injection EVA' }
    ],
    images: [
      'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1603487742131-4160ec999306?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['UK 6', 'UK 7', 'UK 8', 'UK 9', 'UK 10'],
    colors: [
      { name: 'Jet Noir', hex: '#0a0a0a' },
      { name: 'Ivory Frost', hex: '#e9e9e9' }
    ],
    stock: 40,
    rating: 4.8,
    reviewCount: 33,
    isSpecialOffer: true,
    createdAt: '2026-02-08T10:00:00.000Z'
  },

  // ================= READY-MADE CLOTHES =================
  // 6. Men's Wear
  {
    id: 'mirli-cl-001',
    slug: 'mirli-monolith-oversized-blazer',
    name: 'Monolith Architectural Oversized Blazer',
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'mens-wear',
    subcategoryTitle: "Men's Wear",
    price: 7999,
    mrp: 12999,
    discountPercent: 38,
    description: 'An avant-garde interpretation of modern tailoring. Drop-shoulder drape, structured peak lapels, hidden horn buttons, and fluid wool-gabardine weave.',
    details: [
      'Virgin wool and Italian viscose blend',
      'Full cupro silk lining with internal chest pockets',
      'Unstructured relaxed fit with soft padded shoulders',
      'Dual rear vents for effortless movement'
    ],
    specifications: [
      { label: 'Fabric', value: '70% Virgin Wool, 30% Fine Viscose' },
      { label: 'Lining', value: '100% Breathable Cupro Silk' },
      { label: 'Closure', value: 'Concealed Double-Breasted Horn Buttons' },
      { label: 'Care', value: 'Dry Clean Only' }
    ],
    images: [
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1617137984095-74e4e5e3613f?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Absolute Black', hex: '#050505' },
      { name: 'Oatmeal Heather', hex: '#cfcac0' }
    ],
    stock: 18,
    rating: 4.9,
    reviewCount: 47,
    isTrending: true,
    isBestSeller: true,
    featured: true,
    createdAt: '2026-01-12T10:00:00.000Z'
  },
  {
    id: 'mirli-cl-002',
    slug: 'mirli-supima-heavyweight-tshirt',
    name: 'Sovereign 320 GSM Supima Cotton Tee',
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'mens-wear',
    subcategoryTitle: "Men's Wear",
    price: 1899,
    mrp: 2999,
    discountPercent: 36,
    description: 'The definitive heavyweight luxury tee. Custom knit from 100% long-staple Supima cotton for a dense, crisp drape that never loses its form.',
    details: [
      'Ultra-dense 320 GSM American Supima Cotton',
      'Reinforced thick ribbed collar with zero collar sag',
      'Pre-shrunk fabric with silicone enzyme wash',
      'Tailored boxy street silhouette'
    ],
    specifications: [
      { label: 'Fabric Weight', value: '320 GSM Heavyweight Jersey' },
      { label: 'Composition', value: '100% Long-Staple Supima Cotton' },
      { label: 'Fit', value: 'Boxy Relaxed' }
    ],
    images: [
      'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Pitch Black', hex: '#0a0a0a' },
      { name: 'Crisp Optic White', hex: '#ffffff' }
    ],
    stock: 60,
    rating: 5.0,
    reviewCount: 89,
    isBestSeller: true,
    isTrending: true,
    createdAt: '2026-01-08T10:00:00.000Z'
  },

  // 7. Women's Wear
  {
    id: 'mirli-cl-003',
    slug: 'mirli-aurora-sculpted-trench-coat',
    name: 'Aurora Minimalist Sculpted Trench Coat',
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'womens-wear',
    subcategoryTitle: "Women's Wear",
    price: 8499,
    mrp: 13999,
    discountPercent: 39,
    description: 'Water-resistant bonded organic cotton trench featuring raglan sleeves, a dramatic storm flap, exaggerated notch lapel, and a sash tie belt with horn buckle.',
    details: [
      'Double-weave water repellent technical cotton',
      'Detachable sash belt with polished buckle',
      'Deep welt storm pockets and inverted back pleat'
    ],
    specifications: [
      { label: 'Material', value: '100% Bonded Technical Cotton Gabardine' },
      { label: 'Length', value: '120 cm (Mid-Calf Length)' },
      { label: 'Lining', value: 'Signature MIRLI Monogram Twill' }
    ],
    images: [
      'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Obsidian Noir', hex: '#0f0f0f' },
      { name: 'Ecru Parchment', hex: '#e6ded3' }
    ],
    stock: 14,
    rating: 4.9,
    reviewCount: 31,
    isNewArrival: true,
    featured: true,
    createdAt: '2026-01-18T10:00:00.000Z'
  },
  {
    id: 'mirli-cl-004',
    slug: 'mirli-seraphina-silk-bias-cut-dress',
    name: 'Seraphina Heavyweight Silk Slip Dress',
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'womens-wear',
    subcategoryTitle: "Women's Wear",
    price: 5499,
    mrp: 8999,
    discountPercent: 38,
    description: 'Cut on the true bias from 22mm Mulberry silk charmeuse. Glides sensuously across the silhouette with an elegant cowl neckline and low-plunge back.',
    details: [
      '100% Grade-6A Mulberry Silk (22 Momme)',
      'Adjustable micro-rouleau straps',
      'True bias cut draping for natural stretch without elastane'
    ],
    specifications: [
      { label: 'Fabric', value: '100% Mulberry Silk Charmeuse' },
      { label: 'Neckline', value: 'Draped Cowl' },
      { label: 'Care', value: 'Dry Clean or Hand Wash Cold with Silk Detergent' }
    ],
    images: [
      'https://images.unsplash.com/photo-1496747611176-843222e1e57c?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1502716119720-b23a93e5fe1b?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Liquid Black', hex: '#000000' },
      { name: 'Pearl Frost', hex: '#f7f6f2' }
    ],
    stock: 22,
    rating: 4.8,
    reviewCount: 26,
    isSpecialOffer: true,
    createdAt: '2026-01-29T10:00:00.000Z'
  },

  // 8. Kids' Wear
  {
    id: 'mirli-cl-005',
    slug: 'mirli-junior-unisex-lounge-set',
    name: 'Junior Organic Waffle Knit Set',
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'kids-wear',
    subcategoryTitle: "Kids' Wear",
    price: 2199,
    mrp: 3499,
    discountPercent: 37,
    description: 'Super-soft 100% GOTS certified organic cotton thermal waffle two-piece set. Features a relaxed long-sleeve crewneck and joggers with soft ribbed cuffs.',
    details: [
      'GOTS Certified 100% Organic Cotton',
      'Tag-less neck label to prevent skin irritation',
      'Elastic waist with faux drawcord'
    ],
    specifications: [
      { label: 'Knit Type', value: 'Honeycomb Thermal Waffle' },
      { label: 'Certifications', value: 'GOTS Organic, Oeko-Tex Standard 100' }
    ],
    images: [
      'https://images.unsplash.com/photo-1622290291468-a28f7a7dc6a8?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['2-3Y', '4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Charcoal Black', hex: '#1c1c1c' },
      { name: 'Oat Milk', hex: '#ebe7df' }
    ],
    stock: 28,
    rating: 4.9,
    reviewCount: 34,
    isTrending: true,
    createdAt: '2026-01-22T10:00:00.000Z'
  },

  // 9. Boys' Wear
  {
    id: 'mirli-cl-006',
    slug: 'mirli-boys-varsity-bomber-jacket',
    name: "Boys' Monochrome Wool-Blend Varsity Jacket",
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'boys-wear',
    subcategoryTitle: "Boys' Wear",
    price: 3499,
    mrp: 5499,
    discountPercent: 36,
    description: 'Timeless luxury collegiate jacket. Wool-blend body, vegan pebble-grain leather sleeves, striped ribbed trims, and heavy snap button front.',
    details: [
      'Heavy duty wool felt body with vegan leather sleeves',
      'Diamond quilted insulated satin interior',
      'Chenille patch MIRLI monogram detailing'
    ],
    specifications: [
      { label: 'Outer Shell', value: '60% Wool, 40% Poly; PU Sleeves' },
      { label: 'Closure', value: 'Enamel Snap Buttons' }
    ],
    images: [
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1471286174890-9c112ffca56a?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Black & Snow White', hex: '#111111' }
    ],
    stock: 25,
    rating: 4.8,
    reviewCount: 21,
    isNewArrival: true,
    createdAt: '2026-02-04T10:00:00.000Z'
  },
  {
    id: 'mirli-cl-007',
    slug: 'mirli-boys-mandarin-collar-shirt',
    name: "Boys' Tailored Linen Mandarin Collar Shirt",
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'boys-wear',
    subcategoryTitle: "Boys' Wear",
    price: 1699,
    mrp: 2699,
    discountPercent: 37,
    description: 'Crisp pure Belgian linen shirt featuring a neat band collar, mother-of-pearl buttons, and roll-up sleeve tabs for festive elegance and relaxed comfort.',
    details: [
      '100% Pure Washed Belgian Linen',
      'Genuine mother-of-pearl buttons',
      'Chest patch pocket with subtle embroidery'
    ],
    specifications: [
      { label: 'Material', value: '100% Pure Linen' },
      { label: 'Collar', value: 'Band / Mandarin Collar' }
    ],
    images: [
      'https://images.unsplash.com/photo-1519238263530-99bdd11df2ea?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y', '12-13Y'],
    colors: [
      { name: 'Bright White', hex: '#ffffff' },
      { name: 'Raven Black', hex: '#141414' }
    ],
    stock: 30,
    rating: 4.7,
    reviewCount: 18,
    isSpecialOffer: true,
    createdAt: '2026-01-26T10:00:00.000Z'
  },

  // 10. Girls' Wear
  {
    id: 'mirli-cl-008',
    slug: 'mirli-girls-tulle-monochrome-ballerina-dress',
    name: "Girls' Couture Tiered Tulle Occasion Dress",
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'girls-wear',
    subcategoryTitle: "Girls' Wear",
    price: 3699,
    mrp: 5999,
    discountPercent: 38,
    description: 'A fairy-tale black and white couture creation. Hand-pleated Swiss dot tulle layered over a soft 100% organic cotton lining with velvet bow accents on shoulders.',
    details: [
      'Multi-tiered soft volume Swiss tulle',
      '100% hypoallergenic organic cotton inner lining',
      'Plush velvet ribbon tie details',
      'Concealed back invisible zipper'
    ],
    specifications: [
      { label: 'Outer Layers', value: 'Soft Micro-Mesh Tulle' },
      { label: 'Underlayer', value: '100% Organic Combed Cotton' },
      { label: 'Length', value: 'Knee Length Flare' }
    ],
    images: [
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['3-4Y', '5-6Y', '7-8Y', '9-10Y', '11-12Y'],
    colors: [
      { name: 'Monochrome Noir & Ivory', hex: '#1a1a1a' },
      { name: 'Swan White', hex: '#ffffff' }
    ],
    stock: 20,
    rating: 4.9,
    reviewCount: 43,
    isTrending: true,
    isBestSeller: true,
    featured: true,
    createdAt: '2026-01-14T10:00:00.000Z'
  },
  {
    id: 'mirli-cl-009',
    slug: 'mirli-girls-pleated-pinafore-set',
    name: "Girls' Monochrome Houndstooth Pinafore & Blouse Set",
    
    category: 'ready-made-clothes',
    categoryTitle: 'Ready-made Clothes',
    
    subcategory: 'girls-wear',
    subcategoryTitle: "Girls' Wear",
    price: 2899,
    mrp: 4499,
    discountPercent: 35,
    description: 'Chic Parisian aesthetics for young fashion icons. Houndstooth tailored pinafore dress paired with a puff-sleeve Peter Pan collar cotton poplin blouse.',
    details: [
      'Classic black & white micro houndstooth check',
      'Crisp cotton blouse with scalloped edge collar',
      'Adjustable buttoned crossover straps'
    ],
    specifications: [
      { label: 'Pinafore Fabric', value: 'Brushed Cotton Twill Houndstooth' },
      { label: 'Blouse Fabric', value: '100% Mercerized Cotton Poplin' }
    ],
    images: [
      'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?q=80&w=1000&auto=format&fit=crop',
      'https://images.unsplash.com/photo-1518831959646-742c3a14ebf7?q=80&w=1000&auto=format&fit=crop'
    ],
    sizes: ['4-5Y', '6-7Y', '8-9Y', '10-11Y'],
    colors: [
      { name: 'Monochrome Houndstooth', hex: '#222222' }
    ],
    stock: 16,
    rating: 4.8,
    reviewCount: 27,
    isNewArrival: true,
    createdAt: '2026-02-06T10:00:00.000Z'
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'GOYAL10',
    discountPercent: 10,
    maxDiscount: 1500,
    minOrder: 1999,
    description: '10% instant discount on orders above ₹1,999',
    active: true,
    expiresAt: '2026-12-31'
  },
  {
    code: 'MIRLI10',
    discountPercent: 10,
    maxDiscount: 1500,
    minOrder: 1999,
    description: '10% instant discount on orders above ₹1,999',
    active: true,
    expiresAt: '2026-12-31'
  },
  {
    code: 'LUXURY20',
    discountPercent: 20,
    maxDiscount: 3000,
    minOrder: 4999,
    description: '20% privilege discount on luxury orders above ₹4,999',
    active: true,
    expiresAt: '2026-12-31'
  },
  {
    code: 'WELCOME500',
    discountPercent: 15,
    maxDiscount: 500,
    minOrder: 1499,
    description: 'Welcome perk: Flat 15% off up to ₹500 on your first purchase',
    active: true,
    expiresAt: '2026-12-31'
  }
];

export const INITIAL_REVIEWS: Record<string, any[]> = {
  'mirli-fw-001': [
    {
      id: 'rev-1',
      productId: 'mirli-fw-001',
      customerName: 'Vikramaditya S.',
      rating: 5,
      title: 'Supreme craftsmanship, turns heads everywhere',
      comment: 'The leather quality on the Onyx Chelsea is rivaling high-end European fashion houses. Zero break-in period and looks sensational with both tailored trousers and raw denim.',
      verifiedPurchase: true,
      date: '2026-02-10'
    },
    {
      id: 'rev-2',
      productId: 'mirli-fw-001',
      customerName: 'Aditya Mehta',
      rating: 5,
      title: 'Worth every rupee',
      comment: 'Packaging was like opening an unboxing experience in Paris. High quality dust bags, leather aroma, and snug fit.',
      verifiedPurchase: true,
      date: '2026-02-12'
    }
  ],
  'mirli-fw-006': [
    {
      id: 'rev-3',
      productId: 'mirli-fw-006',
      customerName: 'Rohit K.',
      rating: 5,
      title: 'The cleanest white luxury sneaker in India',
      comment: 'Super sleek profile, no tacky logos, premium Nappa leather that cleans with a simple wet wipe. Highly recommended!',
      verifiedPurchase: true,
      date: '2026-02-08'
    }
  ],
  'mirli-cl-001': [
    {
      id: 'rev-4',
      productId: 'mirli-cl-001',
      customerName: 'Kunal Singhania',
      rating: 5,
      title: 'Stunning silhouette and premium wool drape',
      comment: 'The oversized cut is perfectly proportioned without looking baggy. The peak lapel and subtle horn buttons look incredibly expensive.',
      verifiedPurchase: true,
      date: '2026-02-14'
    }
  ]
};
