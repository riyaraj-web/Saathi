'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Users, Phone, Video, MessageCircle, Heart, Send, UserPlus } from 'lucide-react'
import { motion } from 'framer-motion'

export default function FamilyConnect() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [message, setMessage] = useState('')
  const [familyMembers] = useState([
    {
      id: 1,
      name: 'Priya (Daughter)',
      lastContact: '2 days ago',
      avatar: '👩',
      relationship: 'Daughter'
    },

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      router.push('/welcome')
    }
  }, [router])

  if (!user) return null
    {
      id: 2,
      name: 'Arjun (Son)',
      lastContact: '5 days ago',
      avatar: '👨',
      relationship: 'Son'
    },
    {
      id: 3,
      name: 'Ananya (Granddaughter)',
      lastContact: '1 week ago',
      avatar: '👧',
      relationship: 'Granddaughter'
    }
  ])

  const [updates] = useState([
    {
      id: 1,
      from: 'Priya',
      message: 'Mom, thinking of you! How was your day?',
      time: '2 days ago',
      type: 'message'
    },
    {
      id: 2,
      from: 'Ananya',
      message: 'Nani, I got an A in my math test! Thank you for helping me study!',
      time: '3 days ago',
      type: 'achievement'
    }
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      // In real app, send message to family
      alert('Message sent to your family!')
      setMessage('')
    }
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
          <h1 className="text-3xl font-bold mb-2">Family Bridge</h1>
          <p className="text-primary-100 text-lg">Stay close to the ones you love</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Info Card */}
        <div className="card bg-gradient-to-br from-warm-100 to-primary-100">
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 text-primary-600 flex-shrink-0" fill="currentColor" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Family Cares</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Share updates, memories, and stay connected with your loved ones. 
                They want to hear from you!
              </p>
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-2 gap-4">
          <button className="card hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center">
                <Phone className="w-8 h-8 text-green-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Call Family</h3>
                <p className="text-sm text-gray-600">Start a voice call</p>
              </div>
            </div>
          </button>

          <button className="card hover:shadow-xl transition-shadow">
            <div className="flex flex-col items-center space-y-3 text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center">
                <Video className="w-8 h-8 text-blue-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-gray-900">Video Call</h3>
                <p className="text-sm text-gray-600">See their faces</p>
              </div>
            </div>
          </button>
        </div>

        {/* Family Members */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">Your Family</h2>
            <button className="flex items-center space-x-2 text-primary-600 hover:text-primary-700 font-medium">
              <UserPlus className="w-5 h-5" />
              <span>Add Member</span>
            </button>
          </div>

          {familyMembers.map((member) => (
            <div key={member.id} className="card">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center text-3xl">
                    {member.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900">{member.name}</h3>
                    <p className="text-gray-600">Last contact: {member.lastContact}</p>
                  </div>
                </div>
                <div className="flex space-x-2">
                  <button className="p-3 bg-green-100 hover:bg-green-200 rounded-full transition-colors">
                    <Phone className="w-6 h-6 text-green-600" />
                  </button>
                  <button className="p-3 bg-blue-100 hover:bg-blue-200 rounded-full transition-colors">
                    <MessageCircle className="w-6 h-6 text-blue-600" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Send Update */}
        <div className="card">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Share an Update</h3>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="input-field min-h-[120px] mb-4"
            placeholder="Tell your family what you've been up to today..."
          />
          <button 
            onClick={handleSendMessage}
            className="btn-primary w-full flex items-center justify-center space-x-2"
          >
            <Send className="w-6 h-6" />
            <span>Send to Family</span>
          </button>
        </div>

        {/* Recent Updates */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Recent Updates</h2>
          {updates.map((update) => (
            <div key={update.id} className="card bg-warm-50">
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-200 rounded-full flex items-center justify-center flex-shrink-0">
                  <MessageCircle className="w-6 h-6 text-primary-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-lg font-semibold text-gray-900">{update.from}</h4>
                    <span className="text-sm text-gray-500">{update.time}</span>
                  </div>
                  <p className="text-lg text-gray-700 leading-relaxed">{update.message}</p>
                  <button className="mt-3 text-primary-600 hover:text-primary-700 font-medium">
                    Reply →
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gentle Reminder */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 flex-shrink-0" fill="white" />
            <div>
              <h3 className="text-xl font-bold mb-2">They Miss You</h3>
              <p className="text-lg text-primary-100 leading-relaxed">
                Your family thinks about you every day. A simple message or call 
                can brighten their day and strengthen your bond.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
