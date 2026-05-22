'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
  Brain,
  Pill,
  Bell,
  Mic,
  Phone,
  Video
} from 'lucide-react'
import { motion } from 'framer-motion'
import { format, isToday } from 'date-fns'

export default function Dashboard() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [greeting, setGreeting] = useState('')
  const [checkedInToday, setCheckedInToday] = useState(false)
  const [upcomingMedicines, setUpcomingMedicines] = useState([])

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)

      // Set greeting
      const hour = new Date().getHours()
      if (hour < 12) setGreeting('Good Morning')
      else if (hour < 17) setGreeting('Good Afternoon')
      else setGreeting('Good Evening')

      // Check if checked in today
      if (userData.lastCheckin && isToday(new Date(userData.lastCheckin))) {
        setCheckedInToday(true)
      }

      // Load upcoming medicines
      const medicines = localStorage.getItem(`medicines_${userData.id}`)
      if (medicines) {
        const meds = JSON.parse(medicines)
        const now = new Date()
        const currentTime = format(now, 'HH:mm')
        
        // Find next 3 upcoming medicines
        const upcoming = meds
          .flatMap(med => med.times.map(time => ({ ...med, time })))
          .filter(m => m.time > currentTime)
          .sort((a, b) => a.time.localeCompare(b.time))
          .slice(0, 3)
        
        setUpcomingMedicines(upcoming)
      }
    } else {
      router.push('/welcome')
    }
  }, [router])

  const getScoreColor = (score) => {
    if (score >= 70) return 'from-green-500 to-emerald-600'
    if (score >= 40) return 'from-yellow-500 to-orange-500'
    return 'from-red-500 to-pink-600'
  }

  const getScoreMessage = (score) => {
    if (score >= 70) return 'You\'re doing wonderfully!'
    if (score >= 40) return 'Let\'s stay connected today'
    return 'We\'re here for you'
  }

  if (!user) return null

  const quickActions = [
    {
      title: 'AI Companion',
      description: 'Chat with your AI friend',
      icon: Brain,
      color: 'from-blue-500 to-purple-600',
      route: '/ai-companion',
      badge: 'New!'
    },
    {
      title: 'Medicine Reminders',
      description: 'Manage your medications',
      icon: Pill,
      color: 'from-green-500 to-teal-600',
      route: '/medicine-reminder',
      badge: upcomingMedicines.length > 0 ? `${upcomingMedicines.length} upcoming` : null
    },
    {
      title: 'Community Circles',
      description: 'Join conversations',
      icon: Users,
      color: 'from-orange-500 to-red-500',
      route: '/community'
    },
    {
      title: 'Share Your Story',
      description: 'Record memories',
      icon: BookOpen,
      color: 'from-pink-500 to-rose-600',
      route: '/memories'
    },
    {
      title: 'Purposeful Activities',
      description: 'Find meaningful tasks',
      icon: Sparkles,
      color: 'from-amber-500 to-yellow-600',
      route: '/activities'
    },
    {
      title: 'Family Bridge',
      description: 'Connect with loved ones',
      icon: MessageCircle,
      color: 'from-indigo-500 to-blue-600',
      route: '/family'
    }
  ]

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className={`bg-gradient-to-r ${getScoreColor(user.socialHealthScore)} text-white p-6 rounded-b-3xl shadow-2xl`}>
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-start mb-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="text-4xl font-bold mb-2">{greeting}, {user.name}!</h1>
              <p className="text-white/90 text-xl">{format(new Date(), 'EEEE, MMMM d')}</p>
            </motion.div>
            <button 
              onClick={() => router.push('/profile')}
              className="p-3 hover:bg-white/20 rounded-full transition-colors"
            >
              <UserCircle className="w-9 h-9" />
            </button>
          </div>

          {/* Social Health Score */}
          <motion.div 
            className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Heart className="w-8 h-8" fill="white" />
                <span className="text-2xl font-semibold">Your Social Wellness</span>
              </div>
              <button 
                onClick={() => router.push('/social-health')}
                className="text-lg underline hover:text-white/80"
              >
                View Details
              </button>
            </div>
            <div className="flex items-end space-x-4">
              <motion.div 
                className="text-6xl font-bold"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              >
                {user.socialHealthScore}
              </motion.div>
              <div className="text-2xl pb-2 text-white/90">/ 100</div>
            </div>
            <p className="text-white/90 mt-2 text-xl">{getScoreMessage(user.socialHealthScore)}</p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Daily Check-in Prompt */}
        {!checkedInToday && (
          <motion.div 
            className="card bg-gradient-to-r from-warm-100 to-primary-100 border-primary-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ scale: 1.02 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-primary-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-8 h-8 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">Daily Check-in</h3>
                  <p className="text-gray-700 text-lg">How are you feeling today?</p>
                </div>
              </div>
              <button 
                onClick={() => router.push('/checkin')}
                className="btn-primary"
              >
                Start
              </button>
            </div>
          </motion.div>
        )}

        {/* Upcoming Medicines */}
        {upcomingMedicines.length > 0 && (
          <motion.div 
            className="card bg-gradient-to-br from-green-50 to-teal-50 border-green-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <Bell className="w-7 h-7 text-green-600 medicine-alert" />
                <h3 className="text-xl font-bold text-gray-900">Upcoming Medicines</h3>
              </div>
              <button 
                onClick={() => router.push('/medicine-reminder')}
                className="text-green-600 hover:text-green-700 font-medium"
              >
                View All
              </button>
            </div>
            <div className="space-y-2">
              {upcomingMedicines.map((med, index) => (
                <div key={index} className="flex items-center justify-between bg-white p-3 rounded-xl">
                  <div>
                    <p className="font-semibold text-gray-900">{med.name}</p>
                    <p className="text-gray-600">{med.dosage}</p>
                  </div>
                  <span className="text-green-600 font-bold text-lg">{med.time}</span>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Voice Assistant Quick Access */}
        <motion.div 
          className="card-glass bg-gradient-to-r from-purple-100 to-blue-100"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ scale: 1.02 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <motion.div 
                className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Mic className="w-8 h-8 text-white" />
              </motion.div>
              <div>
                <h3 className="text-2xl font-bold text-gray-900">Voice Assistant</h3>
                <p className="text-gray-700 text-lg">Tap to speak with Saathi</p>
              </div>
            </div>
            <button 
              onClick={() => router.push('/ai-companion')}
              className="btn-voice"
            >
              <Mic className="w-6 h-6" />
            </button>
          </div>
        </motion.div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {quickActions.map((action, index) => {
            const Icon = action.icon
            return (
              <motion.button
                key={index}
                onClick={() => router.push(action.route)}
                className="card-glass text-left relative overflow-hidden group"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                {action.badge && (
                  <span className="absolute top-4 right-4 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">
                    {action.badge}
                  </span>
                )}
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 bg-gradient-to-r ${action.color} rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-xl transition-shadow`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-gray-900 mb-2">{action.title}</h3>
                    <p className="text-gray-600">{action.description}</p>
                  </div>
                </div>
              </motion.button>
            )
          })}
        </div>

        {/* Today's Inspiration */}
        <motion.div 
          className="card bg-gradient-to-br from-primary-50 to-warm-100"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="flex items-start space-x-4">
            <Sparkles className="w-9 h-9 text-primary-600 flex-shrink-0 floating-animation" />
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Today's Thought</h3>
              <p className="text-xl text-gray-700 italic leading-relaxed">
                "The purpose of life is not to be happy. It is to be useful, to be honorable, 
                to be compassionate, to have it make some difference that you have lived and lived well."
              </p>
              <p className="text-gray-600 mt-3 text-lg">— Ralph Waldo Emerson</p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Contact */}
        <motion.div 
          className="card bg-gradient-to-r from-red-50 to-pink-50 border-red-200"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Phone className="w-8 h-8 text-red-600" />
              <div>
                <h3 className="text-xl font-bold text-gray-900">Need Help?</h3>
                <p className="text-gray-700">Emergency: 108 | Family: Quick Call</p>
              </div>
            </div>
            <button className="btn-secondary bg-red-100 border-red-300 text-red-700 hover:bg-red-200">
              Call Now
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
