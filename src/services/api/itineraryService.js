import itineraryData from '../mockData/itinerary.json'

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ItineraryService {
  constructor() {
    this.data = [...itineraryData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const itinerary = this.data.find(item => item.id === id)
    return itinerary ? { ...itinerary } : null
  }

  async getByTripId(tripId) {
    await delay(250)
    return this.data.filter(item => item.tripId === tripId).map(item => ({ ...item }))
  }

  async create(itineraryData) {
    await delay(400)
    const newItinerary = {
      id: Date.now().toString(),
      ...itineraryData,
      activities: itineraryData.activities || []
    }
    this.data.push(newItinerary)
    return { ...newItinerary }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Itinerary not found')
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Itinerary not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new ItineraryService()