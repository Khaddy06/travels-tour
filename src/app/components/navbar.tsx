'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import LogoOne from "../../assest/logoOne.png"
import BookingModal from './bookingModal'



export default function Navbar() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <>
      <div className='flex justify-between items-center px-16  py-4 max-w-10xl mx-auto'>
          <div>
              <Image src={LogoOne} alt="logo" width={100} height={100} />
          </div>
          <div className='flex gap-4 items-center text-gray-500 font-medium'>
          
              <button
                onClick={() => setIsModalOpen(true)}
                className='bg-teal-600 text-white px-6 py-2 rounded-lg hover:bg-teal-700 transition-colors font-medium'
              >
                Book Now
              </button>
          </div>
      </div>
      <BookingModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />
    </>
  )
}