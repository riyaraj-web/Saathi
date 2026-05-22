import React, { useState } from 'react'
import { Heart, Users, BookOpen, Sparkles } from 'lucide-react'

const Welcome = ({ onLogin }) => {
  const [name, setName] = useState('')
  const [age, setAge] = useState('')
  const [step, setStep] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (name && age) {
      const userData = {
        id: Date.now(),
        name,
        age: parseInt(age),
        joinedDate: new Date().toISOString(),
        socialHealthScore: 50, // Starting baseline
        lastCheckin: null
      }
      onLogin(userData)
    }
  }

  if (step === 1) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-warm-50 via-primary-50 to-warm-100 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 bg-primary-500 rounded-full mb-6 shadow-xl">
              <Heart className="w-12 h-12 text-white" fill="white" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Welcome to Your Circle
            </h1>
            <p className="text-xl text-gray-700 leading-relaxed max-w-xl mx-auto mb-8">
              A space where your stories matter, your wisdom is valued, and connection is just a tap away.
            </p>
            <div className="mx-auto w-full max-w-3xl overflow-hidden rounded-3xl shadow-2xl bg-gray-100">
              <img
                src="/assets/welcome-hero.jpg"
                alt="Elderly community connection"
                className="w-full h-72 object-cover"
                loading="lazy"
              />
            </div>
          </div>

          <div className="card space-y-6 mb-8">
            <div className="flex items-start space-x-4 p-4 bg-warm-50 rounded-xl">
              <Users className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Stay Connected</h3>
                <p className="text-gray-700">Join communities that share your interests and experiences</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-warm-50 rounded-xl">
              <BookOpen className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Share Your Story</h3>
                <p className="text-gray-700">Your memories and wisdom deserve to be heard and cherished</p>
              </div>
            </div>

            <div className="flex items-start space-x-4 p-4 bg-warm-50 rounded-xl">
              <Sparkles className="w-8 h-8 text-primary-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Find Purpose</h3>
                <p className="text-gray-700">Engage in meaningful activities that bring joy and fulfillment</p>
              </div>
            </div>
          </div>

          <button 
            onClick={() => setStep(2)}
            className="btn-primary w-full"
          >
            Get Started
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-warm-50 via-primary-50 to-warm-100 flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Let's Get Acquainted</h2>
          <p className="text-lg text-gray-700">Tell us a bit about yourself</p>
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

          <div className="pt-4 space-y-3">
            <button type="submit" className="btn-primary w-full">
              Continue
            </button>
            <button 
              type="button"
              onClick={() => setStep(1)}
              className="btn-secondary w-full"
            >
              Back
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default Welcome
