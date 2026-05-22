import React, { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Send, Mic, Volume2, Bot, User, Sparkles } from 'lucide-react'

const AICompanion = ({ user }) => {
  const navigate = useNavigate()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef(null)

  useEffect(() => {
    // Load chat history
    const saved = localStorage.getItem(`ai_chat_${user.id}`)
    if (saved) {
      setMessages(JSON.parse(saved))
    } else {
      // Welcome message
      setMessages([
        {
          id: 1,
          type: 'ai',
          text: `Namaste ${user.name}! I'm your AI companion. I'm here to chat, listen, and keep you company. How are you feeling today?`,
          timestamp: new Date().toISOString()
        }
      ])
    }
  }, [user])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const saveMessages = (newMessages) => {
    setMessages(newMessages)
    localStorage.setItem(`ai_chat_${user.id}`, JSON.stringify(newMessages))
  }

  // Simple AI response logic (in production, this would call an actual AI API)
  const generateAIResponse = (userMessage) => {
    const lowerMessage = userMessage.toLowerCase()
    
    // Emotional support responses
    if (lowerMessage.includes('lonely') || lowerMessage.includes('alone')) {
      return "I understand feeling lonely can be difficult. Remember, you're never truly alone - I'm here, and your community cares about you. Would you like to explore some community activities or reach out to family?"
    }
    
    if (lowerMessage.includes('sad') || lowerMessage.includes('down')) {
      return "I'm sorry you're feeling down. It's okay to have these feelings. Sometimes talking about what's bothering you can help. Would you like to share more, or perhaps I could suggest some uplifting activities?"
    }
    
    if (lowerMessage.includes('happy') || lowerMessage.includes('good') || lowerMessage.includes('great')) {
      return "That's wonderful to hear! I'm so glad you're feeling good. What made your day special? Sharing positive moments can make them even more meaningful."
    }
    
    if (lowerMessage.includes('medicine') || lowerMessage.includes('medication')) {
      return "I can help you with medicine reminders! Have you checked your Medicine Reminder page today? It's important to take your medications on time. Would you like me to guide you there?"
    }
    
    if (lowerMessage.includes('family') || lowerMessage.includes('children') || lowerMessage.includes('grandchildren')) {
      return "Family connections are so precious. When did you last speak with them? The Family Bridge feature can help you stay in touch easily. Would you like to send them a message?"
    }
    
    if (lowerMessage.includes('story') || lowerMessage.includes('memory') || lowerMessage.includes('past')) {
      return "Your life experiences are valuable treasures! Have you considered recording your memories? Future generations would love to hear your stories. The Memory Sharing feature makes it easy."
    }
    
    if (lowerMessage.includes('help') || lowerMessage.includes('volunteer') || lowerMessage.includes('useful')) {
      return "Your wisdom and experience can make a real difference! There are many opportunities to mentor young people or volunteer with local NGOs. Check out the Purpose Feed - your community needs you!"
    }
    
    if (lowerMessage.includes('health') || lowerMessage.includes('doctor') || lowerMessage.includes('pain')) {
      return "Your health is important. If you're experiencing any concerning symptoms, please consult with your doctor. I can help you track your daily wellness through check-ins. Have you completed today's check-in?"
    }
    
    // Default responses
    const defaultResponses = [
      "That's interesting! Tell me more about that.",
      "I'm listening. How does that make you feel?",
      "Thank you for sharing that with me. Your thoughts and feelings matter.",
      "I appreciate you opening up to me. Would you like to talk more about this?",
      "That sounds meaningful. What else is on your mind today?"
    ]
    
    return defaultResponses[Math.floor(Math.random() * defaultResponses.length)]
  }

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage = {
      id: Date.now(),
      type: 'user',
      text: input,
      timestamp: new Date().toISOString()
    }

    const newMessages = [...messages, userMessage]
    saveMessages(newMessages)
    setInput('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = {
        id: Date.now() + 1,
        type: 'ai',
        text: generateAIResponse(input),
        timestamp: new Date().toISOString()
      }
      saveMessages([...newMessages, aiResponse])
      setIsTyping(false)
    }, 1500)
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const quickPrompts = [
    "I'm feeling lonely today",
    "Tell me something uplifting",
    "I want to share a memory",
    "How can I help others?",
    "I miss my family"
  ]

  return (
    <div className="min-h-screen bg-warm-50 flex flex-col">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
              <Bot className="w-8 h-8 text-primary-600" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">AI Companion</h1>
              <p className="text-primary-100 text-lg">Always here to listen</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 max-w-4xl mx-auto w-full px-4 py-6 overflow-y-auto">
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`flex items-start space-x-3 max-w-[80%] ${
                  message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${
                    message.type === 'user' ? 'bg-primary-500' : 'bg-warm-200'
                  }`}
                >
                  {message.type === 'user' ? (
                    <User className="w-6 h-6 text-white" />
                  ) : (
                    <Bot className="w-6 h-6 text-primary-600" />
                  )}
                </div>
                <div
                  className={`p-5 rounded-2xl ${
                    message.type === 'user'
                      ? 'bg-primary-500 text-white'
                      : 'bg-white border-2 border-warm-200'
                  }`}
                >
                  <p className="text-lg leading-relaxed">{message.text}</p>
                  <p
                    className={`text-xs mt-2 ${
                      message.type === 'user' ? 'text-primary-100' : 'text-gray-500'
                    }`}
                  >
                    {new Date(message.timestamp).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </p>
                </div>
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-12 h-12 bg-warm-200 rounded-full flex items-center justify-center">
                  <Bot className="w-6 h-6 text-primary-600" />
                </div>
                <div className="bg-white border-2 border-warm-200 p-5 rounded-2xl">
                  <div className="flex space-x-2">
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-3 h-3 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                </div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Quick Prompts */}
      {messages.length <= 1 && (
        <div className="max-w-4xl mx-auto w-full px-4 pb-4">
          <p className="text-gray-600 mb-3 text-center">Quick prompts:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {quickPrompts.map((prompt, idx) => (
              <button
                key={idx}
                onClick={() => setInput(prompt)}
                className="px-4 py-2 bg-white border-2 border-primary-200 text-primary-700 rounded-full hover:bg-primary-50 transition-colors"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input Area */}
      <div className="bg-white border-t-2 border-gray-200 p-4">
        <div className="max-w-4xl mx-auto flex items-center space-x-3">
          <button className="p-4 bg-warm-100 hover:bg-warm-200 rounded-full transition-colors">
            <Mic className="w-7 h-7 text-primary-600" />
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Type your message..."
            className="flex-1 px-6 py-4 text-lg border-2 border-gray-300 rounded-full focus:border-primary-500 focus:ring-primary-300"
          />
          <button
            onClick={handleSend}
            disabled={!input.trim()}
            className="p-4 bg-primary-500 hover:bg-primary-600 disabled:bg-gray-300 rounded-full transition-colors"
          >
            <Send className="w-7 h-7 text-white" />
          </button>
        </div>
      </div>
    </div>
  )
}

export default AICompanion
