import { AnimatePresence } from 'framer-motion'
import PropTypes from 'prop-types'
import HeaderNav from '../organisms/HeaderNav'
import ModalLayout from './ModalLayout' // Corrected import path
import CreateTripForm from '../organisms/CreateTripForm' // Corrected import path

const AppLayout = ({ 
  activeTab, 
  onTabChange, 
  mainContent, 
  showCreateModal, 
  onCloseCreateModal, 
  onCreateTripSubmit 
}) => {
  const comingSoonItems = [
    { name: 'Expenses', icon: 'DollarSign', message: 'Track your travel budget - Launching next month!' },
    { name: 'Documents', icon: 'FileText', message: 'Document storage arriving soon' },
    { name: 'Packing', icon: 'Package', message: 'Never forget essentials!' },
    { name: 'Weather', icon: 'Cloud', message: 'Weather forecasts coming in v2.0' }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-emerald-50">
      <HeaderNav 
        activeTab={activeTab} 
        onTabChange={onTabChange} 
        comingSoonItems={comingSoonItems} 
      />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {mainContent}
      </main>

      <AnimatePresence>
        {showCreateModal && (
          <ModalLayout onClose={onCloseCreateModal}>
            <CreateTripForm 
              onClose={onCloseCreateModal} 
              onSubmit={onCreateTripSubmit}
            />
          </ModalLayout>
        )}
      </AnimatePresence>
    </div>
  )
}

AppLayout.propTypes = {
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  mainContent: PropTypes.node.isRequired,
  showCreateModal: PropTypes.bool.isRequired,
  onCloseCreateModal: PropTypes.func.isRequired,
  onCreateTripSubmit: PropTypes.func.isRequired,
}

export default AppLayout