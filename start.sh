#!/bin/bash

echo "🚀 Starting Saathi Application..."
echo ""

# Start backend in background
echo "📡 Starting Backend Server (Port 5000)..."
cd server && node index.js &
BACKEND_PID=$!

# Wait a bit for backend to start
sleep 2

# Start frontend
echo "🎨 Starting Frontend (Port 3000)..."
cd .. && npm run client

# Cleanup on exit
trap "kill $BACKEND_PID" EXIT
