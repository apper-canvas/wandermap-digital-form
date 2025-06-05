import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { format, parseISO } from 'date-fns'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'

const TripDetailSection = ({ trip, onClose }) => {
  if (!trip) return null

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden">
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
        <Button 
          onClick={onClose}
          variant="icon-only"
          className="absolute top-4 right-4 bg-white/20 backdrop-blur-sm hover:bg-white/30"
        >
          <Icon name="X" className="w-5 h-5 text-white" />
        </Button>
        <div className="absolute bottom-6 left-6 text-white">
          <Text as="h2" variant="h2" className="text-3xl font-heading font-bold mb-2">{trip.name}</Text>
          <div className="flex items-center space-x-2 text-white/90">
            <Icon name="MapPin" className="w-5 h-5" />
            <Text as="span" variant="modal-subtitle">{trip.destination}</Text>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 max-h-96 overflow-y-auto">
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <Text as="h4" variant="h4" className="mb-2">Start Date</Text>
            <Text as="p" className="text-gray-600">
              {trip.startDate ? format(parseISO(trip.startDate), 'EEEE, MMMM d, yyyy') : 'Not set'}
            </Text>
          </div>
          <div>
            <Text as="h4" variant="h4" className="mb-2">End Date</Text>
            <Text as="p" className="text-gray-600">
              {trip.endDate ? format(parseISO(trip.endDate), 'EEEE, MMMM d, yyyy') : 'Not set'}
            </Text>
          </div>
        </div>

        {trip.description && (
          <div className="mb-6">
            <Text as="h4" variant="h4" className="mb-2">Description</Text>
            <Text as="p" className="text-gray-600 leading-relaxed">{trip.description}</Text>
          </div>
        )}

        <div className="bg-blue-50 rounded-xl p-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Info" className="w-5 h-5 text-blue-600" />
            <Text as="h4" variant="h4" className="text-blue-800">Coming Soon</Text>
          </div>
          <Text as="p" className="text-blue-700 text-sm">
            Detailed itinerary planning, activity management, and interactive maps are currently in development.
          </Text>
        </div>
      </div>
    </div>
  )
}

TripDetailSection.propTypes = {
  trip: PropTypes.shape({
    name: PropTypes.string,
    destination: PropTypes.string,
    coverImage: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string,
  }),
  onClose: PropTypes.func.isRequired,
}

export default TripDetailSection