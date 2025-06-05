import { AnimatePresence, motion } from 'framer-motion'
import PropTypes from 'prop-types'

const TabContentDisplay = ({ activeTab, contentMap }) => (
  <AnimatePresence mode="wait">
    <motion.div
      key={activeTab}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
    >
      {contentMap[activeTab]}
    </motion.div>
  </AnimatePresence>
)

TabContentDisplay.propTypes = {
  activeTab: PropTypes.string.isRequired,
  contentMap: PropTypes.object.isRequired,
}

export default TabContentDisplay