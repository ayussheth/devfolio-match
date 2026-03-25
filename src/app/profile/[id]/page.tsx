'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import Link from 'next/link';

export default function ProfilePage() {
  const params = useParams();
  const id = params.id as string;
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
      setProfile(data);
      setLoading(false);
    };
    load();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-24 text-center">
          <p className="text-gray-500">Profile not found.</p>
          <Link href="/discover" className="text-accent hover:text-accent-light mt-4 inline-block transition">
            ← Back to Discover
          </Link>
        </div>
      </div>
    );
  }

  const initials = (profile.name || 'U').slice(0, 2).toUpperCase();

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-24 pb-16 max-w-2xl mx-auto px-6">
        <Link href="/discover" className="text-sm text-accent hover:text-accent-light transition mb-8 inline-block">
          ← Back to Discover
        </Link>

        <div className="bg-dark-100 border border-dark-300 rounded-2xl p-8">
          <div className="flex items-center gap-5 mb-6">
            {profile.avatar_url ? (
              <img src={profile.avatar_url} alt={profile.name} className="w-20 h-20 rounded-full object-cover" />
            ) : (
              <div className="w-20 h-20 rounded-full bg-accent/20 flex items-center justify-center text-accent font-bold text-xl">
                {initials}
              </div>
            )}
            <div>
              <h1 className="text-2xl font-bold text-white">{profile.name || 'Anonymous'}</h1>
              {profile.building && (
                <p className="text-gray-500 mt-1">Building: {profile.building}</p>
              )}
            </div>
          </div>

          {profile.bio && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-400 mb-2">About</h2>
              <p className="text-gray-300 leading-relaxed">{profile.bio}</p>
            </div>
          )}

          {profile.tags && profile.tags.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-medium text-gray-400 mb-2">Interests</h2>
              <div className="flex flex-wrap gap-2">
                {profile.tags.map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 rounded-full bg-accent/10 text-accent-light border border-accent/20">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(profile.twitter || profile.github || profile.website) && (
            <div>
              <h2 className="text-sm font-medium text-gray-400 mb-3">Links</h2>
              <div className="flex flex-wrap gap-3">
                {profile.twitter && (
                  <a href={`https://twitter.com/${profile.twitter.replace('@', '')}`} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 bg-dark-200 border border-dark-400 rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-500 transition">
                    𝕏 {profile.twitter}
                  </a>
                )}
                {profile.github && (
                  <a href={`https://github.com/${profile.github}`} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 bg-dark-200 border border-dark-400 rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-500 transition">
                    GitHub: {profile.github}
                  </a>
                )}
                {profile.website && (
                  <a href={profile.website.startsWith('http') ? profile.website : `https://${profile.website}`} target="_blank" rel="noopener noreferrer"
                    className="px-4 py-2 bg-dark-200 border border-dark-400 rounded-xl text-sm text-gray-400 hover:text-white hover:border-gray-500 transition">
                    🌐 {profile.website}
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
