'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { User } from '@supabase/supabase-js';

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => setUser(data.user));
    const { data: listener } = supabase.auth.onAuthStateChange((_e, session) => {
      setUser(session?.user ?? null);
    });
    return () => listener.subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = '/';
  };

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-dark-300 bg-dark/80 backdrop-blur-md">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-white tracking-tight">
          Devfolio<span className="text-accent">Match</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/discover" className="text-sm text-gray-400 hover:text-white transition">
            Discover
          </Link>
          {user ? (
            <>
              <Link href="/dashboard" className="text-sm text-gray-400 hover:text-white transition">
                Dashboard
              </Link>
              <button
                onClick={handleLogout}
                className="text-sm px-4 py-2 rounded-lg border border-dark-400 text-gray-400 hover:text-white hover:border-gray-500 transition"
              >
                Log out
              </button>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="text-sm px-4 py-2 rounded-lg border border-dark-400 text-gray-400 hover:text-white hover:border-gray-500 transition"
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className="text-sm px-4 py-2 rounded-lg bg-accent hover:bg-accent-light text-white transition"
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
