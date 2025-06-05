import PropTypes from 'prop-types'
import Label from '../atoms/Label'
import Input from '../atoms/Input'

const FormField = ({ label, type = 'text', value, onChange, placeholder, required = false, rows, className }) => {
  return (
    <div>
      <Label className="block text-sm font-medium text-gray-700 mb-2">
        {label} {required && <span className="text-red-500">*</span>}
      </Label>
      {type === 'textarea' ? (
        <textarea
          value={value}
          onChange={onChange}
          rows={rows}
          className={`w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-200 resize-none ${className || ''}`}
          placeholder={placeholder}
        />
      ) : (
        <Input
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={className}
        />
      )}
    </div>
  )
}

FormField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  placeholder: PropTypes.string,
  required: PropTypes.bool,
  rows: PropTypes.number,
  className: PropTypes.string
}

export default FormField