-- ==========================================
-- Create admin user for La Alianza Carnicerías
-- ==========================================
-- Run this in Supabase SQL Editor

-- Step 1: Add username column if it doesn't exist
ALTER TABLE usuarios ADD COLUMN IF NOT EXISTS username text UNIQUE;

-- Step 2: Drop existing policies that might conflict
DROP POLICY IF EXISTS "Public can view usuarios" ON usuarios;

-- Step 3: Create permissive policy for viewing usuarios
CREATE POLICY "Anyone can view usuarios"
  ON usuarios FOR SELECT 
  TO anon, authenticated 
  USING (true);

-- Step 4: Insert or update the admin user
INSERT INTO usuarios (username, email, password_hash, rol, activo)
VALUES 
  ('rodrigo', 'rodrigo@laalianza.cl', 'Roro2692', 'admin', true)
ON CONFLICT (username) DO UPDATE 
  SET password_hash = 'Roro2692',
      email = 'rodrigo@laalianza.cl',
      rol = 'admin',
      activo = true,
      updated_at = now();