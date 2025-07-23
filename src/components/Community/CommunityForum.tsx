import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageSquare, Users, Heart, Reply, ThumbsUp, Flag } from 'lucide-react'

const forumCategories = [
  { id: 'general', name: 'General Discussion', color: 'bg-blue-100 text-blue-800' },
  { id: 'menstruation', name: 'Menstrual Health', color: 'bg-red-100 text-red-800' },
  { id: 'fertility', name: 'Fertility & Pregnancy', color: 'bg-green-100 text-green-800' },
  { id: 'mental_health', name: 'Mental Health', color: 'bg-purple-100 text-purple-800' },
  { id: 'relationships', name: 'Relationships', color: 'bg-pink-100 text-pink-800' },
  { id: 'support', name: 'Support & Encouragement', color: 'bg-yellow-100 text-yellow-800' }
]

const posts = [
  {
    id: 1,
    title: 'Dealing with irregular periods - anyone else?',
    category: 'menstruation',
    author: 'Anonymous User',
    timestamp: '2 hours ago',
    content: 'I\'ve been having irregular periods for the past few months. Has anyone experienced this? Looking for advice and support.',
    likes: 15,
    replies: 8,
    isLiked: false
  },
  {
    id: 2,
    title: 'First time expecting - feeling overwhelmed',
    category: 'fertility',
    author: 'Anonymous User',
    timestamp: '5 hours ago',
    content: 'Just found out I\'m pregnant with my first child. Feeling excited but also very overwhelmed. Any advice from experienced moms?',
    likes: 23,
    replies: 12,
    isLiked: true
  },
  {
    id: 3,
    title: 'Managing anxiety during work stress',
    category: 'mental_health',
    author: 'Anonymous User',
    timestamp: '1 day ago',
    content: 'Work has been incredibly stressful lately and it\'s affecting my mental health. How do you all cope with work-related anxiety?',
    likes: 18,
    replies: 15,
    isLiked: false
  },
  {
    id: 4,
    title: 'Self-care Sunday routines',
    category: 'support',
    author: 'Anonymous User',
    timestamp: '2 days ago',
    content: 'What does your self-care Sunday look like? I\'m trying to establish a routine that helps me recharge for the week ahead.',
    likes: 31,
    replies: 22,
    isLiked: true
  }
]

export function CommunityForum() {
  const { t } = useTranslation()
  const [selectedCategory, setSelectedCategory] = useState<string>('all')
  const [showNewPostForm, setShowNewPostForm] = useState(false)
  const [newPost, setNewPost] = useState({ title: '', category: 'general', content: '' })

  const filteredPosts = posts.filter(post => 
    selectedCategory === 'all' || post.category === selectedCategory
  )

  const handleSubmitPost = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle new post submission
    console.log('New post:', newPost)
    setShowNewPostForm(false)
    setNewPost({ title: '', category: 'general', content: '' })
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('community.title')}</h1>
        <p className="text-gray-600 mt-2">{t('community.subtitle')}</p>
      </div>

      {/* Forum Guidelines */}
      <div className="bg-pink-50 border border-pink-200 rounded-lg p-4 mb-8">
        <h3 className="text-sm font-medium text-pink-800 mb-2">Community Guidelines</h3>
        <p className="text-sm text-pink-700">
          This is a safe, anonymous space for women to support each other. Please be respectful, 
          kind, and remember that everyone's experience is valid. No medical advice should be given - 
          always encourage consulting healthcare providers.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="lg:w-1/4">
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <Users className="h-5 w-5 text-pink-500" />
              <h3 className="font-semibold text-gray-900">Community Stats</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Active Members</span>
                <span className="font-medium">2,847</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Posts Today</span>
                <span className="font-medium">23</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Online Now</span>
                <span className="font-medium">156</span>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
            <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
            <div className="space-y-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                  selectedCategory === 'all' 
                    ? 'bg-pink-100 text-pink-800' 
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                All Discussions
              </button>
              {forumCategories.map(category => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                    selectedCategory === category.id 
                      ? category.color 
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:w-3/4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">
              {selectedCategory === 'all' ? 'All Discussions' : 
               forumCategories.find(cat => cat.id === selectedCategory)?.name}
            </h2>
            <button
              onClick={() => setShowNewPostForm(!showNewPostForm)}
              className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
            >
              {t('community.newPost')}
            </button>
          </div>

          {/* New Post Form */}
          {showNewPostForm && (
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Create New Post</h3>
              <form onSubmit={handleSubmitPost} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                  <input
                    type="text"
                    value={newPost.title}
                    onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="What would you like to discuss?"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newPost.category}
                    onChange={(e) => setNewPost({ ...newPost, category: e.target.value })}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                  >
                    {forumCategories.map(category => (
                      <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                  <textarea
                    value={newPost.content}
                    onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
                    rows={4}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
                    placeholder="Share your thoughts, experiences, or questions..."
                    required
                  />
                </div>
                <div className="flex space-x-3">
                  <button
                    type="submit"
                    className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition-colors duration-200 font-medium"
                  >
                    Post
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowNewPostForm(false)}
                    className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors duration-200 font-medium"
                  >
                    {t('common.cancel')}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Posts */}
          <div className="space-y-6">
            {filteredPosts.map(post => (
              <div key={post.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      forumCategories.find(cat => cat.id === post.category)?.color
                    }`}>
                      {forumCategories.find(cat => cat.id === post.category)?.name}
                    </span>
                  </div>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Flag className="w-4 h-4" />
                  </button>
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{post.title}</h3>
                <p className="text-gray-600 mb-4">{post.content}</p>
                
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4 text-sm text-gray-500">
                    <span>{post.author}</span>
                    <span>{post.timestamp}</span>
                  </div>
                  
                  <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-pink-600 transition-colors duration-200">
                      <ThumbsUp className={`w-4 h-4 ${post.isLiked ? 'fill-current text-pink-600' : ''}`} />
                      <span>{post.likes}</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-500 hover:text-blue-600 transition-colors duration-200">
                      <Reply className="w-4 h-4" />
                      <span>{post.replies}</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {filteredPosts.length === 0 && (
            <div className="text-center py-12">
              <MessageSquare className="h-12 w-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">No posts found in this category.</p>
              <button
                onClick={() => setShowNewPostForm(true)}
                className="mt-2 text-pink-600 hover:text-pink-700 font-medium"
              >
                Be the first to start a discussion!
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}