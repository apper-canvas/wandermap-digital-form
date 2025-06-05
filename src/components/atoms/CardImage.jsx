import { useState } from 'react'
import PropTypes from 'prop-types'
import ApperIcon from '../ApperIcon' // Keep ApperIcon where it is

const CardImage = ({ src, alt, daysUntil }) => {
  const [imageLoaded, setImageLoaded] = useState(false)

  return (
    <div className="relative h-48 bg-gradient-to-br from-blue-100 to-emerald-100 overflow-hidden">
      {src && (
        <>
          <img
            src={src}
            alt={alt}
            className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-110 ${
              imageLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(true)} // Still set loaded to true on error to hide spinner
          />
          {!imageLoaded && (
            <div className="absolute inset-0 flex items-center justify-center">
              <ApperIcon name="MapPin" className="w-12 h-12 text-gray-400 animate-pulse" />
            </div>
          )}
        </>
      )}
      
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
      
      {daysUntil && (
        <div className="absolute bottom-3 left-3">
          <span className="px-3 py-1 bg-white/90 backdrop-blur-sm text-sm font-medium text-gray-800 rounded-full">
            {daysUntil}
          </span>
        </div>
      )}
    </div>
  )
}

CardImage.propTypes = {
  src: PropTypes.string,
  alt: PropTypes.string,
  daysUntil: PropTypes.string
}

export default CardImage