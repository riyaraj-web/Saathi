'use client'

import { useState, useEffect, useRef } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Mic, Send, Volume2, Brain, Sparkles, MessageCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition'

export default function AICompanion() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isListening, setIsListening] = useState(false)
  const messagesEndRef = useRef(null)

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition()

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
      // Load conversation history
      const savedMessages = localStorage.getItem(`aiMessages_${JSON.parse(savedUser).id}`)
      if (savedMessages) {
        setMessages(JSON.parse(savedMessages))
      } else {
        // Welcome message
        setMessages([{
          role: 'assistant',
          content: `Namaste ${JSON.parse(savedUser).name}! I'm your AI companion. I'm here to listen, chat, and support you. How are you feeling today?`,
          timestamp: new Date().toISOString()
        }])
      }
    } else {
      router.push('/welcome')
    }
  }, [router])

  useEffect(() => {
    if (transcript && listening) {
      setInput(transcript)
    }
  }, [transcript, listening])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleVoiceInput = () => {
    if (listening) {
      SpeechRecognition.stopListening()
      setIsListening(false)
    } else {
      resetTranscript()
      SpeechRecognition.startListening({ continuous: true })
      setIsListening(true)
    }
  }

  const speakText = (text) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text)
      utterance.rate = 0.9
      utterance.pitch = 1
      utterance.volume = 1
      window.speechSynthesis.speak(utterance)
    }
  }

  const sendMessage = async () => {
    if (!input.trim()) return

    const userMessage = {
      role: 'user',
      content: input,
      timestamp: new Date().toISOString()
    }

    const newMessages = [...messages, userMessage]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      // Call AI API
      const response = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: newMessages,
          userId: user.id,
          userName: user.name
        })
      })

      const data = await response.json()

      const aiMessage = {
        role: 'assistant',
        content: data.message,
        timestamp: new Date().toISOString()
      }

      const updatedMessages = [...newMessages, aiMessage]
      setMessages(updatedMessages)

      // Save conversation
      localStorage.setItem(`aiMessages_${user.id}`, JSON.stringify(updatedMessages))

      // Speak response
      speakText(data.message)

    } catch (error) {
      console.error('AI Error:', error)
      toast.error('Sorry, I had trouble understanding. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const quickPrompts = [
    "How are you today?",
    "Tell me a story",
    "I feel lonely",
    "What should I do today?",
    "Share some wisdom",
    "I need advice"
  ]

  if (!user) return null

  return (
    <div className="min-h-screen pb-32">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-6 rounded-b-3xl shadow-lg sticky top-0 z-10">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors mb-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div className="flex items-center space-x-4">
            <motion.div 
              className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <Brain className="w-8 h-8" />
            </motion.div>
            <div>
              <h1 className="text-3xl font-bold mb-1">AI Companion</h1>
              <p className="text-blue-100 text-lg">Always here to listen and chat</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6">
        {/* Messages */}
        <div className="space-y-4 mb-6">
          <AnimatePresence>
            {messages.map((message, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${
                  message.role === 'user' 
                    ? 'bg-gradient-to-r from-primary-500 to-orange-500 text-white' 
                    : 'bg-white border-2 border-blue-200 text-gray-900'
                } rounded-3xl p-5 shadow-lg`}>
                  {message.role === 'assistant' && (
                    <div className="flex items-center space-x-2 mb-2">
                      <Brain className="w-5 h-5 text-blue-600" />
                      <span className="font-semibold text-blue-600">Saathi AI</span>
                    </div>
                  )}
                  <p className="text-lg leading-relaxed whitespace-pre-wrap">{message.content}</p>
                  <button
                    onClick={() => speakText(message.content)}
                    className="mt-2 text-sm opacity-70 hover:opacity-100 flex items-center space-x-1"
                  >
                    <Volume2 className="w-4 h-4" />
                    <span>Listen</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>

          {isLoading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex justify-start"
            >
              <div className="bg-white border-2 border-blue-200 rounded-3xl p-5 shadow-lg">
                <div className="flex items-center space-x-2">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  >
                    <Brain className="w-6 h-6 text-blue-600" />
                  </motion.div>
                  <span className="text-gray-600">Thinking...</span>
                </div>
              </div>
            </motion.div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Quick Prompts */}
        {messages.length <= 1 && (
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-700 mb-3">Quick Prompts:</h3>
            <div className="grid grid-cols-2 gap-3">
              {quickPrompts.map((prompt, index) => (
                <motion.button
                  key={index}
                  onClick={() => setInput(prompt)}
                  className="card text-left hover:bg-blue-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <div className="flex items-center space-x-2">
                    <Sparkles className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{prompt}</span>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Input Area - Fixed at bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/90 backdrop-blur-md border-t-2 border-gray-200 p-4 shadow-2xl">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            {browserSupportsSpeechRecognition && (
              <motion.button
                onClick={handleVoiceInput}
                className={`p-4 rounded-full shadow-lg ${
                  isListening 
                    ? 'bg-red-500 voice-recording' 
                    : 'bg-gradient-to-r from-blue-500 to-purple-600'
                } text-white`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mic className="w-7 h-7" />
              </motion.button>
            )}

            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
              placeholder="Type or speak your message..."
              className="flex-1 input-field"
              disabled={isLoading}
            />

            <motion.button
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="btn-primary px-6 py-4 min-h-0"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Send className="w-6 h-6" />
            </motion.button>
          </div>

          {isListening && (
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center text-red-600 font-semibold mt-2 text-lg"
            >
              🎤 Listening... Speak now
            </motion.p>
          )}
        </div>
      </div>
    </div>
  )
}
