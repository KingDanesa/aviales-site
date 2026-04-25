'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Ошибка входа');
      router.push('/admin/dashboard');
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[#0a1a0e] to-[#1a3a28] relative overflow-hidden">
      {/* Decorative rings */}
      <div className="absolute -top-[200px] -right-[200px] w-[600px] h-[600px] rounded-full border border-white/[0.03] pointer-events-none" />
      <div className="absolute -bottom-[150px] -left-[150px] w-[400px] h-[400px] rounded-full border border-white/[0.04] pointer-events-none" />

      <div className="w-full max-w-md mx-auto px-6 relative z-10">
        <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-10">
          {/* Logo */}
          <div className="text-center mb-10">
            <div className="text-[17px] font-extrabold text-white tracking-wider mb-1">КАЗАВИАЛЕСООХРАНА</div>
            <div className="text-[10px] text-white/30 tracking-[0.2em] uppercase">Панель управления</div>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-5">
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/35">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border border-white/15 bg-white/5 px-4 py-3 text-sm font-sans text-white focus:border-amber outline-none transition-colors placeholder:text-white/20"
                placeholder="admin@aviales.kz"
                required
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-[10px] font-bold tracking-widest uppercase text-white/35">Пароль</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="border border-white/15 bg-white/5 px-4 py-3 text-sm font-sans text-white focus:border-amber outline-none transition-colors placeholder:text-white/20"
                placeholder="••••••••"
                required
              />
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 text-[13px] font-medium p-3">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full px-7 py-3.5 text-[12.5px] font-bold tracking-wider uppercase bg-amber text-white rounded-sm hover:bg-amber-dark hover:-translate-y-0.5 hover:shadow-lg transition-all cursor-pointer border-none font-sans disabled:opacity-50"
            >
              {loading ? 'Вход...' : 'Войти'}
            </button>
          </form>

          <div className="text-center mt-8 text-[11px] text-white/20">
            © 2026 РГКП «Казавиалесоохрана»
          </div>
        </div>
      </div>
    </div>
  );
}
