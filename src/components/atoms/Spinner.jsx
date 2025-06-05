import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const spinnerVariants = {
  animate: {
    rotate: 360,
  },
}

const Spinner = ({ size = 'md', className, color = 'blue-500' }) => {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8',
    xl: 'w-10 h-10',
  }
  return (
    <motion.div
      className={`animate-spin rounded-full border-2 border-t-2 border-${color} border-t-transparent ${sizeClasses[size]} ${className}`}
      variants={spinnerVariants}
      animate="animate"
      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
    />
  )
}

Spinner.propTypes = {
  size: PropTypes.oneOf(['sm', 'md', 'lg', 'xl']),
  className: PropTypes.string,
  color: PropTypes.string,
}

export default Spinner