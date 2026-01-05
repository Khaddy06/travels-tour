import React from 'react'
import { UseFormRegisterReturn, FieldError } from 'react-hook-form'

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label: string
  error?: FieldError
  register: UseFormRegisterReturn
  required?: boolean
}

export default function Textarea({ 
  label, 
  error, 
  register, 
  required = false,
  className = '',
  ...props 
}: TextareaProps) {
  return (
    <div>
      <label htmlFor={register.name} className='block text-sm font-medium text-gray-700 mb-1'>
        {label} {required && <span>*</span>}
      </label>
      <textarea
        id={register.name}
        {...register}
        {...props}
        className={`w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none ${error ? 'border-red-500' : ''} ${className}`}
      />
      {error && (
        <p className='mt-1 text-sm text-red-600'>{String(error.message)}</p>
      )}
    </div>
  )
}

