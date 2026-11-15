import fs from 'fs';
import path from 'path';
import { CATEGORIES, INITIAL_COUPONS, INITIAL_PRODUCTS, INITIAL_REVIEWS } from './initialData';
import {
  CategoryItem,
  Coupon,
  Order,
  OrderStatus,
  Product,
  Review,
  Customer,
  StockLog,
  AdminActivityLog,
  BannerSlide,
} from './types';

const DATA_DIR = path.join(process.cwd(), 'data');
const DB_FILE = path.join(DATA_DIR, 'database.json');

export interface DatabaseSchema {
  products: Product[];
  categories: CategoryItem[];
  orders: Order[];
  customers: Customer[];
  coupons: Coupon[];
  reviews: Record<string, Review[]>;
  stockLogs: StockLog[];
  activityLogs: AdminActivityLog[];
  settings: {
    announcementText: string;
    announcementSubText: string;
    freeShippingThreshold: number;
    standardShippingFee: number;
    codEnabled: boolean;
    contactPhone: string;
    contactEmail: string;
    storeAddress: string;
    heroSlides: BannerSlide[];
  };
}

const DEFAULT_SLIDES: BannerSlide[] = [
  {
    id: 'slide-1',
    title: 'THE MONOCHROME COUTURE COLLECTION',
    subtitle: 'Sculpted minimalism in premium black and white. Redefining modern luxury footwear and ready-made tailoring.',
    badge: 'SPRING/SUMMER 2026',
    ctaText: 'EXPLORE THE DROP',
    ctaLink: '/shop',
    image: 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop',
    active: true,
    order: 1,
  },
  {
    id: 'slide-2',
    title: 'MASTERWORK FOOTWEAR',
    subtitle: 'Hand-burnished Italian calfskin, Goodyear-welted boots, and sculpted architectural mules.',
    badge: 'SIGNATURE FOOTWEAR',
    ctaText: 'DISCOVER FOOTWEAR',
    ctaLink: '/category/footwear',
    image: 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1600&auto=format&fit=crop',
    active: true,
    order: 2,
  },
  {
    id: 'slide-3',
    title: 'READY-MADE TAILORING',
    subtitle: 'Pure Supima cottons, virgin wool blazers, and fluid silk slip silhouettes for men, women, and junior.',
    badge: 'TIMELESS APPAREL',
    ctaText: 'SHOP READY-MADE',
    ctaLink: '/category/ready-made-clothes',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?q=80&w=1600&auto=format&fit=crop',
    active: true,
    order: 3,
  },
  {
    id: 'slide-4',
    title: 'THE JUNIOR ATELIER',
    subtitle: 'Comfortable, durable luxury clothing and agile footwear crafted specially for boys and girls.',
    badge: 'KIDS & JUNIORS',
    ctaText: 'EXPLORE KIDS',
    ctaLink: '/category/ready-made-clothes/kids-wear',
    image: 'https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?q=80&w=1600&auto=format&fit=crop',
    active: true,
    order: 4,
  },
];

const DEFAULT_SETTINGS: DatabaseSchema['settings'] = {
  announcementText: 'EXCLUSIVE LUXURY DROP: Enjoy 10% off your first order with code GOYAL10 | Complimentary Express Shipping above ₹1,999',
  announcementSubText: 'AUTHENTIC INDIAN CRAFTSMANSHIP • GLOBAL MINIMALIST DESIGN',
  freeShippingThreshold: 1999,
  standardShippingFee: 149,
  codEnabled: true,
  contactPhone: '+91 98765 43210',
  contactEmail: 'concierge@mirli.store',
  storeAddress: 'GOYAL COLLECTIONS Flagship Atelier, 42 Boulevard de Royale, New Delhi, India 110001',
  heroSlides: DEFAULT_SLIDES,
};

const INITIAL_CUSTOMERS: Customer[] = [
  {
    id: 'cust-1001',
    fullName: 'Aarav Malhotra',
    email: 'aarav.malhotra@example.com',
    phone: '9876543210',
    createdAt: '2026-11-10T11:20:00.000Z',
    status: 'active',
    addresses: [
      {
        fullName: 'Aarav Malhotra',
        phone: '9876543210',
        email: 'aarav.malhotra@example.com',
        houseNo: 'Villa 14B',
        street: 'Golf Links Boulevard',
        area: 'Lutyens Zone',
        landmark: 'Near Club House',
        pincode: '110003',
        district: 'Central Delhi',
        state: 'Delhi',
        postOffice: 'Golf Links S.O',
        addressType: 'home',
        isDefault: true,
      },
    ],
    totalOrders: 1,
    totalSpending: 5850,
    lastOrderDate: '2026-11-14T11:20:00.000Z',
  },
  {
    id: 'cust-1002',
    fullName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9811223344',
    createdAt: '2026-11-05T14:40:00.000Z',
    status: 'active',
    addresses: [
      {
        fullName: 'Priya Sharma',
        phone: '9811223344',
        email: 'priya.sharma@example.com',
        houseNo: 'Flat 502, Tower 3',
        street: 'Hiranandani Estate',
        area: 'Thane West',
        landmark: 'Opposite Rodas Mall',
        pincode: '400607',
        district: 'Thane',
        state: 'Maharashtra',
        postOffice: 'Wagle I.E. S.O',
        addressType: 'home',
        isDefault: true,
      },
    ],
    totalOrders: 1,
    totalSpending: 6800,
    lastOrderDate: '2026-11-10T14:40:00.000Z',
  },
  {
    id: 'cust-1003',
    fullName: 'Gulshan Goyal',
    email: 'gulshan@mirli.store',
    phone: '9876543210',
    createdAt: '2026-11-01T09:00:00.000Z',
    status: 'active',
    addresses: [
      {
        fullName: 'Gulshan Goyal',
        phone: '9876543210',
        email: 'gulshan@mirli.store',
        houseNo: 'House #88',
        street: 'Fashion Avenue, High Street',
        area: 'Connaught Place',
        landmark: 'Near Regency Club',
        pincode: '110001',
        district: 'Central Delhi',
        state: 'Delhi',
        postOffice: 'Connaught Place H.O',
        addressType: 'home',
        isDefault: true,
      },
    ],
    totalOrders: 0,
    totalSpending: 0,
    lastOrderDate: '2026-11-01T09:00:00.000Z',
  },
];

const INITIAL_ORDERS: Order[] = [
  {
    id: 'mirli-ord-10021',
    orderNumber: 'MIRLI-90412',
    customerName: 'Aarav Malhotra',
    email: 'aarav.malhotra@example.com',
    phone: '9876543210',
    shippingAddress: {
      fullName: 'Aarav Malhotra',
      phone: '9876543210',
      email: 'aarav.malhotra@example.com',
      houseNo: 'Villa 14B',
      street: 'Golf Links Boulevard',
      area: 'Lutyens Zone',
      landmark: 'Near Club House',
      pincode: '110003',
      district: 'Central Delhi',
      state: 'Delhi',
      postOffice: 'Golf Links S.O',
      addressType: 'home',
      isDefault: true,
    },
    items: [
      {
        productId: 'mirli-fw-001',
        slug: 'mirli-onyx-chelsea-boot',
        name: 'Onyx Sovereign Leather Chelsea Boot',
        image: 'https://images.unsplash.com/photo-1638247025967-b4e38f787b76?q=80&w=1000&auto=format&fit=crop',
        price: 6499,
        mrp: 9999,
        size: 'UK 9',
        color: { name: 'Obsidian Black', hex: '#0a0a0a' },
        quantity: 1,
        category: 'footwear',
        subcategory: 'mens-footwear',
      },
    ],
    subtotal: 6499,
    discount: 649,
    couponCode: 'MIRLI10',
    deliveryCharge: 0,
    totalAmount: 5850,
    paymentMethod: 'ONLINE',
    paymentStatus: 'PAID',
    paymentId: 'pay_MRL_83921829',
    orderStatus: 'Out for Delivery',
    estimatedDeliveryDate: '17 Nov 2026',
    courierName: 'Blue Dart Express Air',
    trackingNumber: 'MIRLI-AIR-89218',
    internalNotes: 'VIP patron: ensure sealed signature gift packaging.',
    statusHistory: [
      { status: 'Order Placed', date: '14 Nov 2026', time: '11:20 AM', note: 'Order placed by customer.', updatedBy: 'System' },
      { status: 'Confirmed', date: '14 Nov 2026', time: '12:00 PM', note: 'Payment verified.', updatedBy: 'admin@mirli.store' },
      { status: 'Processing', date: '14 Nov 2026', time: '03:15 PM', note: 'Artisan QC passed.', updatedBy: 'admin@mirli.store' },
      { status: 'Packed', date: '14 Nov 2026', time: '06:00 PM', note: 'Signature box sealed.', updatedBy: 'admin@mirli.store' },
      { status: 'Shipped', date: '15 Nov 2026', time: '08:30 AM', note: 'Dispatched via Air Courier AWB #MIRLI-AIR-89218', updatedBy: 'admin@mirli.store' },
      { status: 'Out for Delivery', date: '15 Nov 2026', time: '10:15 AM', note: 'With delivery courier associate.', updatedBy: 'admin@mirli.store' },
    ],
    createdAt: '2026-11-14T11:20:00.000Z',
    updatedAt: '2026-11-15T09:30:00.000Z',
    trackingTimeline: [
      { status: 'Order Placed', date: '14 Nov 2026', time: '11:20 AM', location: 'New Delhi HQ', description: 'Order received and verified by MIRLI Concierge.', completed: true, current: false },
      { status: 'Confirmed', date: '14 Nov 2026', time: '12:00 PM', location: 'New Delhi HQ', description: 'Payment authorized and inventory reserved.', completed: true, current: false },
      { status: 'Processing', date: '14 Nov 2026', time: '03:15 PM', location: 'Central Fulfillment Atelier', description: 'Items retrieved and passed 12-point quality check.', completed: true, current: false },
      { status: 'Packed', date: '14 Nov 2026', time: '06:00 PM', location: 'Central Fulfillment Atelier', description: 'Hand-packaged in signature MIRLI black gift box with dust bags.', completed: true, current: false },
      { status: 'Shipped', date: '15 Nov 2026', time: '08:30 AM', location: 'Delhi Express Logistics Hub', description: 'Dispatched via Premium Air Courier (AWB #MIRLI-AIR-8921).', completed: true, current: false },
      { status: 'Out for Delivery', date: '15 Nov 2026', time: '10:15 AM', location: 'Central Delhi Delivery Facility', description: 'Courier associate is out for delivery to your doorstep.', completed: true, current: true },
      { status: 'Delivered', date: '15 Nov 2026', time: 'Expected by 05:00 PM', location: 'Customer Address', description: 'Package delivered and signed for.', completed: false, current: false },
    ],
  },
  {
    id: 'mirli-ord-10020',
    orderNumber: 'MIRLI-89301',
    customerName: 'Priya Sharma',
    email: 'priya.sharma@example.com',
    phone: '9811223344',
    shippingAddress: {
      fullName: 'Priya Sharma',
      phone: '9811223344',
      email: 'priya.sharma@example.com',
      houseNo: 'Flat 502, Tower 3',
      street: 'Hiranandani Estate',
      area: 'Thane West',
      landmark: 'Opposite Rodas Mall',
      pincode: '400607',
      district: 'Thane',
      state: 'Maharashtra',
      postOffice: 'Wagle I.E. S.O',
      addressType: 'home',
      isDefault: true,
    },
    items: [
      {
        productId: 'mirli-cl-003',
        slug: 'mirli-aurora-sculpted-trench-coat',
        name: 'Aurora Minimalist Sculpted Trench Coat',
        image: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=1000&auto=format&fit=crop',
        price: 8499,
        mrp: 13999,
        size: 'M',
        color: { name: 'Obsidian Noir', hex: '#0f0f0f' },
        quantity: 1,
        category: 'ready-made-clothes',
        subcategory: 'womens-wear',
      },
    ],
    subtotal: 8499,
    discount: 1699,
    couponCode: 'LUXURY20',
    deliveryCharge: 0,
    totalAmount: 6800,
    paymentMethod: 'ONLINE',
    paymentStatus: 'PAID',
    paymentId: 'pay_MRL_7740192',
    orderStatus: 'Delivered',
    estimatedDeliveryDate: '13 Nov 2026',
    courierName: 'Delhivery Surface Premium',
    trackingNumber: 'DEL-992104-MRL',
    createdAt: '2026-11-10T14:40:00.000Z',
    updatedAt: '2026-11-13T16:20:00.000Z',
    statusHistory: [
      { status: 'Order Placed', date: '10 Nov 2026', time: '02:40 PM', note: 'Order placed online.', updatedBy: 'System' },
      { status: 'Delivered', date: '13 Nov 2026', time: '04:20 PM', note: 'Successfully delivered to customer.', updatedBy: 'admin@mirli.store' },
    ],
    trackingTimeline: [
      { status: 'Order Placed', date: '10 Nov 2026', time: '02:40 PM', description: 'Order confirmed.', completed: true, current: false },
      { status: 'Confirmed', date: '10 Nov 2026', time: '03:10 PM', description: 'Verified by atelier.', completed: true, current: false },
      { status: 'Processing', date: '11 Nov 2026', time: '10:00 AM', description: 'Handcrafted inspection passed.', completed: true, current: false },
      { status: 'Packed', date: '11 Nov 2026', time: '04:00 PM', description: 'Wrapped in archival garment bag.', completed: true, current: false },
      { status: 'Shipped', date: '12 Nov 2026', time: '09:00 AM', description: 'En route via Blue Dart Express.', completed: true, current: false },
      { status: 'Out for Delivery', date: '13 Nov 2026', time: '09:45 AM', description: 'With delivery courier.', completed: true, current: false },
      { status: 'Delivered', date: '13 Nov 2026', time: '04:20 PM', description: 'Handed to recipient with signature.', completed: true, current: true },
    ],
  },
];

let memoryCache: DatabaseSchema | null = null;

export function initDB(): DatabaseSchema {
  if (memoryCache) {
    return memoryCache;
  }

  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  let dbData: DatabaseSchema;

  if (!fs.existsSync(DB_FILE)) {
    dbData = {
      products: INITIAL_PRODUCTS.map((p) => ({
        ...p,
        sku: p.sku || `MRL-${p.category.slice(0, 2).toUpperCase()}-${p.id.split('-').pop()?.toUpperCase() || '001'}`,
        status: p.status || 'active',
      })),
      categories: CATEGORIES,
      orders: INITIAL_ORDERS,
      customers: INITIAL_CUSTOMERS,
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      stockLogs: [
        {
          id: 'log-init-1',
          productId: 'mirli-fw-001',
          productName: 'Onyx Sovereign Leather Chelsea Boot',
          previousStock: 0,
          newStock: 25,
          change: 25,
          reason: 'Initial atelier inventory intake',
          adminEmail: 'admin@mirli.store',
          timestamp: '2026-11-10T10:00:00.000Z',
        },
      ],
      activityLogs: [
        {
          id: 'act-init-1',
          action: 'System Initialized',
          category: 'Auth',
          details: 'MIRLI Command Atelier security protocol activated.',
          adminEmail: 'admin@mirli.store',
          timestamp: '2026-11-10T10:00:00.000Z',
        },
      ],
      settings: DEFAULT_SETTINGS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
    memoryCache = dbData;
    return dbData;
  }

  try {
    const raw = fs.readFileSync(DB_FILE, 'utf-8');
    dbData = JSON.parse(raw);

    // Ensure all required fields exist in existing DB
    if (!dbData.customers || dbData.customers.length === 0) {
      dbData.customers = INITIAL_CUSTOMERS;
    }
    if (!dbData.stockLogs) {
      dbData.stockLogs = [];
    }
    if (!dbData.activityLogs) {
      dbData.activityLogs = [];
    }
    if (!dbData.settings) {
      dbData.settings = DEFAULT_SETTINGS;
    }
    if (!dbData.settings.heroSlides || dbData.settings.heroSlides.length === 0) {
      dbData.settings.heroSlides = DEFAULT_SLIDES;
    } else {
      dbData.settings.heroSlides = dbData.settings.heroSlides.map((s, idx) => ({
        ...s,
        active: s.active !== undefined ? s.active : true,
        order: s.order !== undefined ? s.order : idx + 1,
      }));
    }

    // Ensure products have SKU and status
    dbData.products = dbData.products.map((p) => ({
      ...p,
      sku: p.sku || `MRL-${p.category.slice(0, 2).toUpperCase()}-${p.id.split('-').pop()?.toUpperCase() || '001'}`,
      status: p.status || 'active',
    }));

    // Ensure reviews have status
    if (dbData.reviews) {
      Object.keys(dbData.reviews).forEach((pid) => {
        dbData.reviews[pid] = dbData.reviews[pid].map((r) => ({
          ...r,
          status: r.status || 'approved',
        }));
      });
    }

    memoryCache = dbData;
    return dbData;
  } catch (err) {
    console.error('Failed reading DB file, reinitializing', err);
    dbData = {
      products: INITIAL_PRODUCTS,
      categories: CATEGORIES,
      orders: INITIAL_ORDERS,
      customers: INITIAL_CUSTOMERS,
      coupons: INITIAL_COUPONS,
      reviews: INITIAL_REVIEWS,
      stockLogs: [],
      activityLogs: [],
      settings: DEFAULT_SETTINGS,
    };
    fs.writeFileSync(DB_FILE, JSON.stringify(dbData, null, 2), 'utf-8');
    memoryCache = dbData;
    return dbData;
  }
}

export function saveDB(data: DatabaseSchema): void {
  memoryCache = data;
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  fs.writeFileSync(tempFile, JSON.stringify(data, null, 2), 'utf-8');
  fs.renameSync(tempFile, DB_FILE);
}

// ================= ACTIVITY LOGS =================
export function logAdminActivity(
  action: string,
  category: AdminActivityLog['category'],
  details: string,
  adminEmail = 'admin@mirli.store'
): AdminActivityLog {
  const db = initDB();
  const log: AdminActivityLog = {
    id: `act-${Date.now()}-${Math.floor(Math.random() * 1000)}`,
    action,
    category,
    details,
    adminEmail,
    timestamp: new Date().toISOString(),
  };
  db.activityLogs.unshift(log);
  if (db.activityLogs.length > 500) {
    db.activityLogs = db.activityLogs.slice(0, 500);
  }
  saveDB(db);
  return log;
}

export function getActivityLogs(limit = 100): AdminActivityLog[] {
  const db = initDB();
  return db.activityLogs.slice(0, limit);
}

// ================= PRODUCT METHODS =================
export function getProducts(options?: {
  category?: string;
  subcategory?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  size?: string;
  color?: string;
  sort?: string;
  featured?: boolean;
  trending?: boolean;
  newArrival?: boolean;
  bestSeller?: boolean;
  specialOffer?: boolean;
  status?: 'active' | 'inactive';
  includeInactive?: boolean;
  limit?: number;
}): { products: Product[]; total: number } {
  const db = initDB();
  let list = [...db.products];

  // By default, filter out inactive products for public website unless explicitly requested
  if (!options?.includeInactive) {
    list = list.filter((p) => p.status !== 'inactive');
  } else if (options?.status) {
    list = list.filter((p) => (p.status || 'active') === options.status);
  }

  if (options?.category) {
    list = list.filter((p) => p.category === options.category);
  }
  if (options?.subcategory) {
    list = list.filter((p) => p.subcategory === options.subcategory);
  }
  if (options?.featured) {
    list = list.filter((p) => p.featured);
  }
  if (options?.trending) {
    list = list.filter((p) => p.isTrending);
  }
  if (options?.newArrival) {
    list = list.filter((p) => p.isNewArrival);
  }
  if (options?.bestSeller) {
    list = list.filter((p) => p.isBestSeller);
  }
  if (options?.specialOffer) {
    list = list.filter((p) => p.isSpecialOffer || p.discountPercent >= 35);
  }

  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (p) =>
        p.name.toLowerCase().includes(q) ||
        (p.sku && p.sku.toLowerCase().includes(q)) ||
        (p.hindiName && p.hindiName.includes(q)) ||
        p.description.toLowerCase().includes(q) ||
        p.subcategoryTitle.toLowerCase().includes(q) ||
        p.categoryTitle.toLowerCase().includes(q)
    );
  }

  if (options?.minPrice !== undefined) {
    list = list.filter((p) => p.price >= options.minPrice!);
  }
  if (options?.maxPrice !== undefined) {
    list = list.filter((p) => p.price <= options.maxPrice!);
  }
  if (options?.size) {
    list = list.filter((p) => p.sizes.includes(options.size!));
  }
  if (options?.color) {
    const c = options.color.toLowerCase();
    list = list.filter((p) => p.colors.some((col) => col.name.toLowerCase().includes(c)));
  }

  // Sorting
  if (options?.sort) {
    switch (options.sort) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'popular':
        list.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      case 'stock-asc':
        list.sort((a, b) => a.stock - b.stock);
        break;
      case 'stock-desc':
        list.sort((a, b) => b.stock - a.stock);
        break;
      case 'newest':
      default:
        list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
    }
  }

  const total = list.length;
  if (options?.limit && options.limit > 0) {
    list = list.slice(0, options.limit);
  }

  return { products: list, total };
}

export function getProductBySlug(slug: string): Product | null {
  const db = initDB();
  return db.products.find((p) => p.slug === slug) || null;
}

export function getProductById(id: string): Product | null {
  const db = initDB();
  return db.products.find((p) => p.id === id) || null;
}

export function createProduct(
  productData: Omit<Product, 'id' | 'createdAt'>,
  adminEmail = 'admin@mirli.store'
): Product {
  const db = initDB();
  const id = `mirli-item-${Date.now()}`;
  const slug =
    productData.slug ||
    productData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
  const sku =
    productData.sku ||
    `MRL-${productData.category.slice(0, 2).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;

  const newProduct: Product = {
    ...productData,
    id,
    slug,
    sku,
    status: productData.status || 'active',
    createdAt: new Date().toISOString(),
  };

  db.products.unshift(newProduct);

  // Initial stock log
  db.stockLogs.unshift({
    id: `log-${Date.now()}`,
    productId: id,
    productName: newProduct.name,
    previousStock: 0,
    newStock: newProduct.stock,
    change: newProduct.stock,
    reason: 'Initial product stock created',
    adminEmail,
    timestamp: new Date().toISOString(),
  });

  logAdminActivity('Product Created', 'Product', `Created "${newProduct.name}" (SKU: ${sku})`, adminEmail);

  saveDB(db);
  return newProduct;
}

export function updateProduct(
  id: string,
  updates: Partial<Product>,
  adminEmail = 'admin@mirli.store'
): Product | null {
  const db = initDB();
  const index = db.products.findIndex((p) => p.id === id);
  if (index === -1) return null;

  const oldProduct = db.products[index];
  const oldStock = oldProduct.stock;

  db.products[index] = { ...oldProduct, ...updates };

  // If stock was modified directly
  if (updates.stock !== undefined && updates.stock !== oldStock) {
    db.stockLogs.unshift({
      id: `log-${Date.now()}`,
      productId: id,
      productName: oldProduct.name,
      previousStock: oldStock,
      newStock: updates.stock,
      change: updates.stock - oldStock,
      reason: 'Manual admin stock update',
      adminEmail,
      timestamp: new Date().toISOString(),
    });
  }

  logAdminActivity(
    'Product Updated',
    'Product',
    `Updated details for "${oldProduct.name}" (ID: ${id})`,
    adminEmail
  );

  saveDB(db);
  return db.products[index];
}

export function deleteProduct(id: string, adminEmail = 'admin@mirli.store'): boolean {
  const db = initDB();
  const prod = db.products.find((p) => p.id === id);
  if (!prod) return false;

  db.products = db.products.filter((p) => p.id !== id);

  logAdminActivity('Product Deleted', 'Product', `Permanently removed "${prod.name}" (SKU: ${prod.sku || prod.id})`, adminEmail);

  saveDB(db);
  return true;
}

// ================= CATEGORIES =================
export function getCategories(): CategoryItem[] {
  const db = initDB();
  return db.categories;
}

export function getCategoryBySlug(slug: string): CategoryItem | null {
  const db = initDB();
  return db.categories.find((c) => c.slug === slug || c.id === slug) || null;
}

export function addCategory(categoryData: CategoryItem, adminEmail = 'admin@mirli.store'): CategoryItem {
  const db = initDB();
  const existing = db.categories.find((c) => c.slug === categoryData.slug);
  if (existing) {
    return existing;
  }
  db.categories.push(categoryData);
  logAdminActivity('Category Created', 'Category', `Created category "${categoryData.name}" (${categoryData.slug})`, adminEmail);
  saveDB(db);
  return categoryData;
}

export function updateCategory(
  slugOrId: string,
  updates: Partial<CategoryItem>,
  adminEmail = 'admin@mirli.store'
): CategoryItem | null {
  const db = initDB();
  const idx = db.categories.findIndex((c) => c.slug === slugOrId || c.id === slugOrId);
  if (idx === -1) return null;

  db.categories[idx] = { ...db.categories[idx], ...updates };
  logAdminActivity('Category Updated', 'Category', `Updated category "${db.categories[idx].name}"`, adminEmail);
  saveDB(db);
  return db.categories[idx];
}

export function deleteCategory(
  slug: string,
  force = false,
  adminEmail = 'admin@mirli.store'
): { success: boolean; message?: string } {
  const db = initDB();
  const cat = db.categories.find((c) => c.slug === slug);
  if (!cat) return { success: false, message: 'Category not found.' };

  const productsInCat = db.products.filter((p) => p.category === slug);
  if (productsInCat.length > 0 && !force) {
    return {
      success: false,
      message: `Cannot delete category "${cat.name}": contains ${productsInCat.length} products. Please reassign products first.`,
    };
  }

  db.categories = db.categories.filter((c) => c.slug !== slug);
  logAdminActivity('Category Deleted', 'Category', `Deleted category "${cat.name}" (${slug})`, adminEmail);
  saveDB(db);
  return { success: true };
}

export function addSubcategory(
  categorySlug: string,
  subcategory: CategoryItem['subcategories'][0],
  adminEmail = 'admin@mirli.store'
): CategoryItem | null {
  const db = initDB();
  const cat = db.categories.find((c) => c.slug === categorySlug);
  if (!cat) return null;

  const exists = cat.subcategories.some((s) => s.slug === subcategory.slug);
  if (!exists) {
    cat.subcategories.push(subcategory);
    logAdminActivity(
      'Subcategory Added',
      'Category',
      `Added subcategory "${subcategory.name}" to "${cat.name}"`,
      adminEmail
    );
    saveDB(db);
  }
  return cat;
}

// ================= CUSTOMERS =================
export function getCustomers(search?: string): Customer[] {
  const db = initDB();
  let list = [...db.customers];

  // Refresh stats for each customer dynamically from orders
  list = list.map((c) => {
    const custOrders = db.orders.filter(
      (o) => o.email.toLowerCase() === c.email.toLowerCase() || o.phone === c.phone
    );
    const validOrders = custOrders.filter(
      (o) => o.orderStatus !== 'Cancelled' && o.paymentStatus !== 'REFUNDED'
    );
    const spending = validOrders.reduce((sum, o) => sum + o.totalAmount, 0);
    const lastOrder = custOrders[0]?.createdAt || c.lastOrderDate;

    return {
      ...c,
      totalOrders: custOrders.length,
      totalSpending: spending,
      lastOrderDate: lastOrder,
    };
  });

  if (search) {
    const q = search.toLowerCase().trim();
    list = list.filter(
      (c) =>
        c.fullName.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.phone.includes(q) ||
        c.id.toLowerCase().includes(q)
    );
  }

  return list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getCustomerById(id: string): { customer: Customer; orders: Order[] } | null {
  const db = initDB();
  const customer = db.customers.find((c) => c.id === id || c.email === id);
  if (!customer) return null;

  const orders = db.orders.filter(
    (o) => o.email.toLowerCase() === customer.email.toLowerCase() || o.phone === customer.phone
  );

  return { customer, orders };
}

export function updateCustomerStatus(
  id: string,
  status: Customer['status'],
  adminEmail = 'admin@mirli.store'
): Customer | null {
  const db = initDB();
  const customer = db.customers.find((c) => c.id === id);
  if (!customer) return null;

  customer.status = status;
  logAdminActivity(
    'Customer Account Updated',
    'Customer',
    `Changed status of customer "${customer.fullName}" (${customer.email}) to ${status}`,
    adminEmail
  );
  saveDB(db);
  return customer;
}

// ================= ORDERS =================
export function getOrders(filter?: {
  email?: string;
  phone?: string;
  userId?: string;
  status?: OrderStatus;
  search?: string;
}): Order[] {
  const db = initDB();
  let orders = [...db.orders];

  if (filter?.email) {
    orders = orders.filter((o) => o.email.toLowerCase() === filter.email!.toLowerCase());
  }
  if (filter?.phone) {
    orders = orders.filter((o) => o.phone.includes(filter.phone!));
  }
  if (filter?.status) {
    orders = orders.filter((o) => o.orderStatus === filter.status);
  }
  if (filter?.search) {
    const q = filter.search.toLowerCase().trim();
    orders = orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.email.toLowerCase().includes(q) ||
        o.phone.includes(q) ||
        (o.trackingNumber && o.trackingNumber.toLowerCase().includes(q))
    );
  }

  return orders.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getOrderById(idOrNumber: string): Order | null {
  const db = initDB();
  return (
    db.orders.find(
      (o) =>
        o.id === idOrNumber ||
        o.orderNumber.toLowerCase() === idOrNumber.toLowerCase()
    ) || null
  );
}

export function createOrder(data: {
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: Order['shippingAddress'];
  items: Order['items'];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: 'COD' | 'ONLINE';
  paymentId?: string;
}): Order {
  const db = initDB();
  const now = new Date();
  const randomSuffix = Math.floor(10000 + Math.random() * 90000);
  const orderId = `mirli-ord-${Date.now()}`;
  const orderNumber = `MIRLI-${randomSuffix}`;

  const estDate = new Date(now.getTime() + 4 * 24 * 60 * 60 * 1000);
  const estimatedDeliveryDate = estDate.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });

  const trackingTimeline: Order['trackingTimeline'] = [
    {
      status: 'Order Placed',
      date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' }),
      time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
      location: 'MIRLI Atelier, New Delhi',
      description: 'Your bespoke order has been recorded in our concierge queue.',
      completed: true,
      current: true,
    },
    {
      status: 'Confirmed',
      date: 'Estimated within 2 hours',
      time: '--:--',
      location: 'MIRLI Atelier',
      description: 'Payment authorized and order confirmed by fulfillment team.',
      completed: false,
      current: false,
    },
    {
      status: 'Processing',
      date: 'Estimated next day',
      time: '--:--',
      location: 'Central Fulfillment Atelier',
      description: 'Master artisans preparing and inspecting items.',
      completed: false,
      current: false,
    },
    {
      status: 'Packed',
      date: 'Pending',
      time: '--:--',
      location: 'Central Fulfillment Atelier',
      description: 'Luxury packaging in signature monochrome rigid gift box.',
      completed: false,
      current: false,
    },
    {
      status: 'Shipped',
      date: 'Pending',
      time: '--:--',
      location: 'Courier Express Hub',
      description: 'Dispatched via premium express courier service.',
      completed: false,
      current: false,
    },
    {
      status: 'Out for Delivery',
      date: 'Pending',
      time: '--:--',
      location: 'Local Delivery Station',
      description: 'Assigned to courier partner for final delivery.',
      completed: false,
      current: false,
    },
    {
      status: 'Delivered',
      date: estimatedDeliveryDate,
      time: 'By 7:00 PM',
      location: `${data.shippingAddress.district || 'Destination'}, ${data.shippingAddress.state || ''}`,
      description: 'Delivered directly into your hands.',
      completed: false,
      current: false,
    },
  ];

  const newOrder: Order = {
    id: orderId,
    orderNumber,
    customerName: data.customerName,
    email: data.email,
    phone: data.phone,
    shippingAddress: data.shippingAddress,
    items: data.items,
    subtotal: data.subtotal,
    discount: data.discount,
    couponCode: data.couponCode,
    deliveryCharge: data.deliveryCharge,
    totalAmount: data.totalAmount,
    paymentMethod: data.paymentMethod,
    paymentStatus: data.paymentMethod === 'ONLINE' ? 'PAID' : 'PENDING',
    paymentId: data.paymentId || (data.paymentMethod === 'ONLINE' ? `pay_sim_${Date.now()}` : undefined),
    orderStatus: 'Order Placed',
    trackingTimeline,
    estimatedDeliveryDate,
    statusHistory: [
      {
        status: 'Order Placed',
        date: now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' }),
        time: now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' }),
        note: 'Order successfully recorded.',
        updatedBy: 'Customer Checkout',
      },
    ],
    createdAt: now.toISOString(),
    updatedAt: now.toISOString(),
  };

  db.orders.unshift(newOrder);

  // Auto-deduct stock & log inventory change
  for (const item of data.items) {
    const product = db.products.find((p) => p.id === item.productId);
    if (product) {
      const prevStock = product.stock;
      product.stock = Math.max(0, product.stock - item.quantity);
      db.stockLogs.unshift({
        id: `log-${Date.now()}-${item.productId}`,
        productId: product.id,
        productName: product.name,
        previousStock: prevStock,
        newStock: product.stock,
        change: -item.quantity,
        reason: `Order ${orderNumber} placed`,
        adminEmail: 'System',
        timestamp: now.toISOString(),
      });
    }
  }

  // Sync customer record in db.customers
  const existingCust = db.customers.find(
    (c) => c.email.toLowerCase() === data.email.toLowerCase() || c.phone === data.phone
  );
  if (existingCust) {
    existingCust.totalOrders = (existingCust.totalOrders || 0) + 1;
    existingCust.totalSpending = (existingCust.totalSpending || 0) + data.totalAmount;
    existingCust.lastOrderDate = now.toISOString();
    const hasAddress = existingCust.addresses.some(
      (a) => a.pincode === data.shippingAddress.pincode && a.houseNo === data.shippingAddress.houseNo
    );
    if (!hasAddress) {
      existingCust.addresses.push(data.shippingAddress);
    }
  } else {
    db.customers.unshift({
      id: `cust-${Date.now()}`,
      fullName: data.customerName,
      email: data.email,
      phone: data.phone,
      createdAt: now.toISOString(),
      status: 'active',
      addresses: [data.shippingAddress],
      totalOrders: 1,
      totalSpending: data.totalAmount,
      lastOrderDate: now.toISOString(),
    });
  }

  logAdminActivity('Order Placed', 'Order', `New order ${orderNumber} placed for ₹${data.totalAmount}`, 'System');

  saveDB(db);
  return newOrder;
}

export function updateOrderStatus(
  orderId: string,
  newStatus: OrderStatus,
  options?: {
    notes?: string;
    courierName?: string;
    trackingNumber?: string;
    adminEmail?: string;
  }
): Order | null {
  const db = initDB();
  const order = db.orders.find((o) => o.id === orderId || o.orderNumber === orderId);
  if (!order) return null;

  const previousStatus = order.orderStatus;
  const adminEmail = options?.adminEmail || 'admin@mirli.store';
  const now = new Date();
  const dateStr = now.toLocaleDateString('en-IN', { day: 'numeric', month: 'short' });
  const timeStr = now.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });

  order.orderStatus = newStatus;
  order.updatedAt = now.toISOString();

  if (options?.notes) order.internalNotes = options.notes;
  if (options?.courierName) order.courierName = options.courierName;
  if (options?.trackingNumber) order.trackingNumber = options.trackingNumber;

  // Initialize statusHistory if missing
  if (!order.statusHistory) {
    order.statusHistory = [];
  }
  order.statusHistory.push({
    status: newStatus,
    date: dateStr,
    time: timeStr,
    note: options?.notes || `Status transitioned to ${newStatus}`,
    updatedBy: adminEmail,
  });

  // STOCK RESTORATION RULE:
  // If moving from an active state to Cancelled or Returned, restore inventory!
  const isNowCancelledOrReturned = newStatus === 'Cancelled' || newStatus === 'Returned';
  const wasActive = previousStatus !== 'Cancelled' && previousStatus !== 'Returned';

  if (isNowCancelledOrReturned && wasActive) {
    for (const item of order.items) {
      const prod = db.products.find((p) => p.id === item.productId);
      if (prod) {
        const prevStock = prod.stock;
        prod.stock += item.quantity;
        db.stockLogs.unshift({
          id: `log-${Date.now()}-${item.productId}`,
          productId: prod.id,
          productName: prod.name,
          previousStock: prevStock,
          newStock: prod.stock,
          change: item.quantity,
          reason: `Stock restored from ${newStatus} order ${order.orderNumber}`,
          adminEmail,
          timestamp: now.toISOString(),
        });
      }
    }
  }

  // Handle financial statuses
  if (newStatus === 'Cancelled') {
    order.cancellationReason = options?.notes || 'Cancelled by admin';
    if (order.paymentStatus === 'PAID') {
      order.paymentStatus = 'REFUNDED';
    }
  }
  if (newStatus === 'Return Requested') {
    order.returnReason = options?.notes || 'Return initiated';
  }
  if (newStatus === 'Returned' || newStatus === 'Refunded') {
    order.paymentStatus = 'REFUNDED';
  }

  // Update tracking steps timeline
  const statusesSequence: OrderStatus[] = [
    'Order Placed',
    'Confirmed',
    'Processing',
    'Packed',
    'Shipped',
    'Out for Delivery',
    'Delivered',
  ];

  const targetIdx = statusesSequence.indexOf(newStatus);
  if (targetIdx !== -1) {
    order.trackingTimeline.forEach((step) => {
      const stepIdx = statusesSequence.indexOf(step.status);
      if (stepIdx !== -1) {
        if (stepIdx < targetIdx) {
          step.completed = true;
          step.current = false;
        } else if (stepIdx === targetIdx) {
          step.completed = true;
          step.current = true;
          step.date = dateStr;
          step.time = timeStr;
          if (options?.notes) step.description = options.notes;
        } else {
          step.completed = false;
          step.current = false;
        }
      }
    });
  }

  logAdminActivity(
    'Order Status Updated',
    'Order',
    `Order ${order.orderNumber} status changed from "${previousStatus}" to "${newStatus}"`,
    adminEmail
  );

  saveDB(db);
  return order;
}

// ================= INVENTORY =================
export function getStockLogs(limit = 100): StockLog[] {
  const db = initDB();
  return db.stockLogs.slice(0, limit);
}

export function adjustStock(
  productId: string,
  newStock: number,
  reason: string,
  adminEmail = 'admin@mirli.store'
): { product: Product; log: StockLog } | null {
  const db = initDB();
  const prod = db.products.find((p) => p.id === productId);
  if (!prod) return null;

  const previousStock = prod.stock;
  prod.stock = Math.max(0, newStock);

  const log: StockLog = {
    id: `log-${Date.now()}`,
    productId,
    productName: prod.name,
    previousStock,
    newStock: prod.stock,
    change: prod.stock - previousStock,
    reason: reason || 'Manual stock adjustment',
    adminEmail,
    timestamp: new Date().toISOString(),
  };

  db.stockLogs.unshift(log);
  logAdminActivity(
    'Inventory Updated',
    'Inventory',
    `Adjusted stock for "${prod.name}" from ${previousStock} to ${prod.stock} (${reason})`,
    adminEmail
  );

  saveDB(db);
  return { product: prod, log };
}

// ================= COUPONS =================
export function getCoupons(): Coupon[] {
  const db = initDB();
  return db.coupons;
}

export function validateCoupon(
  code: string,
  subtotal: number
): { valid: boolean; discount: number; message: string; coupon?: Coupon } {
  const db = initDB();
  const coupon = db.coupons.find((c) => c.code.toUpperCase() === code.toUpperCase() && c.active);

  if (!coupon) {
    return { valid: false, discount: 0, message: 'Invalid or expired coupon code.' };
  }

  if (subtotal < coupon.minOrder) {
    return {
      valid: false,
      discount: 0,
      message: `Minimum order amount of ₹${coupon.minOrder.toLocaleString('en-IN')} required to apply this coupon.`,
    };
  }

  let discount = Math.round((subtotal * coupon.discountPercent) / 100);
  if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }

  return {
    valid: true,
    discount,
    message: `Coupon applied! You saved ₹${discount.toLocaleString('en-IN')}.`,
    coupon,
  };
}

export function createCoupon(coupon: Coupon, adminEmail = 'admin@mirli.store'): Coupon {
  const db = initDB();
  const existingIdx = db.coupons.findIndex((c) => c.code.toUpperCase() === coupon.code.toUpperCase());
  if (existingIdx !== -1) {
    db.coupons[existingIdx] = coupon;
  } else {
    db.coupons.push(coupon);
  }
  logAdminActivity('Coupon Created', 'Coupon', `Created/Updated coupon ${coupon.code} (${coupon.discountPercent}% off)`, adminEmail);
  saveDB(db);
  return coupon;
}

export function updateCoupon(
  code: string,
  updates: Partial<Coupon>,
  adminEmail = 'admin@mirli.store'
): Coupon | null {
  const db = initDB();
  const idx = db.coupons.findIndex((c) => c.code.toUpperCase() === code.toUpperCase());
  if (idx === -1) return null;

  db.coupons[idx] = { ...db.coupons[idx], ...updates };
  logAdminActivity('Coupon Updated', 'Coupon', `Updated coupon ${code}`, adminEmail);
  saveDB(db);
  return db.coupons[idx];
}

export function deleteCoupon(code: string, adminEmail = 'admin@mirli.store'): boolean {
  const db = initDB();
  const len = db.coupons.length;
  db.coupons = db.coupons.filter((c) => c.code.toUpperCase() !== code.toUpperCase());
  if (db.coupons.length !== len) {
    logAdminActivity('Coupon Deleted', 'Coupon', `Deleted coupon ${code}`, adminEmail);
    saveDB(db);
    return true;
  }
  return false;
}

// ================= REVIEWS =================
export function getReviews(productId: string): Review[] {
  const db = initDB();
  const list = db.reviews[productId] || [];
  // Return only approved reviews for public customers
  return list.filter((r) => r.status === 'approved' || !r.status);
}

export function getAllReviews(): Review[] {
  const db = initDB();
  const all: Review[] = [];
  for (const [prodId, revList] of Object.entries(db.reviews)) {
    const prod = db.products.find((p) => p.id === prodId);
    for (const rev of revList) {
      all.push({
        ...rev,
        productName: prod?.name || prodId,
        status: rev.status || 'approved',
      });
    }
  }
  return all.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function addReview(reviewData: Omit<Review, 'id' | 'date'>): Review {
  const db = initDB();
  const newRev: Review = {
    ...reviewData,
    id: `rev-${Date.now()}`,
    status: reviewData.status || 'approved',
    date: new Date().toISOString().split('T')[0],
  };

  if (!db.reviews[reviewData.productId]) {
    db.reviews[reviewData.productId] = [];
  }
  db.reviews[reviewData.productId].unshift(newRev);

  // Recalculate product rating
  const approvedRevs = db.reviews[reviewData.productId].filter((r) => r.status === 'approved');
  if (approvedRevs.length > 0) {
    const avgRating = Number((approvedRevs.reduce((acc, r) => acc + r.rating, 0) / approvedRevs.length).toFixed(1));
    const prod = db.products.find((p) => p.id === reviewData.productId);
    if (prod) {
      prod.rating = avgRating;
      prod.reviewCount = approvedRevs.length;
    }
  }

  saveDB(db);
  return newRev;
}

export function updateReviewStatus(
  productId: string,
  reviewId: string,
  status: 'approved' | 'rejected',
  adminEmail = 'admin@mirli.store'
): Review | null {
  const db = initDB();
  const list = db.reviews[productId];
  if (!list) return null;

  const rev = list.find((r) => r.id === reviewId);
  if (!rev) return null;

  rev.status = status;

  // Recalculate product rating with approved reviews
  const approvedRevs = list.filter((r) => r.status === 'approved');
  const prod = db.products.find((p) => p.id === productId);
  if (prod) {
    if (approvedRevs.length > 0) {
      prod.rating = Number((approvedRevs.reduce((acc, r) => acc + r.rating, 0) / approvedRevs.length).toFixed(1));
      prod.reviewCount = approvedRevs.length;
    } else {
      prod.reviewCount = 0;
    }
  }

  logAdminActivity('Review Status Updated', 'Product', `Review ${reviewId} marked as ${status}`, adminEmail);
  saveDB(db);
  return rev;
}

export function deleteReview(
  productId: string,
  reviewId: string,
  adminEmail = 'admin@mirli.store'
): boolean {
  const db = initDB();
  const list = db.reviews[productId];
  if (!list) return false;

  const len = list.length;
  db.reviews[productId] = list.filter((r) => r.id !== reviewId);
  if (db.reviews[productId].length !== len) {
    logAdminActivity('Review Deleted', 'Product', `Deleted review ${reviewId} from product ${productId}`, adminEmail);
    saveDB(db);
    return true;
  }
  return false;
}

// ================= HERO SLIDES & BANNERS =================
export function getHeroSlides(): BannerSlide[] {
  const db = initDB();
  return (db.settings.heroSlides || []).sort((a, b) => a.order - b.order);
}

export function addHeroSlide(slide: Omit<BannerSlide, 'id'>, adminEmail = 'admin@mirli.store'): BannerSlide {
  const db = initDB();
  const newSlide: BannerSlide = {
    ...slide,
    id: `slide-${Date.now()}`,
    order: slide.order || (db.settings.heroSlides.length + 1),
    active: slide.active !== undefined ? slide.active : true,
  };
  db.settings.heroSlides.push(newSlide);
  logAdminActivity('Banner Created', 'Banner', `Created new hero banner "${newSlide.title}"`, adminEmail);
  saveDB(db);
  return newSlide;
}

export function updateHeroSlide(
  slideId: string,
  updates: Partial<BannerSlide>,
  adminEmail = 'admin@mirli.store'
): BannerSlide | null {
  const db = initDB();
  const idx = db.settings.heroSlides.findIndex((s) => s.id === slideId);
  if (idx === -1) return null;

  db.settings.heroSlides[idx] = { ...db.settings.heroSlides[idx], ...updates };
  logAdminActivity('Banner Updated', 'Banner', `Updated banner "${db.settings.heroSlides[idx].title}"`, adminEmail);
  saveDB(db);
  return db.settings.heroSlides[idx];
}

export function deleteHeroSlide(slideId: string, adminEmail = 'admin@mirli.store'): boolean {
  const db = initDB();
  const len = db.settings.heroSlides.length;
  db.settings.heroSlides = db.settings.heroSlides.filter((s) => s.id !== slideId);
  if (db.settings.heroSlides.length !== len) {
    logAdminActivity('Banner Deleted', 'Banner', `Removed hero banner ${slideId}`, adminEmail);
    saveDB(db);
    return true;
  }
  return false;
}

// ================= SETTINGS =================
export function getSettings() {
  const db = initDB();
  return db.settings;
}

export function updateSettings(
  settings: Partial<DatabaseSchema['settings']>,
  adminEmail = 'admin@mirli.store'
) {
  const db = initDB();
  db.settings = { ...db.settings, ...settings };
  logAdminActivity('Settings Updated', 'Settings', 'Updated global store & shipping logistics settings', adminEmail);
  saveDB(db);
  return db.settings;
}

// ================= ADMIN ANALYTICS & STATS =================
export function getAdminStats() {
  const db = initDB();
  const totalOrders = db.orders.length;

  const validOrders = db.orders.filter(
    (o) => o.orderStatus !== 'Cancelled' && o.paymentStatus !== 'REFUNDED'
  );
  const totalRevenue = validOrders.reduce((acc, o) => acc + o.totalAmount, 0);

  const totalProducts = db.products.length;
  const activeProducts = db.products.filter((p) => p.status !== 'inactive').length;
  const totalCustomers = db.customers.length;

  const lowStockProducts = db.products.filter((p) => p.stock < 15);
  const outOfStockProducts = db.products.filter((p) => p.stock === 0);

  // Status breakdown
  const ordersByStatus = db.orders.reduce((acc, o) => {
    acc[o.orderStatus] = (acc[o.orderStatus] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  // Payment method statistics
  const paymentMethodStats = {
    ONLINE: db.orders.filter((o) => o.paymentMethod === 'ONLINE').length,
    COD: db.orders.filter((o) => o.paymentMethod === 'COD').length,
  };

  // Best selling products calculation
  const salesByProduct: Record<string, { product: Product; unitsSold: number; revenue: number }> = {};
  for (const order of validOrders) {
    for (const item of order.items) {
      if (!salesByProduct[item.productId]) {
        const prod = db.products.find((p) => p.id === item.productId);
        if (prod) {
          salesByProduct[item.productId] = { product: prod, unitsSold: 0, revenue: 0 };
        }
      }
      if (salesByProduct[item.productId]) {
        salesByProduct[item.productId].unitsSold += item.quantity;
        salesByProduct[item.productId].revenue += item.price * item.quantity;
      }
    }
  }

  const bestSellingProducts = Object.values(salesByProduct)
    .sort((a, b) => b.unitsSold - a.unitsSold)
    .slice(0, 5);

  // Recent customers
  const recentCustomers = getCustomers().slice(0, 5);

  return {
    totalRevenue,
    totalOrders,
    totalProducts,
    activeProducts,
    totalCustomers,
    pendingOrders: ordersByStatus['Order Placed'] || 0,
    processingOrders: (ordersByStatus['Confirmed'] || 0) + (ordersByStatus['Processing'] || 0) + (ordersByStatus['Packed'] || 0),
    deliveredOrders: ordersByStatus['Delivered'] || 0,
    cancelledOrders: (ordersByStatus['Cancelled'] || 0) + (ordersByStatus['Refunded'] || 0),
    lowStockCount: lowStockProducts.length,
    outOfStockCount: outOfStockProducts.length,
    ordersByStatus,
    paymentMethodStats,
    recentOrders: db.orders.slice(0, 8),
    recentCustomers,
    bestSellingProducts,
    lowStockProducts: lowStockProducts.slice(0, 6),
  };
}
