import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoOne from "../../assest/logoOne.png"

export default function Footer() {
  return (
    <footer className='bg-teal-800 text-white px-16 pt-8 pb-0'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-8 mb-8'>
          {/* Logo Section */}
          <div className='flex flex-col'>
            <div className='mb-4'>
              <Image 
                src={LogoOne} 
                alt="travels & tours logo" 
                width={100} 
                height={100} 
                className='brightness-0 invert'
              />
            </div>
           
          </div>

          {/* COMPANY Column */}
          <div className='flex flex-col'>
            <h3 className='font-bold text-white mb-3 pb-2 border-b border-white'>
              COMPANY
            </h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href="/about" className='text-white hover:underline text-sm'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/contact" className='text-white hover:underline text-sm'>
                  Contact Us
                </Link>
              </li>
              <li>
                <Link href="/privacy" className='text-white hover:underline text-sm'>
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/terms" className='text-white hover:underline text-sm'>
                  Terms and Conditions
                </Link>
              </li>
            </ul>
          </div>

          {/* EXPLORE Column */}
          <div className='flex flex-col'>
            <h3 className='font-bold text-white mb-3 pb-2 border-b border-white'>
              EXPLORE
            </h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href="/blog" className='text-white hover:underline text-sm'>
                  Blog
                </Link>
              </li>
              <li>
                <Link href="/qatar" className='text-white hover:underline text-sm'>
                  Qatar
                </Link>
              </li>
              <li>
                <Link href="/tours" className='text-white hover:underline text-sm'>
                  All Tours
                </Link>
              </li>
              <li>
                <Link href="/destinations" className='text-white hover:underline text-sm'>
                  All Destinations
                </Link>
              </li>
              <li>
                <Link href="/passport-builder" className='text-white hover:underline text-sm'>
                  Passport Builder
                </Link>
              </li>
            </ul>
          </div>

          {/* SERVICE Column */}
          <div className='flex flex-col'>
            <h3 className='font-bold text-white mb-3 pb-2 border-b border-white'>
              SERVICE
            </h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href="/study-abroad" className='text-white hover:underline text-sm'>
                  Study Abroad
                </Link>
              </li>
              <li>
                <Link href="/tour-packages" className='text-white hover:underline text-sm'>
                  Tour Packages
                </Link>
              </li>
              <li>
                <Link href="/airport-transfers" className='text-white hover:underline text-sm'>
                  Airport Transfers
                </Link>
              </li>
              <li>
                <Link href="/destination-events" className='text-white hover:underline text-sm'>
                  Destination Events
                </Link>
              </li>
              <li>
                <Link href="/hotel-reservations" className='text-white hover:underline text-sm'>
                  Hotel Reservations
                </Link>
              </li>
              <li>
                <Link href="/flight-booking" className='text-white hover:underline text-sm'>
                  Flight Ticket Booking
                </Link>
              </li>
              <li>
                <Link href="/visa-processing" className='text-white hover:underline text-sm'>
                  Visa Processing Assistance
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className='border-t border-teal-700 pt-6 pb-4 text-center'>
          <p className='text-white text-sm'>
            Copyright © 2026 created by Dandptravels
          </p>
        </div>
      </div>
    </footer>
  )
}

