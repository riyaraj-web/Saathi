import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Welcome from './pages/Welcome'
import Dashboard from './pages/Dashboard'
import DailyCheckin from './pages/DailyCheckin'
import SocialHealth from './pages/SocialHealth'
import MemorySharing from './pages/MemorySharing'
import Community from './pages/Community'
import Activities from './pages/Activities'
import FamilyConnect from './pages/FamilyConnect'
import MedicineReminder from './pages/MedicineReminder'
import AICompanion from './pages/AICompanion'
import BottomNav from './components/BottomNav'

function App() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user exists in localStorage
    const savedUser = localStorage.getItem('invisibleElderUser')
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    setLoading(false)
  }, [])

  const handleLogin = (userData) => {
    setUser(userData)
    localStorage.setItem('invisibleElderUser', JSON.stringify(userData))
  }

  const handleLogout = () => {
    setUser(null)
    localStorage.removeItem('invisibleElderUser')
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-warm-50">
        <div className="text-2xl text-primary-600">Loading...</div>
      </div>
    )
  }

  return (
    <Router>
      <div className={user ? 'pb-28' : ''}>
        <Routes>
          <Route 
            path="/" 
            element={user ? <Navigate to="/dashboard" /> : <Welcome onLogin={handleLogin} />} 
          />
          <Route 
            path="/dashboard" 
            element={user ? <Dashboard user={user} onLogout={handleLogout} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/checkin" 
            element={user ? <DailyCheckin user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/social-health" 
            element={user ? <SocialHealth user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/memories" 
            element={user ? <MemorySharing user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/community" 
            element={user ? <Community user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/activities" 
            element={user ? <Activities user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/family" 
            element={user ? <FamilyConnect user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/medicine" 
            element={user ? <MedicineReminder user={user} /> : <Navigate to="/" />} 
          />
          <Route 
            path="/ai-companion" 
            element={user ? <AICompanion user={user} /> : <Navigate to="/" />} 
          />
        </Routes>
      </div>
      {user && <BottomNav />}
    </Router>
  )
}

export default App
