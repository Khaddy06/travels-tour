'use client'

import React from 'react'
import { X} from 'lucide-react'

interface DeleteModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
  title: string
  message: string
  itemName?: string
  isDeleting?: boolean
}

export default function DeleteModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  itemName,
  isDeleting = false
}: DeleteModalProps) {
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
        className='relative bg-white bg-opacity-90 backdrop-blur-md rounded-lg shadow-xl max-w-md w-full mx-4'
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className='flex items-center justify-between p-6 border-b border-gray-300'>
          <div className='flex items-center gap-3'>
            <h2 className='text-xl font-bold text-gray-900'>
              {title}
            </h2>
          </div>
          <button
            onClick={onClose}
            className='text-gray-400 hover:text-gray-600 transition-colors'
            aria-label='Close modal'
            disabled={isDeleting}
          >
            <X size={24} />
          </button>
        </div>

        {/* Content */}
        <div className='p-6'>
          <p className='text-gray-700 mb-4'>
            {message}
          </p>
          {itemName && (
            <div className='bg-gray-50 rounded-lg p-3 mb-4'>
              <p className='text-sm font-medium text-gray-900'>{itemName}</p>
            </div>
          )}
          <p className='text-sm text-gray-500'>
            This action cannot be undone.
          </p>
        </div>

        {/* Footer Buttons */}
        <div className='flex gap-4 p-6 border-t border-gray-300'>
          <button
            type='button'
            onClick={onClose}
            disabled={isDeleting}
            className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            Cancel
          </button>
          <button
            type='button'
            onClick={onConfirm}
            disabled={isDeleting}
            className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
          >
            {isDeleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </div>
    </div>
  )
}

