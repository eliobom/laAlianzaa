-- ==========================================
-- Simple fix: Make all policies completely open
-- ==========================================
-- Run this in Supabase SQL Editor to fix all permission issues

-- Drop and recreate all policies to be completely open
-- This is just for development/testing

-- Fix about_us
ALTER TABLE about_us DISABLE ROW LEVEL SECURITY;
ALTER TABLE about_us ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view about_us" ON about_us;
DROP POLICY IF EXISTS "Anyone can update about_us" ON about_us;
CREATE POLICY "Allow all for about_us" ON about_us FOR ALL USING (true) WITH CHECK (true);

-- Fix stores
ALTER TABLE stores DISABLE ROW LEVEL SECURITY;
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view stores" ON stores;
DROP POLICY IF EXISTS "Anyone can insert stores" ON stores;
DROP POLICY IF EXISTS "Anyone can update stores" ON stores;
CREATE POLICY "Allow all for stores" ON stores FOR ALL USING (true) WITH CHECK (true);

-- Fix custom_sections
ALTER TABLE custom_sections DISABLE ROW LEVEL SECURITY;
ALTER TABLE custom_sections ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view visible custom_sections" ON custom_sections;
DROP POLICY IF EXISTS "Anyone can view all custom_sections" ON custom_sections;
DROP POLICY IF EXISTS "Anyone can insert custom_sections" ON custom_sections;
DROP POLICY IF EXISTS "Anyone can update custom_sections" ON custom_sections;
DROP POLICY IF EXISTS "Anyone can delete custom_sections" ON custom_sections;
CREATE POLICY "Allow all for custom_sections" ON custom_sections FOR ALL USING (true) WITH CHECK (true);

-- Fix usuarios
ALTER TABLE usuarios DISABLE ROW LEVEL SECURITY;
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view usuarios" ON usuarios;
CREATE POLICY "Allow all for usuarios" ON usuarios FOR ALL USING (true) WITH CHECK (true);

-- Fix site_settings
ALTER TABLE site_settings DISABLE ROW LEVEL SECURITY;
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Anyone can view site_settings" ON site_settings;
CREATE POLICY "Allow all for site_settings" ON site_settings FOR ALL USING (true) WITH CHECK (true);

-- Grant all permissions
GRANT ALL ON ALL TABLES IN SCHEMA public TO anon;
GRANT ALL ON ALL TABLES IN SCHEMA public TO authenticated;
GRANT ALL ON ALL TABLES IN SCHEMA public TO service_role;

SELECT 'All policies fixed! Now you can save sections.' as message;