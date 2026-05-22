'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Heart, Users, BookOpen, Sparkles, Mic, Brain, Bell, Phone } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Welcome() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [language, setLanguage] = useState('english')

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && age) {
      const userData = {
        id: Date.now(),
        name,
        age: parseInt(age),
        language,
        joinedDate: new Date().toISOString(),
        socialHealthScore: 50,
        lastCheckin: null,
        medicines: [],
        aiCompanionEnabled: true
      }
      localStorage.setItem('saathiUser', JSON.stringify(userData))
      router.push('/dashboard')
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl w-full"
        >
          <div className="text-center mb-12">
            <motion.div 
              className="inline-flex items-center justify-center w-28 h-28 bg-gradient-to-br from-primary-500 to-orange-600 rounded-full mb-6 shadow-2xl"
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Heart className="w-14 h-14 text-white" fill="white" />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              <span className="gradient-text">Welcome to Saathi</span>
            </h1>
            <p className="text-2xl text-gray-700 leading-relaxed max-w-2xl mx-auto">
              Your AI-powered companion for meaningful connections, health tracking, and purposeful living
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <motion.div 
              className="card-glass"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-blue-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Brain className="w-7 h-7 text-blue-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Companion</h3>
                  <p className="text-gray-700">Chat with your personal AI friend anytime, get advice, and share your thoughts</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="card-glass"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-green-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Bell className="w-7 h-7 text-green-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Medicine Reminders</h3>
                  <p className="text-gray-700">Never miss your medications with smart reminders and health tracking</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="card-glass"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Mic className="w-7 h-7 text-purple-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Voice Control</h3>
                  <p className="text-gray-700">Use your voice to navigate, chat, and control the app hands-free</p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              className="card-glass"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="flex items-start space-x-4">
                <div className="w-14 h-14 bg-orange-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <Users className="w-7 h-7 text-orange-600" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Community & Purpose</h3>
                  <p className="text-gray-700">Connect with others, mentor youth, and find meaningful activities</p>
                </div>
              </div>
            </motion.div>
          </div>

          <motion.button 
            onClick={() => setStep(2)}
            className="btn-primary w-full text-xl"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Get Started
          </motion.button>
        </motion.div>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full"
      >
        <div className="text-center mb-8">
          <h2 className="text-4xl font-bold text-gray-900 mb-3">Let's Get Acquainted</h2>
          <p className="text-xl text-gray-700">Tell us a bit about yourself</p>
        </div>

        <form onSubmit={handleSubmit} className="card space-y-6">
          <div>
            <label htmlFor="name" className="block text-xl font-semibold text-gray-900 mb-3">
              What should we call you?
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field"
              placeholder="Your name"
              required
              autoFocus
            />
          </div>

          <div>
            <label htmlFor="age" className="block text-xl font-semibold text-gray-900 mb-3">
              Your age
            </label>
            <input
              id="age"
              type="number"
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="input-field"
              placeholder="Age"
              min="50"
              max="120"
              required
            />
          </div>

          <div>
            <label htmlFor="language" className="block text-xl font-semibold text-gray-900 mb-3">
              Preferred Language
            </label>
            <select
              id="language"
              value={language}
              onChange={(e) => setLanguage(e.target.value)}
              className="input-field"
            >
              <option value="english">English</option>
              <option value="hindi">हिंदी (Hindi)</option>
              <option value="tamil">தமிழ் (Tamil)</option>
              <option value="bengali">বাংলা (Bengali)</option>
              <option value="telugu">తెలుగు (Telugu)</option>
              <option value="marathi">मराठी (Marathi)</option>
            </select>
          </div>

          <div className="pt-4 space-y-3">
            <motion.button 
              type="submit" 
              className="btn-primary w-full"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Continue to Saathi
            </motion.button>
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary w-full"
            >
              Back
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  )
}
