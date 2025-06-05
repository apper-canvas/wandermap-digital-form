import PropTypes from 'prop-types'

const Text = ({ children, className, variant = 'body', as = 'p', ...props }) => {
  const Component = as
  let textClasses = ''

  switch (variant) {
    case 'h1':
      textClasses = 'text-xl sm:text-2xl font-heading font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent'
      break
    case 'h2':
      textClasses = 'text-2xl sm:text-3xl font-heading font-bold text-gray-800'
      break
    case 'h3':
      textClasses = 'font-heading font-semibold text-lg text-gray-800'
      break
    case 'h4':
      textClasses = 'font-semibold text-gray-800'
      break
    case 'subheading':
      textClasses = 'text-xs sm:text-sm text-gray-500'
      break
    case 'body':
      textClasses = 'text-gray-600'
      break
    case 'small':
      textClasses = 'text-sm text-gray-500'
      break
    case 'info-label':
      textClasses = 'px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800 rounded-full'
      break
    case 'duration':
      textClasses = 'px-2 py-1 bg-blue-50 text-blue-600 rounded-full text-xs font-medium'
      break
    case 'modal-title':
      textClasses = 'text-2xl font-heading font-semibold text-gray-800'
      break
    case 'modal-subtitle':
      textClasses = 'text-lg text-white/90'
      break
    case 'card-location':
      textClasses = 'text-sm line-clamp-1'
      break
    case 'card-date':
      textClasses = 'text-sm'
      break
    case 'card-description':
      textClasses = 'text-sm text-gray-600 mt-3 line-clamp-2'
      break
    case 'status-badge':
      textClasses = 'text-xs bg-accent/20 text-accent px-1.5 py-0.5 rounded-full'
      break
    default:
      textClasses = 'text-gray-600'
  }

  return (
    <Component className={`${textClasses} ${className || ''}`} {...props}>
      {children}
    </Component>
  )
}

Text.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  variant: PropTypes.oneOf([
    'h1', 'h2', 'h3', 'h4', 'subheading', 'body', 'small', 'info-label',
    'duration', 'modal-title', 'modal-subtitle', 'card-location',
    'card-date', 'card-description', 'status-badge'
  ]),
  as: PropTypes.elementType // Allows specifying 'p', 'span', 'div', etc.
}

export default Text