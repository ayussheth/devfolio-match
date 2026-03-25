'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

const BUILDERS = [
  { id: '1', name: 'farza', bio: 'building things that don\'t exist yet. prev: buildspace, zipschool.' },
  { id: '2', name: 'kat', bio: 'designer who codes. making tools for creative people.' },
  { id: '3', name: 'sam', bio: 'dropped out to build. currently obsessed with on-chain games.' },
  { id: '4', name: 'kelli', bio: 'community builder. helping devs find their people.' },
  { id: '5', name: 'tair', bio: 'ml engineer. working on something at the intersection of ai and music.' },
  { id: '6', name: 'arjun', bio: 'full-stack dev. building a better way to discover hackathons.' },
  { id: '7', name: 'priya', bio: 'content + code. documenting the build journey.' },
  { id: '8', name: 'leo', bio: 'game dev. making multiplayer experiences that feel real.' },
];

const SUGGESTIONS = ['ai developers', 'gaming', 'content creation', 'web3 builders', 'designers', 'open source', 'indie hackers', 'mobile devs'];

export default function Home() {
  const router = useRouter();
  const [query, setQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/discover?q=${encodeURIComponent(query.trim())}`);
  };

  const handleSuggestion = (s: string) => {
    router.push(`/discover?q=${encodeURIComponent(s)}`);
  };

  return (
    <div className="sage-page">
      <nav className="sage-nav">
        <span className="sage-logo">devfolio match</span>
        <div className="sage-nav-links">
          <Link href="/discover">discover</Link>
          <Link href="/login">log in</Link>
          <Link href="/signup" className="sage-signup-btn">sign up</Link>
        </div>
      </nav>

      <div className="sage-layout">
        {/* Left sidebar */}
        <aside className="sage-sidebar">
          <div className="sage-welcome">
            <h1>find and be found</h1>
            <p>
              welcome to devfolio match — a place to find people building cool things. 
              developers, designers, creators, hackers. browse around or create your profile 
              and let others discover you.
            </p>
            <p className="sage-secondary">
              search for what interests you, or just scroll through and see who catches your eye.
            </p>
          </div>

          <div className="sage-suggestions">
            <span className="sage-suggestions-label">try searching for</span>
            <div className="sage-suggestion-list">
              {SUGGESTIONS.map((s) => (
                <button key={s} onClick={() => handleSuggestion(s)} className="sage-suggestion">
                  {s}
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Main content — profiles */}
        <main className="sage-main">
          <div className="sage-profiles">
            {BUILDERS.map((b) => (
              <div key={b.id} className="sage-profile-card">
                <div className="sage-avatar">{b.name[0]}</div>
                <div className="sage-profile-info">
                  <span className="sage-name">{b.name}</span>
                  <span className="sage-bio">{b.bio}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Search bar at bottom */}
          <form onSubmit={handleSearch} className="sage-search">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="search builders..."
              className="sage-search-input"
            />
          </form>
        </main>
      </div>

      <style jsx>{`
        .sage-page {
          min-height: 100vh;
          background: #0d0d0d;
          color: #b0b0b0;
          font-family: 'SF Mono', 'Fira Code', 'Fira Mono', Menlo, Consolas, monospace;
          font-size: 14px;
          line-height: 1.6;
        }

        .sage-nav {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 32px;
          border-bottom: 1px solid #1a1a1a;
        }

        .sage-logo {
          color: #e0e0e0;
          font-weight: 600;
          font-size: 15px;
          letter-spacing: -0.3px;
        }

        .sage-nav-links {
          display: flex;
          gap: 24px;
          align-items: center;
        }

        .sage-nav-links a {
          color: #666;
          text-decoration: none;
          font-size: 13px;
          transition: color 0.15s;
        }

        .sage-nav-links a:hover {
          color: #ccc;
        }

        .sage-signup-btn {
          background: #1a1a1a !important;
          border: 1px solid #333 !important;
          padding: 6px 16px !important;
          border-radius: 4px !important;
          color: #ccc !important;
        }

        .sage-signup-btn:hover {
          background: #222 !important;
          border-color: #444 !important;
          color: #fff !important;
        }

        .sage-layout {
          display: grid;
          grid-template-columns: 320px 1fr;
          max-width: 1100px;
          margin: 0 auto;
          min-height: calc(100vh - 53px);
        }

        .sage-sidebar {
          padding: 40px 32px;
          border-right: 1px solid #1a1a1a;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .sage-welcome h1 {
          font-size: 20px;
          font-weight: 600;
          color: #e0e0e0;
          margin-bottom: 16px;
          font-family: inherit;
          letter-spacing: -0.3px;
        }

        .sage-welcome p {
          color: #777;
          font-size: 13px;
          line-height: 1.7;
          margin-bottom: 12px;
        }

        .sage-secondary {
          color: #555 !important;
          font-size: 12px !important;
        }

        .sage-suggestions-label {
          font-size: 11px;
          color: #444;
          text-transform: uppercase;
          letter-spacing: 1px;
          display: block;
          margin-bottom: 12px;
        }

        .sage-suggestion-list {
          display: flex;
          flex-wrap: wrap;
          gap: 8px;
        }

        .sage-suggestion {
          background: none;
          border: 1px solid #222;
          color: #666;
          padding: 4px 12px;
          border-radius: 3px;
          font-size: 12px;
          cursor: pointer;
          font-family: inherit;
          transition: all 0.15s;
        }

        .sage-suggestion:hover {
          border-color: #444;
          color: #aaa;
        }

        .sage-main {
          padding: 40px 32px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
        }

        .sage-profiles {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .sage-profile-card {
          display: flex;
          align-items: flex-start;
          gap: 14px;
          padding: 14px 16px;
          border-radius: 6px;
          transition: background 0.15s;
          cursor: default;
        }

        .sage-profile-card:hover {
          background: #141414;
        }

        .sage-avatar {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background: #1a1a1a;
          border: 1px solid #2a2a2a;
          display: flex;
          align-items: center;
          justify-content: center;
          color: #666;
          font-size: 14px;
          font-weight: 500;
          flex-shrink: 0;
          margin-top: 1px;
        }

        .sage-profile-info {
          display: flex;
          flex-direction: column;
          gap: 3px;
          min-width: 0;
        }

        .sage-name {
          color: #d0d0d0;
          font-weight: 500;
          font-size: 14px;
        }

        .sage-bio {
          color: #555;
          font-size: 13px;
          line-height: 1.5;
        }

        .sage-search {
          margin-top: 40px;
          padding-top: 20px;
          border-top: 1px solid #1a1a1a;
        }

        .sage-search-input {
          width: 100%;
          background: #111;
          border: 1px solid #1e1e1e;
          color: #999;
          padding: 12px 16px;
          border-radius: 6px;
          font-size: 13px;
          font-family: inherit;
          outline: none;
          transition: border-color 0.15s;
        }

        .sage-search-input:focus {
          border-color: #333;
          color: #ccc;
        }

        .sage-search-input::placeholder {
          color: #333;
        }

        @media (max-width: 768px) {
          .sage-layout {
            grid-template-columns: 1fr;
          }
          .sage-sidebar {
            border-right: none;
            border-bottom: 1px solid #1a1a1a;
            padding: 24px 20px;
          }
          .sage-main {
            padding: 24px 20px;
          }
          .sage-nav {
            padding: 12px 20px;
          }
        }
      `}</style>
    </div>
  );
}
