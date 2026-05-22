import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ArrowLeft, Plus, Pill, Clock, Bell, Trash2, Edit, Check, AlertCircle } from 'lucide-react'

const MedicineReminder = ({ user }) => {
  const navigate = useNavigate()
  const [medicines, setMedicines] = useState([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [newMedicine, setNewMedicine] = useState({
    name: '',
    dosage: '',
    times: [''],
    frequency: 'daily',
    withFood: false,
    notes: ''
  })

  useEffect(() => {
    // Load medicines from localStorage
    const saved = localStorage.getItem(`medicines_${user.id}`)
    if (saved) {
      setMedicines(JSON.parse(saved))
    }
  }, [user.id])

  const saveMedicines = (updatedMedicines) => {
    setMedicines(updatedMedicines)
    localStorage.setItem(`medicines_${user.id}`, JSON.stringify(updatedMedicines))
  }

  const handleAddMedicine = () => {
    if (newMedicine.name && newMedicine.dosage && newMedicine.times[0]) {
      const medicine = {
        id: Date.now(),
        ...newMedicine,
        createdAt: new Date().toISOString()
      }
      saveMedicines([...medicines, medicine])
      setNewMedicine({
        name: '',
        dosage: '',
        times: [''],
        frequency: 'daily',
        withFood: false,
        notes: ''
      })
      setShowAddForm(false)
    }
  }

  const handleDeleteMedicine = (id) => {
    saveMedicines(medicines.filter(m => m.id !== id))
  }

  const addTimeSlot = () => {
    setNewMedicine({
      ...newMedicine,
      times: [...newMedicine.times, '']
    })
  }

  const updateTimeSlot = (index, value) => {
    const newTimes = [...newMedicine.times]
    newTimes[index] = value
    setNewMedicine({ ...newMedicine, times: newTimes })
  }

  const getTodaysMedicines = () => {
    const now = new Date()
    const currentHour = now.getHours()
    const currentMinute = now.getMinutes()
    
    return medicines.flatMap(med => 
      med.times.map(time => {
        const [hour, minute] = time.split(':').map(Number)
        const isPast = hour < currentHour || (hour === currentHour && minute < currentMinute)
        return {
          ...med,
          time,
          isPast,
          isUpcoming: !isPast && hour === currentHour
        }
      })
    ).sort((a, b) => a.time.localeCompare(b.time))
  }

  const todaysMedicines = getTodaysMedicines()
  const upcomingMedicines = todaysMedicines.filter(m => !m.isPast)

  if (showAddForm) {
    return (
      <div className="min-h-screen bg-warm-50 pb-20">
        <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
          <div className="max-w-4xl mx-auto">
            <button 
              onClick={() => setShowAddForm(false)}
              className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
            >
              <ArrowLeft className="w-7 h-7" />
            </button>
            <h1 className="text-3xl font-bold">Add Medicine</h1>
          </div>
        </div>

        <div className="max-w-4xl mx-auto px-4 mt-6">
          <div className="card space-y-6">
            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                Medicine Name
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
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                Dosage
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
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                Times
              </label>
              {newMedicine.times.map((time, index) => (
                <div key={index} className="mb-3">
                  <input
                    type="time"
                    value={time}
                    onChange={(e) => updateTimeSlot(index, e.target.value)}
                    className="input-field"
                  />
                </div>
              ))}
              <button
                onClick={addTimeSlot}
                className="btn-secondary w-full"
              >
                <Plus className="w-6 h-6 inline mr-2" />
                Add Another Time
              </button>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                Frequency
              </label>
              <select
                value={newMedicine.frequency}
                onChange={(e) => setNewMedicine({ ...newMedicine, frequency: e.target.value })}
                className="input-field"
              >
                <option value="daily">Daily</option>
                <option value="alternate">Alternate Days</option>
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
                className="w-7 h-7 rounded border-gray-300"
              />
              <label htmlFor="withFood" className="text-xl text-gray-900">
                Take with food
              </label>
            </div>

            <div>
              <label className="block text-xl font-semibold text-gray-900 mb-3">
                Notes (Optional)
              </label>
              <textarea
                value={newMedicine.notes}
                onChange={(e) => setNewMedicine({ ...newMedicine, notes: e.target.value })}
                className="input-field min-h-[100px]"
                placeholder="Any special instructions..."
              />
            </div>

            <button onClick={handleAddMedicine} className="btn-primary w-full">
              Save Medicine
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-warm-50 pb-20">
      <div className="bg-gradient-to-r from-primary-500 to-primary-600 text-white p-6 rounded-b-3xl shadow-lg">
        <div className="max-w-4xl mx-auto">
          <button 
            onClick={() => navigate('/dashboard')}
            className="p-2 hover:bg-primary-600 rounded-full transition-colors mb-4"
          >
            <ArrowLeft className="w-7 h-7" />
          </button>
          <h1 className="text-3xl font-bold mb-2">Medicine Reminder</h1>
          <p className="text-primary-100 text-lg">Never miss your medication</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-6 space-y-6">
        {/* Upcoming Reminder */}
        {upcomingMedicines.length > 0 && (
          <div className="card bg-gradient-to-r from-red-50 to-orange-50 border-red-300">
            <div className="flex items-start space-x-4">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center animate-pulse">
                <Bell className="w-8 h-8 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">Time for Medicine!</h3>
                <div className="space-y-2">
                  {upcomingMedicines.slice(0, 2).map((med, idx) => (
                    <div key={idx} className="bg-white p-4 rounded-xl">
                      <p className="text-xl font-semibold text-gray-900">{med.name}</p>
                      <p className="text-gray-700">{med.dosage} at {med.time}</p>
                      {med.withFood && (
                        <p className="text-sm text-orange-600 mt-1">⚠️ Take with food</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Add Medicine Button */}
        <button
          onClick={() => setShowAddForm(true)}
          className="btn-primary w-full flex items-center justify-center space-x-2"
        >
          <Plus className="w-7 h-7" />
          <span>Add New Medicine</span>
        </button>

        {/* Today's Schedule */}
        <div className="card">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Today's Schedule</h2>
          {todaysMedicines.length === 0 ? (
            <p className="text-lg text-gray-600 text-center py-8">
              No medicines scheduled. Add your first medicine above.
            </p>
          ) : (
            <div className="space-y-3">
              {todaysMedicines.map((med, idx) => (
                <div
                  key={idx}
                  className={`p-5 rounded-xl border-2 ${
                    med.isPast
                      ? 'bg-gray-50 border-gray-300 opacity-60'
                      : med.isUpcoming
                      ? 'bg-orange-50 border-orange-400'
                      : 'bg-white border-gray-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-12 h-12 rounded-full flex items-center justify-center ${
                        med.isPast ? 'bg-gray-300' : 'bg-primary-100'
                      }`}>
                        <Pill className={`w-6 h-6 ${med.isPast ? 'text-gray-600' : 'text-primary-600'}`} />
                      </div>
                      <div>
                        <p className="text-xl font-bold text-gray-900">{med.name}</p>
                        <p className="text-gray-700">{med.dosage}</p>
                        {med.withFood && (
                          <p className="text-sm text-orange-600">With food</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold text-gray-900">{med.time}</p>
                      {med.isPast && (
                        <p className="text-sm text-green-600 flex items-center">
                          <Check className="w-4 h-4 mr-1" />
                          Taken
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* All Medicines */}
        {medicines.length > 0 && (
          <div className="card">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">All Medicines</h2>
            <div className="space-y-4">
              {medicines.map((med) => (
                <div key={med.id} className="p-5 bg-warm-50 rounded-xl">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h3 className="text-xl font-bold text-gray-900">{med.name}</h3>
                      <p className="text-gray-700">{med.dosage}</p>
                      <p className="text-gray-600 capitalize">{med.frequency}</p>
                    </div>
                    <button
                      onClick={() => handleDeleteMedicine(med.id)}
                      className="p-2 hover:bg-red-100 rounded-full transition-colors"
                    >
                      <Trash2 className="w-6 h-6 text-red-600" />
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {med.times.map((time, idx) => (
                      <span
                        key={idx}
                        className="px-4 py-2 bg-primary-100 text-primary-700 rounded-full font-medium"
                      >
                        <Clock className="w-4 h-4 inline mr-1" />
                        {time}
                      </span>
                    ))}
                  </div>
                  {med.notes && (
                    <p className="mt-3 text-gray-600 italic">{med.notes}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default MedicineReminder
