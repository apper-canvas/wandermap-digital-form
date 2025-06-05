import { useState } from 'react'
import PropTypes from 'prop-types'
import { toast } from 'react-toastify'
import FormField from '../molecules/FormField'
import Button from '../atoms/Button'
import Text from '../atoms/Text'
import Icon from '../atoms/Icon'

const CreateTripForm = ({ onClose, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    startDate: '',
    endDate: '',
    description: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formData.name || !formData.destination || !formData.startDate || !formData.endDate) {
      toast.error("Please fill in all required fields")
      return
    }
    
    const tripData = {
      ...formData,
      coverImage: `https://images.unsplash.com/1600x900/?travel,${formData.destination.toLowerCase().replace(/\s+/g, ',')}`
    }
    onSubmit(tripData)
  }

  return (
    <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-6 glass-morphism">
      <div className="flex items-center justify-between mb-6">
        <Text as="h2" variant="modal-title">Create New Trip</Text>
        <Button onClick={onClose} variant="icon-only">
          <Icon name="X" className="w-5 h-5" />
        </Button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <FormField
          label="Trip Name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="My Amazing Adventure"
          required
        />

        <FormField
          label="Destination"
          name="destination"
          value={formData.destination}
          onChange={handleChange}
          placeholder="Paris, France"
          required
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            label="Start Date"
            type="date"
            name="startDate"
            value={formData.startDate}
            onChange={handleChange}
            required
          />
          <FormField
            label="End Date"
            type="date"
            name="endDate"
            value={formData.endDate}
            onChange={handleChange}
            required
          />
        </div>

        <FormField
          label="Description"
          type="textarea"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={3}
          placeholder="Tell us about your adventure..."
        />

        <div className="flex space-x-3 pt-4">
          <Button
            type="button"
            onClick={onClose}
            variant="secondary"
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="flex-1"
          >
            Create Trip
          </Button>
        </div>
      </form>
    </div>
  )
}

CreateTripForm.propTypes = {
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default CreateTripForm