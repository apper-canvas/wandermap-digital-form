import { motion, AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'

const ModalLayout = ({ children, onClose }) => {
  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={onClose} // Close when clicking outside modal content
    >
      <motion.div 
        className="relative"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ type: "spring", damping: 20 }}
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal content
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

ModalLayout.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default ModalLayout