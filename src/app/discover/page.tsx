'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import { Suspense } from 'react';

const FILTER_TAGS = ['AI', 'Web3', 'Gaming', 'Design', 'Content', 'DevTools', 'Mobile', 'Blockchain', 'Open Source', 'ML', 'Backend', 'Frontend'];

function DiscoverContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get('q') || '';
  const initialTag = searchParams.get('tag') || '';

  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [search, setSearch] = useState(initialQuery);
  const [activeTag, setActiveTag] = useState(initialTag);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfiles = async () => {
      setLoading(true);
      const { data } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });
      setProfiles(data || []);
      setLoading(false);
    };
    fetchProfiles();
  }, []);

  const filtered = profiles.filter((p) => {
    const q = search.toLowerCase();
    const matchesSearch = !q || [p.name, p.bio, p.building, ...(p.tags || [])].some(
      (field) => (field || '').toLowerCase().includes(q)
    );
    const matchesTag = !activeTag || (p.tags || []).some(
      (t) => t.toLowerCase() === activeTag.toLowerCase()
    );
    return matchesSearch && matchesTag;
  });

  return (
    <div className="pt-24 pb-16 max-w-6xl mx-auto px-6">
      <h1 className="text-2xl font-bold text-white mb-2">Discover builders</h1>
      <p className="text-gray-500 text-sm mb-8">Find people building cool things</p>

      <div className="mb-6">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by name, bio, project, or tag..."
          className="w-full px-4 py-3 bg-dark-200 border border-dark-400 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition"
        />
      </div>

      <div className="flex flex-wrap gap-2 mb-8">
        <button
          onClick={() => setActiveTag('')}
          className={`text-xs px-3 py-1.5 rounded-full border transition ${
            !activeTag ? 'bg-accent/20 border-accent text-accent-light' : 'bg-dark-200 border-dark-400 text-gray-500 hover:border-gray-500'
          }`}
        >
          All
        </button>
        {FILTER_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(activeTag === tag ? '' : tag)}
            className={`text-xs px-3 py-1.5 rounded-full border transition ${
              activeTag === tag ? 'bg-accent/20 border-accent text-accent-light' : 'bg-dark-200 border-dark-400 text-gray-500 hover:border-gray-500'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {loading ? (
        <div className="text-center text-gray-500 py-16">Loading builders...</div>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500">No builders found.</p>
          <p className="text-gray-600 text-sm mt-2">Try adjusting your search or filters.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((p) => (
            <ProfileCard key={p.id} {...p} />
          ))}
        </div>
      )}
    </div>
  );
}

export default function DiscoverPage() {
  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <Suspense fallback={<div className="pt-24 text-center text-gray-500">Loading...</div>}>
        <DiscoverContent />
      </Suspense>
    </div>
  );
}
