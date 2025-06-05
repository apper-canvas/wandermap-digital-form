import { useState } from 'react'
import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { format, parseISO, differenceInDays } from 'date-fns'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'
import Button from '../atoms/Button'
import CardImage from '../atoms/CardImage'

const TripCard = ({ trip, index, onDelete, onClick }) => {
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
        <CardImage src={trip.coverImage} alt={trip.name || 'Trip'} daysUntil={getDaysUntil()} />
        
        {/* Quick Actions */}
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            onClick={(e) => {
              e.stopPropagation()
              onDelete(trip.id)
            }}
            variant="icon-delete"
          >
            <Icon name="Trash2" className="w-4 h-4 text-red-500" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-5">
          <Text as="h3" variant="h3" className="mb-2 line-clamp-1">
            {trip.name || 'Untitled Trip'}
          </Text>
          
          <div className="flex items-center space-x-2 text-gray-600 mb-3">
            <Icon name="MapPin" className="w-4 h-4" />
            <Text as="span" variant="card-location">{trip.destination || 'Unknown destination'}</Text>
          </div>

          <div className="flex items-center justify-between text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Icon name="Calendar" className="w-4 h-4" />
              <Text as="span" variant="card-date">
                {trip.startDate ? format(parseISO(trip.startDate), 'MMM d') : 'No date'}
                {trip.endDate && ` - ${format(parseISO(trip.endDate), 'MMM d')}`}
              </Text>
            </div>
            {getDuration() && (
              <Text as="span" variant="duration">
                {getDuration()}
              </Text>
            )}
          </div>

          {trip.description && (
            <Text as="p" variant="card-description">
              {trip.description}
            </Text>
          )}
        </div>
      </div>
    </motion.div>
  )
}

TripCard.propTypes = {
  trip: PropTypes.shape({
    id: PropTypes.string,
    name: PropTypes.string,
    destination: PropTypes.string,
    startDate: PropTypes.string,
    endDate: PropTypes.string,
    description: PropTypes.string,
    coverImage: PropTypes.string,
  }),
  index: PropTypes.number.isRequired,
  onDelete: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TripCard