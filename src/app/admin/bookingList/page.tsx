'use client'

import { db } from '@/firebase'
import { query, collection, getDocs, orderBy, doc, deleteDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'
import React from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import toast from 'react-hot-toast'
import DeleteModal from '../../components/DeleteModal'
import { FileMinus } from 'lucide-react'

interface Booking {
  id: string
  name: string
  email: string
  phone: string
  destination: string
  travelDate: string
  numberOfTravelers: number
  message?: string
  createdAt: any
  status?: string
}

const formatDate = (timestamp: any) => {
    if (!timestamp?.toDate) return "";
    return timestamp.toDate().toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

export default function BookingList() {
    const router = useRouter()
  // Mock data for UI preview - remove when connecting to real data
const [bookings, setBookings] = useState<Booking[]>([])
const [deleteModalOpen, setDeleteModalOpen] = useState(false)
const [bookingToDelete, setBookingToDelete] = useState<Booking | null>(null)
const [isDeleting, setIsDeleting] = useState(false)


const fetchBookings = async () => {
    const q =query(
        collection(db, 'bookings'),
        orderBy("createdAt", "desc")
    );
    const snap =await getDocs(q);
    setBookings(snap.docs.map((doc)=>({
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
  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='bg-white rounded-lg shadow-sm p-6 mb-6'>
          <div className='flex justify-between items-center'>
            <div>
              <h1 className='text-3xl font-bold text-teal-800 mb-2'>
                Bookings List
              </h1>
              <p className='text-gray-600'>
                Manage and view all booking inquiries
              </p>
            </div>
            <div className='flex gap-2'>
            <button
            onClick={fetchBookings}
              className='px-4 py-2 bg-teal-600 text-white rounded-lg hover:bg-teal-700 transition-colors font-medium'
            >
              Refresh
            </button>
            <button
            onClick={handleLogout}
              className='px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors font-medium'
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
              {bookings.filter(b => b.status === 'pending').length}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='text-sm text-gray-600 mb-1'>Confirmed</div>
            <div className='text-3xl font-bold text-green-600'>
              {bookings.filter(b => b.status === 'confirmed').length}
            </div>
          </div>
          <div className='bg-white rounded-lg shadow-sm p-6'>
            <div className='text-sm text-gray-600 mb-1'>This Month</div>
            <div className='text-3xl font-bold text-blue-600'>0</div>
          </div>
        </div>

        {/* Bookings Table */}
        <div className='bg-white rounded-lg shadow-sm overflow-hidden'>
          {bookings.length === 0 ? (
            <div className='text-center py-12'>
              <div className='text-gray-400 mb-4 flex justify-center items-center'>
              <FileMinus className='h-12 w-12 text-gray-400' />
              </div>
              <h3 className='text-lg font-medium text-gray-900 mb-2'>No bookings found</h3>
              <p className='text-gray-500'>Bookings will appear here once customers submit inquiries.</p>
            </div>
          ) : (
            <div className='overflow-x-auto'>
              <table className='min-w-full divide-y divide-gray-200'>
                <thead className='bg-gray-50'>
                  <tr>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Customer
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Contact
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Destination
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Travel Date
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Travelers
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Status
                    </th>
                    <th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Submitted
                    </th>
                    <th className='px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider'>
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className='bg-white divide-y divide-gray-200'>
                  {bookings.map((booking) => (
                    <tr key={booking.id} className='hover:bg-gray-50'>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm font-medium text-gray-900'>{booking.name}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{booking.email}</div>
                        <div className='text-sm text-gray-500'>{booking.phone}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{booking.destination}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{booking.travelDate}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <div className='text-sm text-gray-900'>{booking.numberOfTravelers}</div>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap'>
                        <span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800'>
                          {booking.status || 'pending'}
                        </span>
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
                        {formatDate(booking.createdAt)}
                      </td>
                      <td className='px-6 py-4 whitespace-nowrap text-right text-sm font-medium'>
                        {/* <button className='text-teal-600 hover:text-teal-900 mr-4'>
                          View
                        </button> */}
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
          )}
        </div>

        {/* Pagination - placeholder for future implementation */}
        {bookings.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow-sm'>
            <div className='text-sm text-gray-700'>
              Showing <span className='font-medium'>1</span> to <span className='font-medium'>{bookings.length}</span> of{' '}
              <span className='font-medium'>{bookings.length}</span> results
            </div>
            <div className='flex gap-2'>
              <button
                disabled
                className='px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg cursor-not-allowed'
              >
                Previous
              </button>
              <button
                disabled
                className='px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg cursor-not-allowed'
              >
                Next
              </button>
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
    </div>
  )
}
