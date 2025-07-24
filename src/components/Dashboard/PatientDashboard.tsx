import React from 'react'
import { useTranslation } from 'react-i18next'
import { useAuthStore } from '../../stores/authStore'
import { Calendar, Heart, BookOpen, MessageCircle, TrendingUp, Phone } from 'lucide-react'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { SymptomChecker } from '../Health/SymptomChecker'
import { MentalHealthJournal } from '../Health/MentalHealthJournal'
import { Link } from 'react-router-dom'

const healthData = [
  { month: 'Jan', symptoms: 3, mood: 7 },
  { month: 'Feb', symptoms: 2, mood: 8 },
  { month: 'Mar', symptoms: 4, mood: 6 },
  { month: 'Apr', symptoms: 1, mood: 9 },
  { month: 'May', symptoms: 3, mood: 7 },
  { month: 'Jun', symptoms: 2, mood: 8 },
]

export function PatientDashboard() {
  const { profile } = useAuthStore()
  const { t } = useTranslation()

  if (!profile) return null

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {t('dashboard.welcome')}, {profile.name}
        </h1>
        <p className="text-gray-600 mt-2">Here's your personalized health overview</p>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Next Appointment</p>
              <p className="text-2xl font-bold text-gray-900">Tomorrow</p>
              <p className="text-sm text-gray-500">2:00 PM</p>
            </div>
            <Calendar className="h-8 w-8 text-pink-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Symptom Score</p>
              <p className="text-2xl font-bold text-gray-900">Low</p>
              <p className="text-sm text-green-600">Improving</p>
            </div>
            <Heart className="h-8 w-8 text-green-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Mood Score</p>
              <p className="text-2xl font-bold text-gray-900">8/10</p>
              <p className="text-sm text-blue-600">Good</p>
            </div>
            <TrendingUp className="h-8 w-8 text-blue-500" />
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unread Messages</p>
              <p className="text-2xl font-bold text-gray-900">3</p>
              <p className="text-sm text-purple-600">From Dr. Smith</p>
            </div>
            <MessageCircle className="h-8 w-8 text-purple-500" />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Health Trends Chart */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('dashboard.insights')}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={healthData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="symptoms" stroke="#EC4899" strokeWidth={2} name="Symptoms" />
              <Line type="monotone" dataKey="mood" stroke="#8B5CF6" strokeWidth={2} name="Mood" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Recent Activities */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activities</h3>
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center">
                  <Heart className="w-4 h-4 text-pink-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Symptom tracking completed</p>
                <p className="text-sm text-gray-500">2 hours ago</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <BookOpen className="w-4 h-4 text-blue-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Read article: "Understanding PCOS"</p>
                <p className="text-sm text-gray-500">Yesterday</p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-green-600" />
                </div>
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-gray-900">Appointment scheduled with Dr. Smith</p>
                <p className="text-sm text-gray-500">2 days ago</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Health Tools */}
      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <SymptomChecker />
        <MentalHealthJournal />
      </div>

      {/* Quick Access Tools */}
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-r from-pink-500 to-purple-600 rounded-lg p-6 text-white">
          <MessageCircle className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">AI Health Assistant</h3>
          <p className="text-pink-100 mb-4">Get instant answers to your health questions</p>
          <Link to="/chat" className="bg-white text-pink-600 px-4 py-2 rounded-md font-medium hover:bg-pink-50 transition-colors duration-200 inline-block">
            Start Chat
          </Link>
        </div>

        <div className="bg-gradient-to-r from-teal-500 to-green-600 rounded-lg p-6 text-white">
          <BookOpen className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Health Education</h3>
          <p className="text-teal-100 mb-4">Explore our comprehensive health resources</p>
          <Link to="/education" className="bg-white text-teal-600 px-4 py-2 rounded-md font-medium hover:bg-teal-50 transition-colors duration-200 inline-block">
            Learn More
          </Link>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-pink-600 rounded-lg p-6 text-white">
          <Phone className="h-8 w-8 mb-4" />
          <h3 className="text-lg font-semibold mb-2">Emergency Support</h3>
          <p className="text-red-100 mb-4">24/7 crisis support and resources</p>
          <Link to="/emergency" className="bg-white text-red-600 px-4 py-2 rounded-md font-medium hover:bg-red-50 transition-colors duration-200 inline-block">
            Get Help
          </Link>
        </div>
      </div>
    </div>
  )
}