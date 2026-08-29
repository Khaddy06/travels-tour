'use client'

import { FileMinus } from 'lucide-react'
import type { Booking } from '@/types'
import { Timestamp } from 'firebase/firestore'

interface BookingTableProps {
  bookings: Booking[]
  onView: (booking: Booking) => void
  onDelete: (booking: Booking) => void
}

const formatDate = (timestamp: Timestamp | null | undefined) => {
  if (!timestamp?.toDate) return ''
  return timestamp.toDate().toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

export default function BookingTable({
  bookings,
  onView,
  onDelete,
}: BookingTableProps) {
  if (bookings.length === 0) {
    return (
      <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
        <div className='text-center py-12'>
          <div className='text-gray-400 mb-4 flex justify-center items-center'>
            <FileMinus className='h-12 w-12 text-gray-400' />
          </div>
          <h3 className='text-lg font-medium text-gray-900 mb-2'>
            No bookings found
          </h3>
          <p className='text-gray-500'>
            Bookings will appear here once customers submit inquiries.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
      {/* Mobile Card View */}
      <div className='block md:hidden divide-y divide-gray-200'>
        {bookings.map((booking: Booking) => (
          <div key={booking.id} className='p-4 hover:bg-gray-50'>
            <div className='flex justify-between items-start mb-3'>
              <div>
                <div className='text-base font-semibold text-gray-900 mb-1'>
                  {booking.name}
                </div>
                <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                  {booking.status || 'pending'}
                </span>
              </div>
              <div className='flex gap-2'>
                <button
                  className='text-teal-600 hover:text-teal-900 text-sm font-medium'
                  onClick={() => onView(booking)}
                >
                  View
                </button>
                <button
                  className='text-red-600 hover:text-red-900 text-sm font-medium'
                  onClick={() => onDelete(booking)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className='space-y-2 text-sm'>
              <div>
                <span className='text-gray-500'>Email: </span>
                <span className='text-gray-900 break-all'>{booking.email}</span>
              </div>
              <div>
                <span className='text-gray-500'>Phone: </span>
                <span className='text-gray-900'>{booking.phone}</span>
              </div>
              <div>
                <span className='text-gray-500'>Destination: </span>
                <span className='text-gray-900'>{booking.destination}</span>
              </div>
              <div>
                <span className='text-gray-500'>Travel Date: </span>
                <span className='text-gray-900'>{booking.travelDate}</span>
              </div>
              <div>
                <span className='text-gray-500'>Travelers: </span>
                <span className='text-gray-900'>{booking.numberOfTravelers}</span>
              </div>
              <div>
                <span className='text-gray-500'>Submitted: </span>
                <span className='text-gray-900'>{formatDate(booking.createdAt)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Desktop Table View */}
      <div className='hidden md:block overflow-x-auto'>
        <table className='min-w-full divide-y divide-gray-200'>
          <thead className='bg-gray-50'>
            <tr>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Customer
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Contact
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Destination
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Travel Date
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:table-cell'>
                Travelers
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Status
              </th>
              <th className='px-4 lg:px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider hidden xl:table-cell'>
                Submitted
              </th>
              <th className='px-4 lg:px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                Actions
              </th>
            </tr>
          </thead>
          <tbody className='bg-white divide-y divide-gray-200'>
            {bookings.map((booking: Booking) => (
              <tr key={booking.id} className='hover:bg-gray-50'>
                <td className='px-4 lg:px-6 py-4'>
                  <div className='text-sm font-medium text-gray-900'>
                    {booking.name}
                  </div>
                </td>
                <td className='px-4 lg:px-6 py-4'>
                  <div className='text-sm text-gray-900 break-all'>
                    {booking.email}
                  </div>
                  <div className='text-sm text-gray-500'>{booking.phone}</div>
                </td>
                <td className='px-4 lg:px-6 py-4'>
                  <div className='text-sm text-gray-900'>{booking.destination}</div>
                </td>
                <td className='px-4 lg:px-6 py-4'>
                  <div className='text-sm text-gray-900'>{booking.travelDate}</div>
                </td>
                <td className='px-4 lg:px-6 py-4 hidden lg:table-cell'>
                  <div className='text-sm text-gray-900'>
                    {booking.numberOfTravelers}
                  </div>
                </td>
                <td className='px-4 lg:px-6 py-4'>
                  <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                    {booking.status || 'pending'}
                  </span>
                </td>
                <td className='px-4 lg:px-6 py-4 hidden xl:table-cell text-sm text-gray-500'>
                  {formatDate(booking.createdAt)}
                </td>
                <td className='px-4 lg:px-6 py-4 text-right text-sm font-medium'>
                  <button
                    className='text-teal-600 hover:text-teal-900 mr-4'
                    onClick={() => onView(booking)}
                  >
                    View
                  </button>
                  <button
                    className='text-red-600 hover:text-red-900'
                    onClick={() => onDelete(booking)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
