'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';
import type { Profile } from '@/lib/supabase';
import Navbar from '@/components/Navbar';
import { useRouter } from 'next/navigation';

const ALL_TAGS = ['AI', 'Web3', 'Gaming', 'Design', 'Content', 'DevTools', 'Mobile', 'Blockchain', 'Open Source', 'Indie Hacker', 'ML', 'Backend', 'Frontend', 'Rust', 'Python', 'TypeScript', 'React', 'Unity'];

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: '', bio: '', building: '', tags: [] as string[], twitter: '', github: '', website: '', avatar_url: '',
  });

  useEffect(() => {
    const load = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) { router.push('/login'); return; }
      const { data } = await supabase.from('profiles').select('*').eq('id', user.id).single();
      if (data) {
        setProfile(data);
        setForm({
          name: data.name || '', bio: data.bio || '', building: data.building || '',
          tags: data.tags || [], twitter: data.twitter || '', github: data.github || '',
          website: data.website || '', avatar_url: data.avatar_url || '',
        });
      }
      setLoading(false);
    };
    load();
  }, [router]);

  const handleSave = async () => {
    if (!profile) return;
    setSaving(true);
    await supabase.from('profiles').update(form).eq('id', profile.id);
    setSaving(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const toggleTag = (tag: string) => {
    setForm((f) => ({
      ...f,
      tags: f.tags.includes(tag) ? f.tags.filter((t) => t !== tag) : [...f.tags, tag],
    }));
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-dark">
        <Navbar />
        <div className="pt-24 text-center text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-24 pb-16 max-w-2xl mx-auto px-6">
        <h1 className="text-2xl font-bold text-white mb-2">Your Profile</h1>
        <p className="text-gray-500 text-sm mb-8">Edit your builder profile. This is what others see on Discover.</p>

        <div className="space-y-6">
          <Field label="Name" value={form.name} onChange={(v) => setForm({ ...form, name: v })} placeholder="Your name" />
          <Field label="Bio" value={form.bio} onChange={(v) => setForm({ ...form, bio: v })} placeholder="Tell us about yourself" multiline />
          <Field label="What are you building?" value={form.building} onChange={(v) => setForm({ ...form, building: v })} placeholder="Describe your current project" />
          <Field label="Avatar URL" value={form.avatar_url} onChange={(v) => setForm({ ...form, avatar_url: v })} placeholder="https://..." />

          <div>
            <label className="block text-sm text-gray-400 mb-2">Tags</label>
            <div className="flex flex-wrap gap-2">
              {ALL_TAGS.map((tag) => (
                <button
                  key={tag}
                  onClick={() => toggleTag(tag)}
                  className={`text-xs px-3 py-1.5 rounded-full border transition ${
                    form.tags.includes(tag)
                      ? 'bg-accent/20 border-accent text-accent-light'
                      : 'bg-dark-200 border-dark-400 text-gray-500 hover:border-gray-500'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Field label="Twitter" value={form.twitter} onChange={(v) => setForm({ ...form, twitter: v })} placeholder="@handle" />
            <Field label="GitHub" value={form.github} onChange={(v) => setForm({ ...form, github: v })} placeholder="username" />
            <Field label="Website" value={form.website} onChange={(v) => setForm({ ...form, website: v })} placeholder="https://..." />
          </div>

          <button
            onClick={handleSave}
            disabled={saving}
            className="px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-medium transition disabled:opacity-50"
          >
            {saving ? 'Saving...' : saved ? '✓ Saved!' : 'Save profile'}
          </button>
        </div>
      </div>
    </div>
  );
}

function Field({ label, value, onChange, placeholder, multiline }: {
  label: string; value: string; onChange: (v: string) => void; placeholder: string; multiline?: boolean;
}) {
  const cls = "w-full px-4 py-3 bg-dark-200 border border-dark-400 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition";
  return (
    <div>
      <label className="block text-sm text-gray-400 mb-1.5">{label}</label>
      {multiline ? (
        <textarea value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} rows={3} className={cls + ' resize-none'} />
      ) : (
        <input type="text" value={value} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} className={cls} />
      )}
    </div>
  );
}
