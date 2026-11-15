'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Coupon, Product, ProductColor } from '@/lib/types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, size: string, color: ProductColor, quantity?: number) => void;
  removeFromCart: (productId: string, size: string, colorName: string) => void;
  updateQuantity: (productId: string, size: string, colorName: string, quantity: number) => void;
  clearCart: () => void;
  subtotal: number;
  totalItems: number;
  appliedCoupon: Coupon | null;
  couponDiscount: number;
  deliveryCharge: number;
  freeShippingThreshold: number;
  finalTotal: number;
  applyCouponCode: (code: string) => Promise<{ success: boolean; message: string }>;
  removeCouponCode: () => void;
  lastAddedTime: number;
  isHydrated: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [appliedCoupon, setAppliedCoupon] = useState<Coupon | null>(null);
  const [couponDiscount, setCouponDiscount] = useState<number>(0);
  const [lastAddedTime, setLastAddedTime] = useState<number>(0);
  const [mounted, setMounted] = useState(false);

  const freeShippingThreshold = 1999;
  const standardDelivery = 149;

  // Hydrate from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('mirli_cart');
      if (saved) {
        setCartItems(JSON.parse(saved));
      }
      const savedCoupon = localStorage.getItem('mirli_coupon');
      if (savedCoupon) {
        const parsed = JSON.parse(savedCoupon);
        setAppliedCoupon(parsed.coupon);
        setCouponDiscount(parsed.discount);
      }
    } catch (e) {
      console.warn('Could not read cart from localStorage', e);
    }
    setMounted(true);
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (!mounted) return;
    try {
      localStorage.setItem('mirli_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.warn('Could not write cart to localStorage', e);
    }
  }, [cartItems, mounted]);

  const addToCart = (product: Product, size: string, color: ProductColor, quantity: number = 1) => {
    setCartItems((prev) => {
      const existingIdx = prev.findIndex(
        (item) => item.productId === product.id && item.size === size && item.color.name === color.name
      );

      if (existingIdx > -1) {
        const updated = [...prev];
        updated[existingIdx].quantity += quantity;
        return updated;
      }

      const newItem: CartItem = {
        productId: product.id,
        slug: product.slug,
        name: product.name,
        image: product.images[0] || 'https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000',
        price: product.price,
        mrp: product.mrp,
        size,
        color,
        quantity,
        category: product.category,
        subcategory: product.subcategory,
      };

      return [...prev, newItem];
    });

    setLastAddedTime(Date.now());
  };

  const removeFromCart = (productId: string, size: string, colorName: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.size === size && item.color.name === colorName)
      )
    );
  };

  const updateQuantity = (productId: string, size: string, colorName: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId, size, colorName);
      return;
    }
    setCartItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.size === size && item.color.name === colorName
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
    removeCouponCode();
    try {
      localStorage.removeItem('mirli_cart');
      localStorage.removeItem('mirli_coupon');
    } catch (e) {}
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const deliveryCharge = subtotal === 0 || subtotal >= freeShippingThreshold ? 0 : standardDelivery;
  const finalTotal = Math.max(0, subtotal - couponDiscount + deliveryCharge);

  const applyCouponCode = async (code: string) => {
    try {
      const res = await fetch('/api/coupons/validate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, subtotal }),
      });
      const data = await res.json();
      if (data.success && data.coupon) {
        setAppliedCoupon(data.coupon);
        setCouponDiscount(data.discount);
        localStorage.setItem('mirli_coupon', JSON.stringify({ coupon: data.coupon, discount: data.discount }));
        return { success: true, message: data.message };
      }
      return { success: false, message: data.message || 'Coupon not applicable.' };
    } catch (err: any) {
      return { success: false, message: err.message || 'Network error applying coupon.' };
    }
  };

  const removeCouponCode = () => {
    setAppliedCoupon(null);
    setCouponDiscount(0);
    try {
      localStorage.removeItem('mirli_coupon');
    } catch (e) {}
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        subtotal,
        totalItems,
        appliedCoupon,
        couponDiscount,
        deliveryCharge,
        freeShippingThreshold,
        finalTotal,
        applyCouponCode,
        removeCouponCode,
        lastAddedTime,
        isHydrated: mounted,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
}
