# 🐳 Docker Setup Guide - Saathi

Run both frontend and backend with one command!

---

## 🚀 Quick Start (3 Steps)

### Step 1: Install Docker

**Windows:**
- Download [Docker Desktop for Windows](https://www.docker.com/products/docker-desktop/)
- Install and restart your computer
- Open Docker Desktop

**Mac:**
- Download [Docker Desktop for Mac](https://www.docker.com/products/docker-desktop/)
- Install and open Docker Desktop

**Linux:**
```bash
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh
sudo usermod -aG docker $USER
```

### Step 2: Build and Start

```bash
# Build Docker images (first time only)
npm run docker:build

# Start all services
npm run docker:up
```

### Step 3: Access the Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Health Check**: http://localhost:5000/api/health

**That's it! Both services are running! 🎉**

---

## 📋 Available Commands

```bash
# Build images
npm run docker:build

# Start services (detached mode)
npm run docker:up

# Stop services
npm run docker:down

# View logs
npm run docker:logs

# Restart services
npm run docker:restart

# View running containers
docker ps

# Stop all containers
docker stop $(docker ps -q)
```

---

## 🔍 What's Running?

After `npm run docker:up`, you'll have:

1. **Backend Container** (`saathi-backend`)
   - Express API server
   - Port: 5000
   - Health checks enabled

2. **Frontend Container** (`saathi-frontend`)
   - Nginx serving React app
   - Port: 3000 (mapped to 80 inside)
   - Proxies API requests to backend

3. **Docker Network** (`saathi-network`)
   - Allows containers to communicate

---

## 📊 Container Status

Check if everything is running:

```bash
docker ps
```

You should see:
```
CONTAINER ID   IMAGE                  STATUS         PORTS
abc123...      saathi-frontend        Up 2 minutes   0.0.0.0:3000->80/tcp
def456...      saathi-backend         Up 2 minutes   0.0.0.0:5000->5000/tcp
```

---

## 🔧 Troubleshooting

### Issue: "Port already in use"

**Solution:**
```bash
# Stop conflicting services
npx kill-port 3000
npx kill-port 5000

# Or change ports in docker-compose.yml
ports:
  - "3001:80"  # Frontend
  - "5001:5000"  # Backend
```

### Issue: "Cannot connect to Docker daemon"

**Solution:**
```bash
# Windows/Mac: Start Docker Desktop

# Linux: Start Docker service
sudo systemctl start docker
```

### Issue: "Build failed"

**Solution:**
```bash
# Clean up and rebuild
docker-compose down
docker system prune -a
npm run docker:build
```

### Issue: "Backend not responding"

**Solution:**
```bash
# Check backend logs
docker logs saathi-backend

# Restart backend
docker restart saathi-backend
```

---

## 📝 View Logs

### All Services
```bash
npm run docker:logs
```

### Specific Service
```bash
# Backend logs
docker logs saathi-backend -f

# Frontend logs
docker logs saathi-frontend -f
```

---

## 🛑 Stop Everything

```bash
# Stop and remove containers
npm run docker:down

# Stop without removing
docker-compose stop

# Remove everything (including volumes)
docker-compose down -v
```

---

## 🔄 Update Code

After making code changes:

```bash
# Rebuild and restart
npm run docker:build
npm run docker:up
```

Or for faster development:

```bash
# Just restart (if no dependency changes)
npm run docker:restart
```

---

## 🐛 Debug Mode

Run containers in foreground to see logs:

```bash
docker-compose up
```

Press `Ctrl+C` to stop.

---

## 📦 What's Inside?

### Frontend Container
```
nginx:alpine
├── React app (built)
├── Nginx web server
└── Proxy to backend
```

### Backend Container
```
node:18-alpine
├── Express server
├── API routes
└── Health checks
```

---

## 🌐 Production Deployment

### Build for Production
```bash
docker-compose -f docker-compose.prod.yml build
```

### Push to Registry
```bash
# Tag images
docker tag saathi-frontend:latest yourusername/saathi-frontend:latest
docker tag saathi-backend:latest yourusername/saathi-backend:latest

# Push to Docker Hub
docker push yourusername/saathi-frontend:latest
docker push yourusername/saathi-backend:latest
```

### Deploy to Cloud
```bash
# AWS ECS, Google Cloud Run, Azure Container Instances
# See DEPLOYMENT.md for detailed instructions
```

---

## 💡 Tips

### Faster Builds
```bash
# Use BuildKit for faster builds
DOCKER_BUILDKIT=1 docker-compose build
```

### Clean Up Space
```bash
# Remove unused images
docker image prune -a

# Remove everything
docker system prune -a --volumes
```

### Monitor Resources
```bash
# View resource usage
docker stats
```

---

## 🎯 Common Workflows

### Development
```bash
# Use local development (faster)
npm run dev
```

### Testing
```bash
# Use Docker (production-like)
npm run docker:up
```

### Production
```bash
# Deploy with Docker Compose
docker-compose -f docker-compose.prod.yml up -d
```

---

## 📞 Need Help?

- **Docker Issues**: https://docs.docker.com/
- **Project Issues**: [GitHub Issues](https://github.com/yourusername/saathi/issues)
- **Email**: support@saathi.app

---

## ✅ Checklist

Before running Docker:

- [ ] Docker Desktop installed and running
- [ ] No services on ports 3000 and 5000
- [ ] Code changes committed (optional)
- [ ] `.dockerignore` file present
- [ ] `docker-compose.yml` configured

---

**Now run `npm run docker:up` and you're good to go! 🚀**

