'use client'

import { Eye } from 'lucide-react'
import type { Booking } from '@/types'
import { Timestamp } from 'firebase/firestore'

interface BookingDetailsModalProps {
  isOpen: boolean
  booking: Booking | null
  isUpdatingStatus: boolean
  onClose: () => void
  onStatusChange: (status: string) => void
  onDelete: () => void
}

const formatDate = (timestamp: Timestamp | null | undefined) => {
  if (!timestamp?.toDate) return ''
  return timestamp.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BookingDetailsModal({
  isOpen,
  booking,
  isUpdatingStatus,
  onClose,
  onStatusChange,
  onDelete,
}: BookingDetailsModalProps) {
  if (!isOpen || !booking) return null

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center'>
      {/* Backdrop */}
      <div className='absolute inset-0 bg-black bg-opacity-30' onClick={onClose} />

      {/* Modal */}
      <div
        className='relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-300 sticky top-0 bg-white'>
          <div className='flex items-center gap-3'>
            <Eye size={24} className='text-teal-600' />
            <div>
              <h2 className='text-xl font-bold text-gray-900'>Booking Details</h2>
              <p className='text-sm text-gray-600'>{booking.name}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Close modal'
            disabled={isUpdatingStatus}
          >
            <span className='text-2xl'>×</span>
          </button>
        </div>

        {/* Content */}
        <div className='p-6 space-y-6'>
          {/* Customer Information */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Customer Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Name
                </label>
                <p className='text-gray-900'>{booking.name}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Email
                </label>
                <p className='text-gray-900 break-all'>{booking.email}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Phone
                </label>
                <p className='text-gray-900'>{booking.phone}</p>
              </div>
            </div>
          </div>

          {/* Travel Information */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Travel Information
            </h3>
            <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Destination
                </label>
                <p className='text-gray-900'>{booking.destination}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Travel Date
                </label>
                <p className='text-gray-900'>{booking.travelDate}</p>
              </div>
              <div>
                <label className='block text-sm font-medium text-gray-700 mb-1'>
                  Number of Travelers
                </label>
                <p className='text-gray-900'>{booking.numberOfTravelers}</p>
              </div>
            </div>
          </div>

          {/* Message */}
          {booking.message && (
            <div>
              <h3 className='text-lg font-semibold text-gray-900 mb-4'>
                Additional Message
              </h3>
              <div className='bg-gray-50 rounded-lg p-4'>
                <p className='text-gray-700'>{booking.message}</p>
              </div>
            </div>
          )}

          {/* Status Update */}
          <div>
            <h3 className='text-lg font-semibold text-gray-900 mb-4'>
              Update Status
            </h3>
            <div className='flex flex-wrap gap-2'>
              {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                <button
                  key={status}
                  onClick={() => onStatusChange(status)}
                  disabled={isUpdatingStatus}
                  className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                    booking.status === status
                      ? 'bg-teal-600 text-white'
                      : 'bg-gray-200 text-gray-900 hover:bg-gray-300'
                  } disabled:opacity-50 disabled:cursor-not-allowed`}
                >
                  {status.charAt(0).toUpperCase() + status.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Metadata */}
          <div className='pt-4 border-t border-gray-200'>
            <p className='text-sm text-gray-500'>
              Submitted: {formatDate(booking.createdAt)}
            </p>
          </div>
        </div>

        {/* Footer Buttons */}
        <div className='flex gap-4 p-6 border-t border-gray-300 sticky bottom-0 bg-white'>
          <button
            type='button'
            onClick={onClose}
            disabled={isUpdatingStatus}
            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Close
          </button>
          <button
            type='button'
            onClick={onDelete}
            disabled={isUpdatingStatus}
            className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Delete Booking
          </button>
        </div>
      </div>
    </div>
  )
}
