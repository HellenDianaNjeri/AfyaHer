import { create } from 'zustand'
import { supabase } from "../lib/supabaseClient";


export interface JournalEntry {
  id: string
  user_id: string
  entry: string
  mood: number
  date: string
  created_at: string
}

export interface Appointment {
  id: string
  user_id: string
  doctor_id: string
  datetime: string
  notes?: string
  status: 'scheduled' | 'completed' | 'cancelled'
  created_at: string
}

export interface SymptomLog {
  id: string
  user_id: string
  symptoms: string[]
  severity: number
  date: string
  created_at: string
}

interface HealthState {
  journalEntries: JournalEntry[]
  appointments: Appointment[]
  symptoms: string[]
  loading: boolean
  
  // Journal methods
  fetchJournalEntries: () => Promise<void>
  addJournalEntry: (entry: string, mood: number) => Promise<void>
  
  // Appointment methods
  fetchAppointments: () => Promise<void>
  createAppointment: (doctorId: string, datetime: string, notes?: string) => Promise<void>
  updateAppointment: (id: string, updates: Partial<Appointment>) => Promise<void>
  
  // Symptom methods
  logSymptoms: (symptoms: string[], severity: number) => Promise<void>
}

export const useHealthStore = create<HealthState>((set, get) => ({
  journalEntries: [],
  appointments: [],
  symptoms: [],
  loading: false,

  fetchJournalEntries: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('journals')
        .select('*')
        .order('created_at', { ascending: false })

      if (error) throw error
      set({ journalEntries: data || [] })
    } catch (error) {
      console.error('Error fetching journal entries:', error)
    } finally {
      set({ loading: false })
    }
  },

  addJournalEntry: async (entry: string, mood: number) => {
    try {
      const { data, error } = await supabase
        .from('journals')
        .insert([
          {
            entry,
            mood,
            date: new Date().toISOString().split('T')[0],
          },
        ])
        .select()
        .single()

      if (error) throw error
      
      const { journalEntries } = get()
      set({ journalEntries: [data, ...journalEntries] })
    } catch (error) {
      console.error('Error adding journal entry:', error)
      throw error
    }
  },

  fetchAppointments: async () => {
    set({ loading: true })
    try {
      const { data, error } = await supabase
        .from('appointments')
        .select(`
          *,
          doctor:users!appointments_doctor_id_fkey(name),
          patient:users!appointments_user_id_fkey(name)
        `)
        .order('datetime', { ascending: true })

      if (error) throw error
      set({ appointments: data || [] })
    } catch (error) {
      console.error('Error fetching appointments:', error)
    } finally {
      set({ loading: false })
    }
  },

  createAppointment: async (doctorId: string, datetime: string, notes?: string) => {
    try {
      const { data, error } = await supabase
        .from('appointments')
        .insert([
          {
            doctor_id: doctorId,
            datetime,
            notes,
            status: 'scheduled',
          },
        ])
        .select()
        .single()

      if (error) throw error
      
      const { appointments } = get()
      set({ appointments: [...appointments, data] })
    } catch (error) {
      console.error('Error creating appointment:', error)
      throw error
    }
  },

  updateAppointment: async (id: string, updates: Partial<Appointment>) => {
    try {
      const { error } = await supabase
        .from('appointments')
        .update(updates)
        .eq('id', id)

      if (error) throw error
      
      const { appointments } = get()
      set({
        appointments: appointments.map(apt => 
          apt.id === id ? { ...apt, ...updates } : apt
        )
      })
    } catch (error) {
      console.error('Error updating appointment:', error)
      throw error
    }
  },

  logSymptoms: async (symptoms: string[], severity: number) => {
    try {
      const { error } = await supabase
        .from('symptom_logs')
        .insert([
          {
            symptoms,
            severity,
            date: new Date().toISOString().split('T')[0],
          },
        ])

      if (error) throw error
      set({ symptoms })
    } catch (error) {
      console.error('Error logging symptoms:', error)
      throw error
    }
  },
}))