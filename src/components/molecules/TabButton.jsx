import PropTypes from 'prop-types'
import Button from '../atoms/Button'

const TabButton = ({ tab, activeTab, onClick }) => (
  <Button
    key={tab}
    onClick={() => onClick(tab)}
    variant={activeTab === tab ? 'tab' : 'tab-inactive'}
    className={`${activeTab === tab ? 'bg-primary text-white' : ''}`}
  >
    {tab}
  </Button>
)

TabButton.propTypes = {
  tab: PropTypes.string.isRequired,
  activeTab: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
}

export default TabButton