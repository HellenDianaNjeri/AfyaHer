import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../stores/authStore'
import { useHealthStore } from '../../stores/healthStore'
import {
  Calendar,
  Users,
  MessageSquare,
  Video,
  Clock,
  TrendingUp,
  FileText
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'

export function DoctorDashboard() {
  const { profile } = useAuthStore()
  const { appointments, fetchAppointments, loading } = useHealthStore()
  const { t } = useTranslation()
  const navigate = useNavigate()

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  if (!profile) return null

  const todayAppointments = appointments.filter(apt => {
    const today = new Date().toISOString().split('T')[0]
    return apt.datetime.split('T')[0] === today
  })

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.welcome')}, Dr. {profile.name}
        </h1>
        <p className="text-gray-600 mt-2">Healthcare Professional Dashboard</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Today's Appointments</p>
              <p className="text-2xl font-bold text-gray-900">{todayAppointments.length}</p>
              <p className="text-sm text-green-600">Scheduled</p>
            </div>
            <Calendar className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Patients</p>
              <p className="text-2xl font-bold text-gray-900">127</p>
              <p className="text-sm text-blue-600">Active</p>
            </div>
            <Users className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">8</p>
              <p className="text-sm text-purple-600">3 urgent</p>
            </div>
            <MessageSquare className="h-8 w-8 text-purple-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Satisfaction Rate</p>
              <p className="text-2xl font-bold text-gray-900">98%</p>
              <p className="text-sm text-green-600">Excellent</p>
            </div>
            <TrendingUp className="h-8 w-8 text-pink-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Today's Schedule */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">Today's Schedule</h3>
            <Calendar className="h-5 w-5 text-gray-400" />
          </div>

          {loading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
            </div>
          ) : todayAppointments.length > 0 ? (
            <div className="space-y-4">
              {todayAppointments.map((appointment) => (
                <div
                  key={appointment.id}
                  className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                      <Clock className="w-5 h-5 text-pink-600" />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {appointment.patient?.name || 'Patient'}
                      </p>
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                          appointment.status === 'scheduled'
                            ? 'bg-green-100 text-green-800'
                            : appointment.status === 'completed'
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-500">
                      {new Date(appointment.datetime).toLocaleTimeString([], {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </p>
                    {appointment.notes && (
                      <p className="text-sm text-gray-600 mt-1">
                        {appointment.notes}
                      </p>
                    )}
                  </div>
                  <div className="flex-shrink-0">
                    <button
                      onClick={() => navigate('/start-call')}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                    >
                      <Video className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No appointments scheduled for today</p>
            </div>
          )}
        </div>

        {/* Patient Notes */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-gray-900">{t('dashboard.notes')}</h3>
            <FileText className="h-5 w-5 text-gray-400" />
          </div>
          <div className="space-y-4">
            <div className="p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Sarah Johnson</p>
                <p className="text-xs text-gray-500">2 hours ago</p>
              </div>
              <p className="text-sm text-gray-600">
                Follow-up on PCOS management. Patient reports improved symptoms with new medication.
              </p>
            </div>
            <div className="p-3 rounded-lg bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm font-medium text-gray-900">Mary Wanjiku</p>
                <p className="text-xs text-gray-500">1 day ago</p>
              </div>
              <p className="text-sm text-gray-600">
                Initial consultation for fertility concerns. Recommended comprehensive hormone panel.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg p-6 text-white">
          <Video className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Start Video Call</h3>
          <p className="text-blue-100 mb-4">Begin a telemedicine consultation</p>
          <button
            onClick={() => navigate('/start-call')}
            className="bg-white text-blue-600 px-4 py-2 rounded-md font-medium hover:bg-blue-50 transition-colors duration-200"
          >
            Start Call
          </button>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-teal-600 rounded-lg p-6 text-white">
          <Users className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">{t('dashboard.patients')}</h3>
          <p className="text-green-100 mb-4">Access and update patient information</p>
          <button
            onClick={() => navigate('/view-records')}
            className="bg-white text-green-600 px-4 py-2 rounded-md font-medium hover:bg-green-50 transition-colors duration-200"
          >
            View Records
          </button>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-lg p-6 text-white">
          <Calendar className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Schedule Management</h3>
          <p className="text-purple-100 mb-4">Manage your appointments and availability</p>
          <button
            onClick={() => navigate('/manage-appointments')}
            className="bg-white text-purple-600 px-4 py-2 rounded-md font-medium hover:bg-purple-50 transition-colors duration-200"
          >
            Manage Schedule
          </button>
        </div>
      </div>
    </div>
  )
}
