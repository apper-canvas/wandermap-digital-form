import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Text from '../atoms/Text'

const ComingSoonTabItem = ({ item, onClick }) => (
  <Button
    key={item.name}
    onClick={onClick}
    variant="text-info"
    className="flex items-center space-x-1"
  >
    <Icon name={item.icon} className="w-4 h-4" />
    <Text as="span">{item.name}</Text>
    <Text as="span" variant="status-badge">Soon</Text>
  </Button>
)

ComingSoonTabItem.propTypes = {
  item: PropTypes.shape({
    name: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
  }).isRequired,
  onClick: PropTypes.func.isRequired,
}

export default ComingSoonTab