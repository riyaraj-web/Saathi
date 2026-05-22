import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { 
  Heart, 
  MessageCircle, 
  BookOpen, 
  Users, 
  Activity, 
  UserCircle,
  TrendingUp,
  Calendar,
  Sparkles,
  Pill,
  Bot
} from 'lucide-react'
import { format, isToday } from 'date-fns'

const Dashboard = ({ user, onLogout }) => {
  const navigate = useNavigate()
  const [greeting, setGreeting] = useState('')
  const [checkedInToday, setCheckedInToday] = useState(false)

  useEffect(() => {
    const hour = new Date().getHours()
    if (hour < 12) setGreeting('Good Morning')
    else if (hour < 17) setGreeting('Good Afternoon')
    else setGreeting('Good Evening')

    // Check if user has checked in today
    if (user.lastCheckin && isToday(new Date(user.lastCheckin))) {
      setCheckedInToday(true)
    }
  }, [user])

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 70) return 'You\'re doing wonderfully!'
    if (score >= 40) return 'Let\'s stay connected today'
    return 'We\'re here for you'
  }

  return (
    <div className="min-h-screen bg-warm-50 pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{greeting}, {user.name}!</h1>
              <p className="text-primary-100 text-lg">{format(new Date(), 'EEEE, MMMM d')}</p>
            </div>
            <button 
              onClick={onLogout}
              className="p-3 hover:bg-primary-600 rounded-full transition-colors"
            >
              <UserCircle className="w-8 h-8" />
            </button>
          </div>

          {/* Social Health Score */}
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Heart className="w-7 h-7" fill="white" />
                <span className="text-xl font-semibold">Your Social Wellness</span>
              </div>
              <button 
                onClick={() => navigate('/social-health')}
                className="text-sm underline hover:text-primary-100"
              >
                View Details
              </button>
            </div>
            <div className="flex items-end space-x-4">
              <div className="text-5xl font-bold">{user.socialHealthScore}</div>
              <div className="text-lg pb-2 text-primary-100">/ 100</div>
            </div>
            <p className="text-primary-100 mt-2 text-lg">{getScoreMessage(user.socialHealthScore)}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Daily Check-in Prompt */}
        {!checkedInToday && (
          <div className="card bg-gradient-to-r from-warm-100 to-primary-100 border-primary-300">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 bg-primary-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Daily Check-in</h3>
                  <p className="text-gray-700">How are you feeling today?</p>
                </div>
              </div>
              <button 
                onClick={() => navigate('/checkin')}
                className="btn-primary"
              >
                Start
              </button>
            </div>
          </div>
        )}

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button 
            onClick={() => navigate('/ai-companion')}
            className="card hover:shadow-xl transition-shadow text-left bg-gradient-to-br from-purple-50 to-blue-50 border-purple-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-purple-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Bot className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">AI Companion</h3>
                <p className="text-gray-600">Chat anytime, I'm always here to listen</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/medicine')}
            className="card hover:shadow-xl transition-shadow text-left bg-gradient-to-br from-green-50 to-teal-50 border-green-200"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Pill className="w-7 h-7 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Medicine Reminder</h3>
                <p className="text-gray-600">Never miss your medication</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/community')}
            className="card hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Users className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Community Circles</h3>
                <p className="text-gray-600">Join conversations with like-minded friends</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/memories')}
            className="card hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-warm-200 rounded-2xl flex items-center justify-center flex-shrink-0">
                <BookOpen className="w-7 h-7 text-primary-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Story</h3>
                <p className="text-gray-600">Record memories and wisdom to share</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/activities')}
            className="card hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <Sparkles className="w-7 h-7 text-green-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Purposeful Activities</h3>
                <p className="text-gray-600">Find meaningful ways to contribute</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => navigate('/family')}
            className="card hover:shadow-xl transition-shadow text-left"
          >
            <div className="flex items-start space-x-4">
              <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                <MessageCircle className="w-7 h-7 text-blue-600" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">Family Bridge</h3>
                <p className="text-gray-600">Stay connected with loved ones</p>
              </div>
            </div>
          </button>
        </div>

        {/* Today's Inspiration */}
        <div className="card bg-gradient-to-br from-primary-50 to-warm-100">
          <div className="flex items-start space-x-4">
            <Sparkles className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Today's Thought</h3>
              <p className="text-lg text-gray-700 italic leading-relaxed">
                "The purpose of life is not to be happy. It is to be useful, to be honorable, 
                to be compassionate, to have it make some difference that you have lived and lived well."
              </p>
              <p className="text-gray-600 mt-2">— Ralph Waldo Emerson</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard
