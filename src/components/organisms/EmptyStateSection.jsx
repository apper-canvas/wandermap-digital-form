import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

const EmptyStateSection = ({ onCreateTrip }) => (
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
      <Icon name="MapPin" className="w-16 h-16 text-gray-400" />
    </motion.div>
    
    <Text as="h3" variant="h2" className="mb-4">Ready for your first adventure?</Text>
    <Text as="p" className="text-gray-600 max-w-md mb-8 text-lg">
      Start planning your dream trip! Create your first travel itinerary and let the wanderlust begin.
    </Text>
    
    <Button
      onClick={onCreateTrip}
      variant="primary"
      className="px-8 py-4 text-lg font-medium"
    >
      <Icon name="Plus" className="w-6 h-6" />
      <span>Create Your First Trip</span>
    </Button>
  </motion.div>
)

EmptyStateSection.propTypes = {
  onCreateTrip: PropTypes.func.isRequired,
}

export default EmptyStateSection