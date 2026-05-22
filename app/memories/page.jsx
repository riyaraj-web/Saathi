'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mic, Camera, BookOpen, Heart, Share2, Play } from 'lucide-react'
import { motion } from 'framer-motion'

export default function MemorySharing() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [memories, setMemories] = useState([
    {
      id: 1,
      title: 'My First Job',
      type: 'text',
      content: 'I remember my first day at the textile mill in 1965...',
      date: '2024-04-28',
      likes: 12
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
      title: 'Family Recipe',
      type: 'audio',
      content: 'Traditional biryani recipe passed down from my mother',
      date: '2024-04-25',
      likes: 24
    }
  ])
  const [showNewMemory, setShowNewMemory] = useState(false)
  const [newMemory, setNewMemory] = useState({ title: '', content: '', type: 'text' })

  const handleSaveMemory = () => {
    if (newMemory.title && newMemory.content) {
      const memory = {
        id: Date.now(),
        ...newMemory,
        date: new Date().toISOString().split('T')[0],
        likes: 0
      }
      setMemories([memory, ...memories])
      setNewMemory({ title: '', content: '', type: 'text' })
      setShowNewMemory(false)
    }
  }

  if (showNewMemory) {
    return (
      <div className="min-h-screen bg-warm-50 pb-20">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setShowNewMemory(false)}
              className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <h1 className="text-3xl font-bold">Share a Memory</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
          <div className="card space-y-6">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                What's this memory about?
              </label>
              <input
                type="text"
                value={newMemory.title}
                onChange={(e) => setNewMemory({ ...newMemory, title: e.target.value })}
                className="input-field"
                placeholder="e.g., My wedding day, A childhood adventure"
              />
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                Tell your story
              </label>
              <textarea
                value={newMemory.content}
                onChange={(e) => setNewMemory({ ...newMemory, content: e.target.value })}
                className="input-field min-h-[200px]"
                placeholder="Share the details, emotions, and moments that made this memory special..."
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <button className="p-6 bg-primary-50 hover:bg-primary-100 rounded-xl flex flex-col items-center space-y-2 transition-colors">
                <Mic className="w-8 h-8 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Record Audio</span>
              </button>
              <button className="p-6 bg-primary-50 hover:bg-primary-100 rounded-xl flex flex-col items-center space-y-2 transition-colors">
                <Camera className="w-8 h-8 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Add Photo</span>
              </button>
              <button className="p-6 bg-primary-50 hover:bg-primary-100 rounded-xl flex flex-col items-center space-y-2 transition-colors">
                <BookOpen className="w-8 h-8 text-primary-600" />
                <span className="text-sm font-medium text-gray-700">Text Only</span>
              </button>
            </div>

            <button onClick={handleSaveMemory} className="btn-primary w-full">
              Save Memory
            </button>
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
          <h1 className="text-3xl font-bold mb-2">Your Stories</h1>
          <p className="text-primary-100 text-lg">Share your wisdom and experiences</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Info Card */}
        <div className="card bg-gradient-to-br from-warm-100 to-primary-100">
          <div className="flex items-start space-x-4">
            <BookOpen className="w-8 h-8 text-primary-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your Stories Matter</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                Every experience you've lived, every lesson you've learned is valuable. 
                Share your memories with family and the community. Your wisdom deserves to be heard.
              </p>
            </div>
          </div>
        </div>

        {/* New Memory Button */}
        <button 
          onClick={() => setShowNewMemory(true)}
          className="btn-primary w-full"
        >
          Share a New Memory
        </button>

        {/* Memory List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Memories</h2>
          {memories.map((memory) => (
            <div key={memory.id} className="card hover:shadow-xl transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-start space-x-4">
                  <div className="w-14 h-14 bg-primary-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                    {memory.type === 'audio' ? (
                      <Mic className="w-7 h-7 text-primary-600" />
                    ) : (
                      <BookOpen className="w-7 h-7 text-primary-600" />
                    )}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{memory.title}</h3>
                    <p className="text-gray-600 text-sm">{memory.date}</p>
                  </div>
                </div>
                {memory.type === 'audio' && (
                  <button className="p-3 bg-primary-500 hover:bg-primary-600 rounded-full transition-colors">
                    <Play className="w-6 h-6 text-white" />
                  </button>
                )}
              </div>

              <p className="text-lg text-gray-700 mb-4 leading-relaxed">{memory.content}</p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Heart className="w-6 h-6" />
                  <span className="text-lg font-medium">{memory.likes} likes</span>
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-primary-600 transition-colors">
                  <Share2 className="w-6 h-6" />
                  <span className="text-lg font-medium">Share</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Prompts */}
        <div className="card bg-warm-100">
          <h3 className="text-xl font-bold text-gray-900 mb-4">Memory Prompts</h3>
          <div className="space-y-3">
            <button className="w-full p-4 bg-white rounded-xl text-left hover:shadow-md transition-shadow">
              <p className="text-lg text-gray-700">What was your favorite childhood game?</p>
            </button>
            <button className="w-full p-4 bg-white rounded-xl text-left hover:shadow-md transition-shadow">
              <p className="text-lg text-gray-700">Tell us about a teacher who inspired you</p>
            </button>
            <button className="w-full p-4 bg-white rounded-xl text-left hover:shadow-md transition-shadow">
              <p className="text-lg text-gray-700">What's a family tradition you cherish?</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
