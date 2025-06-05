import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import ApperIcon from '../components/ApperIcon'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50 flex items-center justify-center px-4">
      <motion.div 
        className="text-center max-w-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div 
          className="w-24 h-24 mx-auto mb-8 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center"
          animate={{ 
            rotate: [0, 360],
            scale: [1, 1.1, 1] 
          }}
          transition={{ 
            rotate: { duration: 20, repeat: Infinity, ease: "linear" },
            scale: { duration: 2, repeat: Infinity, ease: "easeInOut" }
          }}
        >
          <ApperIcon name="MapPin" className="w-12 h-12 text-gray-400" />
        </motion.div>
        
        <motion.h1 
          className="text-6xl font-heading font-bold text-gray-800 mb-4"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          404
        </motion.h1>
        
        <motion.h2 
          className="text-2xl font-heading font-semibold text-gray-700 mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          Lost on your journey?
        </motion.h2>
        
        <motion.p 
          className="text-gray-600 mb-8 text-lg"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          The page you're looking for seems to have wandered off the map. Let's get you back on track!
        </motion.p>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
        >
          <Link 
            to="/"
            className="inline-flex items-center space-x-2 px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white rounded-xl hover:shadow-lg transform hover:scale-105 transition-all duration-200"
          >
            <ApperIcon name="Home" className="w-5 h-5" />
            <span className="font-medium">Return Home</span>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default NotFound