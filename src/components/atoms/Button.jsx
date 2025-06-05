import { motion } from 'framer-motion'
import PropTypes from 'prop-types'

const Button = ({ children, onClick, className, variant = 'primary', whileHover, whileTap, type = 'button', ...props }) => {
  const baseClasses = "flex items-center justify-center space-x-2 px-6 py-3 rounded-xl transition-all duration-200"
  let variantClasses = ""
  let hoverMotionProps = {}

  switch (variant) {
    case 'primary':
      variantClasses = "bg-gradient-to-r from-primary to-secondary text-white hover:shadow-lg transform hover:scale-105"
      hoverMotionProps = { scale: 1.05 }
      break
    case 'secondary':
      variantClasses = "text-gray-600 border border-gray-200 hover:bg-gray-50"
      hoverMotionProps = { scale: 1.02 }
      break
    case 'tab':
      variantClasses = "text-sm sm:text-base font-medium capitalize shadow-card"
      hoverMotionProps = { scale: 1.05 }
      break
    case 'tab-inactive':
      variantClasses = "text-gray-600 hover:text-primary hover:bg-blue-50 text-sm sm:text-base font-medium capitalize"
      hoverMotionProps = { scale: 1.05 }
      break
    case 'icon-only':
      variantClasses = "p-2 hover:bg-gray-100 rounded-lg"
      hoverMotionProps = { scale: 1.05 }
      break
    case 'icon-delete':
      variantClasses = "p-2 bg-white/90 hover:bg-white rounded-lg shadow-sm hover:shadow-md"
      hoverMotionProps = { scale: 1.05 }
      break
    case 'text-info':
      variantClasses = "px-3 py-2 text-sm font-medium text-gray-400 hover:text-gray-600 rounded-lg"
      hoverMotionProps = { scale: 1.05 }
      break
    case 'view-mode':
      variantClasses = "p-2 rounded-md transition-colors"
      hoverMotionProps = {}
      break
    default:
      variantClasses = "bg-blue-500 text-white hover:bg-blue-600"
      hoverMotionProps = { scale: 1.05 }
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variantClasses} ${className || ''}`}
      whileHover={whileHover || hoverMotionProps}
      whileTap={whileTap || { scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  )
}

Button.propTypes = {
  children: PropTypes.node.isRequired,
  onClick: PropTypes.func,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'primary', 'secondary', 'tab', 'tab-inactive', 'icon-only', 
    'icon-delete', 'text-info', 'view-mode'
  ]),
  whileHover: PropTypes.object,
  whileTap: PropTypes.object,
  type: PropTypes.oneOf(['button', 'submit', 'reset'])
}

export default Button