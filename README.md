# 🧡 Saathi - The Invisible Elder

> **AI-Powered Companion Platform to Combat Senior Loneliness in India**

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-61DAFB?logo=react)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?logo=docker)](https://www.docker.com/)
[![Node.js](https://img.shields.io/badge/Node.js-18+-339933?logo=node.js)](https://nodejs.org/)

A comprehensive Next.js web application with AI integration, smart medicine reminders, voice control, and social health tracking designed specifically for elderly users in India.

---

## 🚀 Quick Start with Docker

```bash
# Clone the repository
git clone https://github.com/riyaraj-web/Saathi.git
cd Saathi

# Start with Docker (One Command!)
docker-compose up -d

# Access the application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
```

---

## 🎯 Problem & Solution

### The Problem
- **140 million seniors** in India face loneliness
- **40%** feel socially irrelevant despite living with family
- Loneliness is as deadly as smoking 15 cigarettes/day

### Our Solution
Saathi quantifies social health (0-100 score), provides AI companionship, ensures medication adherence, and builds meaningful connections.

---

## ✨ Key Features

- 📊 **Social Health Tracking** - Quantifiable 0-100 isolation metric
- 🤖 **AI Companion** - GPT-3.5 powered 24/7 emotional support
- 💊 **Medicine Reminders** - Smart scheduling with real-time notifications
- 🎤 **Voice Control** - Hands-free accessibility with speech recognition
- 👥 **Community Circles** - Interest-based social groups
- 🎯 **Purpose Feed** - NGO volunteering and mentorship
- 📖 **Memory Sharing** - Preserve life stories
- 👨‍👩‍👧‍👦 **Family Bridge** - Easy family communication
- 🔄 **Real-time Updates** - Socket.IO powered live notifications
- 💾 **MongoDB Storage** - Persistent data storage

---

## 🛠️ Tech Stack

**Frontend**: Next.js 14, React 18, Tailwind CSS, Framer Motion  
**Backend**: Node.js, Express.js, Socket.IO  
**Database**: MongoDB with Mongoose ODM  
**AI**: OpenAI GPT-3.5 Turbo  
**Real-time**: Socket.IO for live updates  
**DevOps**: Docker, Docker Compose

---

## 📦 Installation

### With Docker (Recommended)
```bash
docker-compose up -d
```

### Manual Setup
```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env and add your OPENAI_API_KEY and MONGODB_URI

# Start MongoDB (if running locally)
# Option 1: Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Option 2: Local installation
mongod

# Start Next.js dev server
npm run dev

# In another terminal, start enhanced backend
node server/index-enhanced.js
```

---

## 🎯 Usage

1. Open http://localhost:3000
2. Click "Get Started"
3. Enter your name and age
4. Complete daily check-in
5. Try the AI Companion (requires OpenAI API key)
6. Explore community circles and activities
7. Add medicine reminders
8. Share memories with family

---

## 🤖 AI Features

### AI Companion
- Powered by OpenAI GPT-3.5 Turbo
- Culturally sensitive conversations
- Emotional support and loneliness detection
- Fallback responses when API is unavailable

### Real-time Features
- Socket.IO for instant notifications
- Live medicine reminders
- Real-time social health updates
- Family alerts

---

## 📁 Project Structure

```
Saathi/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   │   └── ai-chat/       # AI companion endpoint
│   ├── layout.jsx         # Root layout
│   ├── page.jsx           # Home page
│   ├── welcome/           # Welcome page
│   ├── dashboard/         # Dashboard
│   ├── checkin/           # Daily check-in
│   ├── social-health/     # Health tracking
│   ├── community/         # Community circles
│   ├── activities/        # Purpose feed
│   ├── memories/          # Memory sharing
│   └── family/            # Family bridge
├── server/                # Backend API
│   ├── models/            # MongoDB models
│   │   └── User.js        # User schema
│   ├── index-enhanced.js  # Express + Socket.IO server
│   └── package.json       # Backend dependencies
├── public/                # Static assets
├── docker-compose.yml     # Docker orchestration (with MongoDB)
├── Dockerfile.frontend    # Next.js container
├── Dockerfile.backend     # Backend container
├── .env.example           # Environment variables template
└── package.json          # Frontend dependencies
```

---

## 🐳 Docker Commands

```bash
# Start services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down

# Rebuild
docker-compose build --no-cache

# Check status
docker-compose ps
```

---

## 🤝 Contributing

Contributions welcome! Fork, create a feature branch, and submit a PR.

---

## 📄 License

MIT License

---

**Built with ❤️ to make every senior feel seen, heard, and valued.**
