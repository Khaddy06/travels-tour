'use client'

interface BookingHeaderProps {
  onRefresh: () => void
  onLogout: () => void
}

export default function BookingHeader({ onRefresh, onLogout }: BookingHeaderProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6'>
      <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-4'>
        <div>
          <h1 className='text-2xl md:text-3xl font-bold text-teal-800 mb-2'>
            Bookings List
          </h1>
          <p className='text-gray-600 text-sm md:text-base'>
            Manage and view all booking inquiries
          </p>
        </div>
        <div className='flex gap-2'>
          <button
            onClick={onRefresh}
            className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm md:text-base'
          >
            Refresh
          </button>
          <button
            onClick={onLogout}
            className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm md:text-base'
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  )
}
