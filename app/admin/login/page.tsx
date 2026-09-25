'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion, useReducedMotion } from 'framer-motion';

export default function LoginPage() {
  const router = useRouter();
  const reduce = useReducedMotion();
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });
      if (!res.ok) {
        const json = await res.json();
        setError(json.error?.message ?? 'Login failed');
        return;
      }
      router.push('/admin');
      router.refresh();
    } catch {
      setError('Network error');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div
        initial={reduce ? undefined : { opacity: 0, y: 20 }}
        animate={reduce ? undefined : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="structured-container p-8 w-full max-w-sm"
      >
        <h1 className="heading-card mb-2">Admin</h1>
        <p className="text-body-sm mb-6">Enter your password to access the dashboard.</p>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label htmlFor="admin-password" className="text-eyebrow mb-2 block">
              Password
            </label>
            <input
              id="admin-password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 bg-bg-deep light:bg-zinc-100 border border-border-subtle rounded-lg text-sm text-white light:text-zinc-900 focus:outline-none focus:ring-2 focus:ring-sky-400/50"
              required
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="btn-primary justify-center disabled:opacity-50"
          >
            {loading ? 'Signing in…' : 'Sign in'}
          </button>
        </form>
      </motion.div>
    </div>
  );
}
