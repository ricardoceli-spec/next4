# Image Gallery CRUD

A full-stack image gallery application built with **Next.js 16.2.6**, **Tailwind CSS 4.3**, **Supabase (PostgreSQL)**, and **Vercel Blob**.

## Features

- 🖼️ **4-column responsive grid gallery** with image cards
- ➕ **Create** images with title, description, and file upload
- ✏️ **Edit** image titles, descriptions, and replace images
- 🗑️ **Delete** images with confirmation modal
- 🔍 **Search** images by title (debounced)
- 📱 **Fully responsive** (1 col mobile, 2 col tablet, 4 col desktop)
- 🎨 **Beautiful UI** with animations, hover effects, and loading skeletons
- 🔔 **Toast notifications** for all CRUD operations
- ✅ **Form validation** with error messages
- ⚡ **Optimized images** via Vercel Blob CDN

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js 16.2.6 | React framework (App Router) |
| Tailwind CSS 4.3 | Utility-first CSS |
| Supabase | PostgreSQL database + API |
| Vercel Blob | Image storage |
| react-hot-toast | Toast notifications |

## Prerequisites

1. **Node.js** 18+ (v24.15.0 recommended)
2. **Supabase account** (free tier) - [Create here](https://supabase.com)
3. **Vercel account** (free tier) - [Create here](https://vercel.com)

## Getting Started

### 1. Clone and install

```bash
git clone <your-repo-url>
cd next4
npm install
```

### 2. Set up Supabase Database

Run this SQL in your Supabase SQL Editor:

```sql
-- Create the gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policies for public access
CREATE POLICY "Allow public read access" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON gallery_images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON gallery_images
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON gallery_images
  FOR DELETE USING (true);
```

### 3. Configure environment variables

Copy `.env.example` to `.env.local` and fill in your values:

```bash
# Supabase (from Supabase Dashboard > Settings > API)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

# Vercel Blob (from Vercel Dashboard > Storage > Blob)
BLOB_READ_WRITE_TOKEN=vercel_blob_rw_xxxxxx
```

### 4. Run development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deploy to Vercel

### 1. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/next4.git
git push -u origin main
```

### 2. Deploy on Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Add these **Environment Variables** in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `BLOB_READ_WRITE_TOKEN`
4. Click **Deploy**

### 3. Connect Supabase to Vercel (optional)

For automatic database migrations on deploy, connect your Supabase project in Vercel:
- Vercel Dashboard → Storage → Connect Supabase

## Project Structure

```
src/
├── app/
│   ├── api/
│   │   └── images/
│   │       ├── route.ts        # GET (list/search), POST (create), DELETE
│   │       └── [id]/
│   │           └── route.ts    # PUT (update)
│   ├── globals.css             # Tailwind + global styles
│   ├── layout.tsx              # Root layout with ToastProvider
│   └── page.tsx                # Main gallery page
├── components/
│   ├── DeleteModal.tsx         # Delete confirmation modal
│   ├── EmptyState.tsx          # Empty gallery state
│   ├── GalleryModal.tsx        # Create/Edit form modal
│   ├── ImageCard.tsx           # Image card component
│   ├── LoadingSpinner.tsx      # Loading/skeleton components
│   ├── SearchBar.tsx           # Debounced search input
│   └── ToastProvider.tsx       # Toast notifications wrapper
└── lib/
    ├── blob.ts                 # Vercel Blob helpers
    ├── db.ts                   # Supabase CRUD operations
    ├── supabase-migration.sql  # Database schema
    ├── supabase.ts             # Supabase client
    └── types.ts                # TypeScript interfaces
```

## API Routes

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/images?search=` | List all images (optional search by title) |
| `POST` | `/api/images` | Create image (multipart/form-data) |
| `PUT` | `/api/images/[id]` | Update image (multipart/form-data) |
| `DELETE` | `/api/images?id=&imageUrl=` | Delete image + blob |

## License

MIT