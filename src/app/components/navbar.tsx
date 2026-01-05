'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { MenuIcon, X } from 'lucide-react'
import LogoOne from "../../assest/logoOne.png"
import BookingModal from './bookingModal'

export default function Navbar() {
  const router = useRouter()
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleBookNow = () => {
    setIsModalOpen(true)
    setIsMenuOpen(false)
  }

  const handleAdminLogin = () => {
    router.push('/admin/login')
    setIsMenuOpen(false)
  }

  return (
    <>
      <nav className='relative bg-white py-4 px-4 md:px-16'>
        <div className='max-w-10xl mx-auto flex justify-between items-center'>
          {/* Logo */}
          <div>
            <Image 
              src={LogoOne} 
              alt="logo" 
              width={140} 
              height={140}
              className='brightness-100 invert' 
            />
          </div>

          {/* Desktop Menu */}
          <div className='hidden md:flex gap-4 items-center'>
            <button
              onClick={handleBookNow}
              className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium'
            >
              Book Now
            </button>
            <button
              onClick={handleAdminLogin}
              className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium'
            >
              Admin Login
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className='md:hidden'>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className='text-gray-500 hover:text-gray-700'
              aria-label='Toggle menu'
            >
              {isMenuOpen ? <X className='h-6 w-6' /> : <MenuIcon className='h-6 w-6' />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className='md:hidden absolute top-full left-0 right-0 bg-white shadow-lg z-50 border-t border-gray-200'>
            <ul className='flex flex-col py-4'>
              <li>
                <button
                  onClick={handleBookNow}
                  className='w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 font-medium'
                >
                  Book Now
                </button >
              </li>
              <li>
                <button
                  onClick={handleAdminLogin}
                  className='w-full text-left px-6 py-3 text-gray-700 hover:bg-gray-50 font-medium'
                >
                  Admin Login
                </button>
              </li>
            </ul>
          </div>
        )}
      </nav>

      {/* Booking Modal */}
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}