'use client'

import {
  query,
  collection,
  getDocs,
  orderBy,
  doc,
  deleteDoc,
  updateDoc,
  QueryDocumentSnapshot,
} from 'firebase/firestore'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { logout } from '@/lib/auth'
import toast from 'react-hot-toast'
import DeleteModal from '../../components/DeleteModal'
import BookingHeader from './BookingHeader'
import StatsCards from './StatsCards'
import SearchFilter from './SearchFilter'
import BookingTable from './BookingTable'
import BookingDetailsModal from './BookingDetailsModal'
import type { Booking } from '@/types'
import { db } from '@/firebase'

export default function BookingList() {
  const router = useRouter()
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
    const q = query(
      collection(db, 'bookings'),
      orderBy('createdAt', 'desc')
    )
    const snap = await getDocs(q)
    setBookings(
      snap.docs.map((doc: QueryDocumentSnapshot) => ({
        id: doc.id,
        ...(doc.data() as Omit<Booking, 'id'>),
      }))
    )
  }

  useEffect(() => {
    fetchBookings()
  }, [])

  const handleLogout = async () => {
    try {
      await logout()
      toast.success('Logout successful')
      router.push('/admin/login')
    } catch (error) {
      console.error(error)
      toast.error('Failed to logout')
    }
  }

  const handleViewClick = (booking: Booking) => {
    setSelectedBooking(booking)
    setViewModalOpen(true)
  }

  const handleCloseView = () => {
    setViewModalOpen(false)
    setSelectedBooking(null)
  }

  const handleStatusChange = async (newStatus: string) => {
    if (!selectedBooking) return

    setIsUpdatingStatus(true)
    try {
      await updateDoc(doc(db, 'bookings', selectedBooking.id), {
        status: newStatus,
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
  }

  const handleDeleteClick = (booking: Booking) => {
    setBookingToDelete(booking)
    setDeleteModalOpen(true)
  }

  const handleDeleteConfirm = async () => {
    if (!bookingToDelete) return

    setIsDeleting(true)
    try {
      await deleteDoc(doc(db, 'bookings', bookingToDelete.id))
      toast.success('Booking deleted successfully')
      fetchBookings()
      setDeleteModalOpen(false)
      setBookingToDelete(null)
    } catch (error) {
      console.error(error)
      toast.error('Failed to delete booking')
    } finally {
      setIsDeleting(false)
    }
  }

  const handleDeleteCancel = () => {
    setDeleteModalOpen(false)
    setBookingToDelete(null)
  }

  const handleDeleteFromModal = () => {
    if (!selectedBooking) return
    setDeleteModalOpen(true)
    setBookingToDelete(selectedBooking)
    handleCloseView()
  }

  // Filter bookings based on search term and status filter
  const filteredBookings = bookings.filter((booking) => {
    const matchesSearch =
      booking.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      booking.destination.toLowerCase().includes(searchTerm.toLowerCase())

    const matchesStatus =
      statusFilter === '' || booking.status === statusFilter

    return matchesSearch && matchesStatus
  })

  return (
    <div className='min-h-screen bg-gray-50 py-8 px-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <BookingHeader onRefresh={fetchBookings} onLogout={handleLogout} />

        {/* Stats Cards */}
        <StatsCards bookings={bookings} />

        {/* Search and Filter */}
        <SearchFilter
          searchTerm={searchTerm}
          statusFilter={statusFilter}
          totalBookings={bookings.length}
          filteredCount={filteredBookings.length}
          onSearchChange={setSearchTerm}
          onStatusChange={setStatusFilter}
        />

        {/* Bookings Table */}
        <BookingTable
          bookings={filteredBookings}
          onView={handleViewClick}
          onDelete={handleDeleteClick}
        />

        {/* Info text for filtered results */}
        {filteredBookings.length > 0 && (
          <div className='mt-6 flex items-center justify-between bg-white px-6 py-4 rounded-lg shadow-sm'>
            <div className='text-sm text-gray-700'>
              Showing <span className='font-medium'>{filteredBookings.length}</span>{' '}
              of <span className='font-medium'>{bookings.length}</span> total
              bookings
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
        itemName={
          bookingToDelete
            ? `${bookingToDelete.name} - ${bookingToDelete.destination}`
            : undefined
        }
        isDeleting={isDeleting}
      />

      {/* View/Edit Modal */}
      <BookingDetailsModal
        isOpen={viewModalOpen}
        booking={selectedBooking}
        isUpdatingStatus={isUpdatingStatus}
        onClose={handleCloseView}
        onStatusChange={handleStatusChange}
        onDelete={handleDeleteFromModal}
      />
    </div>
  )
}
