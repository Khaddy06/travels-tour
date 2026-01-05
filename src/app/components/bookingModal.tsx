'use client'

import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { X } from 'lucide-react'
import { createBooking } from '@/services/booking'
import Input from './Input'
import Textarea from './Textarea'
import Select from './Select'
import { schema } from '@/services/schema'



type BookingModalProps = {
  isOpen: boolean
  onClose: () => void
  destination?: string
}

const destinationOptions = [
  { value: 'Indonesia', label: 'Indonesia' },
  { value: 'Rwanda', label: 'Rwanda' },
  { value: 'Lebanon', label: 'Lebanon' },
  { value: 'Thailand', label: 'Thailand' },
  { value: 'Qatar', label: 'Qatar' }
]

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [submitError, setSubmitError] = useState<string | null>(null)
  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema)
  })

 const onSubmit = async (data: any) => {
   try{
    await createBooking(data)
    alert('Booking created successfully')
    reset()
   } catch (error) {
    console.error(error)
    setSubmitError('Failed to create booking')
   }
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
      <div 
        className='relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
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
        <form onSubmit={handleSubmit(onSubmit)} className='p-6' noValidate>
          <div className='space-y-4'>
            <Input
              label='Full Name'
              register={register('name')}
              error={errors.name}
              type='text'
              placeholder='Enter your full name'
              required
            />

            <Input
              label='Email Address'
              register={register('email')}
              error={errors.email}
              type='email'
              placeholder='Enter your email'
              required
            />

            <Input
              label='Phone Number'
              register={register('phone')}
              error={errors.phone}
              type='tel'
              placeholder='Enter your phone number'
              required
            />

            <Select
              label='Destination'
              register={register('destination')}
              error={errors.destination}
              options={destinationOptions}
              placeholder='Select a destination'
              required
            />

            <Input
              label='Travel Date'
              register={register('travelDate')}
              error={errors.travelDate}
              type='date'
              required
            />

            <Input
              label='Number of Travelers'
              register={register('numberOfTravelers', { valueAsNumber: true })}
              error={errors.numberOfTravelers}
              type='number'
              min={1}
              placeholder='Enter number of travelers'
              required
            />

            <Textarea
              label='Additional Message'
              register={register('message')}
              error={errors.message}
              rows={4}
              placeholder='Any special requests or additional information...'
            />
          </div>

          {/* Submit Error */}
          {submitError && (
            <div className='mt-4 p-3 bg-red-50 border border-red-200 rounded-lg'>
              <p className='text-sm text-red-600'>{submitError}</p>
            </div>
          )}

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
              disabled={isSubmitting}
              className='flex-1 px-6 py-3 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
            >
              {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

