const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// In-memory storage (in production, use a real database)
let users = []
let checkins = []
let memories = []
let activities = []

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Server is running' })
})

// User routes
app.post('/api/users', (req, res) => {
  const user = {
    id: Date.now(),
    ...req.body,
    socialHealthScore: 50,
    createdAt: new Date().toISOString()
  }
  users.push(user)
  res.status(201).json(user)
})

app.get('/api/users/:id', (req, res) => {
  const user = users.find(u => u.id === parseInt(req.params.id))
  if (!user) {
    return res.status(404).json({ error: 'User not found' })
  }
  res.json(user)
})

// Check-in routes
app.post('/api/checkins', (req, res) => {
  const checkin = {
    id: Date.now(),
    ...req.body,
    createdAt: new Date().toISOString()
  }
  checkins.push(checkin)

  // Calculate and update social health score
  const userCheckins = checkins.filter(c => c.userId === req.body.userId)
  const recentCheckins = userCheckins.slice(-7) // Last 7 check-ins
  
  const totalScore = recentCheckins.reduce((sum, c) => {
    return sum + Object.values(c.responses).reduce((s, r) => s + r.score, 0)
  }, 0)
  
  const maxScore = recentCheckins.length * 50 // 5 questions * 10 points each
  const socialHealthScore = Math.round((totalScore / maxScore) * 100)

  // Update user's score
  const userIndex = users.findIndex(u => u.id === req.body.userId)
  if (userIndex !== -1) {
    users[userIndex].socialHealthScore = socialHealthScore
    users[userIndex].lastCheckin = new Date().toISOString()
  }

  res.status(201).json({ 
    checkin, 
    socialHealthScore 
  })
})

app.get('/api/checkins/:userId', (req, res) => {
  const userCheckins = checkins.filter(c => c.userId === parseInt(req.params.userId))
  res.json(userCheckins)
})

// Memory routes
app.post('/api/memories', (req, res) => {
  const memory = {
    id: Date.now(),
    ...req.body,
    likes: 0,
    createdAt: new Date().toISOString()
  }
  memories.push(memory)
  res.status(201).json(memory)
})

app.get('/api/memories/:userId', (req, res) => {
  const userMemories = memories.filter(m => m.userId === parseInt(req.params.userId))
  res.json(userMemories)
})

// Activity routes
app.post('/api/activities', (req, res) => {
  const activity = {
    id: Date.now(),
    ...req.body,
    completedAt: new Date().toISOString()
  }
  activities.push(activity)
  res.status(201).json(activity)
})

app.get('/api/activities/:userId', (req, res) => {
  const userActivities = activities.filter(a => a.userId === parseInt(req.params.userId))
  res.json(userActivities)
})

// Social health analytics
app.get('/api/analytics/:userId', (req, res) => {
  const userId = parseInt(req.params.userId)
  const userCheckins = checkins.filter(c => c.userId === userId)
  const userActivities = activities.filter(a => a.userId === userId)
  
  // Calculate weekly scores
  const weeklyScores = userCheckins.slice(-7).map(c => {
    const score = Object.values(c.responses).reduce((sum, r) => sum + r.score, 0)
    return Math.round((score / 50) * 100)
  })

  // Calculate engagement metrics
  const totalActivities = userActivities.length
  const totalPoints = userActivities.reduce((sum, a) => sum + (a.points || 0), 0)

  res.json({
    weeklyScores,
    totalActivities,
    totalPoints,
    checkinsThisWeek: userCheckins.filter(c => {
      const checkinDate = new Date(c.createdAt)
      const weekAgo = new Date()
      weekAgo.setDate(weekAgo.getDate() - 7)
      return checkinDate > weekAgo
    }).length
  })
})

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
  console.log(`Health check: http://localhost:${PORT}/api/health`)
})
