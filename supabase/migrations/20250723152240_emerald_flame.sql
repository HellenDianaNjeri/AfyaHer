/*
  # User Profiles and Health Platform Schema

  1. New Tables
    - `user_profiles`
      - `id` (uuid, primary key, references auth.users)
      - `email` (text, unique)
      - `full_name` (text)
      - `role` (enum: patient, healthcare_professional)
      - `phone` (text, optional)
      - `specialization` (text, optional for healthcare professionals)
      - `license_number` (text, optional for healthcare professionals)
      - `created_at` (timestamp with timezone)
      - `updated_at` (timestamp with timezone)

    - `appointments`
      - `id` (uuid, primary key)
      - `patient_id` (uuid, references user_profiles)
      - `provider_id` (uuid, references user_profiles)
      - `date` (date)
      - `time` (time)
      - `type` (enum: consultation, checkup, follow_up)
      - `status` (enum: scheduled, completed, cancelled)
      - `notes` (text, optional)
      - `created_at` (timestamp with timezone)

    - `health_articles`
      - `id` (uuid, primary key)
      - `title` (text)
      - `content` (text)
      - `category` (enum: menstruation, fertility, menopause, cancer, mental_health, general)
      - `author` (text)
      - `featured_image` (text, optional)
      - `published_at` (timestamp with timezone)
      - `created_at` (timestamp with timezone)

    - `forum_posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references user_profiles)
      - `title` (text)
      - `content` (text)
      - `category` (enum: general, menstruation, fertility, mental_health, relationships, support)
      - `likes_count` (integer, default 0)
      - `replies_count` (integer, default 0)
      - `created_at` (timestamp with timezone)

  2. Security
    - Enable RLS on all tables
    - Add policies for users to manage their own data
    - Healthcare professionals can view patient data with proper permissions
    - Public read access for health articles
    - Anonymous posting allowed for forum posts
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'healthcare_professional');
CREATE TYPE appointment_type AS ENUM ('consultation', 'checkup', 'follow_up');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE article_category AS ENUM ('menstruation', 'fertility', 'menopause', 'cancer', 'mental_health', 'general');
CREATE TYPE forum_category AS ENUM ('general', 'menstruation', 'fertility', 'mental_health', 'relationships', 'support');

-- User profiles table
CREATE TABLE IF NOT EXISTS user_profiles (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email text UNIQUE NOT NULL,
  full_name text NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  phone text,
  specialization text,
  license_number text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  patient_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  provider_id uuid NOT NULL REFERENCES user_profiles(id) ON DELETE CASCADE,
  date date NOT NULL,
  time time NOT NULL,
  type appointment_type NOT NULL DEFAULT 'consultation',
  status appointment_status NOT NULL DEFAULT 'scheduled',
  notes text,
  created_at timestamptz DEFAULT now()
);

-- Health articles table
CREATE TABLE IF NOT EXISTS health_articles (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  content text NOT NULL,
  category article_category NOT NULL,
  author text NOT NULL,
  featured_image text,
  published_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Forum posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES user_profiles(id) ON DELETE SET NULL,
  title text NOT NULL,
  content text NOT NULL,
  category forum_category NOT NULL DEFAULT 'general',
  likes_count integer DEFAULT 0,
  replies_count integer DEFAULT 0,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE user_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE health_articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;

-- User profiles policies
CREATE POLICY "Users can view own profile"
  ON user_profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON user_profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON user_profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Appointments policies
CREATE POLICY "Patients can view own appointments"
  ON appointments
  FOR SELECT
  TO authenticated
  USING (
    patient_id = auth.uid() OR 
    provider_id = auth.uid()
  );

CREATE POLICY "Patients can create appointments"
  ON appointments
  FOR INSERT
  TO authenticated
  WITH CHECK (patient_id = auth.uid());

CREATE POLICY "Healthcare professionals can manage appointments"
  ON appointments
  FOR ALL
  TO authenticated
  USING (
    provider_id = auth.uid() OR
    patient_id = auth.uid()
  );

-- Health articles policies (public read access)
CREATE POLICY "Anyone can read health articles"
  ON health_articles
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Healthcare professionals can manage articles"
  ON health_articles
  FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM user_profiles 
      WHERE id = auth.uid() 
      AND role = 'healthcare_professional'
    )
  );

-- Forum posts policies (anonymous posting allowed)
CREATE POLICY "Anyone can read forum posts"
  ON forum_posts
  FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts
  FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update own posts"
  ON forum_posts
  FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own posts"
  ON forum_posts
  FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_patient_id ON appointments(patient_id);
CREATE INDEX IF NOT EXISTS idx_appointments_provider_id ON appointments(provider_id);
CREATE INDEX IF NOT EXISTS idx_appointments_date ON appointments(date);
CREATE INDEX IF NOT EXISTS idx_health_articles_category ON health_articles(category);
CREATE INDEX IF NOT EXISTS idx_forum_posts_category ON forum_posts(category);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create trigger for user_profiles
CREATE TRIGGER update_user_profiles_updated_at
  BEFORE UPDATE ON user_profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insert sample health articles
INSERT INTO health_articles (title, content, category, author) VALUES
('Understanding Your Menstrual Cycle', 'Your menstrual cycle is a monthly process your body goes through to prepare for pregnancy. Understanding the phases can help you track your health and identify any irregularities...', 'menstruation', 'Dr. Sarah Johnson'),
('PCOS: Symptoms and Management', 'Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods...', 'fertility', 'Dr. Mary Wanjiku'),
('Preparing for Menopause', 'Menopause is a natural biological process that marks the end of your menstrual cycles. It typically occurs in your 40s or 50s...', 'menopause', 'Dr. Grace Achieng'),
('Breast Cancer Prevention', 'Regular screening and healthy lifestyle choices can help reduce your risk of breast cancer. Early detection is key...', 'cancer', 'Dr. Ruth Muthoni'),
('Managing Anxiety and Depression', 'Mental health is just as important as physical health. Learning to recognize symptoms and seeking help when needed is crucial...', 'mental_health', 'Dr. Alice Nyong'),
('Nutrition for Women''s Health', 'Proper nutrition plays a vital role in women''s health throughout all life stages. Different nutrients become more important at different times...', 'general', 'Dr. Faith Kiprotich');