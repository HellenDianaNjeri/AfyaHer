import React, { createContext, useContext, useState, ReactNode } from 'react'

type Language = 'en' | 'sw'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const translations = {
  en: {
    // Navigation
    'nav.dashboard': 'Dashboard',
    'nav.education': 'Health Education',
    'nav.appointments': 'Appointments',
    'nav.community': 'Community',
    'nav.emergency': 'Emergency Support',
    'nav.profile': 'Profile',
    'nav.signOut': 'Sign Out',
    
    // Auth
    'auth.signIn': 'Sign In',
    'auth.signUp': 'Sign Up',
    'auth.email': 'Email',
    'auth.password': 'Password',
    'auth.fullName': 'Full Name',
    'auth.role': 'Role',
    'auth.patient': 'Patient',
    'auth.healthcare': 'Healthcare Professional',
    
    // Dashboard
    'dashboard.welcome': 'Welcome',
    'dashboard.appointments': 'Upcoming Appointments',
    'dashboard.symptoms': 'Symptom Tracker',
    'dashboard.journal': 'Mental Health Journal',
    'dashboard.insights': 'Health Insights',
    
    // General
    'common.loading': 'Loading...',
    'common.error': 'Error',
    'common.success': 'Success',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.submit': 'Submit',
  },
  sw: {
    // Navigation
    'nav.dashboard': 'Dashibodi',
    'nav.education': 'Elimu ya Afya',
    'nav.appointments': 'Miadi',
    'nav.community': 'Jamii',
    'nav.emergency': 'Msaada wa Haraka',
    'nav.profile': 'Wasifu',
    'nav.signOut': 'Toka',
    
    // Auth
    'auth.signIn': 'Ingia',
    'auth.signUp': 'Jiunge',
    'auth.email': 'Barua pepe',
    'auth.password': 'Nywila',
    'auth.fullName': 'Jina Kamili',
    'auth.role': 'Jukumu',
    'auth.patient': 'Mgonjwa',
    'auth.healthcare': 'Mtaalamu wa Afya',
    
    // Dashboard
    'dashboard.welcome': 'Karibu',
    'dashboard.appointments': 'Miadi Ijayo',
    'dashboard.symptoms': 'Kufuatilia Dalili',
    'dashboard.journal': 'Jarida la Afya ya Akili',
    'dashboard.insights': 'Maarifa ya Afya',
    
    // General
    'common.loading': 'Inapakia...',
    'common.error': 'Kosa',
    'common.success': 'Mafanikio',
    'common.cancel': 'Ghairi',
    'common.save': 'Hifadhi',
    'common.submit': 'Wasilisha',
  },
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en')

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}