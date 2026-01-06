'use client'

import AdminGuard from '@/components/adminGuard'
import React from 'react'
import BookingList from './bookingList/page'

function AdminPage() {
  return (
    <AdminGuard>
        <BookingList/>
    </AdminGuard>
  )
}

export default AdminPage