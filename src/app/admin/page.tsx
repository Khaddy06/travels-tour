'use client'

export const dynamic = 'force-dynamic'

import AdminGuard from '@/components/adminGuard'
import React from 'react'
import BookingList from './components/bookinglist'



function AdminPage() {
  return (
    <AdminGuard>
        <BookingList/>
    </AdminGuard>
  )
}

export default AdminPage