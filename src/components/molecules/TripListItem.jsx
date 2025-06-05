import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

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
          <Icon name="MapPin" className="w-8 h-8 text-gray-600" />
        </div>
        
        <div className="flex-1 min-w-0">
          <Text as="h3" variant="h3" className="truncate">
            {trip.name || 'Untitled Trip'}
          </Text>
          <Text as="p" className="text-gray-600 truncate">{trip.destination || 'Unknown destination'}</Text>
          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
            <Text as="span">
              {trip.startDate ? format(parseISO(trip.startDate), 'MMM d, yyyy') : 'No date'}
            </Text>
            {trip.endDate && (
              <Text as="span">• {format(parseISO(trip.endDate), 'MMM d, yyyy')}</Text>
            )}
          </div>
        </div>

        <div className="flex items-center space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(trip.id)
            }}
            variant="icon-only" // Use the 'icon-only' variant for better reusability
            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200"
          >
            <Icon name="Trash2" className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </motion.div>
  )
}

TripListItem.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    destination: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TripListItem