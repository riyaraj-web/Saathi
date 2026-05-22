import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ArrowLeft, TrendingUp, TrendingDown, Minus, Heart, Calendar, Award } from 'lucide-react'

const SocialHealth = ({ user }) => {
  const navigate = useNavigate()
  const location = useLocation()
  const [showCelebration, setShowCelebration] = useState(false)

  useEffect(() => {
    if (location.state?.justCompleted) {
      setShowCelebration(true)
      setTimeout(() => setShowCelebration(false), 3000)
    }
  }, [location])

  const getScoreColor = (score) => {
    if (score >= 70) return 'text-green-600'
    if (score >= 40) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getScoreBgColor = (score) => {
    if (score >= 70) return 'bg-green-100'
    if (score >= 40) return 'bg-yellow-100'
    return 'bg-red-100'
  }

  const getScoreMessage = (score) => {
    if (score >= 70) return {
      title: 'Thriving!',
      message: 'Your social connections are strong and meaningful. Keep nurturing these relationships.',
      icon: TrendingUp
    }
    if (score >= 40) return {
      title: 'Growing',
      message: 'You\'re making progress. Let\'s explore more ways to deepen your connections.',
      icon: Minus
    }
    return {
      title: 'Let\'s Connect',
      message: 'We\'re here to help you build meaningful connections. Small steps make a big difference.',
      icon: TrendingDown
    }
  }

  const scoreInfo = getScoreMessage(user.socialHealthScore)
  const ScoreIcon = scoreInfo.icon

  // Mock historical data - in real app, this would come from backend
  const weeklyScores = [45, 48, 52, 55, 50]

  return (
    <div className="min-h-screen bg-warm-50 pb-20">
      {/* Celebration Overlay */}
      {showCelebration && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="card max-w-md animate-bounce">
            <div className="text-center">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Award className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-3">Well Done!</h2>
              <p className="text-xl text-gray-700">
                Thank you for checking in today. Every step counts!
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-3xl font-bold mb-2">Your Social Wellness</h1>
          <p className="text-primary-100 text-lg">Understanding your connection journey</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Current Score */}
        <div className="card">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <div className={`w-20 h-20 ${getScoreBgColor(user.socialHealthScore)} rounded-2xl flex items-center justify-center`}>
                <Heart className={`w-10 h-10 ${getScoreColor(user.socialHealthScore)}`} fill="currentColor" />
              </div>
              <div>
                <div className="text-5xl font-bold text-gray-900">{user.socialHealthScore}</div>
                <div className="text-gray-600 text-lg">Social Health Score</div>
              </div>
            </div>
            <ScoreIcon className={`w-12 h-12 ${getScoreColor(user.socialHealthScore)}`} />
          </div>

          <div className={`p-6 ${getScoreBgColor(user.socialHealthScore)} rounded-2xl`}>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{scoreInfo.title}</h3>
            <p className="text-lg text-gray-700 leading-relaxed">{scoreInfo.message}</p>
          </div>
        </div>

        {/* What This Means */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">What This Score Means</h2>
          <div className="space-y-4 text-lg text-gray-700">
            <p>
              Your Social Health Score reflects the quality and frequency of your social connections, 
              sense of purpose, and emotional well-being.
            </p>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <p><strong>70-100:</strong> Strong social connections and engagement</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <p><strong>40-69:</strong> Moderate connections with room to grow</p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-primary-500 rounded-full mt-2 flex-shrink-0" />
                <p><strong>0-39:</strong> Let's work together to build connections</p>
              </div>
            </div>
          </div>
        </div>

        {/* Weekly Trend */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Your Progress This Week</h2>
          <div className="flex items-end justify-between h-48 space-x-2">
            {weeklyScores.map((score, index) => (
              <div key={index} className="flex-1 flex flex-col items-center">
                <div className="w-full bg-primary-200 rounded-t-lg relative" style={{ height: `${score}%` }}>
                  <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-sm font-semibold text-gray-700">
                    {score}
                  </div>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  {['Mon', 'Tue', 'Wed', 'Thu', 'Fri'][index]}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recommendations */}
        <div className="card bg-gradient-to-br from-primary-50 to-warm-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Ways to Improve</h2>
          <div className="space-y-4">
            <button 
              onClick={() => navigate('/community')}
              className="w-full p-5 bg-white rounded-xl text-left hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Join a Community Circle</h3>
              <p className="text-gray-700">Connect with others who share your interests</p>
            </button>
            <button 
              onClick={() => navigate('/activities')}
              className="w-full p-5 bg-white rounded-xl text-left hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Try a New Activity</h3>
              <p className="text-gray-700">Engage in purposeful activities that bring joy</p>
            </button>
            <button 
              onClick={() => navigate('/family')}
              className="w-full p-5 bg-white rounded-xl text-left hover:shadow-md transition-shadow"
            >
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Reach Out to Family</h3>
              <p className="text-gray-700">Share an update or memory with loved ones</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SocialHealth
