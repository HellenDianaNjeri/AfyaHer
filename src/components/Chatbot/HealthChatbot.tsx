import React, { useState } from 'react'
import { useTranslation } from 'react-i18next'
import { MessageCircle, Send, Bot, User } from 'lucide-react'

interface Message {
  id: string
  text: string
  sender: 'user' | 'bot'
  timestamp: Date
}

const predefinedResponses = {
  'hello': 'Hello! I\'m your AI health assistant. How can I help you today?',
  'period': 'Menstrual cycles typically last 21-35 days. If you\'re experiencing irregularities, pain, or have concerns, I recommend consulting with a healthcare professional.',
  'pcos': 'PCOS (Polycystic Ovary Syndrome) is a hormonal disorder common among women. Symptoms include irregular periods, excess hair growth, and weight gain. Please consult a doctor for proper diagnosis.',
  'pregnancy': 'If you suspect you might be pregnant, consider taking a home pregnancy test or consulting with a healthcare provider for confirmation and prenatal care.',
  'contraception': 'There are many contraceptive options available including pills, IUDs, implants, and barrier methods. Discuss with your healthcare provider to find the best option for you.',
  'emergency': 'If this is a medical emergency, please call emergency services immediately or go to the nearest hospital. For crisis support, contact the emergency hotlines available in our Emergency Support section.',
  'default': 'I understand you have health concerns. While I can provide general information, please remember that I cannot replace professional medical advice. Consider consulting with a healthcare provider for personalized care.'
}

export function HealthChatbot() {
  const { t } = useTranslation()
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: 'Hello! I\'m your AI health assistant. I can help answer general health questions and guide you to appropriate resources. How can I assist you today?',
      sender: 'bot',
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  const getBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()
    
    for (const [keyword, response] of Object.entries(predefinedResponses)) {
      if (keyword !== 'default' && lowerMessage.includes(keyword)) {
        return response
      }
    }
    
    return predefinedResponses.default
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputText,
      sender: 'user',
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate bot typing delay
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(inputText),
        sender: 'bot',
        timestamp: new Date()
      }
      
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">AI Health Assistant</h1>
        <p className="text-gray-600 mt-2">Get instant answers to your health questions</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 h-96 flex flex-col">
        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex items-start space-x-3 ${
                message.sender === 'user' ? 'flex-row-reverse space-x-reverse' : ''
              }`}
            >
              <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                message.sender === 'user' 
                  ? 'bg-pink-500 text-white' 
                  : 'bg-blue-100 text-blue-600'
              }`}>
                {message.sender === 'user' ? (
                  <User className="w-4 h-4" />
                ) : (
                  <Bot className="w-4 h-4" />
                )}
              </div>
              <div className={`flex-1 max-w-xs lg:max-w-md ${
                message.sender === 'user' ? 'text-right' : ''
              }`}>
                <div className={`rounded-lg px-4 py-2 ${
                  message.sender === 'user'
                    ? 'bg-pink-500 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}>
                  <p className="text-sm">{message.text}</p>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </p>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                <Bot className="w-4 h-4" />
              </div>
              <div className="bg-gray-100 rounded-lg px-4 py-2">
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="border-t border-gray-200 p-4">
          <div className="flex space-x-2">
            <textarea
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Type your health question here..."
              rows={1}
              className="flex-1 resize-none border border-gray-300 rounded-lg px-3 py-2 focus:ring-2 focus:ring-pink-500 focus:border-pink-500"
            />
            <button
              onClick={handleSendMessage}
              disabled={!inputText.trim()}
              className="bg-pink-500 text-white p-2 rounded-lg hover:bg-pink-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Quick Suggestions */}
      <div className="mt-6">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Common Questions</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
          {[
            'Tell me about PCOS',
            'What is a normal menstrual cycle?',
            'Contraception options',
            'Pregnancy symptoms',
            'Mental health support',
            'Emergency resources'
          ].map((suggestion) => (
            <button
              key={suggestion}
              onClick={() => setInputText(suggestion)}
              className="text-left p-3 border border-gray-200 rounded-lg hover:border-pink-300 hover:bg-pink-50 transition-colors duration-200"
            >
              <p className="text-sm text-gray-700">{suggestion}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Disclaimer */}
      <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <p className="text-sm text-yellow-800">
          <strong>Disclaimer:</strong> This AI assistant provides general health information only and cannot replace professional medical advice. 
          Always consult with qualified healthcare providers for medical diagnosis and treatment.
        </p>
      </div>
    </div>
  )
}