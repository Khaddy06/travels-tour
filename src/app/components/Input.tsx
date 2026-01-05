import React from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: FieldError
  register: UseFormRegisterReturn
  required?: boolean
}

export default function Input({ 
  label, 
  error, 
  register, 
  required = false,
  className = '',
  ...props 
}: InputProps) {
  return (
    <div>
      <label htmlFor={register.name} className='block text-sm font-medium text-gray-700 mb-1'>
        {label} {required && <span>*</span>}
      </label>
      <input
        id={register.name}
        {...register}
        {...props}
        className={`w-full px-4 py-2 border border-gray-300 rounded-lg text-gray-700 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none ${error ? 'border-red-500' : ''} ${className}`}
      />
      {error && (
        <p className='mt-1 text-sm text-red-600'>{String(error.message)}</p>
      )}
    </div>
  )
}

