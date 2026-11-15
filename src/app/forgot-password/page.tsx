'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 600);
  };

  return (
    <div className="max-w-md mx-auto px-4 py-16">
      <div className="bg-white p-8 sm:p-10 rounded-3xl border border-neutral-200 shadow-sm space-y-6">
        
        <div className="text-center space-y-2">
          <h1 className="font-serif text-2xl font-bold text-black tracking-wide">
            RESET PASSWORD
          </h1>
          <p className="text-xs text-neutral-500">
            Enter your registered email address to receive password recovery instructions.
          </p>
        </div>

        {submitted ? (
          <div className="text-center space-y-4 py-4 animate-fade-in">
            <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mx-auto text-emerald-600">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <p className="text-xs text-neutral-700">
              Recovery instructions have been dispatched to <strong className="text-black">{email}</strong>.
            </p>
            <Link href="/login" className="bg-black hover:bg-neutral-800 text-white px-6 py-2.5 rounded-full text-xs font-bold inline-block transition-colors">
              Return to Sign In
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs uppercase font-mono text-neutral-700 mb-1">
                Registered Email Address
              </label>
              <div className="relative">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="e.g. user@example.com"
                  className="w-full bg-neutral-50 border border-neutral-300 rounded-xl px-3.5 py-2.5 text-xs text-black placeholder-neutral-400 focus:outline-none focus:border-black"
                />
                <Mail className="w-4 h-4 text-neutral-400 absolute right-3.5 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black hover:bg-neutral-800 text-white py-3.5 rounded-full text-xs uppercase font-bold tracking-wider flex items-center justify-center gap-2 transition-colors"
            >
              <span>{loading ? 'Sending Instructions...' : 'Send Recovery Link'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>
        )}

        <div className="pt-4 border-t border-neutral-200 text-center">
          <Link href="/login" className="text-xs text-neutral-500 hover:text-black flex items-center justify-center gap-1.5 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Sign In</span>
          </Link>
        </div>

      </div>
    </div>
  );
}
