'use client';

import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';
import { Product, ShippingAddress } from '@/lib/types';

export interface UserProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin';
  addresses: ShippingAddress[];
}

interface AuthContextType {
  user: UserProfile | null;
  isAuthenticated: boolean;
  login: (emailOrPhone: string, codeOrPass: string) => Promise<{ success: boolean; message?: string }>;
  signup: (data: { name: string; email: string; phone: string; password?: string }) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  saveAddress: (address: ShippingAddress) => void;
  deleteAddress: (index: number) => void;
  setDefaultAddress: (index: number) => void;
  recentlyViewed: Product[];
  addRecentlyViewed: (product: Product) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEMO_USER: UserProfile = {
  id: 'usr-101',
  name: 'Gulshan Goyal',
  email: 'gulshan@mirli.store',
  phone: '9876543210',
  role: 'customer',
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
};

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [recentlyViewed, setRecentlyViewed] = useState<Product[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem('mirli_user');
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      } else {
        // Provide demo user for seamless luxury experience
        setUser(DEMO_USER);
        localStorage.setItem('mirli_user', JSON.stringify(DEMO_USER));
      }

      const savedRecent = localStorage.getItem('mirli_recently_viewed');
      if (savedRecent) {
        setRecentlyViewed(JSON.parse(savedRecent));
      }
    } catch (e) {}
    setMounted(true);
  }, []);

  const login = async (emailOrPhone: string, codeOrPass: string) => {
    // Simulated instant high-security login
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: emailOrPhone.includes('@') ? emailOrPhone.split('@')[0] : 'Valued Customer',
      email: emailOrPhone.includes('@') ? emailOrPhone : 'customer@mirli.store',
      phone: !emailOrPhone.includes('@') ? emailOrPhone : '9876543210',
      role: emailOrPhone.toLowerCase().includes('admin') ? 'admin' : 'customer',
      addresses: user?.addresses || [],
    };
    setUser(newUser);
    try {
      localStorage.setItem('mirli_user', JSON.stringify(newUser));
    } catch (e) {}
    return { success: true };
  };

  const signup = async (data: { name: string; email: string; phone: string; password?: string }) => {
    const newUser: UserProfile = {
      id: `usr-${Date.now()}`,
      name: data.name,
      email: data.email,
      phone: data.phone,
      role: 'customer',
      addresses: [],
    };
    setUser(newUser);
    try {
      localStorage.setItem('mirli_user', JSON.stringify(newUser));
    } catch (e) {}
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    try {
      localStorage.removeItem('mirli_user');
    } catch (e) {}
  };

  const saveAddress = (address: ShippingAddress) => {
    if (!user) return;
    const currentAddresses = user.addresses || [];
    let updatedAddresses: ShippingAddress[];

    if (address.isDefault) {
      updatedAddresses = currentAddresses.map((a) => ({ ...a, isDefault: false }));
      updatedAddresses.push(address);
    } else {
      updatedAddresses = [...currentAddresses, address];
    }

    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    try {
      localStorage.setItem('mirli_user', JSON.stringify(updatedUser));
    } catch (e) {}
  };

  const deleteAddress = (index: number) => {
    if (!user) return;
    const updatedAddresses = user.addresses.filter((_, i) => i !== index);
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    try {
      localStorage.setItem('mirli_user', JSON.stringify(updatedUser));
    } catch (e) {}
  };

  const setDefaultAddress = (index: number) => {
    if (!user) return;
    const updatedAddresses = user.addresses.map((a, i) => ({
      ...a,
      isDefault: i === index,
    }));
    const updatedUser = { ...user, addresses: updatedAddresses };
    setUser(updatedUser);
    try {
      localStorage.setItem('mirli_user', JSON.stringify(updatedUser));
    } catch (e) {}
  };

  const addRecentlyViewed = useCallback((product: Product) => {
    setRecentlyViewed((prev) => {
      if (prev.length > 0 && prev[0].id === product.id) {
        return prev;
      }
      const filtered = prev.filter((p) => p.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10);
      try {
        localStorage.setItem('mirli_recently_viewed', JSON.stringify(updated));
      } catch (e) {}
      return updated;
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        saveAddress,
        deleteAddress,
        setDefaultAddress,
        recentlyViewed,
        addRecentlyViewed,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
