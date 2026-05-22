# 🐳 Docker Setup Guide for Saathi

## Quick Start (One Command!)

```bash
docker-compose up -d
```

That's it! The app will be running at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

---

## Prerequisites

1. **Install Docker Desktop**
   - Windows: https://docs.docker.com/desktop/install/windows-install/
   - Mac: https://docs.docker.com/desktop/install/mac-install/
   - Linux: https://docs.docker.com/desktop/install/linux-install/

2. **Verify Installation**
```bash
docker --version
docker-compose --version
```

---

## Step-by-Step Setup

### 1. Build the Containers

```bash
# Build all services
docker-compose build

# Or build individually
docker-compose build frontend
docker-compose build backend
```

### 2. Start the Application

```bash
# Start in detached mode (background)
docker-compose up -d

# Or start with logs visible
docker-compose up
```

### 3. Check Status

```bash
# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View specific service logs
docker-compose logs -f frontend
docker-compose logs -f backend
```

### 4. Stop the Application

```bash
# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

---

## Docker Commands Cheat Sheet

### Container Management
```bash
# List running containers
docker ps

# List all containers
docker ps -a

# Stop a container
docker stop saathi-frontend
docker stop saathi-backend

# Remove a container
docker rm saathi-frontend

# Restart a container
docker restart saathi-frontend
```

### Image Management
```bash
# List images
docker images

# Remove an image
docker rmi saathi-frontend

# Remove unused images
docker image prune
```

### Logs & Debugging
```bash
# View logs
docker logs saathi-frontend
docker logs saathi-backend

# Follow logs in real-time
docker logs -f saathi-frontend

# Execute command in container
docker exec -it saathi-frontend sh
docker exec -it saathi-backend sh
```

### Clean Up
```bash
# Remove all stopped containers
docker container prune

# Remove all unused images
docker image prune -a

# Remove all unused volumes
docker volume prune

# Nuclear option - remove everything
docker system prune -a --volumes
```

---

## Troubleshooting

### Issue: Port already in use

**Error**: `Bind for 0.0.0.0:3000 failed: port is already allocated`

**Solution**:
```bash
# Windows
netstat -ano | findstr :3000
taskkill /PID <PID> /F

# Mac/Linux
lsof -ti:3000 | xargs kill -9

# Or change port in docker-compose.yml
ports:
  - "3001:80"  # Use port 3001 instead
```

### Issue: Container won't start

**Solution**:
```bash
# Check logs
docker-compose logs backend

# Rebuild without cache
docker-compose build --no-cache

# Remove and recreate
docker-compose down
docker-compose up -d --force-recreate
```

### Issue: Changes not reflecting

**Solution**:
```bash
# Rebuild the image
docker-compose build frontend

# Restart the container
docker-compose up -d --force-recreate frontend
```

### Issue: Out of disk space

**Solution**:
```bash
# Check disk usage
docker system df

# Clean up
docker system prune -a --volumes
```

---

## Development Workflow

### Making Changes

1. **Edit your code** in the project directory
2. **Rebuild the container**:
```bash
docker-compose build frontend
```
3. **Restart the service**:
```bash
docker-compose up -d frontend
```

### Hot Reload (Development Mode)

For development with hot reload, use volumes:

```yaml
# docker-compose.dev.yml
services:
  frontend:
    volumes:
      - ./src:/app/src
      - ./public:/app/public
    command: npm run dev
```

Then run:
```bash
docker-compose -f docker-compose.dev.yml up
```

---

## Production Deployment

### Build for Production

```bash
# Build optimized images
docker-compose -f docker-compose.prod.yml build

# Start production containers
docker-compose -f docker-compose.prod.yml up -d
```

### Push to Docker Hub

```bash
# Login
docker login

# Tag images
docker tag saathi-frontend:latest yourusername/saathi-frontend:latest
docker tag saathi-backend:latest yourusername/saathi-backend:latest

# Push
docker push yourusername/saathi-frontend:latest
docker push yourusername/saathi-backend:latest
```

---

## Environment Variables

Create a `.env` file:

```env
# Application
NODE_ENV=production

# Ports
FRONTEND_PORT=3000
BACKEND_PORT=5000

# Add more as needed
```

Use in docker-compose.yml:
```yaml
ports:
  - "${FRONTEND_PORT}:80"
```

---

## Health Checks

Add health checks to docker-compose.yml:

```yaml
services:
  backend:
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:5000/api/health"]
      interval: 30s
      timeout: 10s
      retries: 3
      start_period: 40s
```

---

## Monitoring

### View Resource Usage

```bash
# Real-time stats
docker stats

# Specific container
docker stats saathi-frontend
```

### Inspect Container

```bash
# View container details
docker inspect saathi-frontend

# View network details
docker network inspect saathi-network
```

---

## Backup & Restore

### Backup

```bash
# Export container
docker export saathi-frontend > frontend-backup.tar

# Save image
docker save saathi-frontend:latest > frontend-image.tar
```

### Restore

```bash
# Import container
docker import frontend-backup.tar

# Load image
docker load < frontend-image.tar
```

---

## Next Steps

1. ✅ Docker setup complete
2. 📝 Push to GitHub (see below)
3. 🚀 Deploy to cloud (AWS, GCP, Azure)
4. 📊 Set up monitoring
5. 🔒 Add SSL/TLS

---

## Quick Reference

| Command | Description |
|---------|-------------|
| `docker-compose up -d` | Start all services |
| `docker-compose down` | Stop all services |
| `docker-compose logs -f` | View logs |
| `docker-compose ps` | List services |
| `docker-compose build` | Rebuild images |
| `docker-compose restart` | Restart services |

---

**Need Help?** Check the [Docker Documentation](https://docs.docker.com/)
