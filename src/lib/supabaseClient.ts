import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || ''
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || ''

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export type UserRole = 'patient' | 'healthcare_professional'

export interface UserProfile {
  id: string
  email: string
  full_name: string
  role: UserRole
  phone?: string
  specialization?: string
  license_number?: string
  created_at: string
}

export interface Appointment {
  id: string
  patient_id: string
  provider_id: string
  date: string
  time: string
  type: 'consultation' | 'checkup' | 'follow_up'
  status: 'scheduled' | 'completed' | 'cancelled'
  notes?: string
}

export interface HealthArticle {
  id: string
  title: string
  content: string
  category: 'menstruation' | 'fertility' | 'menopause' | 'cancer' | 'mental_health' | 'general'
  author: string
  published_at: string
  featured_image?: string
}