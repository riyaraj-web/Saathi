'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Smile, Meh, Frown, Users, Phone, Heart, Home } from 'lucide-react'
import { motion } from 'framer-motion'

export default function DailyCheckin() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [step, setStep] = useState(1)
  const [responses, setResponses] = useState({
    mood: null,
    socialInteractions: null,
    phoneCall: null,
    feltUseful: null,
    feltLonely: null
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      router.push('/welcome')
    }
  }, [router])

  if (!user) return null

  const questions = [
    {
      id: 'mood',
      question: 'How are you feeling today?',
      icon: Smile,
      options: [
        { value: 'great', label: 'Wonderful', icon: '😊', score: 10 },
        { value: 'good', label: 'Good', icon: '🙂', score: 7 },
        { value: 'okay', label: 'Okay', icon: '😐', score: 5 },
        { value: 'low', label: 'Not great', icon: '😔', score: 2 }
      ]
    },
    {
      id: 'socialInteractions',
      question: 'Did you have a meaningful conversation today?',
      icon: Users,
      options: [
        { value: 'multiple', label: 'Yes, several', score: 10 },
        { value: 'one', label: 'Yes, one', score: 7 },
        { value: 'brief', label: 'Just briefly', score: 4 },
        { value: 'none', label: 'Not yet', score: 0 }
      ]
    },
    {
      id: 'phoneCall',
      question: 'Did you speak with family or friends?',
      icon: Phone,
      options: [
        { value: 'yes-long', label: 'Yes, had a good chat', score: 10 },
        { value: 'yes-short', label: 'Yes, briefly', score: 6 },
        { value: 'no-reached', label: 'No, but I reached out', score: 4 },
        { value: 'no', label: 'Not today', score: 0 }
      ]
    },
    {
      id: 'feltUseful',
      question: 'Did you do something that made you feel useful or valued?',
      icon: Heart,
      options: [
        { value: 'yes-very', label: 'Yes, definitely', score: 10 },
        { value: 'yes-somewhat', label: 'Somewhat', score: 6 },
        { value: 'not-sure', label: 'Not sure', score: 3 },
        { value: 'no', label: 'Not really', score: 0 }
      ]
    },
    {
      id: 'feltLonely',
      question: 'How connected did you feel today?',
      icon: Home,
      options: [
        { value: 'very-connected', label: 'Very connected', score: 10 },
        { value: 'somewhat', label: 'Somewhat connected', score: 6 },
        { value: 'little-lonely', label: 'A bit lonely', score: 3 },
        { value: 'very-lonely', label: 'Very lonely', score: 0 }
      ]
    }
  ]

  const currentQuestion = questions[step - 1]

  const handleResponse = (value, score) => {
    const newResponses = { ...responses, [currentQuestion.id]: { value, score } }
    setResponses(newResponses)

    if (step < questions.length) {
      setStep(step + 1)
    } else {
      // Calculate social health score
      const totalScore = Object.values(newResponses).reduce((sum, r) => sum + r.score, 0)
      const maxScore = questions.reduce((sum, q) => sum + 10, 0)
      const socialHealthScore = Math.round((totalScore / maxScore) * 100)

      // Update user data
      const updatedUser = {
        ...user,
        socialHealthScore,
        lastCheckin: new Date().toISOString()
      }
      localStorage.setItem('invisibleElderUser', JSON.stringify(updatedUser))

      // Navigate to results
      router.push('/social-health')
    }
  }

  const Icon = currentQuestion.icon

  return (
    <div className="min-h-screen bg-warm-50 p-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button 
            onClick={() => step > 1 ? setStep(step - 1) : router.push('/dashboard')}
            className="p-3 hover:bg-white rounded-full transition-colors"
          >
            <ArrowLeft className="w-7 h-7 text-gray-700" />
          </button>
          <div className="text-lg font-semibold text-gray-600">
            Question {step} of {questions.length}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="h-3 bg-gray-200 rounded-full overflow-hidden">
            <div 
              className="h-full bg-primary-500 transition-all duration-300 rounded-full"
              style={{ width: `${(step / questions.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Question */}
        <div className="card mb-8">
          <div className="flex items-center space-x-4 mb-8">
            <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
              <Icon className="w-8 h-8 text-primary-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
              {currentQuestion.question}
            </h2>
          </div>

          {/* Options */}
          <div className="space-y-4">
            {currentQuestion.options.map((option) => (
              <button
                key={option.value}
                onClick={() => handleResponse(option.value, option.score)}
                className="w-full p-6 text-left bg-white hover:bg-primary-50 border-2 border-gray-200 hover:border-primary-400 rounded-2xl transition-all text-lg font-medium text-gray-900 flex items-center justify-between group"
              >
                <span className="flex items-center space-x-4">
                  {option.icon && <span className="text-3xl">{option.icon}</span>}
                  <span>{option.label}</span>
                </span>
                <div className="w-6 h-6 rounded-full border-2 border-gray-300 group-hover:border-primary-500 transition-colors" />
              </button>
            ))}
          </div>
        </div>

        {/* Encouragement */}
        <div className="text-center text-gray-600 text-lg">
          <p>Your honest responses help us support you better</p>
        </div>
      </div>
    </div>
  )
}
