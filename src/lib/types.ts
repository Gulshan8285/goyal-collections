export interface ProductColor {
  name: string;
  hex: string;
}

export interface ProductSpec {
  label: string;
  value: string;
}

export interface Review {
  id: string;
  productId: string;
  productName?: string;
  customerName: string;
  rating: number;
  title: string;
  comment: string;
  verifiedPurchase: boolean;
  status?: 'approved' | 'pending' | 'rejected';
  date: string;
}

export interface Product {
  id: string;
  slug: string;
  sku?: string;
  name: string;
  hindiName?: string;
  category: 'footwear' | 'ready-made-clothes' | string;
  categoryTitle: string;
  categoryHindi?: string;
  subcategory: string; // e.g. 'mens-footwear', 'shoes', 'womens-wear'
  subcategoryTitle: string;
  price: number;
  mrp: number;
  discountPercent: number;
  description: string;
  details: string[];
  specifications: ProductSpec[];
  images: string[];
  sizes: string[];
  colors: ProductColor[];
  stock: number;
  status?: 'active' | 'inactive';
  designInfo?: string;
  careInfo?: string;
  rating: number;
  reviewCount: number;
  isTrending?: boolean;
  isNewArrival?: boolean;
  isBestSeller?: boolean;
  isSpecialOffer?: boolean;
  featured?: boolean;
  createdAt: string;
}

export interface CategoryItem {
  id: string;
  slug: string;
  name: string;
  hindiName?: string;
  description: string;
  image: string;
  subcategories: {
    slug: string;
    name: string;
    description: string;
    image: string;
  }[];
}

export interface CartItem {
  productId: string;
  slug: string;
  name: string;
  image: string;
  price: number;
  mrp: number;
  size: string;
  color: ProductColor;
  quantity: number;
  category: string;
  subcategory: string;
}

export interface ShippingAddress {
  fullName: string;
  phone: string;
  email: string;
  fullAddress?: string;
  houseNo?: string;
  street?: string;
  area?: string;
  landmark?: string;
  pincode: string;
  district: string;
  state: string;
  postOffice?: string;
  addressType?: 'home' | 'work' | 'other';
  isDefault?: boolean;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Confirmed'
  | 'Processing'
  | 'Packed'
  | 'Shipped'
  | 'Out for Delivery'
  | 'Delivered'
  | 'Cancelled'
  | 'Return Requested'
  | 'Returned'
  | 'Refunded';

export interface TrackingStep {
  status: OrderStatus;
  date: string;
  time: string;
  location?: string;
  description: string;
  completed: boolean;
  current: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  userId?: string;
  customerName: string;
  email: string;
  phone: string;
  shippingAddress: ShippingAddress;
  items: CartItem[];
  subtotal: number;
  discount: number;
  couponCode?: string;
  deliveryCharge: number;
  totalAmount: number;
  paymentMethod: 'COD' | 'ONLINE';
  paymentStatus: 'PAID' | 'PENDING' | 'REFUNDED';
  paymentId?: string;
  orderStatus: OrderStatus;
  trackingTimeline: TrackingStep[];
  estimatedDeliveryDate: string;
  courierName?: string;
  trackingNumber?: string;
  internalNotes?: string;
  statusHistory?: {
    status: OrderStatus;
    date: string;
    time: string;
    note?: string;
    updatedBy?: string;
  }[];
  cancellationReason?: string;
  returnReason?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Customer {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: string;
  status: 'active' | 'inactive' | 'suspended';
  addresses: ShippingAddress[];
  totalOrders?: number;
  totalSpending?: number;
  lastOrderDate?: string;
}

export interface StockLog {
  id: string;
  productId: string;
  productName: string;
  previousStock: number;
  newStock: number;
  change: number;
  reason: string;
  adminEmail?: string;
  timestamp: string;
}

export interface AdminActivityLog {
  id: string;
  action: string;
  category: 'Product' | 'Order' | 'Category' | 'Customer' | 'Inventory' | 'Coupon' | 'Banner' | 'Settings' | 'Auth';
  details: string;
  adminEmail: string;
  timestamp: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  ctaText: string;
  ctaLink: string;
  image: string;
  active: boolean;
  order: number;
}

export interface Coupon {
  code: string;
  discountPercent: number;
  maxDiscount?: number;
  minOrder: number;
  description: string;
  active: boolean;
  expiresAt: string;
}

export interface PincodeInfo {
  pincode: string;
  district: string;
  state: string;
  postOffices: string[];
  isServiceable: boolean;
  estimatedDays: number;
}
