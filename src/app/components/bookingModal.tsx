'use client'

import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'
import { X } from 'lucide-react'

const schema = yup.object({
  name: yup.string().required('Name is required'),
  email: yup.string().email('Invalid email address').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  destination: yup.string().required('Destination is required'),
  travelDate: yup.string().required('Travel date is required'),
  numberOfTravelers: yup.number().min(1, 'At least 1 traveler required').required('Number of travelers is required'),
  message: yup.string().notRequired()
})

type FormData = yup.InferType<typeof schema>

interface BookingModalProps {
  isOpen: boolean
  onClose: () => void
  destination?: string
}

export default function BookingModal({ isOpen, onClose, destination }: BookingModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm({
    resolver: yupResolver(schema) as any
  })

  useEffect(() => {
    if (destination) {
      setValue('destination', destination)
    }
  }, [destination, setValue])

  useEffect(() => {
    if (!isOpen) {
      reset()
    }
  }, [isOpen, reset])

  const onSubmit = (data: any) => {
    console.log('Form submitted:', data)
    // Handle form submission here (e.g., send to API, Firebase, etc.)
    alert('Thank you for your booking inquiry! We will contact you soon.')
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div 
        className='absolute inset-0 bg-black bg-opacity-30'
        onClick={onClose}
      />

      {/* Modal */}
      <div className='relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'>
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-300'>
          <h2 className='text-2xl font-bold text-teal-600'>
            Book Your Travel Package
          </h2>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Close modal'
          >
            <X size={24} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className='p-6'>
          <div className='space-y-4'>
            {/* Name */}
            <div>
              <label htmlFor='name' className='block text-sm font-medium text-gray-700 mb-1'>
                Full Name *
              </label>
              <input
                id='name'
                type='text'
                {...register('name')}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none'
                placeholder='Enter your full name'
              />
              {errors.name && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.name.message)}</p>
              )}
            </div>

            {/* Email */}
            <div>
              <label htmlFor='email' className='block text-sm font-medium text-gray-700 mb-1'>
                Email Address *
              </label>
              <input
                id='email'
                type='email'
                {...register('email')}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none'
                placeholder='Enter your email'
              />
              {errors.email && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.email.message)}</p>
              )}
            </div>

            {/* Phone */}
            <div>
              <label htmlFor='phone' className='block text-sm font-medium text-gray-700 mb-1'>
                Phone Number *
              </label>
              <input
                id='phone'
                type='tel'
                {...register('phone')}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none'
                placeholder='Enter your phone number'
              />
              {errors.phone && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.phone.message)}</p>
              )}
            </div>

            {/* Destination */}
            <div>
              <label htmlFor='destination' className='block text-sm font-medium text-gray-700 mb-1'>
                Destination *
              </label>
              <select
                id='destination'
                {...register('destination')}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none'
              >
                <option value=''>Select a destination</option>
                <option value='Indonesia'>Indonesia</option>
                <option value='Rwanda'>Rwanda</option>
                <option value='Lebanon'>Lebanon</option>
                <option value='Thailand'>Thailand</option>
                <option value='Qatar'>Qatar</option>
              </select>
              {errors.destination && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.destination.message)}</p>
              )}
            </div>

            {/* Travel Date */}
            <div>
              <label htmlFor='travelDate' className='block text-sm font-medium text-gray-700 mb-1'>
                Travel Date *
              </label>
              <input
                id='travelDate'
                type='date'
                {...register('travelDate')}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none'
              />
              {errors.travelDate && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.travelDate.message)}</p>
              )}
            </div>

            {/* Number of Travelers */}
            <div>
              <label htmlFor='numberOfTravelers' className='block text-sm font-medium text-gray-700 mb-1'>
                Number of Travelers *
              </label>
              <input
                id='numberOfTravelers'
                type='number'
                min='1'
                {...register('numberOfTravelers', { valueAsNumber: true })}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none'
                placeholder='Enter number of travelers'
              />
              {errors.numberOfTravelers && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.numberOfTravelers.message)}</p>
              )}
            </div>

            {/* Message */}
            <div>
              <label htmlFor='message' className='block text-sm font-medium text-gray-700 mb-1'>
                Additional Message
              </label>
              <textarea
                id='message'
                {...register('message')}
                rows={4}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none resize-none'
                placeholder='Any special requests or additional information...'
              />
              {errors.message && (
                <p className='mt-1 text-sm text-red-600'>{String(errors.message.message)}</p>
              )}
            </div>
          </div>

          {/* Buttons */}
          <div className='flex gap-4 mt-6'>
            <button
              type='button'
              onClick={onClose}
              className='flex-1 px-6 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium'
            >
              Cancel
            </button>
            <button
              type='submit'
              className='flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium'
            >
              Submit Inquiry
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

