import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import LogoOne from "../../assest/logoOne.png"

export default function Footer() {
  return (
    <footer className='bg-teal-800 text-white px-16 pt-8 pb-0'>
      <div className='max-w-7xl mx-auto'>
        <div className='grid grid-cols-1 md:grid-cols-4 gap-14 mb-8'>
          {/* Logo Section */}
          <div className='flex flex-col'>
            <div className='mb-4'>
              <Image 
                src={LogoOne} 
                alt="diamonds & pearls logo" 
                width={100} 
                height={100} 
                className='brightness-0 invert'
              />
            </div>
            <p className="text-sm ">
        Making your travel planning easy and stress-free.
      </p>
          </div>

          {/* COMPANY Column */}
          <div className='flex flex-col'>
            <h3 className='font-bold text-white mb-3 pb-2 border-b border-white'>
              Quick Links
            </h3>
            <ul className='flex flex-col gap-2'>
              <li>
                <Link href="/" className='text-white hover:underline text-sm'>
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/" className='text-white hover:underline text-sm'>
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/admin/login" className='text-white hover:underline text-sm'>
                  Admin Login
                </Link>
              </li>
             
            </ul>
          </div>

          {/* EXPLORE Column */}
          <div className='flex flex-col'>
            <h3 className='font-bold text-white mb-3 pb-2 border-b border-white'>
              Contact Us
            </h3>
            <ul className='flex flex-col gap-2'>
              <li className='text-white  text-sm'>
              <p className="text-sm">info@travelbooking.com</p>
              </li>
              <li className='text-white  text-sm'>
                <p className="text-sm">+2348100000000</p>
              </li>
              <li className='text-white text-sm'>
                <p className="text-sm">Lagos,Nigeria</p>
              </li>
            </ul>
          </div>

         
        </div>

        {/* Copyright */}
        <div className='border-t border-teal-700 pt-6 pb-4 text-center'>
          <p className='text-white text-sm'>
            Copyright © 2026 created by Bikehtravels&tours
          </p>
        </div>
      </div>
    </footer>
  )
}

