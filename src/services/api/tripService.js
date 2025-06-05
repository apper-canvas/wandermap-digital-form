import tripData from '../mockData/trip.json'

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class TripService {
  constructor() {
    this.data = [...tripData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const trip = this.data.find(item => item.id === id)
    return trip ? { ...trip } : null
  }

  async create(tripData) {
    await delay(400)
    const newTrip = {
      id: Date.now().toString(),
      ...tripData,
      createdAt: new Date().toISOString()
    }
    this.data.unshift(newTrip)
    return { ...newTrip }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Trip not found')
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Trip not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new TripService()