import React from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

interface SelectOption {
  value: string
  label: string
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label: string
  error?: FieldError
  register: UseFormRegisterReturn
  options: SelectOption[]
  required?: boolean
  placeholder?: string
}

export default function Select({ 
  label, 
  error, 
  register, 
  options,
  required = false,
  placeholder,
  className = '',
  ...props 
}: SelectProps) {
  return (
    <div>
      <label htmlFor={register.name} className='block text-sm font-medium text-gray-700 mb-1'>
        {label} {required && <span>*</span>}
      </label>
      <select
        id={register.name}
        {...register}
        {...props}
        className={`w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${error ? 'border-red-500' : ''} ${className}`}
      >
        {placeholder && (
          <option value=''>{placeholder}</option>
        )}
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {error && (
        <p className='mt-1 text-sm text-red-600'>{String(error.message)}</p>
      )}
    </div>
  )
}

