-- ==========================================
-- Complete SQL for Supabase Database Setup
-- ==========================================
-- Copy and paste ALL of this into your Supabase SQL Editor and run it

-- ==========================================
-- 1. Create custom_sections table
-- ==========================================
CREATE TABLE IF NOT EXISTS custom_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  titulo text DEFAULT '',
  contenido text DEFAULT '',
  tipo text DEFAULT 'text' CHECK (tipo IN ('text', 'video', 'image', 'html')),
  url_video text DEFAULT '',
  url_imagen text DEFAULT '',
  visible boolean DEFAULT true,
  orden integer DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- ==========================================
-- 2. Enable RLS on custom_sections
-- ==========================================
ALTER TABLE custom_sections ENABLE ROW LEVEL SECURITY;

-- ==========================================
-- 3. Create RLS policies for custom_sections
-- ==========================================
DROP POLICY IF EXISTS "Anyone can view visible custom_sections" ON custom_sections;
CREATE POLICY "Anyone can view visible custom_sections"
  ON custom_sections FOR SELECT TO anon, authenticated USING (visible = true);

DROP POLICY IF EXISTS "Anyone can view all custom_sections" ON custom_sections;
CREATE POLICY "Anyone can view all custom_sections"
  ON custom_sections FOR SELECT TO authenticated USING (true);

DROP POLICY IF EXISTS "Anyone can insert custom_sections" ON custom_sections;
CREATE POLICY "Anyone can insert custom_sections"
  ON custom_sections FOR INSERT TO authenticated WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update custom_sections" ON custom_sections;
CREATE POLICY "Anyone can update custom_sections"
  ON custom_sections FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can delete custom_sections" ON custom_sections;
CREATE POLICY "Anyone can delete custom_sections"
  ON custom_sections FOR DELETE TO authenticated USING (true);

-- ==========================================
-- 4. Grant permissions
-- ==========================================
GRANT ALL ON custom_sections TO anon, authenticated, service_role;

-- ==========================================
-- 5. Create indexes
-- ==========================================
DROP INDEX IF EXISTS custom_sections_orden_idx;
DROP INDEX IF EXISTS custom_sections_visible_idx;
CREATE INDEX custom_sections_orden_idx ON custom_sections(orden);
CREATE INDEX custom_sections_visible_idx ON custom_sections(visible);

-- ==========================================
-- 6. Fix other table policies (in case they weren't set up)
-- ==========================================
-- Fix about_us
ALTER TABLE about_us ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view about us" ON about_us;
CREATE POLICY "Anyone can view about_us" ON about_us FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Anyone can update about_us" ON about_us;
CREATE POLICY "Anyone can update about_us" ON about_us FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
GRANT ALL ON about_us TO anon, authenticated, service_role;

-- Fix stores
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view stores" ON stores;
CREATE POLICY "Anyone can view stores" ON stores FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "Anyone can insert stores" ON stores;
CREATE POLICY "Anyone can insert stores" ON stores FOR INSERT TO authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "Anyone can update stores" ON stores;
CREATE POLICY "Anyone can update stores" ON stores FOR UPDATE TO authenticated USING (true) WITH CHECK (true);
GRANT ALL ON stores TO anon, authenticated, service_role;

-- Fix usuarios
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view usuarios" ON usuarios;
CREATE POLICY "Anyone can view usuarios" ON usuarios FOR SELECT TO anon, authenticated USING (true);
GRANT ALL ON usuarios TO anon, authenticated, service_role;

-- Fix site_settings
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view site_settings" ON site_settings;
CREATE POLICY "Anyone can view site_settings" ON site_settings FOR SELECT TO anon, authenticated USING (true);
GRANT ALL ON site_settings TO anon, authenticated, service_role;

-- ==========================================
-- 7. Add username column to usuarios if needed
-- ==========================================
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS username text UNIQUE;

-- ==========================================
-- 8. Insert or update admin user
-- ==========================================
INSERT INTO usuarios (username, email, password_hash, rol, activo)
VALUES 
  ('rodrigo', 'rodrigo@laalianza.cl', 'Roro2692', 'admin', true)
ON CONFLICT (username) DO UPDATE 
  SET password_hash = 'Roro2692',
      email = 'rodrigo@laalianza.cl',
      rol = 'admin',
      activo = true,
      updated_at = now();

-- Done!
SELECT 'Database setup complete!' as message;