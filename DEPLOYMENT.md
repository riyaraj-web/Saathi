# 🚀 Deployment Guide - Saathi

Complete deployment instructions for production environments.

---

## 📋 Pre-Deployment Checklist

- [ ] OpenAI API key obtained
- [ ] MongoDB Atlas cluster created (or local MongoDB ready)
- [ ] Email service configured (Gmail App Password)
- [ ] Domain name purchased (optional)
- [ ] SSL certificate ready (Let's Encrypt recommended)
- [ ] Environment variables documented

---

## 🐳 Docker Deployment (Recommended)

### Option 1: Docker Compose (All-in-One)

**Best for**: Development, staging, small production deployments

```bash
# 1. Clone repository
git clone https://github.com/yourusername/saathi.git
cd saathi

# 2. Create .env file
cp .env.example .env
# Edit .env with your credentials

# 3. Build and start
docker-compose up -d --build

# 4. Check logs
docker-compose logs -f

# 5. Access application
# Frontend: http://localhost:3000
# Backend: http://localhost:5000
# MongoDB: localhost:27017
```

### Option 2: Separate Containers

**Best for**: Microservices architecture, scalability

```bash
# Build images
docker build -t saathi-frontend:latest .
docker build -t saathi-backend:latest ./server

# Run MongoDB
docker run -d --name mongodb \
  -p 27017:27017 \
  -v mongodb_data:/data/db \
  mongo:7.0

# Run Backend
docker run -d --name saathi-backend \
  -p 5000:5000 \
  --link mongodb:mongodb \
  -e MONGODB_URI=mongodb://mongodb:27017/saathi \
  -e OPENAI_API_KEY=your_key \
  saathi-backend:latest

# Run Frontend
docker run -d --name saathi-frontend \
  -p 3000:3000 \
  --link saathi-backend:backend \
  -e NEXT_PUBLIC_API_URL=http://backend:5000 \
  saathi-frontend:latest
```

---

## ☁️ Cloud Deployment

### Vercel (Frontend) + Railway (Backend)

**Best for**: Quick deployment, automatic scaling

#### Frontend on Vercel

```bash
# 1. Install Vercel CLI
npm i -g vercel

# 2. Login
vercel login

# 3. Deploy
vercel --prod

# 4. Set environment variables in Vercel dashboard
NEXT_PUBLIC_API_URL=https://your-backend.railway.app
OPENAI_API_KEY=your_key
```

#### Backend on Railway

```bash
# 1. Install Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up

# 5. Add MongoDB plugin in Railway dashboard
# 6. Set environment variables
```

### AWS Deployment

**Best for**: Enterprise, full control, compliance

#### Architecture
```
┌─────────────────────────────────────────┐
│           Route 53 (DNS)                │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│      CloudFront (CDN) + WAF             │
└─────────────────┬───────────────────────┘
                  │
┌─────────────────▼───────────────────────┐
│    Application Load Balancer            │
└─────┬───────────────────────┬───────────┘
      │                       │
┌─────▼──────┐       ┌────────▼──────┐
│  ECS/EKS   │       │   ECS/EKS     │
│  Frontend  │       │   Backend     │
│  (Next.js) │       │   (Express)   │
└────────────┘       └───────┬───────┘
                             │
                     ┌───────▼───────┐
                     │  DocumentDB   │
                     │  (MongoDB)    │
                     └───────────────┘
```

#### Step-by-Step

1. **Create ECR Repositories**
```bash
aws ecr create-repository --repository-name saathi-frontend
aws ecr create-repository --repository-name saathi-backend
```

2. **Push Docker Images**
```bash
# Login to ECR
aws ecr get-login-password --region us-east-1 | \
  docker login --username AWS --password-stdin \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com

# Tag and push
docker tag saathi-frontend:latest \
  YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/saathi-frontend:latest
docker push YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/saathi-frontend:latest
```

3. **Create ECS Cluster**
```bash
aws ecs create-cluster --cluster-name saathi-cluster
```

4. **Create Task Definitions**
```json
{
  "family": "saathi-frontend",
  "networkMode": "awsvpc",
  "requiresCompatibilities": ["FARGATE"],
  "cpu": "512",
  "memory": "1024",
  "containerDefinitions": [{
    "name": "frontend",
    "image": "YOUR_ACCOUNT_ID.dkr.ecr.us-east-1.amazonaws.com/saathi-frontend:latest",
    "portMappings": [{
      "containerPort": 3000,
      "protocol": "tcp"
    }],
    "environment": [
      {"name": "NEXT_PUBLIC_API_URL", "value": "https://api.saathi.app"}
    ]
  }]
}
```

5. **Create Services**
```bash
aws ecs create-service \
  --cluster saathi-cluster \
  --service-name saathi-frontend \
  --task-definition saathi-frontend \
  --desired-count 2 \
  --launch-type FARGATE
```

### Google Cloud Platform

**Best for**: AI/ML integration, global reach

```bash
# 1. Build and push to GCR
gcloud builds submit --tag gcr.io/PROJECT_ID/saathi-frontend
gcloud builds submit --tag gcr.io/PROJECT_ID/saathi-backend ./server

# 2. Deploy to Cloud Run
gcloud run deploy saathi-frontend \
  --image gcr.io/PROJECT_ID/saathi-frontend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated

gcloud run deploy saathi-backend \
  --image gcr.io/PROJECT_ID/saathi-backend \
  --platform managed \
  --region us-central1 \
  --allow-unauthenticated
```

### Azure

**Best for**: Microsoft ecosystem, hybrid cloud

```bash
# 1. Create Container Registry
az acr create --resource-group saathi-rg \
  --name saathiacr --sku Basic

# 2. Push images
az acr build --registry saathiacr \
  --image saathi-frontend:latest .

# 3. Deploy to Container Instances
az container create \
  --resource-group saathi-rg \
  --name saathi-frontend \
  --image saathiacr.azurecr.io/saathi-frontend:latest \
  --dns-name-label saathi-app \
  --ports 3000
```

---

## 🗄️ Database Setup

### MongoDB Atlas (Recommended for Production)

1. **Create Cluster**
   - Go to https://cloud.mongodb.com
   - Create free M0 cluster or paid tier
   - Choose region closest to your users

2. **Configure Network Access**
   - Add IP whitelist: `0.0.0.0/0` (or specific IPs)
   - Create database user

3. **Get Connection String**
```
mongodb+srv://username:password@cluster.mongodb.net/saathi?retryWrites=true&w=majority
```

4. **Set Environment Variable**
```bash
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/saathi
```

### Self-Hosted MongoDB

```bash
# Docker
docker run -d \
  --name mongodb \
  -p 27017:27017 \
  -v /data/mongodb:/data/db \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:7.0

# Ubuntu/Debian
wget -qO - https://www.mongodb.org/static/pgp/server-7.0.asc | sudo apt-key add -
echo "deb [ arch=amd64,arm64 ] https://repo.mongodb.org/apt/ubuntu focal/mongodb-org/7.0 multiverse" | sudo tee /etc/apt/sources.list.d/mongodb-org-7.0.list
sudo apt-get update
sudo apt-get install -y mongodb-org
sudo systemctl start mongod
```

---

## 🔐 Security Configuration

### SSL/TLS Certificate

#### Let's Encrypt (Free)

```bash
# Install Certbot
sudo apt-get install certbot python3-certbot-nginx

# Get certificate
sudo certbot --nginx -d saathi.app -d www.saathi.app

# Auto-renewal
sudo certbot renew --dry-run
```

### Environment Variables

**Never commit these to Git!**

```bash
# Production .env
NODE_ENV=production
NEXT_PUBLIC_API_URL=https://api.saathi.app
MONGODB_URI=mongodb+srv://...
JWT_SECRET=generate_with_openssl_rand_base64_32
OPENAI_API_KEY=sk-...
EMAIL_USER=noreply@saathi.app
EMAIL_PASS=app_specific_password
```

### Firewall Rules

```bash
# UFW (Ubuntu)
sudo ufw allow 22/tcp    # SSH
sudo ufw allow 80/tcp    # HTTP
sudo ufw allow 443/tcp   # HTTPS
sudo ufw enable

# AWS Security Group
# Inbound: 22 (SSH), 80 (HTTP), 443 (HTTPS)
# Outbound: All
```

---

## 📊 Monitoring & Logging

### Application Monitoring

```bash
# Install PM2 for Node.js process management
npm install -g pm2

# Start with PM2
pm2 start server/index.js --name saathi-backend
pm2 start npm --name saathi-frontend -- start

# Monitor
pm2 monit

# Logs
pm2 logs

# Auto-restart on reboot
pm2 startup
pm2 save
```

### Log Aggregation

```yaml
# docker-compose.yml with logging
services:
  frontend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

### Health Checks

```bash
# Add to crontab
*/5 * * * * curl -f https://saathi.app/api/health || echo "Health check failed"
```

---

## 🔄 CI/CD Pipeline

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      
      - name: Build Docker images
        run: |
          docker build -t saathi-frontend .
          docker build -t saathi-backend ./server
      
      - name: Push to Registry
        run: |
          echo ${{ secrets.DOCKER_PASSWORD }} | docker login -u ${{ secrets.DOCKER_USERNAME }} --password-stdin
          docker push saathi-frontend
          docker push saathi-backend
      
      - name: Deploy to Server
        uses: appleboy/ssh-action@master
        with:
          host: ${{ secrets.HOST }}
          username: ${{ secrets.USERNAME }}
          key: ${{ secrets.SSH_KEY }}
          script: |
            cd /app/saathi
            docker-compose pull
            docker-compose up -d
```

---

## 🧪 Testing Before Production

```bash
# Run tests
npm run test

# Build check
npm run build

# Security audit
npm audit

# Load testing
npm install -g artillery
artillery quick --count 100 --num 10 https://saathi.app
```

---

## 📈 Scaling Strategies

### Horizontal Scaling

```yaml
# docker-compose.yml
services:
  frontend:
    deploy:
      replicas: 3
  backend:
    deploy:
      replicas: 5
```

### Load Balancing

```nginx
# nginx.conf
upstream backend {
    server backend1:5000;
    server backend2:5000;
    server backend3:5000;
}

server {
    listen 80;
    location / {
        proxy_pass http://backend;
    }
}
```

---

## 🆘 Troubleshooting

### Common Issues

**Issue**: Container won't start
```bash
# Check logs
docker logs saathi-frontend
docker logs saathi-backend

# Check resources
docker stats
```

**Issue**: Database connection failed
```bash
# Test connection
mongosh "mongodb://localhost:27017/saathi"

# Check network
docker network inspect bridge
```

**Issue**: High memory usage
```bash
# Limit container memory
docker run -m 512m saathi-frontend
```

---

## 📞 Support

For deployment issues:
- Email: devops@saathi.app
- Slack: #deployment-help
- Docs: https://docs.saathi.app

---

**Last Updated**: January 2024
