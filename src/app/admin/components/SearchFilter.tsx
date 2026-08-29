'use client'

interface SearchFilterProps {
  searchTerm: string
  statusFilter: string
  totalBookings: number
  filteredCount: number
  onSearchChange: (term: string) => void
  onStatusChange: (status: string) => void
}

export default function SearchFilter({
  searchTerm,
  statusFilter,
  totalBookings,
  filteredCount,
  onSearchChange,
  onStatusChange,
}: SearchFilterProps) {
  return (
    <div className='bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6'>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Search
          </label>
          <input
            type='text'
            placeholder='Search by name, email, or destination...'
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none'
          />
        </div>
        <div>
          <label className='block text-sm font-medium text-gray-700 mb-2'>
            Filter by Status
          </label>
          <select
            value={statusFilter}
            onChange={(e) => onStatusChange(e.target.value)}
            className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none'
          >
            <option value=''>All Status</option>
            <option value='pending'>Pending</option>
            <option value='confirmed'>Confirmed</option>
            <option value='completed'>Completed</option>
            <option value='cancelled'>Cancelled</option>
          </select>
        </div>
      </div>
      <div className='mt-4 text-sm text-gray-600'>
        Showing {filteredCount} of {totalBookings} bookings
      </div>
    </div>
  )
}
