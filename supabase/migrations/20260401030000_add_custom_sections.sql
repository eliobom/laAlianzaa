-- ==========================================
-- Add custom content section table
-- ==========================================
-- This allows adding a custom section below the stores with text, video, images, etc.
-- Can be shown/hidden based on the 'visible' field

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

-- Enable RLS
ALTER TABLE custom_sections ENABLE ROW LEVEL SECURITY;

-- RLS Policies
DROP POLICY IF EXISTS "Anyone can view custom_sections" ON custom_sections;
CREATE POLICY "Anyone can view custom_sections"
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

-- Create indexes
DROP INDEX IF EXISTS custom_sections_orden_idx;
DROP INDEX IF EXISTS custom_sections_visible_idx;
CREATE INDEX custom_sections_orden_idx ON custom_sections(orden);
CREATE INDEX custom_sections_visible_idx ON custom_sections(visible);

-- Grant permissions
GRANT ALL ON custom_sections TO anon, authenticated, service_role;