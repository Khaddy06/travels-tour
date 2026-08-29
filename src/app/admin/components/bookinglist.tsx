'use client'

import {
  query,
  collection,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  Timestamp,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import toast from 'react-hot-toast'
import DeleteModal from '../../components/DeleteModal'
import { FileMinus, Eye, Edit2 } from 'lucide-react'
import type { Booking } from '@/types'
import { db } from '@/firebase'




const formatDate = (timestamp: Timestamp | null | undefined) => {
    if (!timestamp?.toDate) return "";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

const getMonthBookingsCount = (bookings: Booking[]): number => {
  const now = new Date();
  const currentMonth = now.getMonth();
  const currentYear = now.getFullYear();
  
  return bookings.filter(booking => {
    if (!booking.createdAt?.toDate) return false;
    const bookingDate = booking.createdAt.toDate();
    return bookingDate.getMonth() === currentMonth && bookingDate.getFullYear() === currentYear;
  }).length;
};

export default function BookingList() {
    const router = useRouter()
  // Mock data for UI preview - remove when connecting to real data
const [bookings, setBookings] = useState<Booking[]>([])
const [deleteModalOpen, setDeleteModalOpen] = useState(false)
const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null)
const [isDeleting, setIsDeleting] = useState(false)
const [viewModalOpen, setViewModalOpen] = useState(false)
const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null)
const [isUpdatingStatus, setIsUpdatingStatus] = useState(false)
const [searchTerm, setSearchTerm] = useState('')
const [statusFilter, setStatusFilter] = useState<string>('')


const fetchBookings = async () => {
    const q =query(
        collection(db, 'bookings'),
        orderBy("createdAt", "desc")
    );
    const snap =await getDocs(q);
    setBookings(snap.docs.map((doc: QueryDocumentSnapshot)=>({
        id: doc.id,
        ...(doc.data() as Omit<Booking, 'id'>)
    })));
};
useEffect(()=>{
   
    fetchBookings();
}, [])

const handleLogout = async () => {
    try{
        await logout()
        toast.success('Logout successful')
        router.push('/admin/login')

    }catch(error){
        console.error(error)
        toast.error('Failed to logout')
    }
};

const handleViewClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setViewModalOpen(true)
};

const handleCloseView = () => {
    setViewModalOpen(false)
    setSelectedBooking(null)
};

const handleStatusChange = async (newStatus: string) => {
    if (!selectedBooking) return
    
    setIsUpdatingStatus(true)
    try {
        await updateDoc(doc(db, 'bookings', selectedBooking.id), {
            status: newStatus
        })
        toast.success(`Status updated to ${newStatus}`)
        fetchBookings()
        setViewModalOpen(false)
        setSelectedBooking(null)
    } catch (error) {
        console.error(error)
        toast.error('Failed to update status')
    } finally {
        setIsUpdatingStatus(false)
    }
};

const handleDeleteClick = (booking: Booking) => {
    setBookingToDelete(booking)
    setDeleteModalOpen(true)
};

const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return
    
    setIsDeleting(true)
    try{
        await deleteDoc(doc(db, 'bookings', bookingToDelete.id))
        toast.success('Booking deleted successfully')
        fetchBookings()
        setDeleteModalOpen(false)
        setBookingToDelete(null)
    }catch(error){
        console.error(error)
        toast.error('Failed to delete booking')
    }finally{
        setIsDeleting(false)
    }
}

const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setBookingToDelete(null)
}

// Filter bookings based on search term and status filter
const filteredBookings = bookings.filter(booking => {
    const matchesSearch = 
        booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        booking.destination.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === '' || booking.status === statusFilter;
    
    return matchesSearch && matchesStatus;
});
  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
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
            onClick={fetchBookings}
              className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium text-sm md:text-base'
            >
              Refresh
            </button>
            <button
            onClick={handleLogout}
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium text-sm md:text-base'
            >
              Logout
            </button>
            </div>
          </div>
        </div>

        {/* Stats Cards */}
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
            <div className='text-3xl font-bold text-blue-600'>{getMonthBookingsCount(bookings)}</div>
          </div>
        </div>

        {/* Search and Filter Section */}
        <div className='bg-white rounded-lg shadow-sm p-4 md:p-6 mb-6'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Search</label>
              <input
                type='text'
                placeholder='Search by name, email, or destination...'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className='w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none'
              />
            </div>
            <div>
              <label className='block text-sm font-medium text-gray-700 mb-2'>Filter by Status</label>
              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
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
            Showing {filteredBookings.length} of {bookings.length} bookings
          </div>
        </div>

        {/* Bookings Table */}
        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          {filteredBookings.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 mb-4 flex justify-center items-center'>
              <FileMinus className='h-12 w-12 text-gray-400' />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>No bookings found</h3>
              <p className='text-gray-500'>Bookings will appear here once customers submit inquiries.</p>
            </div>
          ) : (
            <>
              {/* Mobile Card View */}
              <div className='block md:hidden divide-y divide-gray-200'>
                {filteredBookings.map((booking: Booking) => (
                  <div key={booking.id} className='p-4 hover:bg-gray-50'>
                    <div className='flex justify-between items-start mb-3'>
                      <div>
                        <div className='text-base font-semibold text-gray-900 mb-1'>{booking.name}</div>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          {booking.status || 'pending'}
                        </span>
                      </div>
                      <div className='flex gap-2'>
                        <button 
                          className='text-teal-600 hover:text-teal-900 text-sm font-medium'
                          onClick={()=>handleViewClick(booking)}
                        >
                          View
                        </button>
                        <button 
                          className='text-red-600 hover:text-red-900 text-sm font-medium'
                          onClick={()=>handleDeleteClick(booking)}
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
                    {filteredBookings.map((booking: Booking) => (
                      <tr key={booking.id} className='hover:bg-gray-50'>
                        <td className='px-4 lg:px-6 py-4'>
                          <div className='text-sm font-medium text-gray-900'>{booking.name}</div>
                        </td>
                        <td className='px-4 lg:px-6 py-4'>
                          <div className='text-sm text-gray-900 break-words'>{booking.email}</div>
                          <div className='text-sm text-gray-500'>{booking.phone}</div>
                        </td>
                        <td className='px-4 lg:px-6 py-4'>
                          <div className='text-sm text-gray-900'>{booking.destination}</div>
                        </td>
                        <td className='px-4 lg:px-6 py-4'>
                          <div className='text-sm text-gray-900'>{booking.travelDate}</div>
                        </td>
                        <td className='px-4 lg:px-6 py-4 hidden lg:table-cell'>
                          <div className='text-sm text-gray-900'>{booking.numberOfTravelers}</div>
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
                            onClick={()=>handleViewClick(booking)}
                          >
                            View
                          </button>
                          <button className='text-red-600 hover:text-red-900'
                          onClick={()=>handleDeleteClick(booking)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>

        {/* Info text for filtered results */}
        {filteredBookings.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow-sm'>
            <div className='text-sm text-gray-700'>
              Showing <span className='font-medium'>{filteredBookings.length}</span> of{' '}
              <span className='font-medium'>{bookings.length}</span> total bookings
            </div>
          </div>
        )}
      </div>

      {/* Delete Modal */}
      <DeleteModal
        isOpen={deleteModalOpen}
        onClose={handleDeleteCancel}
        onConfirm={handleDeleteConfirm}
        title='Delete Booking'
        message='Are you sure you want to delete this booking?'
        itemName={bookingToDelete ? `${bookingToDelete.name} - ${bookingToDelete.destination}` : undefined}
        isDeleting={isDeleting}
      />

      {/* View/Edit Modal */}
      {viewModalOpen && selectedBooking && (
        <div className='fixed inset-0 z-50 flex items-center justify-center'>
          {/* Backdrop */}
          <div 
            className='absolute inset-0 bg-black bg-opacity-30'
            onClick={handleCloseView}
          />

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
                  <h2 className='text-xl font-bold text-gray-900'>
                    Booking Details
                  </h2>
                  <p className='text-sm text-gray-600'>{selectedBooking.name}</p>
                </div>
              </div>
              <button
                onClick={handleCloseView}
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
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Customer Information</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Name</label>
                    <p className='text-gray-900'>{selectedBooking.name}</p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Email</label>
                    <p className='text-gray-900 break-all'>{selectedBooking.email}</p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Phone</label>
                    <p className='text-gray-900'>{selectedBooking.phone}</p>
                  </div>
                </div>
              </div>

              {/* Travel Information */}
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Travel Information</h3>
                <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Destination</label>
                    <p className='text-gray-900'>{selectedBooking.destination}</p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Travel Date</label>
                    <p className='text-gray-900'>{selectedBooking.travelDate}</p>
                  </div>
                  <div>
                    <label className='block text-sm font-medium text-gray-700 mb-1'>Number of Travelers</label>
                    <p className='text-gray-900'>{selectedBooking.numberOfTravelers}</p>
                  </div>
                </div>
              </div>

              {/* Message */}
              {selectedBooking.message && (
                <div>
                  <h3 className='text-lg font-semibold text-gray-900 mb-4'>Additional Message</h3>
                  <div className='bg-gray-50 rounded-lg p-4'>
                    <p className='text-gray-700'>{selectedBooking.message}</p>
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div>
                <h3 className='text-lg font-semibold text-gray-900 mb-4'>Update Status</h3>
                <div className='flex flex-wrap gap-2'>
                  {['pending', 'confirmed', 'completed', 'cancelled'].map((status) => (
                    <button
                      key={status}
                      onClick={() => handleStatusChange(status)}
                      disabled={isUpdatingStatus}
                      className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                        selectedBooking.status === status
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
                  Submitted: {formatDate(selectedBooking.createdAt)}
                </p>
              </div>
            </div>

            {/* Footer Buttons */}
            <div className='flex gap-4 p-6 border-t border-gray-300 sticky bottom-0 bg-white'>
              <button
                type='button'
                onClick={handleCloseView}
                disabled={isUpdatingStatus}
                className='flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Close
              </button>
              <button
                type='button'
                onClick={() => {
                  setDeleteModalOpen(true)
                  setBookingToDelete(selectedBooking)
                  handleCloseView()
                }}
                disabled={isUpdatingStatus}
                className='flex-1 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed'
              >
                Delete Booking
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
}

