/*
  # Consolidated Database Schema for La Alianza Carnicerías
  
  This migration contains the complete database schema for the project.
  Use this file to set up the database from scratch.
  
  ## Tables Created
  
  1. about_us - Company information (vision, mission, objectives, etc.)
  2. stores - Store locations with name, URL, logo, order, and active status
  3. usuarios - User accounts for authentication
  4. profiles - User profile information linked to auth.users
  5. site_settings - Configurable site settings (general, social, CEO, footer)
  6. password_recovery - Password recovery tokens
  
  ## Security
  - RLS (Row Level Security) enabled on all tables
  - Public read access for website visitors
  - Authenticated admin access for modifications
*/

-- ============================================
-- TABLE: about_us
-- ============================================
CREATE TABLE IF NOT EXISTS about_us (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  vision text DEFAULT '',
  mision text DEFAULT '',
  objetivos text DEFAULT '',
  titulo text DEFAULT '',
  contenido text DEFAULT '',
  imagen_url text DEFAULT '',
  posicion_imagen text DEFAULT 'right' CHECK (posicion_imagen IN ('left', 'right', 'top', 'bottom')),
  boton_texto text DEFAULT '',
  boton_enlace text DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE about_us ENABLE ROW LEVEL SECURITY;

-- RLS Policies for about_us
DROP POLICY IF EXISTS "Anyone can view about us information" ON about_us;
CREATE POLICY "Anyone can view about us information"
  ON about_us FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can update about us" ON about_us;
CREATE POLICY "Authenticated users can update about us"
  ON about_us FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can insert about us" ON about_us;
CREATE POLICY "Authenticated users can insert about us"
  ON about_us FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Insert default about_us record
INSERT INTO about_us (vision, mision, objetivos, titulo, contenido, posicion_imagen, boton_texto, boton_enlace)
VALUES (
  'Ser la cadena de carnicerias líder en Chile, reconocida por la calidad excepcional de nuestros productos y el servicio personalizado a nuestros clientes.',
  'Ofrecer carnes frescas de la más alta calidad, productos seleccionados y un servicio excepcional que supere las expectativas de nuestros clientes en cada visita.',
  'Mantener los más altos estándares de calidad e higiene en todos nuestros productos. Expandir nuestra presencia en la región con nuevas tiendas. Capacitar constantemente a nuestro equipo para brindar el mejor servicio.',
  'Acerca de Nosotros',
  'Conoce más sobre La Alianza Carnicerías, tu destino número uno para las mejores carnes frescas en Santiago.',
  'right',
  'Ver más',
  '#'
)
ON CONFLICT DO NOTHING;


-- ============================================
-- TABLE: stores
-- ============================================
CREATE TABLE IF NOT EXISTS stores (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre text NOT NULL,
  url text NOT NULL,
  logo_url text DEFAULT '',
  orden integer DEFAULT 0,
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE stores ENABLE ROW LEVEL SECURITY;

-- RLS Policies for stores
DROP POLICY IF EXISTS "Anyone can view active stores" ON stores;
CREATE POLICY "Anyone can view active stores"
  ON stores FOR SELECT
  TO anon, authenticated
  USING (activo = true);

DROP POLICY IF EXISTS "Authenticated users can view all stores" ON stores;
CREATE POLICY "Authenticated users can view all stores"
  ON stores FOR SELECT
  TO authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert stores" ON stores;
CREATE POLICY "Authenticated users can insert stores"
  ON stores FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update stores" ON stores;
CREATE POLICY "Authenticated users can update stores"
  ON stores FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete stores" ON stores;
CREATE POLICY "Authenticated users can delete stores"
  ON stores FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better performance
DROP INDEX IF EXISTS stores_orden_idx;
DROP INDEX IF EXISTS stores_activo_idx;
CREATE INDEX stores_orden_idx ON stores(orden);
CREATE INDEX stores_activo_idx ON stores(activo);

-- Insert sample stores
INSERT INTO stores (nombre, url, orden, activo) VALUES
  ('Tienda Macul', 'https://www.example.com/macul', 1, true),
  ('Tienda Las Condes', 'https://www.example.com/lascondes', 2, true),
  ('Tienda Providencia', 'https://www.example.com/providencia', 3, true)
ON CONFLICT DO NOTHING;


-- ============================================
-- TABLE: usuarios
-- ============================================
CREATE TABLE IF NOT EXISTS usuarios (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  password_hash text NOT NULL,
  rol text DEFAULT 'usuario' CHECK (rol IN ('admin', 'usuario')),
  activo boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE usuarios ENABLE ROW LEVEL SECURITY;

-- RLS Policies for usuarios
DROP POLICY IF EXISTS "Anyone can view active users" ON usuarios;
CREATE POLICY "Anyone can view active users"
  ON usuarios FOR SELECT
  TO authenticated
  USING (activo = true);

DROP POLICY IF EXISTS "Authenticated users can insert usuarios" ON usuarios;
CREATE POLICY "Authenticated users can insert usuarios"
  ON usuarios FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update usuarios" ON usuarios;
CREATE POLICY "Authenticated users can update usuarios"
  ON usuarios FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete usuarios" ON usuarios;
CREATE POLICY "Authenticated users can delete usuarios"
  ON usuarios FOR DELETE
  TO authenticated
  USING (true);

-- Create index
DROP INDEX IF EXISTS usuarios_email_idx;
CREATE INDEX usuarios_email_idx ON usuarios(email);


-- ============================================
-- TABLE: profiles (linked to Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username text,
  full_name text,
  avatar_url text,
  website text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;

-- RLS Policies for profiles
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile"
  ON profiles FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Trigger to create profile on user creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, username, full_name, avatar_url)
  VALUES (new.id, new.raw_user_meta_data->>'username', new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();


-- ============================================
-- TABLE: password_recovery
-- ============================================
CREATE TABLE IF NOT EXISTS password_recovery (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES usuarios(id) ON DELETE CASCADE,
  token text UNIQUE NOT NULL,
  expires_at timestamptz NOT NULL,
  used boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE password_recovery ENABLE ROW LEVEL SECURITY;

-- RLS Policies for password_recovery
DROP POLICY IF EXISTS "Anyone can view own recovery tokens" ON password_recovery;
CREATE POLICY "Anyone can view own recovery tokens"
  ON password_recovery FOR SELECT
  TO authenticated
  USING (user_id = auth.uid());

DROP POLICY IF EXISTS "Anyone can insert recovery tokens" ON password_recovery;
CREATE POLICY "Anyone can insert recovery tokens"
  ON password_recovery FOR INSERT
  TO anon
  WITH CHECK (true);

DROP POLICY IF EXISTS "Anyone can update recovery tokens" ON password_recovery;
CREATE POLICY "Anyone can update recovery tokens"
  ON password_recovery FOR UPDATE
  TO anon
  USING (true)
  WITH CHECK (true);

-- Create index
DROP INDEX IF EXISTS password_recovery_token_idx;
DROP INDEX IF EXISTS password_recovery_user_id_idx;
CREATE INDEX password_recovery_token_idx ON password_recovery(token);
CREATE INDEX password_recovery_user_id_idx ON password_recovery(user_id);


-- ============================================
-- TABLE: site_settings
-- ============================================
CREATE TABLE IF NOT EXISTS site_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text UNIQUE NOT NULL,
  value text DEFAULT '',
  label text NOT NULL,
  type text DEFAULT 'text' CHECK (type IN ('text', 'textarea', 'number', 'boolean', 'image', 'color')),
  category text DEFAULT 'general' CHECK (category IN ('general', 'social', 'ceo', 'footer', 'hero')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE site_settings ENABLE ROW LEVEL SECURITY;

-- RLS Policies for site_settings
DROP POLICY IF EXISTS "Anyone can view site settings" ON site_settings;
CREATE POLICY "Anyone can view site settings"
  ON site_settings FOR SELECT
  TO anon, authenticated
  USING (true);

DROP POLICY IF EXISTS "Authenticated users can insert site settings" ON site_settings;
CREATE POLICY "Authenticated users can insert site settings"
  ON site_settings FOR INSERT
  TO authenticated
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can update site settings" ON site_settings;
CREATE POLICY "Authenticated users can update site settings"
  ON site_settings FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

DROP POLICY IF EXISTS "Authenticated users can delete site settings" ON site_settings;
CREATE POLICY "Authenticated users can delete site settings"
  ON site_settings FOR DELETE
  TO authenticated
  USING (true);

-- Create index
DROP INDEX IF EXISTS site_settings_category_idx;
CREATE INDEX site_settings_category_idx ON site_settings(category);

-- Insert default site settings
INSERT INTO site_settings (key, value, label, type, category) VALUES
  -- General settings
  ('site_name', 'La Alianza Carnicerías', 'Nombre del sitio', 'text', 'general'),
  ('site_description', 'Las mejores carnes frescas en Santiago', 'Descripción del sitio', 'textarea', 'general'),
  ('contact_email', 'contacto@laalianza.cl', 'Email de contacto', 'text', 'general'),
  ('contact_phone', '+56 9 1234 5678', 'Teléfono de contacto', 'text', 'general'),
  
  -- CEO information
  ('ceo_nombre', 'Juan Pérez', 'Nombre del CEO', 'text', 'ceo'),
  ('ceo_descripcion', 'Fundador y Director General de La Alianza Carnicerías con más de 20 años de experiencia en el sector cárnico.', 'Descripción del CEO', 'textarea', 'ceo'),
  ('ceo_imagen', '', 'Foto del CEO', 'image', 'ceo'),
  
  -- Social media
  ('social_facebook', '', 'Facebook', 'text', 'social'),
  ('social_instagram', '', 'Instagram', 'text', 'social'),
  ('social_twitter', '', 'Twitter/X', 'text', 'social'),
  ('social_youtube', '', 'YouTube', 'text', 'social'),
  ('social_tiktok', '', 'TikTok', 'text', 'social'),
  ('social_whatsapp', '+56 9 1234 5678', 'WhatsApp', 'text', 'social'),
  
  -- Footer settings
  ('footer_about_text', 'La Alianza Carnicerías te ofrece las mejores carnes frescas y servicio de calidad en Santiago.', 'Texto breve del footer', 'textarea', 'footer'),
  ('footer_show_social', 'true', 'Mostrar redes sociales', 'boolean', 'footer'),
  ('footer_show_ceo', 'true', 'Mostrar información del CEO', 'boolean', 'footer'),
  
  -- Hero settings
  ('hero_title', 'LA ALIANZA', 'Título principal', 'text', 'hero'),
  ('hero_subtitle', 'CARNICERÍAS', 'Subtítulo', 'text', 'hero'),
  ('hero_background_image', '', 'Imagen de fondo', 'image', 'hero')
ON CONFLICT (key) DO NOTHING;
