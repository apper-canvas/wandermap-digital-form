import activityData from '../mockData/activity.json'

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class ActivityService {
  constructor() {
    this.data = [...activityData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const activity = this.data.find(item => item.id === id)
    return activity ? { ...activity } : null
  }

  async getByItineraryId(itineraryId) {
    await delay(250)
    return this.data.filter(item => item.itineraryId === itineraryId).map(item => ({ ...item }))
  }

  async create(activityData) {
    await delay(400)
    const newActivity = {
      id: Date.now().toString(),
      ...activityData
    }
    this.data.push(newActivity)
    return { ...newActivity }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Activity not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new ActivityService()