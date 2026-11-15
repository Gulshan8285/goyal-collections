'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Lock, Mail, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  const [authMethod, setAuthMethod] = useState<'password' | 'otp'>('password');
  const [identifier, setIdentifier] = useState('gulshan@mirli.store');
  const [password, setPassword] = useState('luxury2026');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSendOtp = () => {
    if (!identifier) {
      setError('Please enter your mobile number or email address.');
      return;
    }
    setError('');
    setOtpSent(true);
    setOtp('8829'); // Simulated Instant OTP for testing
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const token = authMethod === 'otp' ? otp : password;
    const res = await login(identifier, token);
    setLoading(false);

    if (res.success) {
      router.push('/account');
    } else {
      setError(res.message || 'Invalid credentials.');
    }
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16 text-white">
      <div className="bg-neutral-900 p-8 sm:p-10 rounded-3xl border border-neutral-800 shadow-2xl space-y-6">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-full bg-white text-black text-sm font-bold font-serif flex items-center justify-center mx-auto shadow-md">
            GC
          </div>
          <h1 className="font-serif text-2xl font-bold text-white tracking-wide">
            SIGN IN
          </h1>
          <p className="text-xs text-neutral-400">
            Access your order history, wishlist and saved addresses.
          </p>
        </div>

        {/* Method Toggle: Password vs OTP */}
        <div className="flex rounded-full bg-neutral-950 p-1 border border-neutral-800 text-xs font-mono">
          <button
            type="button"
            onClick={() => setAuthMethod('password')}
            className={`flex-1 py-1.5 rounded-full transition-all ${
              authMethod === 'password' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Password
          </button>
          <button
            type="button"
            onClick={() => setAuthMethod('otp')}
            className={`flex-1 py-1.5 rounded-full transition-all ${
              authMethod === 'otp' ? 'bg-white text-black font-bold shadow-sm' : 'text-neutral-400 hover:text-white'
            }`}
          >
            Mobile / OTP
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs uppercase font-mono text-neutral-300 mb-1">
              Email or Mobile Number
            </label>
            <div className="relative">
              <input
                type="text"
                required
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="e.g. gulshan@mirli.store or 9876543210"
                className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
              />
              <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
            </div>
          </div>

          {authMethod === 'password' ? (
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs uppercase font-mono text-neutral-300">Password</label>
                <Link href="/forgot-password" className="text-[11px] text-neutral-400 hover:text-white underline">
                  Forgot Password?
                </Link>
              </div>
              <div className="relative">
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-neutral-500 focus:outline-none focus:border-white"
                />
                <Lock className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              {!otpSent ? (
                <button
                  type="button"
                  onClick={handleSendOtp}
                  className="w-full bg-neutral-800 hover:bg-neutral-700 text-white border border-neutral-700 py-2.5 rounded-xl text-xs font-semibold transition-colors"
                >
                  Request One-Time Code (OTP)
                </button>
              ) : (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <label className="text-xs uppercase font-mono text-neutral-300">Enter 4-Digit OTP</label>
                    <span className="text-[11px] text-emerald-400 font-mono font-medium">OTP Sent: 8829</span>
                  </div>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    placeholder="8829"
                    className="w-full bg-neutral-950 border border-neutral-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono tracking-widest text-center focus:outline-none focus:border-white"
                  />
                </div>
              )}
            </div>
          )}

          {error && <p className="text-xs text-red-400 font-medium">{error}</p>}

          <button
            type="submit"
            disabled={loading || (authMethod === 'otp' && !otpSent)}
            className="w-full bg-white hover:bg-neutral-200 text-black py-3.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 shadow-lg transition-colors disabled:opacity-40"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        <div className="pt-4 border-t border-neutral-800 text-center text-xs text-neutral-400">
          <span>New to GOYAL COLLECTIONS? </span>
          <Link href="/signup" className="text-white font-semibold underline hover:text-neutral-300">
            Create an Account
          </Link>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[11px] text-neutral-500 pt-1">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Encrypted Secure Authentication</span>
        </div>

      </div>
    </div>
  );
}
