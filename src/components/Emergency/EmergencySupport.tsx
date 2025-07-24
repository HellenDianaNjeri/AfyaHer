import React from 'react'
import { useTranslation } from 'react-i18next'
import { Phone, Shield, Heart, AlertTriangle } from 'lucide-react'

const emergencyContacts = [
  {
    name: 'National Emergency Services',
    number: '999',
    description: 'Police, Fire, Medical Emergency',
    type: 'emergency',
    available: '24/7'
  },
  {
    name: 'Gender Violence Recovery Centre',
    number: '+254 719 638 006',
    description: 'Support for survivors of gender-based violence',
    type: 'crisis',
    available: '24/7'
  },
  {
    name: 'Befrienders Kenya',
    number: '+254 722 178 177',
    description: 'Suicide prevention and emotional support',
    type: 'mental',
    available: '24/7'
  },
  {
    name: 'Kenya Women Lawyers Association',
    number: '+254 20 387 4783',
    description: 'Legal aid for women',
    type: 'legal',
    available: 'Business hours'
  }
]

const resources = [
  {
    title: 'Domestic Violence Safety Plan',
    description: 'Create a personalized safety plan to protect yourself and your children',
    icon: Shield,
    color: 'bg-red-100 text-red-600'
  },
  {
    title: 'Mental Health Crisis Resources',  
    description: 'Immediate resources for mental health emergencies and suicidal thoughts',
    icon: Heart,
    color: 'bg-blue-100 text-blue-600'
  },
  {
    title: 'Sexual Assault Support',
    description: 'Information and resources for survivors of sexual assault',
    icon: Shield,
    color: 'bg-purple-100 text-purple-600'
  },
  {
    title: 'Emergency Contraception',
    description: 'Information about emergency contraception and where to access it',
    icon: AlertTriangle,
    color: 'bg-green-100 text-green-600'
  }
]

export function EmergencySupport() {
  const { t } = useTranslation()
  
  const makeCall = (number: string) => {
    window.location.href = `tel:${number}`
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center">
            <Phone className="h-6 w-6 text-red-600" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{t('emergency.title')}</h1>
            <p className="text-gray-600">{t('emergency.subtitle')}</p>
          </div>
        </div>
        
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-start space-x-3">
            <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
            <div>
              <h3 className="text-sm font-medium text-red-800">Emergency Notice</h3>
              <p className="text-sm text-red-700 mt-1">
                If you are in immediate danger, call emergency services (999) right away. 
                If you cannot speak safely, consider using text or online resources.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Emergency Contacts</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {emergencyContacts.map((contact, index) => (
            <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900">{contact.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{contact.description}</p>
                  <p className="text-sm text-gray-500 mt-2">Available: {contact.available}</p>
                </div>
                <div className={`p-2 rounded-full ${
                  contact.type === 'emergency' ? 'bg-red-100' :
                  contact.type === 'crisis' ? 'bg-orange-100' :
                  contact.type === 'mental' ? 'bg-blue-100' : 'bg-green-100'
                }`}>
                  <Phone className={`h-5 w-5 ${
                    contact.type === 'emergency' ? 'text-red-600' :
                    contact.type === 'crisis' ? 'text-orange-600' :
                    contact.type === 'mental' ? 'text-blue-600' : 'text-green-600'
                  }`} />
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">{contact.number}</span>
                <button
                  onClick={() => makeCall(contact.number)}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors duration-200 ${
                    contact.type === 'emergency' 
                      ? 'bg-red-600 hover:bg-red-700 text-white' 
                      : 'bg-pink-600 hover:bg-pink-700 text-white'
                  }`}
                >
                  Call Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Resource Categories */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Crisis Resources</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {resources.map((resource, index) => {
            const Icon = resource.icon
            return (
              <div key={index} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${resource.color}`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{resource.title}</h3>
                    <p className="text-gray-600 text-sm mb-4">{resource.description}</p>
                    <button className="text-pink-600 hover:text-pink-700 font-medium text-sm">
                      Learn More →
                    </button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Safety Tips */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-lg p-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Safety Tips</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">If you're in immediate danger:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Call 999 immediately</li>
              <li>• Move to a safe location if possible</li>
              <li>• Tell someone you trust about the situation</li>
              <li>• Keep important documents ready</li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-gray-900 mb-2">Online safety:</h3>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>• Use a safe device and internet connection</li>
              <li>• Clear your browser history after visiting</li>
              <li>• Have a safety plan for online communications</li>
              <li>• Consider using private/incognito browsing</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}