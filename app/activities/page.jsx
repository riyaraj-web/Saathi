'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Sparkles, BookOpen, Users, Phone, Heart, Award, CheckCircle, MapPin, Clock, GraduationCap, HeartHandshake } from 'lucide-react'
import { motion } from 'framer-motion'

export default function Activities() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [completedActivities, setCompletedActivities] = useState([])
  const [activeTab, setActiveTab] = useState('daily') // 'daily' or 'purpose-feed'

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    } else {
      router.push('/welcome')
    }
  }, [router])

  if (!user) return null

  const activities = [
    {
      id: 1,
      title: 'Mentor a Young Professional',
      description: 'Share your career wisdom with someone starting their journey',
      icon: Users,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      impact: 'High',
      time: '30 min',
      points: 15
    },
    {
      id: 2,
      title: 'Record a Family Recipe',
      description: 'Preserve your culinary heritage for future generations',
      icon: BookOpen,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      impact: 'Medium',
      time: '20 min',
      points: 10
    },
    {
      id: 3,
      title: 'Call an Old Friend',
      description: 'Reconnect with someone you haven\'t spoken to in a while',
      icon: Phone,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      impact: 'High',
      time: '15 min',
      points: 12
    },
    {
      id: 4,
      title: 'Share Life Advice',
      description: 'Answer questions from community members seeking guidance',
      icon: Heart,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      impact: 'Medium',
      time: '25 min',
      points: 10
    },
    {
      id: 5,
      title: 'Write a Letter',
      description: 'Write a heartfelt letter to a family member',
      icon: BookOpen,
      color: 'bg-warm-200',
      iconColor: 'text-primary-600',
      impact: 'High',
      time: '30 min',
      points: 15
    }
  ]

  const purposeFeed = [
    {
      id: 101,
      type: 'ngo',
      title: 'Teach Digital Literacy at Community Center',
      organization: 'HelpAge India',
      description: 'Help seniors in your community learn to use smartphones and stay connected with family',
      location: 'Indiranagar Community Center, Bangalore',
      distance: '2.3 km',
      time: 'Flexible hours',
      impact: 'Help 10-15 seniors per session',
      icon: GraduationCap,
      color: 'bg-blue-100',
      iconColor: 'text-blue-600',
      category: 'NGO Volunteer'
    },
    {
      id: 102,
      type: 'mentorship',
      title: 'Career Mentor for College Students',
      organization: 'Mentor India',
      description: 'Share your professional experience with engineering students exploring career paths',
      location: 'Virtual (Video Call)',
      distance: 'Online',
      time: '2 hours/week',
      impact: 'Guide 2-3 students',
      icon: Users,
      color: 'bg-purple-100',
      iconColor: 'text-purple-600',
      category: 'Mentorship'
    },
    {
      id: 103,
      type: 'ngo',
      title: 'Story Time at Children\'s Home',
      organization: 'Bal Raksha Bharat',
      description: 'Read stories and share life lessons with children at a local orphanage',
      location: 'Rainbow Children\'s Home, Koramangala',
      distance: '4.1 km',
      time: 'Saturdays, 3-5 PM',
      impact: '20-25 children',
      icon: BookOpen,
      color: 'bg-pink-100',
      iconColor: 'text-pink-600',
      category: 'NGO Volunteer'
    },
    {
      id: 104,
      type: 'mentorship',
      title: 'Teach Traditional Cooking to Youth',
      organization: 'Heritage Kitchen Initiative',
      description: 'Pass down authentic recipes and cooking techniques to young home cooks',
      location: 'Community Kitchen, Jayanagar',
      distance: '3.5 km',
      time: 'Sundays, 10 AM - 12 PM',
      impact: '8-10 participants per class',
      icon: Heart,
      color: 'bg-orange-100',
      iconColor: 'text-orange-600',
      category: 'Mentorship'
    },
    {
      id: 105,
      type: 'ngo',
      title: 'Financial Literacy Workshop Facilitator',
      organization: 'Arthik Shiksha Foundation',
      description: 'Teach basic financial planning and savings to underprivileged youth',
      location: 'Whitefield Learning Center',
      distance: '6.2 km',
      time: 'Bi-weekly, Flexible',
      impact: '15-20 young adults',
      icon: GraduationCap,
      color: 'bg-green-100',
      iconColor: 'text-green-600',
      category: 'NGO Volunteer'
    },
    {
      id: 106,
      type: 'mentorship',
      title: 'Language Exchange Partner',
      organization: 'Intergenerational Connect',
      description: 'Teach Hindi/regional languages to young professionals, learn tech skills in return',
      location: 'Virtual or Coffee Shop',
      distance: 'Flexible',
      time: '1 hour/week',
      impact: '1-on-1 exchange',
      icon: Users,
      color: 'bg-indigo-100',
      iconColor: 'text-indigo-600',
      category: 'Mentorship'
    },
    {
      id: 107,
      type: 'ngo',
      title: 'Garden Therapy at Senior Care Home',
      organization: 'Nightingales Medical Trust',
      description: 'Lead gardening activities and share plant care knowledge with fellow seniors',
      location: 'Nightingales Centre, Bangalore',
      distance: '5.8 km',
      time: 'Wednesdays, 4-6 PM',
      impact: '12-15 seniors',
      icon: HeartHandshake,
      color: 'bg-teal-100',
      iconColor: 'text-teal-600',
      category: 'NGO Volunteer'
    },
    {
      id: 108,
      type: 'mentorship',
      title: 'Business Startup Advisor',
      organization: 'Young Entrepreneurs Network',
      description: 'Guide first-time entrepreneurs with your business experience and wisdom',
      location: 'Virtual (Monthly Meetings)',
      distance: 'Online',
      time: '3-4 hours/month',
      impact: '2-3 startups',
      icon: Award,
      color: 'bg-yellow-100',
      iconColor: 'text-yellow-600',
      category: 'Mentorship'
    }
  ]

  const handleCompleteActivity = (activityId) => {
    if (!completedActivities.includes(activityId)) {
      setCompletedActivities([...completedActivities, activityId])
      // In real app, update user's social health score
    }
  }

  const totalPoints = activities
    .filter(a => completedActivities.includes(a.id))
    .reduce((sum, a) => sum + a.points, 0)

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
          <h1 className="text-3xl font-bold mb-2">Purposeful Activities</h1>
          <p className="text-primary-100 text-lg">Make a difference, one action at a time</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Points Card */}
        <div className="card bg-gradient-to-br from-primary-100 to-warm-100">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-primary-500 rounded-2xl flex items-center justify-center">
                <Award className="w-8 h-8 text-white" />
              </div>
              <div>
                <div className="text-4xl font-bold text-gray-900">{totalPoints}</div>
                <div className="text-gray-700 text-lg">Impact Points Today</div>
              </div>
            </div>
            <Sparkles className="w-12 h-12 text-primary-600" />
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-2 bg-white rounded-2xl p-2 shadow-md">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'daily'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-warm-50'
            }`}
          >
            Daily Activities
          </button>
          <button
            onClick={() => setActiveTab('purpose-feed')}
            className={`flex-1 py-4 px-6 rounded-xl font-semibold text-lg transition-all ${
              activeTab === 'purpose-feed'
                ? 'bg-primary-500 text-white shadow-md'
                : 'text-gray-600 hover:bg-warm-50'
            }`}
          >
            Purpose Feed
          </button>
        </div>

        {activeTab === 'daily' ? (
          <>
            {/* Info Card */}
            <div className="card bg-warm-100">
              <div className="flex items-start space-x-4">
                <Sparkles className="w-8 h-8 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Your Experience Matters</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Every activity you complete creates ripples of positive impact. Your wisdom, 
                    stories, and connections make the world better.
                  </p>
                </div>
              </div>
            </div>

            {/* Activities List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Today's Activities</h2>
          {activities.map((activity) => {
            const Icon = activity.icon
            const isCompleted = completedActivities.includes(activity.id)

            return (
              <div
                key={activity.id}
                className={`card ${isCompleted ? 'bg-green-50 border-green-300' : ''}`}
              >
                <div className="flex items-start space-x-4">
                  <div className={`w-16 h-16 ${activity.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-8 h-8 ${activity.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{activity.title}</h3>
                      {isCompleted && (
                        <CheckCircle className="w-7 h-7 text-green-600 flex-shrink-0" fill="currentColor" />
                      )}
                    </div>
                    <p className="text-gray-700 mb-4 leading-relaxed">{activity.description}</p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4 text-sm text-gray-600">
                        <span className="flex items-center space-x-1">
                          <span className="font-semibold">Impact:</span>
                          <span>{activity.impact}</span>
                        </span>
                        <span>•</span>
                        <span>{activity.time}</span>
                        <span>•</span>
                        <span className="flex items-center space-x-1">
                          <Award className="w-4 h-4" />
                          <span>{activity.points} points</span>
                        </span>
                      </div>
                      {!isCompleted && (
                        <button
                          onClick={() => handleCompleteActivity(activity.id)}
                          className="btn-primary text-base py-3 px-6 min-h-0"
                        >
                          Start
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Achievements */}
        <div className="card bg-gradient-to-br from-primary-50 to-warm-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Impact</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white p-5 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {completedActivities.length}
              </div>
              <div className="text-gray-700">Activities Completed</div>
            </div>
            <div className="bg-white p-5 rounded-xl text-center">
              <div className="text-3xl font-bold text-primary-600 mb-1">
                {totalPoints}
              </div>
              <div className="text-gray-700">Total Points</div>
            </div>
          </div>
        </div>

        {/* Motivation */}
        <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
          <div className="flex items-start space-x-4">
            <Heart className="w-8 h-8 flex-shrink-0" fill="white" />
            <div>
              <h3 className="text-xl font-bold mb-2">Keep Going!</h3>
              <p className="text-lg text-primary-100 leading-relaxed">
                Each activity you complete strengthens your connections and reminds you 
                of the value you bring to the world. You're making a difference!
              </p>
            </div>
          </div>
        </div>
          </>
        ) : (
          <>
            {/* Purpose Feed Header */}
            <div className="card bg-gradient-to-br from-primary-100 to-warm-100">
              <div className="flex items-start space-x-4">
                <HeartHandshake className="w-8 h-8 text-primary-600 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Share Your Lifetime of Experience</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Local NGOs and young people need your wisdom. Your decades of experience can 
                    transform lives and create lasting impact in your community.
                  </p>
                </div>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex space-x-3 overflow-x-auto pb-2">
              <button className="px-6 py-3 bg-primary-500 text-white rounded-xl font-semibold whitespace-nowrap shadow-md">
                All Opportunities
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold whitespace-nowrap hover:bg-warm-50 border-2 border-gray-200">
                NGO Volunteer
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold whitespace-nowrap hover:bg-warm-50 border-2 border-gray-200">
                Mentorship
              </button>
              <button className="px-6 py-3 bg-white text-gray-700 rounded-xl font-semibold whitespace-nowrap hover:bg-warm-50 border-2 border-gray-200">
                Nearby
              </button>
            </div>

            {/* Purpose Feed List */}
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900">Opportunities Near You</h2>
              {purposeFeed.map((opportunity) => {
                const Icon = opportunity.icon
                return (
                  <div key={opportunity.id} className="card hover:shadow-xl transition-shadow">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className={`w-16 h-16 ${opportunity.color} rounded-2xl flex items-center justify-center flex-shrink-0`}>
                        <Icon className={`w-8 h-8 ${opportunity.iconColor}`} />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-2">
                          <div>
                            <span className="inline-block px-3 py-1 bg-primary-100 text-primary-700 text-sm font-semibold rounded-full mb-2">
                              {opportunity.category}
                            </span>
                            <h3 className="text-xl font-bold text-gray-900">{opportunity.title}</h3>
                            <p className="text-gray-600 font-medium">{opportunity.organization}</p>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-4 leading-relaxed">{opportunity.description}</p>
                        
                        {/* Details Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
                          <div className="flex items-start space-x-2 text-gray-600">
                            <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{opportunity.location}</p>
                              <p className="text-sm text-gray-500">{opportunity.distance}</p>
                            </div>
                          </div>
                          <div className="flex items-start space-x-2 text-gray-600">
                            <Clock className="w-5 h-5 flex-shrink-0 mt-0.5" />
                            <div>
                              <p className="text-sm font-medium">{opportunity.time}</p>
                            </div>
                          </div>
                        </div>

                        {/* Impact Badge */}
                        <div className="bg-warm-100 rounded-xl p-4 mb-4">
                          <div className="flex items-center space-x-2">
                            <Sparkles className="w-5 h-5 text-primary-600" />
                            <span className="font-semibold text-gray-900">Your Impact:</span>
                            <span className="text-gray-700">{opportunity.impact}</span>
                          </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex space-x-3">
                          <button className="btn-primary flex-1 text-base py-3 min-h-0">
                            I'm Interested
                          </button>
                          <button className="btn-secondary flex-1 text-base py-3 min-h-0">
                            Learn More
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Call to Action */}
            <div className="card bg-gradient-to-r from-primary-500 to-primary-600 text-white">
              <div className="flex items-start space-x-4">
                <Award className="w-8 h-8 flex-shrink-0" />
                <div>
                  <h3 className="text-xl font-bold mb-2">Your Wisdom is Needed</h3>
                  <p className="text-lg text-primary-100 leading-relaxed mb-4">
                    Every hour you volunteer, every young person you mentor, creates ripples 
                    that extend far beyond what you can see. Your experience is invaluable.
                  </p>
                  <button className="bg-white text-primary-600 font-semibold py-3 px-6 rounded-xl hover:bg-primary-50 transition-colors">
                    Find More Opportunities
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Activities
