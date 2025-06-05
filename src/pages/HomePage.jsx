import { useState, useEffect } from 'react'
import { toast } from 'react-toastify'
import AppLayout from '../components/templates/AppLayout'
import TripListGrid from '../components/organisms/TripListGrid'
import LoadingSkeletonSection from '../components/organisms/LoadingSkeletonSection'
import EmptyStateSection from '../components/organisms/EmptyStateSection'
import ComingSoonCard from '../components/molecules/ComingSoonCard'
import TripDetailSection from '../components/organisms/TripDetailSection'
import TabContentDisplay from '../components/organisms/TabContentDisplay'
import FeatureHeader from '../components/molecules/FeatureHeader'
import SearchAndFilterControls from '../components/molecules/SearchAndFilterControls'
import tripService from '../services/api/tripService'
import ModalLayout from '../components/templates/ModalLayout'

const HomePage = () => {
  const [activeTab, setActiveTab] = useState('trips')
  const [trips, setTrips] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [showCreateModal, setShowCreateModal] = useState(false)
  const [searchTerm, setSearchTerm] = useState('')
  const [sortBy, setSortBy] = useState('newest')
  const [viewMode, setViewMode] = useState('grid')
  const [selectedTrip, setSelectedTrip] = useState(null)

  useEffect(() => {
    loadTrips()
  }, [])

  const loadTrips = async () => {
    setLoading(true)
    try {
      const result = await tripService.getAll()
      setTrips(result || [])
    } catch (err) {
      setError(err.message)
      toast.error("Failed to load trips")
    } finally {
      setLoading(false)
    }
  }

  const handleCreateTrip = async (tripData) => {
    try {
      const newTrip = await tripService.create(tripData)
      setTrips(prev => [newTrip, ...(prev || [])])
      setShowCreateModal(false)
      toast.success("Trip created successfully!")
    } catch (err) {
      toast.error("Failed to create trip")
    }
  }

  const handleDeleteTrip = async (tripId) => {
    try {
      await tripService.delete(tripId)
      setTrips(prev => (prev || []).filter(trip => trip?.id !== tripId))
      toast.success("Trip deleted successfully!")
    } catch (err) {
      toast.error("Failed to delete trip")
    }
  }

  const filteredTrips = (trips || []).filter(trip => 
    trip?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    trip?.destination?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const sortedTrips = [...filteredTrips].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b?.id || 0) - new Date(a?.id || 0)
      case 'oldest':
        return new Date(a?.id || 0) - new Date(b?.id || 0)
      case 'name':
        return (a?.name || '').localeCompare(b?.name || '')
      case 'destination':
        return (a?.destination || '').localeCompare(b?.destination || '')
      case 'date':
        return new Date(a?.startDate || 0) - new Date(b?.startDate || 0)
      default:
        return 0
    }
  })

  const tripContent = () => {
    if (loading) {
      return <LoadingSkeletonSection />
    }
  
    if (!trips || trips.length === 0) {
      return <EmptyStateSection onCreateTrip={() => setShowCreateModal(true)} />
    }
  
    return (
      <div className="space-y-6">
        <FeatureHeader 
          title="Your Adventures" 
          count={trips?.length || 0} 
          buttonText="New Trip" 
          onButtonClick={() => setShowCreateModal(true)} 
        />
        <SearchAndFilterControls
          searchTerm={searchTerm}
          onSearchChange={(e) => setSearchTerm(e.target.value)}
          sortBy={sortBy}
          onSortChange={(e) => setSortBy(e.target.value)}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
        />
        <TripListGrid 
          trips={sortedTrips} 
          viewMode={viewMode} 
          onDeleteTrip={handleDeleteTrip} 
          onSelectTrip={setSelectedTrip}
        />
        <ModalLayout onClose={() => setSelectedTrip(null)}>
          {selectedTrip && (
            <TripDetailSection trip={selectedTrip} onClose={() => setSelectedTrip(null)} />
          )}
        </ModalLayout>
      </div>
    )
  }

  const tabContentMap = {
    trips: tripContent(),
    itinerary: <ComingSoonCard icon="Calendar" title="Itinerary Builder" message="Build day-by-day schedules - Coming soon!" />,
    map: <ComingSoonCard icon="Map" title="Interactive Maps" message="Visualize your journey - In development!" />,
    places: <ComingSoonCard icon="MapPin" title="Places Library" message="Save and organize destinations - Almost ready!" />
  }

  return (
    <AppLayout
      activeTab={activeTab}
      onTabChange={setActiveTab}
      mainContent={<TabContentDisplay activeTab={activeTab} contentMap={tabContentMap} />}
      showCreateModal={showCreateModal}
      onCloseCreateModal={() => setShowCreateModal(false)}
      onCreateTripSubmit={handleCreateTrip}
    />
  )
}

export default HomePage