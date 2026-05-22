# 🧡 Saathi - The Invisible Elder

> **AI-Powered Companion Platform to Combat Senior Loneliness**

A comprehensive Next.js web application with AI integration, real-time health tracking, medicine reminders, and voice assistance designed specifically for elderly users in India.

[![Next.js](https://img.shields.io/badge/Next.js-14.0-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.2-blue)](https://reactjs.org/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED)](https://www.docker.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![OpenAI](https://img.shields.io/badge/OpenAI-GPT--3.5-412991)](https://openai.com/)

---

## 📋 Table of Contents

- [Problem Statement](#-problem-statement)
- [Solution](#-solution)
- [Key Features](#-key-features)
- [Tech Stack](#-tech-stack)
- [Architecture](#-architecture)
- [Installation](#-installation)
- [Docker Deployment](#-docker-deployment)
- [API Documentation](#-api-documentation)
- [Screenshots](#-screenshots)
- [Future Enhancements](#-future-enhancements)
- [Contributing](#-contributing)

---

## 🎯 Problem Statement

### The Silent Crisis

- **140 million seniors** in India
- **15+ million** live entirely alone
- **40%** of seniors living with families feel "socially irrelevant"
- Loneliness is as lethal as smoking 15 cigarettes a day
- Leading cause of rapid cognitive decline and depression

### The Gap

Being **loved** (provided with food/medicine) ≠ Being **included** (part of daily life and purpose)

---

## 💡 Solution

**Saathi** is an AI-powered digital companion that:

1. **Quantifies Social Isolation** - Social Health Score (0-100) based on daily interactions
2. **Provides AI Companionship** - 24/7 conversational AI trained for elderly users
3. **Ensures Health Adherence** - Smart medicine reminders with email/SMS notifications
4. **Enables Voice Control** - Hands-free operation for accessibility
5. **Builds Community** - Interest-based circles and intergenerational mentorship
6. **Tracks Wellness** - Daily check-ins and trend visualization

---

## ✨ Key Features

### 🤖 AI Companion
- **GPT-3.5 Powered** conversational AI
- Culturally sensitive to Indian traditions
- Emotional support and loneliness detection
- Voice input/output for hands-free interaction
- Context-aware conversations with memory

### 💊 Smart Medicine Reminders
- Multiple daily reminders per medicine
- Email and browser notifications
- "With food" indicators
- Adherence tracking and analytics
- Family notification system

### 🎤 Voice Control
- Speech-to-text for all inputs
- Text-to-speech for responses
- Large, touch-friendly interface
- High contrast design (WCAG AAA)

### 📊 Social Health Tracking
- Quantifiable isolation metric (0-100)
- Daily wellness check-ins
- Weekly trend visualization
- Personalized recommendations

### 👥 Community Features
- Interest-based circles (Books, Music, Art)
- Intergenerational mentorship programs
- Local NGO volunteer opportunities
- Purpose-driven activities

### 🏥 Health Dashboard
- Medicine adherence rates
- Social health trends
- Activity completion tracking
- Emergency alert system

---

## 🛠️ Tech Stack

### Frontend
- **Next.js 14** - React framework with App Router
- **React 18** - UI library
- **Tailwind CSS** - Utility-first styling
- **Framer Motion** - Smooth animations
- **Lucide React** - Icon library
- **React Speech Recognition** - Voice input
- **Zustand** - State management

### Backend
- **Node.js** - Runtime environment
- **Express.js** - API framework
- **MongoDB** - NoSQL database
- **Mongoose** - ODM
- **Socket.IO** - Real-time communication
- **Node-Cron** - Scheduled tasks

### AI & ML
- **OpenAI GPT-3.5** - Conversational AI
- **Web Speech API** - Voice recognition
- **Natural Language Processing** - Sentiment analysis

### DevOps
- **Docker** - Containerization
- **Docker Compose** - Multi-container orchestration
- **MongoDB Atlas** - Cloud database (production)
- **Vercel** - Frontend deployment
- **Railway/Render** - Backend deployment

### Additional Services
- **Nodemailer** - Email notifications
- **Twilio** (optional) - SMS reminders
- **JWT** - Authentication
- **Bcrypt** - Password hashing

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                         CLIENT LAYER                         │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Next.js    │  │  Framer      │  │   Speech     │      │
│  │   Frontend   │  │  Motion      │  │   API        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                         API LAYER                            │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   Express    │  │  Socket.IO   │  │   OpenAI     │      │
│  │   REST API   │  │  WebSocket   │  │   API        │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                      BUSINESS LOGIC                          │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │  Reminder    │  │  Analytics   │  │   AI Chat    │      │
│  │  Service     │  │  Engine      │  │   Service    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
                            ↕
┌─────────────────────────────────────────────────────────────┐
│                       DATA LAYER                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐      │
│  │   MongoDB    │  │  Redis       │  │   S3         │      │
│  │   Database   │  │  Cache       │  │   Storage    │      │
│  └──────────────┘  └──────────────┘  └──────────────┘      │
└─────────────────────────────────────────────────────────────┘
```

---

## 🚀 Installation

### Prerequisites

- Node.js 18+ 
- MongoDB 7.0+
- Docker & Docker Compose (for containerized deployment)
- OpenAI API Key

### Local Development

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/saathi-invisible-elder.git
cd saathi-invisible-elder
```

2. **Install dependencies**
```bash
# Install frontend dependencies
npm install

# Install backend dependencies
cd server
npm install
cd ..
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` with your credentials:
```env
OPENAI_API_KEY=your_openai_api_key
MONGODB_URI=mongodb://localhost:27017/saathi
JWT_SECRET=your_secret_key
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
```

4. **Start MongoDB**
```bash
# Using Docker
docker run -d -p 27017:27017 --name mongodb mongo:7.0

# Or use local MongoDB installation
mongod
```

5. **Run the application**
```bash
# Terminal 1: Start Next.js frontend
npm run dev

# Terminal 2: Start Express backend
npm run server
```

6. **Access the application**
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000
- API Health: http://localhost:5000/api/health

---

## 🐳 Docker Deployment

### Quick Start with Docker Compose

1. **Build and start all services**
```bash
docker-compose up --build
```

This starts:
- Next.js frontend (port 3000)
- Express backend (port 5000)
- MongoDB database (port 27017)

2. **Stop services**
```bash
docker-compose down
```

3. **View logs**
```bash
docker-compose logs -f
```

### Production Deployment

1. **Build production images**
```bash
docker-compose -f docker-compose.prod.yml build
```

2. **Deploy to cloud**
```bash
# Push to Docker Hub
docker tag saathi-frontend:latest yourusername/saathi-frontend:latest
docker push yourusername/saathi-frontend:latest

# Deploy to AWS ECS, Google Cloud Run, or Azure Container Instances
```

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Endpoints

#### Health Check
```http
GET /health
```

#### User Management
```http
POST /users
GET /users/:id
PUT /users/:id
```

#### Medicine Reminders
```http
POST /users/:id/medicines
GET /users/:id/medicines
DELETE /users/:userId/medicines/:medicineId
PUT /users/:userId/medicines/:medicineId/taken
```

#### Daily Check-ins
```http
POST /users/:id/checkins
GET /users/:id/checkins
GET /users/:id/checkins/latest
```

#### AI Chat
```http
POST /ai-chat
Body: { messages: [], userId: string, userName: string }
```

#### Analytics
```http
GET /users/:id/analytics
GET /users/:id/social-health-trend
```

### WebSocket Events

```javascript
// Connect
socket.emit('join-room', userId)

// Listen for medicine reminders
socket.on('medicine-reminder', (data) => {
  // Handle reminder
})

// Listen for social health updates
socket.on('social-health-update', (data) => {
  // Update UI
})
```

---

## 📸 Screenshots

### Welcome Screen
![Welcome](./docs/screenshots/welcome.png)

### AI Companion Chat
![AI Chat](./docs/screenshots/ai-chat.png)

### Medicine Reminders
![Medicine](./docs/screenshots/medicine.png)

### Social Health Dashboard
![Dashboard](./docs/screenshots/dashboard.png)

---

## 🎨 Design Principles

### Accessibility First
- **Font Size**: Minimum 18px base, up to 48px for headers
- **Touch Targets**: Minimum 60px for all interactive elements
- **Color Contrast**: WCAG AAA compliant (7:1 ratio)
- **Voice Control**: Full app navigation via voice
- **Simple Language**: No jargon, clear instructions

### Dignity-Centered
- Respectful, adult-to-adult communication
- Celebrates wisdom and experience
- No patronizing language
- Focus on contribution, not limitation

### Cultural Sensitivity
- Multi-language support (Hindi, Tamil, Bengali, etc.)
- Indian cultural context in AI responses
- Regional festival reminders
- Traditional medicine integration

---

## 📊 Impact Metrics

### Quantifiable Outcomes
- **Social Health Score**: 0-100 metric tracking isolation
- **Medicine Adherence**: % of doses taken on time
- **Community Engagement**: Active participation rate
- **AI Interaction**: Conversation frequency and sentiment
- **Family Connection**: Contact frequency with loved ones

### Success Indicators
- Increase in Social Health Score over time
- Reduction in reported loneliness
- Improved medicine adherence
- Active community participation
- Regular family communication

---

## 🔮 Future Enhancements

### Phase 1 (Q1 2024)
- [ ] Regional language voice support
- [ ] Video call integration
- [ ] Wearable device integration (BP, glucose monitors)
- [ ] Offline mode with sync

### Phase 2 (Q2 2024)
- [ ] AI-powered health insights
- [ ] Telemedicine integration
- [ ] Gamification with rewards
- [ ] Family dashboard portal

### Phase 3 (Q3 2024)
- [ ] Predictive loneliness detection
- [ ] Automated intervention triggers
- [ ] Government healthcare integration
- [ ] Insurance partnerships

---

## 🤝 Contributing

We welcome contributions! Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the MIT License - see [LICENSE](./LICENSE) file for details.

---

## 👥 Team

- **Your Name** - Full Stack Developer - [LinkedIn](https://linkedin.com/in/yourprofile)
- **Email**: your.email@example.com
- **Portfolio**: https://yourportfolio.com

---

## 🙏 Acknowledgments

- **HelpAge India** - For insights on senior care
- **OpenAI** - For GPT-3.5 API
- **Vercel** - For hosting platform
- **MongoDB** - For database support

---

## 📞 Support

For support, email support@saathi.app or join our Slack channel.

---

## 🌟 Star History

[![Star History Chart](https://api.star-history.com/svg?repos=yourusername/saathi-invisible-elder&type=Date)](https://star-history.com/#yourusername/saathi-invisible-elder&Date)

---

**Built with ❤️ to make every senior feel seen, heard, and valued.**

