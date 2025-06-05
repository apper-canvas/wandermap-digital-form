import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from '../components/ApperIcon'
import MainFeature from '../components/MainFeature'
import tripService from '../services/api/tripService'
import { toast } from 'react-toastify'

const Home = () => {
  const [activeTab, setActiveTab] = useState('trips')
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = async () => {
    setLoading(true)
    try {
      const result = await tripService.getAll()
      setTrips(result || [])
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load trips")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTrip = async (tripData) => {
    try {
      const newTrip = await tripService.create(tripData)
      setTrips(prev => [newTrip, ...(prev || [])])
      setShowCreateModal(false)
      toast.success("Trip created successfully!")
    } catch (err) {
      toast.error("Failed to create trip")
    }
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.delete(tripId)
      setTrips(prev => (prev || []).filter(trip => trip?.id !== tripId))
      toast.success("Trip deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete trip")
    }
  }

  const comingSoonItems = [
    { name: 'Expenses', icon: 'DollarSign', message: 'Track your travel budget - Launching next month!' },
    { name: 'Documents', icon: 'FileText', message: 'Document storage arriving soon' },
    { name: 'Packing', icon: 'Package', message: 'Never forget essentials!' },
    { name: 'Weather', icon: 'Cloud', message: 'Weather forecasts coming in v2.0' }
  ]

  const tabContent = {
    trips: <MainFeature trips={trips} loading={loading} onCreateTrip={() => setShowCreateModal(true)} onDeleteTrip={handleDeleteTrip} />,
    itinerary: <ComingSoonContent icon="Calendar" title="Itinerary Builder" message="Build day-by-day schedules - Coming soon!" />,
    map: <ComingSoonContent icon="Map" title="Interactive Maps" message="Visualize your journey - In development!" />,
    places: <ComingSoonContent icon="MapPin" title="Places Library" message="Save and organize destinations - Almost ready!" />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      {/* Header */}
      <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-soft">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 sm:h-20">
            <motion.div 
              className="flex items-center space-x-3"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
                <ApperIcon name="Compass" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <div>
                <h1 className="text-xl sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  WanderMap
                </h1>
                <p className="text-xs sm:text-sm text-gray-500 hidden sm:block">Your Travel Planning Companion</p>
              </div>
            </motion.div>

            <nav className="flex items-center space-x-1 sm:space-x-2">
              {['trips', 'itinerary', 'map', 'places'].map((tab) => (
                <motion.button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-3 py-2 sm:px-4 sm:py-2 text-sm sm:text-base font-medium rounded-xl transition-all duration-300 capitalize ${
                    activeTab === tab 
                      ? 'bg-primary text-white shadow-card' 
                      : 'text-gray-600 hover:text-primary hover:bg-blue-50'
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {tab}
                </motion.button>
              ))}
              
              <div className="hidden sm:flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
                {comingSoonItems.map((item) => (
                  <motion.button
                    key={item.name}
                    onClick={() => toast.info(item.message)}
                    className="px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 rounded-lg transition-colors duration-200 flex items-center space-x-1"
                    whileHover={{ scale: 1.05 }}
                  >
                    <ApperIcon name={item.icon} className="w-4 h-4" />
                    <span>{item.name}</span>
                    <span className="text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded-full">Soon</span>
                  </motion.button>
                ))}
              </div>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {tabContent[activeTab]}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Create Trip Modal */}
      <AnimatePresence>
        {showCreateModal && (
          <CreateTripModal 
            onClose={() => setShowCreateModal(false)} 
            onSubmit={handleCreateTrip}
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const ComingSoonContent = ({ icon, title, message }) => (
  <motion.div 
    className="flex flex-col items-center justify-center py-16 sm:py-24 text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mb-6 sm:mb-8"
      animate={{ 
        rotate: [0, 360],
        scale: [1, 1.1, 1] 
      }}
      transition={{ 
        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
        scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
      }}
    >
      <ApperIcon name={icon} className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
    </motion.div>
    <h3 className="text-2xl sm:text-3xl font-heading font-semibold text-gray-800 mb-3 sm:mb-4">{title}</h3>
    <p className="text-lg sm:text-xl text-gray-600 max-w-md">{message}</p>
    <motion.div 
      className="mt-6 sm:mt-8 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <span className="text-sm font-medium text-primary">Coming Soon</span>
    </motion.div>
  </motion.div>
)

const CreateTripModal = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.destination || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }
    
    const tripData = {
      ...formData,
      coverImage: `https://images.unsplash.com/1600x900/?travel,${formData.destination.toLowerCase().replace(/\s+/g, ',')}`
    }
    onSubmit(tripData)
  }

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 glass-morphism"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-heading font-semibold text-gray-800">Create New Trip</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <ApperIcon name="X" className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Trip Name *</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="My Amazing Adventure"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Destination *</label>
            <input
              type="text"
              value={formData.destination}
              onChange={(e) => setFormData({...formData, destination: e.target.value})}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              placeholder="Paris, France"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Start Date *</label>
              <input
                type="date"
                value={formData.startDate}
                onChange={(e) => setFormData({...formData, startDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">End Date *</label>
              <input
                type="date"
                value={formData.endDate}
                onChange={(e) => setFormData({...formData, endDate: e.target.value})}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              rows={3}
              className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none"
              placeholder="Tell us about your adventure..."
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 text-gray-600 border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors duration-200"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
            >
              Create Trip
            </button>
          </div>
        </form>
      </motion.div>
    </motion.div>
  )
}

export default Home