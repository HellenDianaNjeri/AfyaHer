import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuthStore } from './stores/authStore'
import './lib/i18n'
import  Header  from './components/Layout/Header'
import { AuthForm } from './components/Auth/AuthForm'
import { PatientDashboard } from './components/Dashboard/PatientDashboard'
import { DoctorDashboard } from './components/Dashboard/DoctorDashboard'
import { EducationHub } from './components/HealthEducation/EducationHub'
import { HealthChatbot } from './components/Chatbot/HealthChatbot'
import { EmergencySupport } from './components/Emergency/EmergencySupport'
import { CommunityForum } from './components/Community/CommunityForum'
import { AppointmentManager } from './components/Appointments/AppointmentManager'

function AppContent() {
  const { user, profile, loading } = useAuthStore()

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user || !profile) {
    return <AuthForm />
  }

  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <main>
          <Routes>
            <Route 
              path="/dashboard" 
              element={
                profile.role === 'patient' ? (
                  <PatientDashboard />
                ) : (
                  <DoctorDashboard />
                )
              } 
            />
            <Route path="/education" element={<EducationHub />} />
            <Route path="/appointments" element={<AppointmentManager />} />
            <Route path="/chatbot" element={<HealthChatbot />} />
            <Route path="/community" element={<CommunityForum />} />
            <Route path="/emergency" element={<EmergencySupport />} />
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="*" element={<Navigate to="/dashboard" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  )
}

function App() {
  return (
    <AppContent />
  )
}

export default App