import Navbar from '@/components/Navbar';
import ProfileCard from '@/components/ProfileCard';
import Link from 'next/link';

const SAMPLE_BUILDERS = [
  { id: '1', name: 'Aria Chen', bio: 'Full-stack dev obsessed with developer tools and making workflows faster.', building: 'An AI-powered code review tool', tags: ['DevTools', 'AI', 'React'], avatar_url: '' },
  { id: '2', name: 'Marcus Johnson', bio: 'Web3 builder and open-source contributor. Previously at Ethereum Foundation.', building: 'A decentralized identity protocol', tags: ['Web3', 'Blockchain', 'Rust'], avatar_url: '' },
  { id: '3', name: 'Priya Sharma', bio: 'Designer turned developer. I make beautiful things that work.', building: 'A design system for dark-mode-first apps', tags: ['Design', 'UI/UX', 'Tailwind'], avatar_url: '' },
  { id: '4', name: 'Leo Park', bio: 'Game developer and creative coder. Unity & Unreal.', building: 'A multiplayer puzzle game', tags: ['Gaming', 'Unity', 'C#'], avatar_url: '' },
  { id: '5', name: 'Sam Rivera', bio: 'Content creator and indie hacker. Writing about building in public.', building: 'A newsletter platform for builders', tags: ['Content', 'Writing', 'Indie'], avatar_url: '' },
  { id: '6', name: 'Zara Ahmed', bio: 'ML engineer exploring the intersection of AI and creativity.', building: 'An AI art collaboration tool', tags: ['AI', 'ML', 'Python'], avatar_url: '' },
];

const SUGGESTED_TAGS = ['AI', 'Web3', 'Gaming', 'Design', 'Content', 'DevTools', 'Mobile', 'Blockchain', 'Open Source', 'Indie Hacker', 'ML', 'Backend'];

export default function Home() {
  return (
    <main className="min-h-screen bg-dark">
      <Navbar />
      <div className="pt-16">
        {/* Hero */}
        <section className="max-w-6xl mx-auto px-6 py-24 grid md:grid-cols-[1fr_1.5fr] gap-16 items-start">
          <div className="space-y-6">
            <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight">
              Devfolio<span className="text-accent">Match</span>
            </h1>
            <p className="text-2xl text-gray-400 font-light italic">&ldquo;find and be found&rdquo;</p>
            <div className="space-y-4 text-gray-500 text-sm leading-relaxed border-l-2 border-accent/30 pl-4">
              <p>A place to discover people building cool things.</p>
              <p>Find collaborators, teammates, and fellow builders.</p>
              <p>Create your profile. Show what you&apos;re building. Get discovered.</p>
            </div>
            <div className="flex gap-3 pt-4">
              <Link href="/signup" className="px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-medium transition">
                Get started
              </Link>
              <Link href="/discover" className="px-6 py-3 border border-dark-400 text-gray-400 hover:text-white hover:border-gray-500 rounded-xl transition">
                Browse builders
              </Link>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {SAMPLE_BUILDERS.slice(0, 4).map((b) => (
              <div key={b.id} className="pointer-events-none">
                <ProfileCard {...b} />
              </div>
            ))}
          </div>
        </section>

        {/* Featured builders */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-lg font-semibold text-white mb-6">Featured builders</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {SAMPLE_BUILDERS.map((b) => (
              <div key={b.id} className="pointer-events-none">
                <ProfileCard {...b} />
              </div>
            ))}
          </div>
        </section>

        {/* Tags */}
        <section className="max-w-6xl mx-auto px-6 pb-16">
          <h2 className="text-lg font-semibold text-white mb-6">Explore by interest</h2>
          <div className="flex flex-wrap gap-3">
            {SUGGESTED_TAGS.map((tag) => (
              <Link
                key={tag}
                href={`/discover?tag=${encodeURIComponent(tag)}`}
                className="px-4 py-2 rounded-full bg-dark-200 border border-dark-300 text-sm text-gray-400 hover:text-accent hover:border-accent/50 transition"
              >
                {tag}
              </Link>
            ))}
          </div>
        </section>

        {/* Search */}
        <section className="max-w-6xl mx-auto px-6 pb-24">
          <div className="bg-dark-100 border border-dark-300 rounded-2xl p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Looking for someone specific?</h2>
            <p className="text-gray-500 mb-6 text-sm">Search by name, skill, or what they&apos;re building</p>
            <form action="/discover" method="GET" className="max-w-lg mx-auto flex gap-3">
              <input
                type="text"
                name="q"
                placeholder="Search builders..."
                className="flex-1 px-4 py-3 bg-dark-200 border border-dark-400 rounded-xl text-white placeholder-gray-600 focus:outline-none focus:border-accent transition"
              />
              <button type="submit" className="px-6 py-3 bg-accent hover:bg-accent-light text-white rounded-xl font-medium transition">
                Search
              </button>
            </form>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-dark-300 py-8">
          <div className="max-w-6xl mx-auto px-6 text-center text-sm text-gray-600">
            Built with Next.js + Supabase. Inspired by Buildspace Sage.
          </div>
        </footer>
      </div>
    </main>
  );
}
