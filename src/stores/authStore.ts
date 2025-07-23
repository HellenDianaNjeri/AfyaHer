import { create } from 'zustand'
import { supabase } from '../lib/supabase'
import type { User } from '@supabase/supabase-js'

export interface UserProfile {
  id: string
  name: string
  email: string
  role: 'patient' | 'doctor' | 'admin'
  bio?: string
  language: 'en' | 'sw'
  created_at: string
}

interface AuthState {
  user: User | null
  profile: UserProfile | null
  loading: boolean
  signUp: (email: string, password: string, userData: Partial<UserProfile>) => Promise<void>
  signIn: (email: string, password: string) => Promise<void>
  signOut: () => Promise<void>
  fetchProfile: (userId: string) => Promise<void>
  updateProfile: (updates: Partial<UserProfile>) => Promise<void>
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  profile: null,
  loading: true,

  signUp: async (email: string, password: string, userData: Partial<UserProfile>) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    if (data.user) {
      const { error: profileError } = await supabase
        .from('users')
        .insert([
          {
            id: data.user.id,
            email: data.user.email,
            name: userData.name,
            role: userData.role || 'patient',
            bio: userData.bio,
            language: userData.language || 'en',
          },
        ])

      if (profileError) throw profileError
    }
  },

  signIn: async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error
    
    if (data.user) {
      await get().fetchProfile(data.user.id)
    }
  },

  signOut: async () => {
    const { error } = await supabase.auth.signOut()
    if (error) throw error
    set({ user: null, profile: null })
  },

  fetchProfile: async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('users')
        .select('*')
        .eq('id', userId)
        .single()

      if (error) throw error
      set({ profile: data })
    } catch (error) {
      console.error('Error fetching profile:', error)
    }
  },

  updateProfile: async (updates: Partial<UserProfile>) => {
    const { profile } = get()
    if (!profile) return

    const { error } = await supabase
      .from('users')
      .update(updates)
      .eq('id', profile.id)

    if (error) throw error
    
    set({ profile: { ...profile, ...updates } })
  },
}))

// Initialize auth state
supabase.auth.getSession().then(({ data: { session } }) => {
  useAuthStore.setState({ user: session?.user ?? null, loading: false })
  if (session?.user) {
    useAuthStore.getState().fetchProfile(session.user.id)
  }
})

supabase.auth.onAuthStateChange((_event, session) => {
  useAuthStore.setState({ user: session?.user ?? null })
  if (session?.user) {
    useAuthStore.getState().fetchProfile(session.user.id)
  } else {
    useAuthStore.setState({ profile: null })
  }
})