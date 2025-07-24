import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { useHealthStore } from '../../stores/healthStore'
import { Heart, AlertCircle } from 'lucide-react'

const symptomOptions = [
  'symptoms.cramps',
  'symptoms.headache',
  'symptoms.nausea',
  'symptoms.fatigue',
  'symptoms.mood',
  'symptoms.bloating',
  'symptoms.pain',
  'symptoms.irregular',
]

export function SymptomChecker() {
  const { t } = useTranslation()
  const { logSymptoms } = useHealthStore()
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>([])
  const [severity, setSeverity] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  const handleSymptomToggle = (symptom: string) => {
    setSelectedSymptoms(prev => 
      prev.includes(symptom)
        ? prev.filter(s => s !== symptom)
        : [...prev, symptom]
    )
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (selectedSymptoms.length === 0) return

    setLoading(true)
    try {
      await logSymptoms(selectedSymptoms, severity)
      setSuccess(true)
      setSelectedSymptoms([])
      setSeverity(5)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error logging symptoms:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <Heart className="h-6 w-6 text-pink-500" />
        <h3 className="text-lg font-semibold text-gray-900">{t('symptoms.title')}</h3>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">{t('common.success')} - Symptoms logged successfully!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <p className="text-sm font-medium text-gray-700 mb-3">{t('symptoms.select')}</p>
          <div className="grid grid-cols-2 gap-2">
            {symptomOptions.map((symptom) => (
              <label
                key={symptom}
                className={`flex items-center p-3 rounded-lg border-2 cursor-pointer transition-colors duration-200 ${
                  selectedSymptoms.includes(symptom)
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={selectedSymptoms.includes(symptom)}
                  onChange={() => handleSymptomToggle(symptom)}
                  className="sr-only"
                />
                <span className="text-sm font-medium text-gray-900">{t(symptom)}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Severity Level: {severity}/10
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={severity}
            onChange={(e) => setSeverity(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Mild</span>
            <span>Severe</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={selectedSymptoms.length === 0 || loading}
          className="w-full bg-pink-600 text-white py-2 px-4 rounded-lg hover:bg-pink-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {loading ? t('common.loading') : 'Log Symptoms'}
        </button>
      </form>

      <div className="mt-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div className="flex items-start space-x-2">
          <AlertCircle className="h-4 w-4 text-yellow-600 mt-0.5" />
          <p className="text-xs text-yellow-800">
            This tool is for tracking purposes only. If you're experiencing severe symptoms, please consult a healthcare professional.
          </p>
        </div>
      </div>
    </div>
  )
}