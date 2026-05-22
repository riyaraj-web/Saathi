import React from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Home, Users, Activity, Bot, Pill } from 'lucide-react'

const BottomNav = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const navItems = [
    { path: '/dashboard', icon: Home, label: 'Home' },
    { path: '/community', icon: Users, label: 'Community' },
    { path: '/ai-companion', icon: Bot, label: 'AI Chat' },
    { path: '/medicine', icon: Pill, label: 'Medicine' },
    { path: '/activities', icon: Activity, label: 'Activities' }
  ]

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t-2 border-gray-200 shadow-lg z-50">
      <div className="max-w-4xl mx-auto flex justify-around items-center py-3">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = location.pathname === item.path
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center space-y-1 px-4 py-2 rounded-xl transition-all ${
                isActive
                  ? 'text-primary-600 bg-primary-50'
                  : 'text-gray-600 hover:text-primary-600 hover:bg-warm-50'
              }`}
            >
              <Icon className={`w-7 h-7 ${isActive ? 'scale-110' : ''}`} />
              <span className="text-xs font-medium">{item.label}</span>
            </button>
          )
        })}
      </div>
    </div>
  )
}

export default BottomNav
