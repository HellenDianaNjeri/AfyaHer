/*
  # AfyaHer Database Schema

  1. New Tables
    - `users`
      - `id` (uuid, primary key, references auth.users)
      - `name` (text)
      - `email` (text, unique)
      - `role` (enum: patient, doctor, admin)
      - `bio` (text, optional)
      - `language` (text, default 'en')
      - `created_at` (timestamp)

    - `appointments`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users - patient)
      - `doctor_id` (uuid, references users - doctor)
      - `datetime` (timestamp)
      - `notes` (text, optional)
      - `status` (enum: scheduled, completed, cancelled)
      - `created_at` (timestamp)

    - `journals`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `entry` (text)
      - `mood` (integer, 1-10)
      - `date` (date)
      - `created_at` (timestamp)

    - `symptom_logs`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users)
      - `symptoms` (text array)
      - `severity` (integer, 1-10)
      - `date` (date)
      - `created_at` (timestamp)

    - `education_content`
      - `id` (uuid, primary key)
      - `title` (text)
      - `type` (enum: article, video)
      - `topic` (enum: menstruation, fertility, menopause, cancer, wellness)
      - `url` (text, optional)
      - `content` (text, optional)
      - `language` (text, default 'en')
      - `created_at` (timestamp)

    - `forum_posts`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references users, nullable for anonymous)
      - `title` (text)
      - `content` (text)
      - `topic` (text)
      - `anonymous` (boolean, default false)
      - `created_at` (timestamp)

    - `forum_comments`
      - `id` (uuid, primary key)
      - `post_id` (uuid, references forum_posts)
      - `user_id` (uuid, references users, nullable for anonymous)
      - `content` (text)
      - `anonymous` (boolean, default false)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Users can manage their own data
    - Doctors can view patient data with proper permissions
    - Public read access for education content
    - Anonymous posting allowed for forum
*/

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create custom types
CREATE TYPE user_role AS ENUM ('patient', 'doctor', 'admin');
CREATE TYPE appointment_status AS ENUM ('scheduled', 'completed', 'cancelled');
CREATE TYPE content_type AS ENUM ('article', 'video');
CREATE TYPE content_topic AS ENUM ('menstruation', 'fertility', 'menopause', 'cancer', 'wellness');

-- Users table
CREATE TABLE IF NOT EXISTS users (
  id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text UNIQUE NOT NULL,
  role user_role NOT NULL DEFAULT 'patient',
  bio text,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

-- Appointments table
CREATE TABLE IF NOT EXISTS appointments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  doctor_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  datetime timestamptz NOT NULL,
  notes text,
  status appointment_status NOT NULL DEFAULT 'scheduled',
  created_at timestamptz DEFAULT now()
);

-- Journals table
CREATE TABLE IF NOT EXISTS journals (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  entry text NOT NULL,
  mood integer NOT NULL CHECK (mood >= 1 AND mood <= 10),
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Symptom logs table
CREATE TABLE IF NOT EXISTS symptom_logs (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  symptoms text[] NOT NULL,
  severity integer NOT NULL CHECK (severity >= 1 AND severity <= 10),
  date date NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Education content table
CREATE TABLE IF NOT EXISTS education_content (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  title text NOT NULL,
  type content_type NOT NULL,
  topic content_topic NOT NULL,
  url text,
  content text,
  language text DEFAULT 'en',
  created_at timestamptz DEFAULT now()
);

-- Forum posts table
CREATE TABLE IF NOT EXISTS forum_posts (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  title text NOT NULL,
  content text NOT NULL,
  topic text NOT NULL,
  anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Forum comments table
CREATE TABLE IF NOT EXISTS forum_comments (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  post_id uuid NOT NULL REFERENCES forum_posts(id) ON DELETE CASCADE,
  user_id uuid REFERENCES users(id) ON DELETE SET NULL,
  content text NOT NULL,
  anonymous boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments ENABLE ROW LEVEL SECURITY;
ALTER TABLE journals ENABLE ROW LEVEL SECURITY;
ALTER TABLE symptom_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE education_content ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE forum_comments ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile"
  ON users FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Doctors can view patient profiles"
  ON users FOR SELECT
  TO authenticated
  USING (
    role = 'patient' AND 
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('doctor', 'admin')
    )
  );

-- Appointments policies
CREATE POLICY "Users can view own appointments"
  ON appointments FOR SELECT
  TO authenticated
  USING (user_id = auth.uid() OR doctor_id = auth.uid());

CREATE POLICY "Patients can create appointments"
  ON appointments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid());

CREATE POLICY "Doctors can update appointments"
  ON appointments FOR UPDATE
  TO authenticated
  USING (doctor_id = auth.uid());

-- Journals policies
CREATE POLICY "Users can manage own journal entries"
  ON journals FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Doctors can view patient journals"
  ON journals FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('doctor', 'admin')
    )
  );

-- Symptom logs policies
CREATE POLICY "Users can manage own symptom logs"
  ON symptom_logs FOR ALL
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Doctors can view patient symptom logs"
  ON symptom_logs FOR SELECT
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role IN ('doctor', 'admin')
    )
  );

-- Education content policies
CREATE POLICY "Anyone can read education content"
  ON education_content FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Admins can manage education content"
  ON education_content FOR ALL
  TO authenticated
  USING (
    EXISTS (
      SELECT 1 FROM users 
      WHERE id = auth.uid() AND role = 'admin'
    )
  );

-- Forum posts policies
CREATE POLICY "Anyone can read forum posts"
  ON forum_posts FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create posts"
  ON forum_posts FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update own posts"
  ON forum_posts FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own posts"
  ON forum_posts FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Forum comments policies
CREATE POLICY "Anyone can read forum comments"
  ON forum_comments FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Authenticated users can create comments"
  ON forum_comments FOR INSERT
  TO authenticated
  WITH CHECK (user_id = auth.uid() OR user_id IS NULL);

CREATE POLICY "Users can update own comments"
  ON forum_comments FOR UPDATE
  TO authenticated
  USING (user_id = auth.uid());

CREATE POLICY "Users can delete own comments"
  ON forum_comments FOR DELETE
  TO authenticated
  USING (user_id = auth.uid());

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_appointments_user_id ON appointments(user_id);
CREATE INDEX IF NOT EXISTS idx_appointments_doctor_id ON appointments(doctor_id);
CREATE INDEX IF NOT EXISTS idx_appointments_datetime ON appointments(datetime);
CREATE INDEX IF NOT EXISTS idx_journals_user_id ON journals(user_id);
CREATE INDEX IF NOT EXISTS idx_journals_date ON journals(date);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_user_id ON symptom_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_symptom_logs_date ON symptom_logs(date);
CREATE INDEX IF NOT EXISTS idx_education_content_topic ON education_content(topic);
CREATE INDEX IF NOT EXISTS idx_education_content_language ON education_content(language);
CREATE INDEX IF NOT EXISTS idx_forum_posts_topic ON forum_posts(topic);
CREATE INDEX IF NOT EXISTS idx_forum_posts_created_at ON forum_posts(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_forum_comments_post_id ON forum_comments(post_id);

-- Insert sample education content
INSERT INTO education_content (title, type, topic, content, language) VALUES
('Understanding Your Menstrual Cycle', 'article', 'menstruation', 'Your menstrual cycle is a monthly process your body goes through to prepare for pregnancy. Understanding the phases can help you track your health and identify any irregularities. The average cycle is 28 days, but anywhere from 21-35 days is considered normal.', 'en'),
('PCOS: Symptoms and Management', 'article', 'fertility', 'Polycystic Ovary Syndrome (PCOS) is a hormonal disorder common among women of reproductive age. Women with PCOS may have infrequent or prolonged menstrual periods or excess male hormone levels. The exact cause is unknown, but early diagnosis and treatment can help control symptoms.', 'en'),
('Preparing for Menopause', 'article', 'menopause', 'Menopause is a natural biological process that marks the end of your menstrual cycles. It typically occurs in your 40s or 50s. Understanding what to expect can help you prepare for this transition and manage symptoms effectively.', 'en'),
('Breast Cancer Prevention', 'article', 'cancer', 'Regular screening and healthy lifestyle choices can help reduce your risk of breast cancer. Early detection through mammograms and self-exams is crucial. Maintaining a healthy weight, exercising regularly, and limiting alcohol can also help reduce risk.', 'en'),
('Nutrition for Women\'s Health', 'article', 'wellness', 'Proper nutrition plays a vital role in women\'s health throughout all life stages. Different nutrients become more important at different times - iron during menstruation, folic acid during pregnancy, and calcium for bone health as you age.', 'en');

-- Insert sample Swahili content
INSERT INTO education_content (title, type, topic, content, language) VALUES
('Kuelewa Mzunguko wa Hedhi Yako', 'article', 'menstruation', 'Mzunguko wa hedhi ni mchakato wa kila mwezi ambao mwili wako hufanya ili kujiandaa kwa ujauzito. Kuelewa awamu hii kunaweza kukusaidia kufuatilia afya yako na kutambua mabadiliko yoyote yasiyo ya kawaida.', 'sw'),
('PCOS: Dalili na Usimamizi', 'article', 'fertility', 'Ugonjwa wa PCOS ni tatizo la homoni linalojulikana kwa wanawake wa umri wa kuzaa. Wanawake wenye PCOS wanaweza kuwa na hedhi zisizo za mara kwa mara au za muda mrefu.', 'sw'),
('Kujiandaa kwa Kukatika kwa Hedhi', 'article', 'menopause', 'Kukatika kwa hedhi ni mchakato wa asili wa kibiolojia unaotambulisha mwisho wa mizunguko ya hedhi yako. Kwa kawaida hutokea katika miaka ya 40 au 50.', 'sw');