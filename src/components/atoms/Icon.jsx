import PropTypes from 'prop-types'
import ApperIcon from '../ApperIcon' // Keep ApperIcon where it is

const Icon = ({ name, className, ...props }) => {
  return <ApperIcon name={name} className={className} {...props} />
}

Icon.propTypes = {
  name: PropTypes.string.isRequired,
  className: PropTypes.string
}

export default Icon