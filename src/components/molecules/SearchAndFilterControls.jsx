import { motion } from 'framer-motion'
import PropTypes from 'prop-types'
import Button from '../atoms/Button'
import Icon from '../atoms/Icon'
import Input from '../atoms/Input'
import Select from '../atoms/Select'

const SearchAndFilterControls = ({ searchTerm, onSearchChange, sortBy, onSortChange, viewMode, onViewModeChange }) => {
  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'name', label: 'Name A-Z' },
    { value: 'destination', label: 'Destination A-Z' },
    { value: 'date', label: 'Travel Date' },
  ]

  return (
    <motion.div 
      className="flex flex-col sm:flex-row gap-4 p-4 bg-white/60 backdrop-blur-md rounded-2xl border border-white/20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <div className="flex-1 relative">
        <Icon name="Search" className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <Input
          type="text"
          placeholder="Search trips or destinations..."
          value={searchTerm}
          onChange={onSearchChange}
          className="pl-10"
        />
      </div>

      <Select
        value={sortBy}
        onChange={onSortChange}
        options={sortOptions}
      />

      <div className="flex items-center space-x-2 bg-gray-100 p-1 rounded-lg">
        <Button
          onClick={() => onViewModeChange('grid')}
          variant="view-mode"
          className={`${viewMode === 'grid' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
        >
          <Icon name="Grid3X3" className="w-5 h-5" />
        </Button>
        <Button
          onClick={() => onViewModeChange('list')}
          variant="view-mode"
          className={`${viewMode === 'list' ? 'bg-white shadow-sm' : 'hover:bg-gray-200'}`}
        >
          <Icon name="List" className="w-5 h-5" />
        </Button>
      </div>
    </motion.div>
  )
}

SearchAndFilterControls.propTypes = {
  searchTerm: PropTypes.string.isRequired,
  onSearchChange: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  onSortChange: PropTypes.func.isRequired,
  viewMode: PropTypes.string.isRequired,
  onViewModeChange: PropTypes.func.isRequired,
}

export default SearchAndFilterControls