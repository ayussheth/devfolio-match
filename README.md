# Devfolio Match

> Find and be found — a builder discovery platform.

## Tech Stack

- **Next.js 14** (App Router)
- **Supabase** (Auth + Database)
- **Tailwind CSS**

## Setup

### 1. Install dependencies

```bash
npm install
```

### 2. Create a Supabase project

Go to [supabase.com](https://supabase.com) and create a new project.

### 3. Run the database migration

Copy the contents of `supabase/migration.sql` and run it in the Supabase SQL Editor.

This creates the `profiles` table, enables Row Level Security, and sets up an auto-create trigger for new users.

### 4. Configure environment variables

```bash
cp .env.example .env.local
```

Fill in your Supabase URL and anon key from the Supabase dashboard (Settings → API).

### 5. Run the dev server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|------------|
| `/` | Landing page with hero, sample builders, tag pills |
| `/login` | Email/password login |
| `/signup` | Create account |
| `/dashboard` | Edit your builder profile (protected) |
| `/discover` | Browse and search all builders |
| `/profile/[id]` | Full profile view |
