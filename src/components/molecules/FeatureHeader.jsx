import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

const FeatureHeader = ({ title, count, buttonText, onButtonClick }) => (
  <motion.div 
    className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
  >
    <div>
      <Text as="h2" variant="h2">{title}</Text>
      <Text as="p" className="text-gray-600 mt-1">
        {count} {count === 1 ? 'trip' : 'trips'} planned
      </Text>
    </div>
    
    <Button
      onClick={onButtonClick}
      variant="primary"
    >
      <Icon name="Plus" className="w-5 h-5" />
      <span className="font-medium">{buttonText}</span>
    </Button>
  </motion.div>
)

FeatureHeader.propTypes = {
  title: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  buttonText: PropTypes.string.isRequired,
  onButtonClick: PropTypes.func.isRequired,
}

export default FeatureHeader