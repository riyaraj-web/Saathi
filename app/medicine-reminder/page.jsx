'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowLeft, Plus, Bell, Clock, Pill, Trash2, Check, AlertCircle } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { toast } from 'react-toastify'
import { format } from 'date-fns'

export default function MedicineReminder() {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [medicines, setMedicines] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    times: ['09:00'],
    frequency: 'daily',
    withFood: false,
    notes: ''
  })

  useEffect(() => {
    const savedUser = localStorage.getItem('saathiUser')
    if (savedUser) {
      const userData = JSON.parse(savedUser)
      setUser(userData)
      
      // Load medicines
      const savedMedicines = localStorage.getItem(`medicines_${userData.id}`)
      if (savedMedicines) {
        setMedicines(JSON.parse(savedMedicines))
      }

      // Check for pending reminders
      checkReminders(userData.id)
    } else {
      router.push('/welcome')
    }

    // Set up interval to check reminders every minute
    const interval = setInterval(() => {
      if (savedUser) {
        checkReminders(JSON.parse(savedUser).id)
      }
    }, 60000)

    return () => clearInterval(interval)
  }, [router])

  const checkReminders = (userId) => {
    const savedMedicines = localStorage.getItem(`medicines_${userId}`)
    if (!savedMedicines) return

    const meds = JSON.parse(savedMedicines)
    const now = new Date()
    const currentTime = format(now, 'HH:mm')

    meds.forEach(med => {
      med.times.forEach(time => {
        if (time === currentTime && !med.takenToday) {
          // Show notification
          if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('Medicine Reminder', {
              body: `Time to take ${med.name} - ${med.dosage}`,
              icon: '/medicine-icon.png',
              badge: '/badge-icon.png'
            })
          }

          // Show toast
          toast.info(`⏰ Time to take ${med.name}!`, {
            autoClose: false,
            onClick: () => markAsTaken(med.id)
          })

          // Play sound
          playReminderSound()
        }
      })
    })
  }

  const playReminderSound = () => {
    const audio = new Audio('/reminder-sound.mp3')
    audio.play().catch(e => console.log('Audio play failed:', e))
  }

  const requestNotificationPermission = async () => {
    if ('Notification' in window && Notification.permission === 'default') {
      const permission = await Notification.requestPermission()
      if (permission === 'granted') {
        toast.success('Notifications enabled!')
      }
    }
  }

  const addMedicine = () => {
    if (!newMedicine.name || !newMedicine.dosage) {
      toast.error('Please fill in medicine name and dosage')
      return
    }

    const medicine = {
      id: Date.now(),
      ...newMedicine,
      createdAt: new Date().toISOString(),
      takenToday: false
    }

    const updatedMedicines = [...medicines, medicine]
    setMedicines(updatedMedicines)
    localStorage.setItem(`medicines_${user.id}`, JSON.stringify(updatedMedicines))

    setNewMedicine({
      name: '',
      dosage: '',
      times: ['09:00'],
      frequency: 'daily',
      withFood: false,
      notes: ''
    })
    setShowAddForm(false)
    toast.success('Medicine added successfully!')
    requestNotificationPermission()
  }

  const deleteMedicine = (id) => {
    const updatedMedicines = medicines.filter(m => m.id !== id)
    setMedicines(updatedMedicines)
    localStorage.setItem(`medicines_${user.id}`, JSON.stringify(updatedMedicines))
    toast.success('Medicine removed')
  }

  const markAsTaken = (id) => {
    const updatedMedicines = medicines.map(m => 
      m.id === id ? { ...m, takenToday: true, lastTaken: new Date().toISOString() } : m
    )
    setMedicines(updatedMedicines)
    localStorage.setItem(`medicines_${user.id}`, JSON.stringify(updatedMedicines))
    toast.success('✓ Marked as taken!')
  }

  const addTime = () => {
    setNewMedicine({
      ...newMedicine,
      times: [...newMedicine.times, '12:00']
    })
  }

  const updateTime = (index, value) => {
    const newTimes = [...newMedicine.times]
    newTimes[index] = value
    setNewMedicine({ ...newMedicine, times: newTimes })
  }

  const removeTime = (index) => {
    if (newMedicine.times.length > 1) {
      const newTimes = newMedicine.times.filter((_, i) => i !== index)
      setNewMedicine({ ...newMedicine, times: newTimes })
    }
  }

  if (!user) return null

  return (
    <div className="min-h-screen pb-20">
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-teal-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => router.push('/dashboard')}
            className="p-2 hover:bg-white/20 rounded-full transition-colors mb-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Pill className="w-8 h-8" />
              </div>
              <div>
                <h1 className="text-3xl font-bold mb-1">Medicine Reminder</h1>
                <p className="text-green-100 text-lg">Never miss your medications</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Add Medicine Button */}
        {!showAddForm && (
          <motion.button
            onClick={() => setShowAddForm(true)}
            className="btn-primary w-full flex items-center justify-center space-x-2"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus className="w-6 h-6" />
            <span>Add New Medicine</span>
          </motion.button>
        )}

        {/* Add Medicine Form */}
        <AnimatePresence>
          {showAddForm && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="card space-y-4"
            >
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Add New Medicine</h3>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Medicine Name *
                </label>
                <input
                  type="text"
                  value={newMedicine.name}
                  onChange={(e) => setNewMedicine({ ...newMedicine, name: e.target.value })}
                  className="input-field"
                  placeholder="e.g., Aspirin, Metformin"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Dosage *
                </label>
                <input
                  type="text"
                  value={newMedicine.dosage}
                  onChange={(e) => setNewMedicine({ ...newMedicine, dosage: e.target.value })}
                  className="input-field"
                  placeholder="e.g., 1 tablet, 5ml"
                />
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Reminder Times
                </label>
                {newMedicine.times.map((time, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <input
                      type="time"
                      value={time}
                      onChange={(e) => updateTime(index, e.target.value)}
                      className="input-field flex-1"
                    />
                    {newMedicine.times.length > 1 && (
                      <button
                        onClick={() => removeTime(index)}
                        className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition-colors"
                      >
                        <Trash2 className="w-5 h-5 text-red-600" />
                      </button>
                    )}
                  </div>
                ))}
                <button
                  onClick={addTime}
                  className="btn-secondary text-base py-2 px-4 min-h-0"
                >
                  + Add Another Time
                </button>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Frequency
                </label>
                <select
                  value={newMedicine.frequency}
                  onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
                  className="input-field"
                >
                  <option value="daily">Daily</option>
                  <option value="weekly">Weekly</option>
                  <option value="as-needed">As Needed</option>
                </select>
              </div>

              <div className="flex items-center space-x-3">
                <input
                  type="checkbox"
                  id="withFood"
                  checked={newMedicine.withFood}
                  onChange={(e) => setNewMedicine({ ...newMedicine, withFood: e.target.checked })}
                  className="w-6 h-6 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                />
                <label htmlFor="withFood" className="text-lg text-gray-700">
                  Take with food
                </label>
              </div>

              <div>
                <label className="block text-lg font-semibold text-gray-900 mb-2">
                  Notes (Optional)
                </label>
                <textarea
                  value={newMedicine.notes}
                  onChange={(e) => setNewMedicine({ ...newMedicine, notes: e.target.value })}
                  className="input-field min-h-[100px]"
                  placeholder="Any special instructions..."
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button onClick={addMedicine} className="btn-primary flex-1">
                  Save Medicine
                </button>
                <button 
                  onClick={() => setShowAddForm(false)}
                  className="btn-secondary flex-1"
                >
                  Cancel
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Medicine List */}
        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-gray-900">Your Medicines</h2>

          {medicines.length === 0 ? (
            <div className="card text-center py-12">
              <Pill className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <p className="text-xl text-gray-600">No medicines added yet</p>
              <p className="text-gray-500 mt-2">Add your first medicine to get started</p>
            </div>
          ) : (
            medicines.map((medicine) => (
              <motion.div
                key={medicine.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card ${medicine.takenToday ? 'bg-green-50 border-green-300' : ''}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h3 className="text-2xl font-bold text-gray-900">{medicine.name}</h3>
                      {medicine.takenToday && (
                        <span className="flex items-center space-x-1 text-green-600 font-semibold">
                          <Check className="w-5 h-5" />
                          <span>Taken</span>
                        </span>
                      )}
                    </div>
                    <p className="text-lg text-gray-700 mb-3">Dosage: {medicine.dosage}</p>

                    <div className="space-y-2">
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Clock className="w-5 h-5" />
                        <span>Times: {medicine.times.join(', ')}</span>
                      </div>
                      <div className="flex items-center space-x-2 text-gray-600">
                        <Bell className="w-5 h-5" />
                        <span>Frequency: {medicine.frequency}</span>
                      </div>
                      {medicine.withFood && (
                        <div className="flex items-center space-x-2 text-orange-600">
                          <AlertCircle className="w-5 h-5" />
                          <span>Take with food</span>
                        </div>
                      )}
                      {medicine.notes && (
                        <p className="text-gray-600 italic mt-2">{medicine.notes}</p>
                      )}
                    </div>
                  </div>

                  <button
                    onClick={() => deleteMedicine(medicine.id)}
                    className="p-3 bg-red-100 hover:bg-red-200 rounded-xl transition-colors"
                  >
                    <Trash2 className="w-6 h-6 text-red-600" />
                  </button>
                </div>

                {!medicine.takenToday && (
                  <button
                    onClick={() => markAsTaken(medicine.id)}
                    className="btn-primary w-full flex items-center justify-center space-x-2"
                  >
                    <Check className="w-6 h-6" />
                    <span>Mark as Taken</span>
                  </button>
                )}
              </motion.div>
            ))
          )}
        </div>

        {/* Info Card */}
        <div className="card bg-gradient-to-br from-blue-50 to-green-50">
          <div className="flex items-start space-x-4">
            <Bell className="w-8 h-8 text-blue-600 flex-shrink-0" />
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Smart Reminders</h3>
              <p className="text-lg text-gray-700 leading-relaxed">
                We'll send you notifications at the scheduled times. Make sure to enable 
                notifications in your browser settings for the best experience.
              </p>
              <button
                onClick={requestNotificationPermission}
                className="mt-4 btn-secondary text-base py-2 px-4 min-h-0"
              >
                Enable Notifications
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
