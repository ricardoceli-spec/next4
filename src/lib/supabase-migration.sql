-- Create the gallery_images table
CREATE TABLE IF NOT EXISTS gallery_images (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (optional, can be disabled for public access)
ALTER TABLE gallery_images ENABLE ROW LEVEL SECURITY;

-- Create policy for public access (no auth required)
CREATE POLICY "Allow public read access" ON gallery_images
  FOR SELECT USING (true);

CREATE POLICY "Allow public insert access" ON gallery_images
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public update access" ON gallery_images
  FOR UPDATE USING (true);

CREATE POLICY "Allow public delete access" ON gallery_images
  FOR DELETE USING (true);

-- Create an index for faster search
CREATE INDEX IF NOT EXISTS idx_gallery_images_title ON gallery_images (title);
CREATE INDEX IF NOT EXISTS idx_gallery_images_created_at ON gallery_images (created_at DESC);