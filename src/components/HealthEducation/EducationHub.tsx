import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { BookOpen, Heart, Baby, Flower, Shield, Brain, Search, Filter } from 'lucide-react'

const categories = [
  { id: 'menstruation', key: 'education.menstruation', icon: Heart, color: 'text-red-500 bg-red-100' },
  { id: 'fertility', key: 'education.fertility', icon: Baby, color: 'text-green-500 bg-green-100' },
  { id: 'menopause', key: 'education.menopause', icon: Flower, color: 'text-purple-500 bg-purple-100' },
  { id: 'cancer', key: 'education.cancer', icon: Shield, color: 'text-blue-500 bg-blue-100' },
  { id: 'general', key: 'education.wellness', icon: Heart, color: 'text-teal-500 bg-teal-100' },
]

const articles = [
  {
    id: 1,
    title: 'Understanding Your Menstrual Cycle',
    category: 'menstruation',
    author: 'Dr. Sarah Johnson',
    readTime: '5 min read',
    excerpt: 'Learn about the phases of your menstrual cycle and what\'s normal for your body.',
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/3786245/pexels-photo-3786245.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 2,
    title: 'PCOS: Symptoms and Management',
    category: 'fertility',
    author: 'Dr. Mary Wanjiku',
    readTime: '8 min read',
    excerpt: 'Comprehensive guide to understanding and managing Polycystic Ovary Syndrome.',
    featured: true,
    imageUrl: 'https://images.pexels.com/photos/3766211/pexels-photo-3766211.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 3,
    title: 'Preparing for Menopause',
    category: 'menopause',
    author: 'Dr. Grace Achieng',
    readTime: '6 min read',
    excerpt: 'What to expect during perimenopause and menopause, and how to manage symptoms.',
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/3768146/pexels-photo-3768146.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 4,
    title: 'Breast Cancer Prevention',
    category: 'cancer',
    author: 'Dr. Ruth Muthoni',
    readTime: '7 min read',
    excerpt: 'Essential screening guidelines and lifestyle factors for breast cancer prevention.',
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/4021775/pexels-photo-4021775.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 5,
    title: 'Managing Anxiety and Depression',
    category: 'mental_health',
    author: 'Dr. Alice Nyong',
    readTime: '10 min read',
    excerpt: 'Strategies for maintaining mental health and when to seek professional help.',
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/3760275/pexels-photo-3760275.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
  {
    id: 6,
    title: 'Nutrition for Women\'s Health',
    category: 'general',
    author: 'Dr. Faith Kiprotich',
    readTime: '6 min read',
    excerpt: 'Essential nutrients and dietary tips for optimal women\'s health at every age.',
    featured: false,
    imageUrl: 'https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg?auto=compress&cs=tinysrgb&w=400'
  },
]

export function EducationHub() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [searchTerm, setSearchTerm] = useState('')

  const filteredArticles = articles.filter(article => {
    const matchesCategory = selectedCategory === 'all' || article.category === selectedCategory
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredArticles = articles.filter(article => article.featured)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('education.title')}</h1>
        <p className="text-gray-600 mt-2">{t('education.subtitle')}</p>
      </div>

      {/* Search and Filter */}
      <div className="mb-8 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
          <input
            type="text"
            placeholder={t('common.search') + ' articles...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-400" />
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
          >
            <option value="all">All Categories</option>
            {categories.map(category => (
              <option key={category.id} value={category.id}>{t(category.key)}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Categories */}
      <div className="mb-8">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse by Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((category) => {
            const Icon = category.icon
            return (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  selectedCategory === category.id
                    ? 'border-pink-500 bg-pink-50'
                    : 'border-gray-200 hover:border-pink-300 hover:bg-pink-50'
                }`}
              >
                <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2`}>
                  <Icon className="h-6 w-6" />
                </div>
                <p className="text-sm font-medium text-gray-900 text-center">{t(category.key)}</p>
              </button>
            )
          })}
        </div>
      </div>

      {/* Featured Articles */}
      {selectedCategory === 'all' && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredArticles.map((article) => (
              <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
                <img
                  src={article.imageUrl}
                  alt={article.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-6">
                  <div className="flex items-center mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
                      {categories.find(cat => cat.id === article.category)?.name}
                    </span>
                    <span className="text-gray-500 text-sm ml-2">{article.readTime}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{article.excerpt}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500">By {article.author}</p>
                    <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                      Read More
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All Articles */}
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-4">
          {selectedCategory === 'all' ? 'All Articles' : `${t(categories.find(cat => cat.id === selectedCategory)?.key || '')} Articles`}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredArticles.map((article) => (
            <div key={article.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow duration-200">
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover"
              />
              <div className="p-4">
                <div className="flex items-center mb-2">
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
                    Featured
                  </span>
                  <span className="text-gray-500 text-sm ml-2">{article.readTime}</span>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{article.title}</h3>
                <p className="text-gray-600 text-sm mb-3">{article.excerpt}</p>
                <div className="flex items-center justify-between">
                  <p className="text-sm text-gray-500">By {article.author}</p>
                  <button className="text-pink-600 hover:text-pink-700 text-sm font-medium">
                    Read More
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {filteredArticles.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-500">No articles found matching your search criteria.</p>
        </div>
      )}
    </div>
  )
}