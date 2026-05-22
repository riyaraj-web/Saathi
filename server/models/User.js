const mongoose = require('mongoose')

const medicineSchema = new mongoose.Schema({
  name: { type: String, required: true },
  dosage: { type: String, required: true },
  times: [String],
  frequency: { type: String, enum: ['daily', 'weekly', 'as-needed'], default: 'daily' },
  withFood: { type: Boolean, default: false },
  notes: String,
  createdAt: { type: Date, default: Date.now }
})

const checkinSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  responses: {
    mood: { value: String, score: Number },
    socialInteractions: { value: String, score: Number },
    phoneCall: { value: String, score: Number },
    feltUseful: { value: String, score: Number },
    feltLonely: { value: String, score: Number }
  },
  socialHealthScore: Number
})

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  language: { type: String, default: 'english' },
  email: String,
  phone: String,
  socialHealthScore: { type: Number, default: 50 },
  medicines: [medicineSchema],
  checkins: [checkinSchema],
  aiCompanionEnabled: { type: Boolean, default: true },
  notificationsEnabled: { type: Boolean, default: true },
  emergencyContacts: [{
    name: String,
    phone: String,
    relationship: String
  }],
  createdAt: { type: Date, default: Date.now },
  lastActive: { type: Date, default: Date.now }
})

module.exports = mongoose.model('User', userSchema)
