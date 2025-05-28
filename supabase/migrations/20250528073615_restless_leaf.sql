/*
  # Create translations schema and tables

  1. New Tables
    - `languages`
      - `code` (text, primary key) - Language code (e.g., 'en', 'id')
      - `name` (text) - Language name
      - `is_active` (boolean) - Whether the language is active
      - `created_at` (timestamp)
    
    - `translation_keys`
      - `id` (uuid, primary key)
      - `key` (text) - Translation key
      - `section` (text) - Section/category of the translation
      - `description` (text) - Optional description
      - `created_at` (timestamp)
    
    - `translations`
      - `id` (uuid, primary key)
      - `key_id` (uuid, foreign key)
      - `language_code` (text, foreign key)
      - `value` (text) - Translated text
      - `is_verified` (boolean) - Whether the translation is verified
      - `last_updated_by` (uuid) - Reference to auth.users
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users
*/

-- Create languages table
CREATE TABLE IF NOT EXISTS languages (
  code text PRIMARY KEY,
  name text NOT NULL,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now()
);

-- Create translation_keys table
CREATE TABLE IF NOT EXISTS translation_keys (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key text NOT NULL,
  section text NOT NULL,
  description text,
  created_at timestamptz DEFAULT now(),
  UNIQUE(key, section)
);

-- Create translations table
CREATE TABLE IF NOT EXISTS translations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  key_id uuid REFERENCES translation_keys(id) ON DELETE CASCADE,
  language_code text REFERENCES languages(code) ON DELETE CASCADE,
  value text NOT NULL,
  is_verified boolean DEFAULT false,
  last_updated_by uuid REFERENCES auth.users(id),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(key_id, language_code)
);

-- Enable Row Level Security
ALTER TABLE languages ENABLE ROW LEVEL SECURITY;
ALTER TABLE translation_keys ENABLE ROW LEVEL SECURITY;
ALTER TABLE translations ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Allow read access to all users"
  ON languages FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to all users"
  ON translation_keys FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow read access to all users"
  ON translations FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Allow update for authenticated users"
  ON translations FOR UPDATE
  TO authenticated
  USING (auth.uid() = last_updated_by)
  WITH CHECK (auth.uid() = last_updated_by);

-- Insert default languages
INSERT INTO languages (code, name) VALUES
  ('en', 'English'),
  ('id', 'Indonesian')
ON CONFLICT DO NOTHING;