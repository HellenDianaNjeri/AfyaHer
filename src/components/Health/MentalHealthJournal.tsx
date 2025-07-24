import React, { useState, useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useHealthStore } from '../../stores/healthStore'
import { BookOpen, Heart } from 'lucide-react'

export function MentalHealthJournal() {
  const { t } = useTranslation()
  const { journalEntries, fetchJournalEntries, addJournalEntry } = useHealthStore()
  const [entry, setEntry] = useState('')
  const [mood, setMood] = useState(5)
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    fetchJournalEntries()
  }, [fetchJournalEntries])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!entry.trim()) return

    setLoading(true)
    try {
      await addJournalEntry(entry, mood)
      setEntry('')
      setMood(5)
      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (error) {
      console.error('Error adding journal entry:', error)
    } finally {
      setLoading(false)
    }
  }

  const getMoodColor = (moodValue: number) => {
    if (moodValue <= 3) return 'text-red-500'
    if (moodValue <= 6) return 'text-yellow-500'
    return 'text-green-500'
  }

  const getMoodEmoji = (moodValue: number) => {
    if (moodValue <= 2) return '😢'
    if (moodValue <= 4) return '😔'
    if (moodValue <= 6) return '😐'
    if (moodValue <= 8) return '🙂'
    return '😊'
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-4">
        <BookOpen className="h-6 w-6 text-purple-500" />
        <h3 className="text-lg font-semibold text-gray-900">{t('journal.title')}</h3>
      </div>

      {success && (
        <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-sm text-green-800">{t('common.success')} - Journal entry saved!</p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4 mb-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('journal.entry')}
          </label>
          <textarea
            value={entry}
            onChange={(e) => setEntry(e.target.value)}
            rows={4}
            className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
            placeholder="Share your thoughts and feelings..."
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            {t('journal.mood')} {getMoodEmoji(mood)}
          </label>
          <input
            type="range"
            min="1"
            max="10"
            value={mood}
            onChange={(e) => setMood(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>Very Low</span>
            <span className={`font-medium ${getMoodColor(mood)}`}>{mood}/10</span>
            <span>Very High</span>
          </div>
        </div>

        <button
          type="submit"
          disabled={!entry.trim() || loading}
          className="w-full bg-purple-600 text-white py-2 px-4 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 font-medium"
        >
          {loading ? t('common.loading') : t('journal.save')}
        </button>
      </form>

      {/* Recent Entries */}
      <div>
        <h4 className="text-sm font-medium text-gray-900 mb-3">{t('journal.entries')}</h4>
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {journalEntries.slice(0, 3).map((journalEntry) => (
            <div key={journalEntry.id} className="p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <Heart className={`h-4 w-4 ${getMoodColor(journalEntry.mood)}`} />
                  <span className="text-sm font-medium text-gray-900">
                    Mood: {journalEntry.mood}/10 {getMoodEmoji(journalEntry.mood)}
                  </span>
                </div>
                <span className="text-xs text-gray-500">
                  {new Date(journalEntry.created_at).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm text-gray-700 line-clamp-2">{journalEntry.entry}</p>
            </div>
          ))}
          
          {journalEntries.length === 0 && (
            <div className="text-center py-4">
              <BookOpen className="h-8 w-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-500">No journal entries yet. Start writing!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}