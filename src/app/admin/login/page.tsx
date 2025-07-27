// app/admin/login/page.tsx
'use client';

import { useState } from 'react';
import { auth } from '../../lib/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setError('');
      router.push('/admin/dashboard');
    } catch {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#fdf7e3] px-4">
      <form
        onSubmit={handleLogin}
        className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-sm text-[#1C1C1C]"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">🔐 Admin Login</h2>
        {error && <p className="text-red-600 mb-4 text-sm text-center">{error}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full border border-[#FFD700] px-4 py-2 mb-3 rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full border border-[#FFD700] px-4 py-2 mb-5 rounded"
        />
        <button
          type="submit"
          className="w-full bg-[#FFD700] text-[#1C1C1C] font-bold py-2 rounded hover:bg-yellow-400"
        >
          Login
        </button>
      </form>
    </div>
  );
}
