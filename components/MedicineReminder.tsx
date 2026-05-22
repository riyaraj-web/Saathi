'use client'

import { useState, useEffect } from 'react'
import { Pill, Clock, Check, X, Plus, Bell, Calendar } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import toast from 'react-hot-toast'
import { format, isPast, isToday, addMinutes } from 'date-fns'

interface Medicine {
  _id: string
  name: string
  dosage: string
  frequency: string
  times: string[]
  nextDoseTime: Date
  instructions?: string
  withFood: boolean
  active: boolean
}

export default function MedicineReminder({ userId }: { userId: string }) {
  const [medicines, setMedicines] = useState<Medicine[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMedicines()
    // Check for reminders every minute
    const interval = setInterval(checkReminders, 60000)
    return () => clearInterval(interval)
  }, [userId])

  const fetchMedicines = async () => {
    try {
      const response = await fetch(`/api/medicine/reminders?userId=${userId}`)
      const data = await response.json()
      setMedicines(data.medicines || [])
    } catch (error) {
      console.error('Fetch medicines error:', error)
      toast.error('Failed to load medicines')
    } finally {
      setLoading(false)
    }
  }

  const checkReminders = () => {
    medicines.forEach((medicine) => {
      const nextDose = new Date(medicine.nextDoseTime)
      const now = new Date()
      const diff = nextDose.getTime() - now.getTime()
      
      // Remind 5 minutes before
      if (diff > 0 && diff <= 5 * 60 * 1000) {
        showNotification(medicine)
      }
    })
  }

  const showNotification = (medicine: Medicine) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification('Medicine Reminder', {
        body: `Time to take ${medicine.name} (${medicine.dosage})`,
        icon: '/medicine-icon.png',
        badge: '/badge-icon.png',
      })
    }
    
    toast((t) => (
      <div className="flex items-center space-x-4">
        <Bell className="w-8 h-8 text-primary-600 animate-bounce" />
        <div>
          <p className="font-bold text-lg">Medicine Reminder!</p>
          <p className="text-gray-700">Time to take {medicine.name}</p>
        </div>
      </div>
    ), {
      duration: 10000,
      style: {
        padding: '20px',
      },
    })
  }

  const markAsTaken = async (medicineId: string) => {
    try {
      await fetch('/api/medicine/reminders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medicineId,
          taken: true,
          takenAt: new Date(),
        }),
      })
      
      toast.success('Marked as taken! Well done! 🎉')
      fetchMedicines()
    } catch (error) {
      toast.error('Failed to update')
    }
  }

  const markAsSkipped = async (medicineId: string) => {
    try {
      await fetch('/api/medicine/reminders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          medicineId,
          taken: false,
          takenAt: new Date(),
        }),
      })
      
      toast('Marked as skipped', { icon: '⏭️' })
      fetchMedicines()
    } catch (error) {
      toast.error('Failed to update')
    }
  }

  const getMedicineStatus = (medicine: Medicine) => {
    const nextDose = new Date(medicine.nextDoseTime)
    const now = new Date()
    
    if (isPast(nextDose)) {
      return 'overdue'
    } else if (nextDose.getTime() - now.getTime() <= 30 * 60 * 1000) {
      return 'upcoming'
    }
    return 'scheduled'
  }

  if (loading) {
    return (
      <div className="card">
        <div className="animate-pulse space-y-4">
          <div className="h-8 bg-gray-200 rounded w-1/3"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
          <div className="h-24 bg-gray-200 rounded"></div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center">
            <Pill className="w-8 h-8 text-primary-600" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-gray-900">Medicine Reminders</h2>
            <p className="text-gray-600 text-lg">Stay healthy, stay on track</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary flex items-center space-x-2"
        >
          <Plus className="w-6 h-6" />
          <span>Add Medicine</span>
        </button>
      </div>

      {/* Today's Medicines */}
      <div className="space-y-4">
        <h3 className="text-2xl font-bold text-gray-900">Today's Schedule</h3>
        
        <AnimatePresence>
          {medicines.length === 0 ? (
            <div className="card text-center py-12">
              <Pill className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No medicines added yet</p>
              <p className="text-gray-500 mt-2">Click "Add Medicine" to get started</p>
            </div>
          ) : (
            medicines.map((medicine) => {
              const status = getMedicineStatus(medicine)
              return (
                <motion.div
                  key={medicine._id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`medicine-card ${status}`}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-3">
                        <h4 className="text-2xl font-bold text-gray-900">
                          {medicine.name}
                        </h4>
                        {status === 'overdue' && (
                          <span className="badge-danger">Overdue</span>
                        )}
                        {status === 'upcoming' && (
                          <span className="badge-warning">Soon</span>
                        )}
                      </div>
                      
                      <div className="space-y-2 text-lg text-gray-700">
                        <p className="flex items-center space-x-2">
                          <Pill className="w-5 h-5" />
                          <span><strong>Dosage:</strong> {medicine.dosage}</span>
                        </p>
                        <p className="flex items-center space-x-2">
                          <Clock className="w-5 h-5" />
                          <span>
                            <strong>Next dose:</strong>{' '}
                            {format(new Date(medicine.nextDoseTime), 'h:mm a')}
                          </span>
                        </p>
                        {medicine.withFood && (
                          <p className="text-primary-600 font-medium">
                            ⚠️ Take with food
                          </p>
                        )}
                        {medicine.instructions && (
                          <p className="text-gray-600 italic">
                            {medicine.instructions}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-col space-y-3 ml-6">
                      <button
                        onClick={() => markAsTaken(medicine._id)}
                        className="btn-primary flex items-center space-x-2 min-w-[160px]"
                      >
                        <Check className="w-6 h-6" />
                        <span>Taken</span>
                      </button>
                      <button
                        onClick={() => markAsSkipped(medicine._id)}
                        className="btn-secondary flex items-center space-x-2 min-w-[160px]"
                      >
                        <X className="w-6 h-6" />
                        <span>Skip</span>
                      </button>
                    </div>
                  </div>
                </motion.div>
              )
            })
          )}
        </AnimatePresence>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <div className="card text-center">
          <div className="text-4xl font-bold text-primary-600 mb-2">
            {medicines.length}
          </div>
          <div className="text-gray-600">Active Medicines</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-green-600 mb-2">
            {medicines.filter(m => getMedicineStatus(m) !== 'overdue').length}
          </div>
          <div className="text-gray-600">On Track</div>
        </div>
        <div className="card text-center">
          <div className="text-4xl font-bold text-red-600 mb-2">
            {medicines.filter(m => getMedicineStatus(m) === 'overdue').length}
          </div>
          <div className="text-gray-600">Overdue</div>
        </div>
      </div>
    </div>
  )
}
