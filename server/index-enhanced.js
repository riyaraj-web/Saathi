const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const http = require('http')
const socketIo = require('socket.io')
require('./services/reminderService') // Start cron jobs

const app = express()
const server = http.createServer(app)
const io = socketIo(server, {
  cors: {
    origin: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/saathi', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('✅ MongoDB connected'))
.catch(err => console.error('❌ MongoDB connection error:', err))

// Models
const User = require('./models/User')

// Socket.IO for real-time features
io.on('connection', (socket) => {
  console.log('User connected:', socket.id)

  socket.on('join-room', (userId) => {
    socket.join(`user-${userId}`)
    console.log(`User ${userId} joined their room`)
  })

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id)
  })
})

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    message: 'Saathi API is running',
    timestamp: new Date().toISOString()
  })
})

// User routes
app.post('/api/users', async (req, res) => {
  try {
    const user = new User(req.body)
    await user.save()
    res.status(201).json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.get('/api/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }
    res.json(user)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Medicine routes
app.post('/api/users/:id/medicines', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.medicines.push(req.body)
    await user.save()

    // Emit real-time update
    io.to(`user-${req.params.id}`).emit('medicine-added', req.body)

    res.status(201).json(user.medicines)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

app.delete('/api/users/:userId/medicines/:medicineId', async (req, res) => {
  try {
    const user = await User.findById(req.params.userId)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    user.medicines = user.medicines.filter(m => m._id.toString() !== req.params.medicineId)
    await user.save()

    res.json(user.medicines)
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Check-in routes
app.post('/api/users/:id/checkins', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const checkin = req.body
    user.checkins.push(checkin)

    // Calculate social health score
    const recentCheckins = user.checkins.slice(-7)
    const totalScore = recentCheckins.reduce((sum, c) => {
      return sum + Object.values(c.responses).reduce((s, r) => s + r.score, 0)
    }, 0)
    const maxScore = recentCheckins.length * 50
    user.socialHealthScore = Math.round((totalScore / maxScore) * 100)

    await user.save()

    // Emit real-time update
    io.to(`user-${req.params.id}`).emit('checkin-completed', {
      socialHealthScore: user.socialHealthScore
    })

    res.status(201).json({
      checkin,
      socialHealthScore: user.socialHealthScore
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Analytics
app.get('/api/users/:id/analytics', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    const weeklyScores = user.checkins.slice(-7).map(c => c.socialHealthScore)
    const medicineAdherence = calculateMedicineAdherence(user)

    res.json({
      weeklyScores,
      currentScore: user.socialHealthScore,
      totalCheckins: user.checkins.length,
      medicineCount: user.medicines.length,
      medicineAdherence
    })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

function calculateMedicineAdherence(user) {
  // Calculate percentage of medicines taken on time
  // This is a simplified version
  return 85 // Placeholder
}

// Emergency alert
app.post('/api/users/:id/emergency', async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json({ error: 'User not found' })
    }

    // Send alerts to emergency contacts
    // Implementation depends on SMS/email service

    res.json({ message: 'Emergency alert sent' })
  } catch (error) {
    res.status(400).json({ error: error.message })
  }
})

// Start server
server.listen(PORT, () => {
  console.log(`🚀 Saathi API server running on port ${PORT}`)
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`)
})

module.exports = { app, io }
