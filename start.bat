@echo off
echo Starting Saathi Application...
echo.

echo Starting Backend Server (Port 5000)...
start "Saathi Backend" cmd /k "cd server && node index.js"

timeout /t 2 /nobreak > nul

echo Starting Frontend (Port 3000)...
start "Saathi Frontend" cmd /k "npm run client"

echo.
echo Both servers are starting!
echo Backend: http://localhost:5000
echo Frontend: http://localhost:3000
echo.
echo Press any key to exit...
pause > nul
