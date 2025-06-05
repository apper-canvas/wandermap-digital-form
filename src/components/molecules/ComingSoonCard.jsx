import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

const ComingSoonCard = ({ icon, title, message }) => (
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
      <Icon name={icon} className="w-10 h-10 sm:w-12 sm:h-12 text-gray-400" />
    </motion.div>
    <Text as="h3" variant="h2" className="text-2xl sm:text-3xl font-heading font-semibold mb-3 sm:mb-4">{title}</Text>
    <Text as="p" variant="body" className="text-lg sm:text-xl text-gray-600 max-w-md">{message}</Text>
    <motion.div 
      className="mt-6 sm:mt-8 px-6 py-3 bg-gradient-to-r from-primary/10 to-secondary/10 rounded-full"
      animate={{ scale: [1, 1.05, 1] }}
      transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
    >
      <Text as="span" className="text-sm font-medium text-primary">Coming Soon</Text>
    </motion.div>
  </motion.div>
)

ComingSoonCard.propTypes = {
  icon: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  message: PropTypes.string.isRequired,
}

export default ComingSoonCard