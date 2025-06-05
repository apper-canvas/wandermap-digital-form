import PropTypes from 'prop-types'
import { motion } from 'framer-motion'

const Title = ({ children, as = 'h1', className, animationProps = {} }) => {
  const Component = as
  const baseClasses = "font-heading font-bold"
  let sizeClasses = ""

  switch (as) {
    case 'h1':
      sizeClasses = "text-xl sm:text-2xl bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
      break
    case 'h2':
      sizeClasses = "text-2xl sm:text-3xl text-gray-800"
      break
    case 'h3':
      sizeClasses = "text-lg text-gray-800"
      break
    default:
      sizeClasses = "text-xl text-gray-800"
  }

  return (
    <motion.div {...animationProps}>
      <Component className={`${baseClasses} ${sizeClasses} ${className || ''}`}>
        {children}
      </Component>
    </motion.div>
  )
}

Title.propTypes = {
  children: PropTypes.node.isRequired,
  as: PropTypes.oneOf(['h1', 'h2', 'h3']),
  className: PropTypes.string,
  animationProps: PropTypes.object
}

export default Title