'use client'

import type { Booking } from '@/types'

interface StatsCardsProps {
  bookings: Booking[]
}

const getMonthBookingsCount = (bookings: Booking[]): number => {
  const now = new Date()
  const currentMonth = now.getMonth()
  const currentYear = now.getFullYear()

  return bookings.filter((booking) => {
    if (!booking.createdAt?.toDate) return false
    const bookingDate = booking.createdAt.toDate()
    return (
      bookingDate.getMonth() === currentMonth &&
      bookingDate.getFullYear() === currentYear
    )
  }).length
}

export default function StatsCards({ bookings }: StatsCardsProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-4 gap-4 mb-6'>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='text-sm text-gray-600 mb-1'>Total Bookings</div>
        <div className='text-3xl font-bold text-teal-800'>{bookings.length}</div>
      </div>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='text-sm text-gray-600 mb-1'>Pending</div>
        <div className='text-3xl font-bold text-yellow-600'>
          {bookings.filter((b: Booking) => b.status === 'pending').length}
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='text-sm text-gray-600 mb-1'>Confirmed</div>
        <div className='text-3xl font-bold text-green-600'>
          {bookings.filter((b: Booking) => b.status === 'confirmed').length}
        </div>
      </div>
      <div className='bg-white rounded-lg shadow-sm p-6'>
        <div className='text-sm text-gray-600 mb-1'>This Month</div>
        <div className='text-3xl font-bold text-blue-600'>
          {getMonthBookingsCount(bookings)}
        </div>
      </div>
    </div>
  )
}
