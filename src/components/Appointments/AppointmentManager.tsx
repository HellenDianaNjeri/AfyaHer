import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../stores/authStore'
import { useHealthStore } from '../../stores/healthStore'
import { Calendar, Clock, User, Video, Plus } from 'lucide-react'

export function AppointmentManager() {
  const { t } = useTranslation()
  const { profile } = useAuthStore()
  const { appointments, fetchAppointments, createAppointment, updateAppointment, loading } = useHealthStore()
  const [showNewForm, setShowNewForm] = useState(false)
  const [newAppointment, setNewAppointment] = useState({
    doctorId: '',
    datetime: '',
    notes: ''
  })

  useEffect(() => {
    fetchAppointments()
  }, [fetchAppointments])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await createAppointment(newAppointment.doctorId, newAppointment.datetime, newAppointment.notes)
      setShowNewForm(false)
      setNewAppointment({ doctorId: '', datetime: '', notes: '' })
    } catch (error) {
      console.error('Error creating appointment:', error)
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800'
      case 'completed': return 'bg-green-100 text-green-800'
      case 'cancelled': return 'bg-red-100 text-red-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('nav.appointments')}</h1>
            <p className="text-gray-600 mt-2">Manage your healthcare appointments</p>
          </div>
          {profile?.role === 'patient' && (
            <button
              onClick={() => setShowNewForm(!showNewForm)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium flex items-center space-x-2"
            >
              <Plus className="h-4 w-4" />
              <span>Book Appointment</span>
            </button>
          )}
        </div>
      </div>

      {/* New Appointment Form */}
      {showNewForm && profile?.role === 'patient' && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Book New Appointment</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Doctor</label>
                <select
                  value={newAppointment.doctorId}
                  onChange={(e) => setNewAppointment({ ...newAppointment, doctorId: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                >
                  <option value="">Select a doctor</option>
                  <option value="doctor1">Dr. Sarah Johnson - Gynecologist</option>
                  <option value="doctor2">Dr. Mary Wanjiku - General Practitioner</option>
                  <option value="doctor3">Dr. Grace Achieng - Mental Health Specialist</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                <input
                  type="datetime-local"
                  value={newAppointment.datetime}
                  onChange={(e) => setNewAppointment({ ...newAppointment, datetime: e.target.value })}
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Notes (Optional)</label>
              <textarea
                value={newAppointment.notes}
                onChange={(e) => setNewAppointment({ ...newAppointment, notes: e.target.value })}
                rows={3}
                className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                placeholder="Describe your symptoms or reason for visit..."
              />
            </div>
            <div className="flex space-x-3">
              <button
                type="submit"
                className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
              >
                Book Appointment
              </button>
              <button
                type="button"
                onClick={() => setShowNewForm(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
              >
                {t('common.cancel')}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Appointments List */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">
            {profile?.role === 'patient' ? 'My Appointments' : 'Patient Appointments'}
          </h3>
        </div>
        
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-pink-600"></div>
          </div>
        ) : appointments.length > 0 ? (
          <div className="divide-y divide-gray-200">
            {appointments.map((appointment) => (
              <div key={appointment.id} className="p-6 hover:bg-gray-50 transition-colors duration-200">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center">
                        <User className="w-6 h-6 text-pink-600" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h4 className="text-lg font-medium text-gray-900">
                          {profile?.role === 'patient' 
                            ? `Dr. ${appointment.doctor?.name || 'Unknown'}` 
                            : appointment.patient?.name || 'Patient'
                          }
                        </h4>
                        <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(appointment.status)}`}>
                          {appointment.status}
                        </span>
                      </div>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 mb-2">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(appointment.datetime).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{new Date(appointment.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                      {appointment.notes && (
                        <p className="text-sm text-gray-600">{appointment.notes}</p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    {appointment.status === 'scheduled' && (
                      <button className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm hover:bg-blue-700 transition-colors duration-200 flex items-center space-x-1">
                        <Video className="w-4 h-4" />
                        <span>Join Call</span>
                      </button>
                    )}
                    {profile?.role === 'doctor' && (
                      <button
                        onClick={() => updateAppointment(appointment.id, { status: 'completed' })}
                        className="text-green-600 hover:text-green-700 text-sm font-medium"
                      >
                        Mark Complete
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <Calendar className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-500">No appointments scheduled</p>
            {profile?.role === 'patient' && (
              <button
                onClick={() => setShowNewForm(true)}
                className="mt-2 text-pink-600 hover:text-pink-700 font-medium"
              >
                Book your first appointment
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  )
}