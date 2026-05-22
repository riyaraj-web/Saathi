# The Invisible Elder

A mobile-friendly web application designed to combat senior loneliness through meaningful connections, purposeful activities, and quantifiable social wellness tracking.

## 🎯 Mission

India is home to 140 million seniors, with over 15 million living entirely alone and 40% of those living with families reporting feeling "socially irrelevant." This application addresses the critical issue of senior isolation by providing tools for connection, purpose, and measurable social health improvement.

## ✨ Key Features

### Core Innovation: Quantifying Social Isolation

The app addresses the constraint of measuring isolation through a **Social Health Score (0-100)** that tracks multiple dimensions of social wellness.

### User Interface Highlights

- **Welcome Screen**: Welcoming hero image and mission statement
- **Personal Dashboard**: Real-time Social Health Score with personalized message
- **Bottom Navigation**: Quick access to all main features (Home, Check-in, Community, Activities, Family)
- **Interactive Cards**: Clickable feature cards for seamless navigation
- **Progress Tracking**: Weekly visualization of social wellness trends

### 1. **Social Health Score (0-100)**

A quantifiable metric that tracks:

- Daily mood and emotional well-being
- Frequency and quality of social interactions
- Sense of purpose and usefulness
- Connection with family and community
- Weekly trends and progress visualization

### 2. **Daily Check-ins**

- Conversational, non-clinical questions
- 5-question assessment covering emotional and social wellness
- Automatic score calculation and trend tracking
- Gentle, dignity-preserving interface

### 3. **Memory Sharing**

- Record and preserve life stories
- Share wisdom and experiences with family
- Text, audio, and photo support
- Memory prompts to inspire storytelling

### 4. **Community Circles**

- Interest-based groups (Books, Music, Art, etc.)
- Real-time conversations with peers
- Safe, moderated environment
- Active member indicators

### 5. **Purposeful Activities & Purpose Feed**

- **Daily Activities**: Quick, meaningful tasks that create value
- **Purpose Feed**: Local NGO volunteer opportunities and intergenerational mentorship programs
  - Real NGO partnerships (HelpAge India, Bal Raksha Bharat, etc.)
  - Intergenerational mentorship (career guidance, language exchange, traditional skills)
  - Location-based opportunities with distance indicators
  - Flexible time commitments
  - Clear impact metrics for each opportunity
- Impact points system
- Achievement tracking

### 6. **Family Bridge**

- Easy communication with loved ones
- Video and voice call integration
- Share updates and memories
- Gentle reminders to stay connected

## 🎨 Design Principles

### Accessibility First

- **Large Text**: Minimum 18px base font size
- **High Contrast**: WCAG AAA compliant color schemes
- **Touch-Friendly**: Minimum 60px touch targets in bottom navigation
- **Clear Hierarchy**: Simple navigation with large icons
- **Warm Colors**: Orange (#f0701f) and warm tones for comfort and emotional connection
- **Responsive Design**: Works seamlessly on mobile, tablet, and desktop

### Dignity-Centered

- No patronizing language
- Respectful, adult-to-adult communication
- Celebrates wisdom and experience
- Focuses on contribution, not limitation
- Welcoming hero image on landing page sets a warm, inviting tone

## 🛠️ Technology Stack

- **Frontend**: React 18 with React Router
- **Styling**: Tailwind CSS with custom accessibility-focused configuration
- **Backend**: Node.js with Express
- **Icons**: Lucide React (clear, recognizable icons)
- **Build Tool**: Vite (fast development experience)

## 📦 Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd invisible-elder
```

2. **Install dependencies**

```bash
npm install
```

3. **Start the development servers**

```bash
npm run dev
```

This will start:

- Frontend: http://localhost:3002 (or next available port)
- Backend: http://localhost:5000

The app automatically finds an available port if 3000-3001 are in use.

## 🚀 Usage

### First Time Setup

1. Open the local development URL (e.g., http://localhost:3002)
2. Enter your name and age on the welcome screen
3. Complete your first daily check-in (5 quick questions)
4. View your personalized dashboard with Social Health Score

### Daily Routine

1. **Dashboard**: View your Social Health Score (0-100) and daily message
2. **Daily Check-in**: Answer 5 wellness questions (~2 minutes)
3. **Community Circles**: Join conversations with like-minded peers about Books, Music, Art, Coffee Chat
4. **Share Your Story**: Record memories, audio, or text to preserve your wisdom
5. **Purposeful Activities**: Discover daily tasks and local NGO volunteer opportunities
6. **Family Bridge**: Stay connected with loved ones through messages and video

### Navigation

- Use the **bottom navigation bar** to quickly move between sections
- Each page has a header with a back button and logout option

## 📊 Social Health Score Calculation

The score is calculated based on:

- **Mood Assessment** (20%): Daily emotional state
- **Social Interactions** (20%): Quality conversations
- **Family Connection** (20%): Contact with loved ones
- **Sense of Purpose** (20%): Feeling useful and valued
- **Connection Level** (20%): Overall feeling of belonging

**Score Ranges:**

- 70-100: Thriving (strong social connections)
- 40-69: Growing (moderate connections, room to improve)
- 0-39: Needs support (let's work together)

## 🎯 Impact Metrics

The application tracks:

- Daily check-in completion rate
- Social health score trends (weekly visualization)
- Activity participation and completion
- Community engagement levels
- Family connection frequency
- **Purpose Feed engagement**: NGO volunteer hours, mentorship sessions
- **Intergenerational impact**: Number of young people mentored, skills shared

## 🔒 Privacy & Security

- All data stored locally in browser (localStorage)
- No personal data shared without consent
- Family connections require mutual consent
- Community interactions are moderated

## 🌟 Future Enhancements

### Phase 1 (Immediate)

- Voice input for all text fields
- Regional language support (Hindi, Tamil, Bengali, etc.)
- Real-time NGO API integration for live opportunities
- GPS-based location services for nearby opportunities
- Calendar integration for scheduling volunteer activities

### Phase 2 (3-6 months)

- Integration with healthcare providers
- AI-powered conversation companions
- Emergency alert system for family
- Medication reminders
- Virtual events and workshops
- Verified impact tracking (certificates, testimonials)
- Gamification with badges and milestones

### Phase 3 (6-12 months)

- NGO partnership dashboard
- Mentorship matching algorithm
- Video call integration for remote mentorship
- Community impact leaderboards
- Annual impact reports for users

## 🤝 Contributing

This project was built during a 6-hour hackathon to address senior loneliness in India. Contributions are welcome to:

- Add regional language support
- Improve accessibility features
- Enhance the social health algorithm
- Add new community features
- Improve mobile responsiveness

## 📝 License

MIT License - feel free to use and adapt for social good.

## 💡 The Problem We're Solving

Loneliness among seniors is:

- As lethal as smoking 15 cigarettes a day
- A leading cause of cognitive decline
- Linked to depression, anxiety, and physical health issues
- Often invisible in families focused on physical care

Being loved (provided with food/medicine) is not the same as being included (part of daily chaos and purpose).

## 🎓 Research & Data

- 140 million seniors in India
- 15+ million live entirely alone
- 40% living with families feel "socially irrelevant"
- Loneliness increases mortality risk by 26%
- Social isolation linked to 50% increased dementia risk

---

**Built with ❤️ to make every senior feel seen, heard, and valued.**
