import AdminGuard from '@/components/adminGuard'
import React from 'react'
import BookingList from './bookingList/page'

function page() {
  return (
    <AdminGuard>
        <BookingList/>
    </AdminGuard>
  )
}

export default page