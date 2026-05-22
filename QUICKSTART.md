# 🚀 Quick Start - Saathi

Get running in 2 minutes!

---

## ⚡ Fastest Way: Docker

### Step 1: Install Docker
Download and install [Docker Desktop](https://www.docker.com/products/docker-desktop/)

### Step 2: Run
```bash
npm run docker:build
npm run docker:up
```

### Step 3: Open
http://localhost:3000

**Done! 🎉**

---

## 🔧 Alternative: Manual Setup

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Run
```bash
npm run dev
```

### Step 3: Open
http://localhost:3000

**Done! 🎉**

---

## 📊 What's Running?

- **Frontend**: http://localhost:3000 (React app)
- **Backend**: http://localhost:5000 (API server)
- **Health Check**: http://localhost:5000/api/health

---

## 🛑 Stop Everything

### Docker:
```bash
npm run docker:down
```

### Manual:
Press `Ctrl+C` in the terminal

---

## 🆘 Troubleshooting

### "Port already in use"
```bash
npx kill-port 3000
npx kill-port 5000
```

### "Docker not found"
Install Docker Desktop and make sure it's running

### "npm command not found"
Install Node.js from https://nodejs.org/

---

## 📚 Next Steps

- [Full Documentation](./README.md)
- [Docker Guide](./DOCKER-GUIDE.md)
- [Features](./FEATURES-SHOWCASE.md)

---

**Need help? Open an issue on GitHub!**
