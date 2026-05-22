# 🚀 Quick Start Guide - Saathi (Next.js Version)

Get up and running in 5 minutes!

---

## ⚡ Prerequisites

- **Node.js 18+** - [Download](https://nodejs.org/)
- **MongoDB** - [Download](https://www.mongodb.com/try/download/community) or use [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
- **OpenAI API Key** - [Get one here](https://platform.openai.com/api-keys)
- **Git** - [Download](https://git-scm.com/)

---

## 📦 Installation (5 minutes)

### Step 1: Clone & Install

```bash
# Clone repository
git clone https://github.com/yourusername/saathi.git
cd saathi

# Install dependencies
npm install

# Install server dependencies
cd server
npm install
cd ..
```

### Step 2: Environment Setup

```bash
# Copy environment template
cp .env.example .env
```

Edit `.env` with your credentials:

```env
# Required
OPENAI_API_KEY=sk-your-openai-key-here
MONGODB_URI=mongodb://localhost:27017/saathi

# Optional (for email reminders)
EMAIL_USER=your.email@gmail.com
EMAIL_PASS=your-app-specific-password

# JWT Secret (generate with: openssl rand -base64 32)
JWT_SECRET=your-secret-key-here
```

### Step 3: Start MongoDB

**Option A: Docker (Recommended)**
```bash
docker run -d -p 27017:27017 --name mongodb mongo:7.0
```

**Option B: Local Installation**
```bash
# macOS
brew services start mongodb-community

# Ubuntu/Debian
sudo systemctl start mongod

# Windows
net start MongoDB
```

### Step 4: Run the Application

**Terminal 1: Start Backend**
```bash
cd server
npm start
```

**Terminal 2: Start Frontend**
```bash
npm run dev
```

### Step 5: Access the App

Open your browser and go to:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

---

## 🐳 Docker Quick Start (Even Faster!)

```bash
# One command to rule them all
docker-compose up -d

# Check logs
docker-compose logs -f

# Stop everything
docker-compose down
```

That's it! The app is now running at http://localhost:3000

---

## 🎯 First Time Setup

1. **Open** http://localhost:3000
2. **Click** "Get Started"
3. **Enter** your name and age
4. **Choose** your preferred language
5. **Start** exploring!

### Try These Features First:

✅ **AI Companion** - Chat with your AI friend  
✅ **Medicine Reminder** - Add your first medicine  
✅ **Daily Check-in** - Complete your wellness check  
✅ **Voice Control** - Tap the mic icon and speak  

---

## 🔧 Troubleshooting

### Issue: "Cannot connect to MongoDB"

**Solution**:
```bash
# Check if MongoDB is running
docker ps  # If using Docker
# OR
mongosh  # If using local MongoDB

# Restart MongoDB
docker restart mongodb
# OR
sudo systemctl restart mongod
```

### Issue: "OpenAI API Error"

**Solution**:
- Check your API key in `.env`
- Verify you have credits: https://platform.openai.com/account/usage
- The app will use fallback responses if API fails

### Issue: "Port 3000 already in use"

**Solution**:
```bash
# Find and kill the process
lsof -ti:3000 | xargs kill -9

# Or use a different port
PORT=3001 npm run dev
```

### Issue: "Voice recognition not working"

**Solution**:
- Use **Chrome** or **Edge** (best support)
- Allow microphone permissions
- Use HTTPS in production (required for voice)

---

## 📱 Testing on Mobile

### Local Network Access

1. **Find your IP address**:
```bash
# macOS/Linux
ifconfig | grep "inet "

# Windows
ipconfig
```

2. **Update Next.js config**:
```javascript
// next.config.js
module.exports = {
  // ... other config
  experimental: {
    serverActions: true,
  },
}
```

3. **Start with host flag**:
```bash
npm run dev -- -H 0.0.0.0
```

4. **Access from mobile**:
```
http://YOUR_IP_ADDRESS:3000
```

---

## 🧪 Testing Features

### Test AI Companion

```bash
# Open browser console and run:
fetch('http://localhost:5000/api/ai-chat', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    messages: [{ role: 'user', content: 'Hello!' }],
    userId: '123',
    userName: 'Test User'
  })
})
.then(r => r.json())
.then(console.log)
```

### Test Medicine Reminder

1. Add a medicine with time = current time + 1 minute
2. Wait 1 minute
3. You should see a browser notification

### Test Voice Input

1. Go to AI Companion page
2. Click the microphone button
3. Say "Hello, how are you?"
4. The text should appear in the input field

---

## 📊 Sample Data

Want to see the app with data? Run this:

```bash
# Seed database with sample data
node server/seed.js
```

This creates:
- 5 sample users
- 10 medicines with various schedules
- 20 daily check-ins
- Sample community posts

---

## 🎨 Customization

### Change Theme Colors

Edit `tailwind.config.js`:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        500: '#your-color-here',
        // ... other shades
      }
    }
  }
}
```

### Add New Language

Edit `app/welcome/page.jsx`:

```javascript
<option value="gujarati">ગુજરાતી (Gujarati)</option>
```

### Modify AI Personality

Edit `app/api/ai-chat/route.js`:

```javascript
const systemPrompt = `You are Saathi, a [your custom personality]...`
```

---

## 📚 Next Steps

### Learn More
- [Next.js Documentation](https://nextjs.org/docs)
- [MongoDB Tutorial](https://www.mongodb.com/docs/manual/tutorial/)
- [OpenAI API Guide](https://platform.openai.com/docs/guides/gpt)
- [Docker Basics](https://docs.docker.com/get-started/)

### Explore Code
- `app/` - Next.js pages and components
- `server/` - Express backend
- `server/models/` - MongoDB schemas
- `server/services/` - Background jobs

### Deploy to Production
See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.

---

## 🆘 Need Help?

- **Documentation**: [README-NEXTJS.md](./README-NEXTJS.md)
- **Issues**: [GitHub Issues](https://github.com/yourusername/saathi/issues)
- **Email**: support@saathi.app
- **Discord**: [Join our community](https://discord.gg/saathi)

---

## ✅ Checklist

Before you start coding:

- [ ] Node.js 18+ installed
- [ ] MongoDB running
- [ ] OpenAI API key obtained
- [ ] Dependencies installed (`npm install`)
- [ ] `.env` file configured
- [ ] Backend running on port 5000
- [ ] Frontend running on port 3000
- [ ] Browser opened to http://localhost:3000
- [ ] Microphone permissions granted (for voice)
- [ ] Notifications enabled (for reminders)

---

**You're all set! Start building amazing features! 🚀**

