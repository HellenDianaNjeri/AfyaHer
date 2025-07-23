import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import LanguageDetector from 'i18next-browser-languagedetector'

const resources = {
  en: {
    translation: {
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
      'auth.doctor': 'Doctor',
      'auth.admin': 'Admin',
      'auth.bio': 'Bio (Optional)',
      'auth.language': 'Preferred Language',
      
      // Dashboard
      'dashboard.welcome': 'Welcome',
      'dashboard.appointments': 'Upcoming Appointments',
      'dashboard.symptoms': 'Symptom Checker',
      'dashboard.journal': 'Mental Health Journal',
      'dashboard.insights': 'Health Insights',
      'dashboard.patients': 'My Patients',
      'dashboard.notes': 'Clinical Notes',
      
      // Symptoms
      'symptoms.title': 'How are you feeling today?',
      'symptoms.select': 'Select all symptoms you\'re experiencing:',
      'symptoms.cramps': 'Menstrual Cramps',
      'symptoms.headache': 'Headache',
      'symptoms.nausea': 'Nausea',
      'symptoms.fatigue': 'Fatigue',
      'symptoms.mood': 'Mood Changes',
      'symptoms.bloating': 'Bloating',
      'symptoms.pain': 'Pelvic Pain',
      'symptoms.irregular': 'Irregular Periods',
      
      // Journal
      'journal.title': 'Mental Health Journal',
      'journal.entry': 'How are you feeling today?',
      'journal.mood': 'Rate your mood (1-10)',
      'journal.save': 'Save Entry',
      'journal.entries': 'Previous Entries',
      
      // Education
      'education.title': 'Health Education Hub',
      'education.subtitle': 'Evidence-based health information for women',
      'education.menstruation': 'Menstruation',
      'education.fertility': 'Fertility',
      'education.menopause': 'Menopause',
      'education.cancer': 'Cancer Prevention',
      'education.wellness': 'General Wellness',
      
      // Community
      'community.title': 'Community Forum',
      'community.subtitle': 'A safe space to connect and share experiences',
      'community.newPost': 'New Post',
      'community.anonymous': 'Post Anonymously',
      
      // Emergency
      'emergency.title': 'Emergency Support',
      'emergency.subtitle': 'Immediate help and crisis resources',
      'emergency.gbv': 'Gender-Based Violence Support',
      'emergency.mental': 'Mental Health Crisis',
      'emergency.medical': 'Medical Emergency',
      
      // General
      'common.loading': 'Loading...',
      'common.error': 'Error',
      'common.success': 'Success',
      'common.cancel': 'Cancel',
      'common.save': 'Save',
      'common.submit': 'Submit',
      'common.search': 'Search',
      'common.filter': 'Filter',
    }
  },
  sw: {
    translation: {
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
      'auth.doctor': 'Daktari',
      'auth.admin': 'Msimamizi',
      'auth.bio': 'Maelezo (Si lazima)',
      'auth.language': 'Lugha Unayopendelea',
      
      // Dashboard
      'dashboard.welcome': 'Karibu',
      'dashboard.appointments': 'Miadi Ijayo',
      'dashboard.symptoms': 'Kufuatilia Dalili',
      'dashboard.journal': 'Jarida la Afya ya Akili',
      'dashboard.insights': 'Maarifa ya Afya',
      'dashboard.patients': 'Wagonjwa Wangu',
      'dashboard.notes': 'Maelezo ya Kitiba',
      
      // Symptoms
      'symptoms.title': 'Unahisije leo?',
      'symptoms.select': 'Chagua dalili zote unazohisi:',
      'symptoms.cramps': 'Maumivu ya Hedhi',
      'symptoms.headache': 'Maumivu ya Kichwa',
      'symptoms.nausea': 'Kichefuchefu',
      'symptoms.fatigue': 'Uchovu',
      'symptoms.mood': 'Mabadiliko ya Hisia',
      'symptoms.bloating': 'Kuvimba',
      'symptoms.pain': 'Maumivu ya Tumbo',
      'symptoms.irregular': 'Hedhi Zisizo za Kawaida',
      
      // Journal
      'journal.title': 'Jarida la Afya ya Akili',
      'journal.entry': 'Unahisije leo?',
      'journal.mood': 'Kadiria hali yako ya kihisia (1-10)',
      'journal.save': 'Hifadhi Ingizo',
      'journal.entries': 'Maingizo ya Awali',
      
      // Education
      'education.title': 'Kituo cha Elimu ya Afya',
      'education.subtitle': 'Habari za afya zenye msingi wa kisayansi kwa wanawake',
      'education.menstruation': 'Hedhi',
      'education.fertility': 'Uzazi',
      'education.menopause': 'Kukatika kwa Hedhi',
      'education.cancer': 'Kuzuia Saratani',
      'education.wellness': 'Afya ya Jumla',
      
      // Community
      'community.title': 'Jukwaa la Jamii',
      'community.subtitle': 'Mahali salama pa kuungana na kushiriki uzoefu',
      'community.newPost': 'Chapisho Jipya',
      'community.anonymous': 'Chapisha Bila Kutambulika',
      
      // Emergency
      'emergency.title': 'Msaada wa Haraka',
      'emergency.subtitle': 'Msaada wa haraka na rasilimali za dharura',
      'emergency.gbv': 'Msaada wa Unyanyasaji wa Kijinsia',
      'emergency.mental': 'Dharura ya Afya ya Akili',
      'emergency.medical': 'Dharura ya Kitiba',
      
      // General
      'common.loading': 'Inapakia...',
      'common.error': 'Kosa',
      'common.success': 'Mafanikio',
      'common.cancel': 'Ghairi',
      'common.save': 'Hifadhi',
      'common.submit': 'Wasilisha',
      'common.search': 'Tafuta',
      'common.filter': 'Chuja',
    }
  }
}

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    fallbackLng: 'en',
    debug: false,
    interpolation: {
      escapeValue: false,
    },
  })

export default i18n