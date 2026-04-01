-- ==========================================
-- Fix RLS Policies for all tables
-- ==========================================
-- Run this in Supabase SQL Editor
-- This fixes the issue where editing stores and about_us doesn't work

-- ==========================================
-- Fix about_us policies
-- ==========================================
ALTER TABLE about_us ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view about us information" ON about_us;
DROP POLICY IF EXISTS "Anyone can view about us" ON about_us;
DROP POLICY IF EXISTS "Authenticated users can update about us" ON about_us;
DROP POLICY IF EXISTS "Anyone can update about us" ON about_us;
DROP POLICY IF EXISTS "Authenticated users can insert about us" ON about_us;
DROP POLICY IF EXISTS "Anyone can insert about us" ON about_us;

CREATE POLICY "Anyone can view about_us"
  ON about_us FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can update about_us"
  ON about_us FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can insert about_us"
  ON about_us FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ==========================================
-- Fix stores policies
-- ==========================================
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Anyone can view active stores" ON stores;
DROP POLICY IF EXISTS "Anyone can view stores" ON stores;
DROP POLICY IF EXISTS "Anyone can insert stores" ON stores;
DROP POLICY IF EXISTS "Anyone can update stores" ON stores;
DROP POLICY IF EXISTS "Anyone can delete stores" ON stores;

CREATE POLICY "Anyone can view stores"
  ON stores FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can insert stores"
  ON stores FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY "Anyone can update stores"
  ON stores FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can delete stores"
  ON stores FOR DELETE TO anon, authenticated USING (true);

-- ==========================================
-- Fix usuarios policies
-- ==========================================
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view usuarios" ON usuarios;
DROP POLICY IF EXISTS "Anyone can view usuarios" ON usuarios;
DROP POLICY IF EXISTS "Anyone can update usuarios" ON usuarios;

CREATE POLICY "Anyone can view usuarios"
  ON usuarios FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can update usuarios"
  ON usuarios FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

-- ==========================================
-- Fix site_settings policies
-- ==========================================
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Public can view site settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can view site settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can update site settings" ON site_settings;
DROP POLICY IF EXISTS "Anyone can insert site settings" ON site_settings;

CREATE POLICY "Anyone can view site_settings"
  ON site_settings FOR SELECT TO anon, authenticated USING (true);

CREATE POLICY "Anyone can update site_settings"
  ON site_settings FOR UPDATE TO anon, authenticated USING (true) WITH CHECK (true);

CREATE POLICY "Anyone can insert site_settings"
  ON site_settings FOR INSERT TO anon, authenticated WITH CHECK (true);

-- ==========================================
-- Grant all permissions
-- ==========================================
GRANT ALL ON about_us TO anon, authenticated, service_role;
GRANT ALL ON stores TO anon, authenticated, service_role;
GRANT ALL ON usuarios TO anon, authenticated, service_role;
GRANT ALL ON site_settings TO anon, authenticated, service_role;