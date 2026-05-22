# Docker Setup Guide

## Prerequisites
- Docker installed on your system
- Docker Compose installed

## Quick Start

### 1. Build and Run with Docker Compose
```bash
docker-compose up --build
```

The application will be available at:
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

### 2. Run in Detached Mode
```bash
docker-compose up -d
```

### 3. View Logs
```bash
docker-compose logs -f
```

### 4. Stop the Application
```bash
docker-compose down
```

### 5. Stop and Remove Volumes
```bash
docker-compose down -v
```

## Manual Docker Commands

### Build the Image
```bash
docker build -t invisible-elder:latest .
```

### Run the Container
```bash
docker run -d \
  --name invisible-elder \
  -p 3000:3000 \
  -p 5000:5000 \
  invisible-elder:latest
```

### Stop the Container
```bash
docker stop invisible-elder
```

### Remove the Container
```bash
docker rm invisible-elder
```

## Production Deployment

### Using Docker Compose (Recommended)
```bash
# Build for production
docker-compose -f docker-compose.yml up --build -d

# Check status
docker-compose ps

# View logs
docker-compose logs -f app
```

### Environment Variables
Create a `.env` file for production:
```env
NODE_ENV=production
PORT=5000
```

## Health Checks
The container includes health checks that run every 30 seconds:
```bash
docker inspect --format='{{json .State.Health}}' invisible-elder
```

## Troubleshooting

### Container won't start
```bash
# Check logs
docker logs invisible-elder

# Check if ports are already in use
netstat -an | grep 3000
netstat -an | grep 5000
```

### Rebuild from scratch
```bash
docker-compose down -v
docker-compose build --no-cache
docker-compose up
```

### Access container shell
```bash
docker exec -it invisible-elder sh
```

## Performance Optimization

The Docker image uses:
- Multi-stage builds to reduce image size
- Alpine Linux for minimal footprint
- Production-only dependencies
- Health checks for reliability
- Volume mounting for persistent data

## Security Best Practices

1. **Don't expose unnecessary ports**
2. **Use environment variables for secrets**
3. **Run as non-root user** (configured in Dockerfile)
4. **Keep base images updated**
5. **Scan for vulnerabilities**:
   ```bash
   docker scan invisible-elder:latest
   ```

## CI/CD Integration

### GitHub Actions Example
```yaml
name: Docker Build and Push

on:
  push:
    branches: [ main ]

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Build Docker image
        run: docker build -t invisible-elder:${{ github.sha }} .
      - name: Push to registry
        run: docker push invisible-elder:${{ github.sha }}
```
