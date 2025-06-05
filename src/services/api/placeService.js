import placeData from '../mockData/place.json'

// Utility function to simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class PlaceService {
  constructor() {
    this.data = [...placeData]
  }

  async getAll() {
    await delay(300)
    return [...this.data]
  }

  async getById(id) {
    await delay(200)
    const place = this.data.find(item => item.id === id)
    return place ? { ...place } : null
  }

  async getByCategory(category) {
    await delay(250)
    return this.data.filter(item => item.category === category).map(item => ({ ...item }))
  }

  async searchByName(query) {
    await delay(300)
    const lowerQuery = query.toLowerCase()
    return this.data.filter(item => 
      item.name.toLowerCase().includes(lowerQuery) ||
      item.address.toLowerCase().includes(lowerQuery)
    ).map(item => ({ ...item }))
  }

  async create(placeData) {
    await delay(400)
    const newPlace = {
      id: Date.now().toString(),
      ...placeData
    }
    this.data.push(newPlace)
    return { ...newPlace }
  }

  async update(id, updateData) {
    await delay(350)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Place not found')
    }
    
    this.data[index] = { ...this.data[index], ...updateData }
    return { ...this.data[index] }
  }

  async delete(id) {
    await delay(250)
    const index = this.data.findIndex(item => item.id === id)
    if (index === -1) {
      throw new Error('Place not found')
    }
    
    this.data.splice(index, 1)
    return true
  }
}

export default new PlaceService()