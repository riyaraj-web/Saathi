'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, MessageCircle, BookOpen, Music, Palette, Coffee, Heart } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Community() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [selectedCircle, setSelectedCircle] = useState(null)

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      router.push('/welcome')
    }
  }, [router])

  if (!user) return null

  const circles = [
    {
      id: 1,
      name: 'Book Lovers',
      icon: BookOpen,
      members: 234,
      description: 'Discuss classic literature and share book recommendations',
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      activeNow: 12
    },
    {
      id: 2,
      name: 'Music Memories',
      icon: Music,
      members: 189,
      description: 'Share songs that defined our generation',
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      activeNow: 8
    },
    {
      id: 3,
      name: 'Art & Craft',
      icon: Palette,
      members: 156,
      description: 'Share your creative projects and get inspired',
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      activeNow: 15
    },
    {
      id: 4,
      name: 'Morning Tea Chat',
      icon: Coffee,
      members: 312,
      description: 'Daily morning conversations about life',
      color: 'bg-warm-200',
      iconColor: 'text-primary-600',
      activeNow: 24
    }
  ]

  const recentMessages = [
    {
      id: 1,
      circle: 'Book Lovers',
      user: 'Ramesh Kumar',
      message: 'Just finished reading "The Guide" by R.K. Narayan again. Still as beautiful as the first time!',
      time: '10 minutes ago',
      replies: 5
    },
    {
      id: 2,
      circle: 'Morning Tea Chat',
      user: 'Lakshmi Iyer',
      message: 'Good morning everyone! The jasmine in my garden bloomed today 🌸',
      time: '25 minutes ago',
      replies: 12
    },
    {
      id: 3,
      circle: 'Music Memories',
      user: 'Suresh Patel',
      message: 'Does anyone remember the song "Pyar Hua Ikrar Hua"? Takes me back to my college days...',
      time: '1 hour ago',
      replies: 18
    }
  ]

  if (selectedCircle) {
    const circle = circles.find(c => c.id === selectedCircle)
    const Icon = circle.icon

    return (
      <div className="min-h-screen bg-warm-50 pb-20">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setSelectedCircle(null)}
              className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <div className="flex items-center space-x-4">
              <div className={`w-16 h-16 ${circle.color} rounded-2xl flex items-center justify-center`}>
                <Icon className={`w-8 h-8 ${circle.iconColor}`} />
              </div>
              <div>
                <h1 className="text-3xl font-bold">{circle.name}</h1>
                <p className="text-primary-100">{circle.members} members • {circle.activeNow} active now</p>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          {/* New Message */}
          <div className="card">
            <textarea
              className="input-field min-h-[120px]"
              placeholder="Share your thoughts with the community..."
            />
            <button className="btn-primary w-full mt-4">
              Post Message
            </button>
          </div>

          {/* Messages */}
          <div className="space-y-4">
            {recentMessages
              .filter(m => m.circle === circle.name)
              .map((message) => (
                <div key={message.id} className="card">
                  <div className="flex items-start space-x-4 mb-4">
                    <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-primary-600" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-lg font-semibold text-gray-900">{message.user}</h4>
                        <span className="text-sm text-gray-500">{message.time}</span>
                      </div>
                      <p className="text-lg text-gray-700 leading-relaxed">{message.message}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-6 pt-4 border-t border-gray-200">
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                      <Heart className="w-6 h-6" />
                      <span className="text-lg">Like</span>
                    </button>
                    <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                      <MessageCircle className="w-6 h-6" />
                      <span className="text-lg">{message.replies} replies</span>
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50 pb-20">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-3xl font-bold mb-2">Community Circles</h1>
          <p className="text-primary-100 text-lg">Connect with people who share your interests</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Info Card */}
        <div className="card bg-gradient-to-br from-warm-100 to-primary-100">
          <div className="flex items-start space-x-4">
            <Users className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Find Your Circle</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join conversations with people who share your passions. Every voice matters, 
                and your experiences enrich our community.
              </p>
            </div>
          </div>
        </div>

        {/* Circles */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Available Circles</h2>
          {circles.map((circle) => {
            const Icon = circle.icon
            return (
              <button
                key={circle.id}
                onClick={() => setSelectedCircle(circle.id)}
                className="card hover:shadow-xl transition-shadow text-left w-full"
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${circle.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${circle.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{circle.name}</h3>
                    <p className="text-gray-700 mb-3">{circle.description}</p>
                    <div className="flex items-center space-x-4 text-sm text-gray-600">
                      <span>{circle.members} members</span>
                      <span>•</span>
                      <span className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                        <span>{circle.activeNow} active now</span>
                      </span>
                    </div>
                  </div>
                </div>
              </button>
            )
          })}
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Conversations</h2>
          {recentMessages.map((message) => (
            <div key={message.id} className="card">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <Users className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900">{message.user}</h4>
                      <p className="text-sm text-gray-500">{message.circle} • {message.time}</p>
                    </div>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed mb-3">{message.message}</p>
                  <button className="text-primary-600 hover:text-primary-700 font-medium">
                    View {message.replies} replies →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
