import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ApperIcon from './ApperIcon'
import { format, parseISO, differenceInDays } from 'date-fns'

const MainFeature = ({ trips, loading, onCreateTrip, onDeleteTrip }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedTrip, setSelectedTrip] = useState(null)

  const filteredTrips = (trips || []).filter(trip => 
    trip?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip?.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b?.id || 0) - new Date(a?.id || 0)
      case 'oldest':
        return new Date(a?.id || 0) - new Date(b?.id || 0)
      case 'name':
        return (a?.name || '').localeCompare(b?.name || '')
      case 'destination':
        return (a?.destination || '').localeCompare(b?.destination || '')
      case 'date':
        return new Date(a?.startDate || 0) - new Date(b?.startDate || 0)
      default:
        return 0
    }
  })

  if (loading) {
    return <LoadingSkeleton />
  }

  if (!trips || trips.length === 0) {
    return <EmptyState onCreateTrip={onCreateTrip} />
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div 
        className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div>
          <h2 className="text-2xl sm:text-3xl font-heading font-bold text-gray-800">Your Adventures</h2>
          <p className="text-gray-600 mt-1">
            {trips?.length || 0} {(trips?.length || 0) === 1 ? 'trip' : 'trips'} planned
          </p>
        </div>
        
        <motion.button
          onClick={onCreateTrip}
          className="flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <ApperIcon name="Plus" className="w-5 h-5" />
          <span className="font-medium">New Trip</span>
        </motion.button>
      </motion.div>

      {/* Controls */}
      <motion.div 
        className="flex flex-col sm:flex-row gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <div className="flex-1 relative">
          <ApperIcon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search trips or destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-3 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200"
        >
          <option value="newest">Newest First</option>
          <option value="oldest">Oldest First</option>
          <option value="name">Name A-Z</option>
          <option value="destination">Destination A-Z</option>
          <option value="date">Travel Date</option>
        </select>

        <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
          <button
            onClick={() => setViewMode('grid')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <ApperIcon name="Grid3X3" className="w-5 h-5" />
          </button>
          <button
            onClick={() => setViewMode('list')}
            className={`p-2 rounded-md transition-colors ${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
          >
            <ApperIcon name="List" className="w-5 h-5" />
          </button>
        </div>
      </motion.div>

      {/* Trips Grid/List */}
      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div 
            key="grid"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sortedTrips.map((trip, index) => (
              <TripCard 
                key={trip?.id || index} 
                trip={trip} 
                index={index} 
                onDelete={onDeleteTrip}
                onClick={() => setSelectedTrip(trip)}
              />
            ))}
          </motion.div>
        ) : (
          <motion.div 
            key="list"
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {sortedTrips.map((trip, index) => (
              <TripListItem 
                key={trip?.id || index} 
                trip={trip} 
                index={index} 
                onDelete={onDeleteTrip}
                onClick={() => setSelectedTrip(trip)}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Trip Detail Modal */}
      <AnimatePresence>
        {selectedTrip && (
          <TripDetailModal 
            trip={selectedTrip} 
            onClose={() => setSelectedTrip(null)} 
          />
        )}
      </AnimatePresence>
    </div>
  )
}

const TripCard = ({ trip, index, onDelete, onClick }) => {
  const [imageLoaded, setImageLoaded] = useState(false)
  
  if (!trip) return null

  const getDaysUntil = () => {
    if (!trip.startDate) return null
    const today = new Date()
    const startDate = parseISO(trip.startDate)
    const days = differenceInDays(startDate, today)
    
    if (days < 0) return 'Past trip'
    if (days === 0) return 'Today!'
    if (days === 1) return 'Tomorrow'
    return `${days} days to go`
  }

  const getDuration = () => {
    if (!trip.startDate || !trip.endDate) return null
    const start = parseISO(trip.startDate)
    const end = parseISO(trip.endDate)
    const days = differenceInDays(end, start) + 1
    return `${days} day${days > 1 ? 's' : ''}`
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="group cursor-pointer"
      onClick={onClick}
    >
      <div className="bg-white rounded-2xl shadow-card hover:shadow-xl transition-all duration-300 overflow-hidden">
        {/* Image */}
        <div className="relative h-48 bg-gradient-to-br from-blue-100 to-emerald-100 overflow-hidden">
          {trip.coverImage && (
            <>
              <img
                src={trip.coverImage}
                alt={trip.name || 'Trip'}
                className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(true)}
              />
              {!imageLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <ApperIcon name="MapPin" className="w-12 h-12 text-gray-400 animate-pulse" />
                </div>
              )}
            </>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
          
          {/* Quick Actions */}
          <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            <button
              onClick={(e) => {
                e.stopPropagation()
                onDelete(trip.id)
              }}
              className="p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
            >
              <ApperIcon name="Trash2" className="w-4 h-4 text-red-500" />
            </button>
          </div>

          {/* Days Until */}
          {getDaysUntil() && (
            <div className="absolute bottom-3 left-3">
              <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800 rounded-full">
                {getDaysUntil()}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="font-heading font-semibold text-lg text-gray-800 mb-2 line-clamp-1">
            {trip.name || 'Untitled Trip'}
          </h3>
          
          <div className="flex items-center space-x-2 text-gray-600 mb-3">
            <ApperIcon name="MapPin" className="w-4 h-4" />
            <span className="text-sm line-clamp-1">{trip.destination || 'Unknown destination'}</span>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <ApperIcon name="Calendar" className="w-4 h-4" />
              <span>
                {trip.startDate ? format(parseISO(trip.startDate), 'MMM d') : 'No date'}
                {trip.endDate && ` - ${format(parseISO(trip.endDate), 'MMM d')}`}
              </span>
            </div>
            {getDuration() && (
              <span className="px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium">
                {getDuration()}
              </span>
            )}
          </div>

          {trip.description && (
            <p className="text-sm text-gray-600 mt-3 line-clamp-2">
              {trip.description}
            </p>
          )}
        </div>
      </div>
    </motion.div>
  )
}

const TripListItem = ({ trip, index, onDelete, onClick }) => {
  if (!trip) return null

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      className="bg-white rounded-xl shadow-card hover:shadow-lg transition-all duration-200 p-6 cursor-pointer group"
      onClick={onClick}
    >
      <div className="flex items-center space-x-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-xl flex items-center justify-center flex-shrink-0">
          <ApperIcon name="MapPin" className="w-8 h-8 text-gray-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <h3 className="font-heading font-semibold text-lg text-gray-800 truncate">
            {trip.name || 'Untitled Trip'}
          </h3>
          <p className="text-gray-600 truncate">{trip.destination || 'Unknown destination'}</p>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <span>
              {trip.startDate ? format(parseISO(trip.startDate), 'MMM d, yyyy') : 'No date'}
            </span>
            {trip.endDate && (
              <span>• {format(parseISO(trip.endDate), 'MMM d, yyyy')}</span>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(trip.id)
            }}
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <ApperIcon name="Trash2" className="w-5 h-5" />
          </button>
        </div>
      </div>
    </motion.div>
  )
}

const TripDetailModal = ({ trip, onClose }) => {
  if (!trip) return null

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
      >
        {/* Header Image */}
        <div className="h-64 bg-gradient-to-br from-blue-100 to-emerald-100 relative overflow-hidden">
          {trip.coverImage && (
            <img
              src={trip.coverImage}
              alt={trip.name}
              className="w-full h-full object-cover"
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 p-2 bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-lg transition-colors"
          >
            <ApperIcon name="X" className="w-5 h-5 text-white" />
          </button>
          <div className="absolute bottom-6 left-6 text-white">
            <h2 className="text-3xl font-heading font-bold mb-2">{trip.name}</h2>
            <div className="flex items-center space-x-2 text-white/90">
              <ApperIcon name="MapPin" className="w-5 h-5" />
              <span className="text-lg">{trip.destination}</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 max-h-96 overflow-y-auto">
          <div className="grid grid-cols-2 gap-6 mb-6">
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">Start Date</h4>
              <p className="text-gray-600">
                {trip.startDate ? format(parseISO(trip.startDate), 'EEEE, MMMM d, yyyy') : 'Not set'}
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-gray-800 mb-2">End Date</h4>
              <p className="text-gray-600">
                {trip.endDate ? format(parseISO(trip.endDate), 'EEEE, MMMM d, yyyy') : 'Not set'}
              </p>
            </div>
          </div>

          {trip.description && (
            <div className="mb-6">
              <h4 className="font-semibold text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed">{trip.description}</p>
            </div>
          )}

          <div className="bg-blue-50 rounded-xl p-4">
            <div className="flex items-center space-x-2 mb-2">
              <ApperIcon name="Info" className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-blue-800">Coming Soon</h4>
            </div>
            <p className="text-blue-700 text-sm">
              Detailed itinerary planning, activity management, and interactive maps are currently in development.
            </p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

const LoadingSkeleton = () => (
  <div className="space-y-6">
    <div className="flex justify-between items-center">
      <div>
        <div className="h-8 bg-gray-200 rounded-lg w-48 mb-2 animate-pulse" />
        <div className="h-4 bg-gray-200 rounded w-32 animate-pulse" />
      </div>
      <div className="h-12 bg-gray-200 rounded-xl w-32 animate-pulse" />
    </div>

    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl shadow-card overflow-hidden">
          <div className="h-48 bg-gray-200 animate-pulse" />
          <div className="p-5 space-y-3">
            <div className="h-6 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded w-1/2 animate-pulse" />
          </div>
        </div>
      ))}
    </div>
  </div>
)

const EmptyState = ({ onCreateTrip }) => (
  <motion.div 
    className="flex flex-col items-center justify-center py-16 text-center"
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ duration: 0.5 }}
  >
    <motion.div 
      className="w-32 h-32 bg-gradient-to-br from-blue-100 to-emerald-100 rounded-full flex items-center justify-center mb-8"
      animate={{ float: true }}
      className="animate-float"
    >
      <ApperIcon name="MapPin" className="w-16 h-16 text-gray-400" />
    </motion.div>
    
    <h3 className="text-2xl font-heading font-semibold text-gray-800 mb-4">Ready for your first adventure?</h3>
    <p className="text-gray-600 max-w-md mb-8 text-lg">
      Start planning your dream trip! Create your first travel itinerary and let the wanderlust begin.
    </p>
    
    <motion.button
      onClick={onCreateTrip}
      className="flex items-center space-x-2 px-8 py-4 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200 text-lg font-medium"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <ApperIcon name="Plus" className="w-6 h-6" />
      <span>Create Your First Trip</span>
    </motion.button>
  </motion.div>
)

export default MainFeature