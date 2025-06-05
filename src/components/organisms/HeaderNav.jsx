import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import Icon from '../atoms/Icon'
import Title from '../atoms/Title'
import Text from '../atoms/Text'
import TabButton from '../molecules/TabButton'
import ComingSoonTabItem from '../molecules/ComingSoonTabItem'

const HeaderNav = ({ activeTab, onTabChange, comingSoonItems }) => {
  return (
    <header className="sticky top-0 z-40 backdrop-blur-md bg-white/80 border-b border-white/20 shadow-soft">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <motion.div 
            className="flex items-center space-x-3"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-card">
              <Icon name="Compass" className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
            </div>
            <div>
              <Title as="h1">WanderMap</Title>
              <Text as="p" variant="subheading" className="hidden sm:block">Your Travel Planning Companion</Text>
            </div>
          </motion.div>

          <nav className="flex items-center space-x-1 sm:space-x-2">
            {['trips', 'itinerary', 'map', 'places'].map((tab) => (
              <TabButton 
                key={tab}
                tab={tab}
                activeTab={activeTab}
                onClick={onTabChange}
              />
            ))}
            
            <div className="hidden sm:flex items-center space-x-2 ml-4 pl-4 border-l border-gray-200">
              {comingSoonItems.map((item) => (
                <ComingSoonTabItem
                  key={item.name}
                  item={item}
                  onClick={() => toast.info(item.message)}
                />
              ))}
            </div>
          </nav>
        </div>
      </div>
    </header>
  )
}

HeaderNav.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  comingSoonItems: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      icon: PropTypes.string.isRequired,
      message: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default HeaderNav