import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import TripCard from '../molecules/TripCard'
import TripListItem from '../molecules/TripListItem'

const TripListGrid = ({ trips, viewMode, onDeleteTrip, onSelectTrip }) => (
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
        {trips.map((trip, index) => (
          <TripCard 
            key={trip?.id || index} 
            trip={trip} 
            index={index} 
            onDelete={onDeleteTrip}
            onClick={() => onSelectTrip(trip)}
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
        {trips.map((trip, index) => (
          <TripListItem 
            key={trip?.id || index} 
            trip={trip} 
            index={index} 
            onDelete={onDeleteTrip}
            onClick={() => onSelectTrip(trip)}
          />
        ))}
      </motion.div>
    )}
  </AnimatePresence>
)

TripListGrid.propTypes = {
  trips: PropTypes.arrayOf(PropTypes.object).isRequired,
  viewMode: PropTypes.string.isRequired,
  onDeleteTrip: PropTypes.func.isRequired,
  onSelectTrip: PropTypes.func.isRequired,
}

export default TripListGrid