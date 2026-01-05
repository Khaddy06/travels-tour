'use client'

import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import AboutUs from './aboutus'

export default function LandingPage() {
  return (
    <div className='bg-gray-100 min-h-screen'>
    <Navbar/>
    <AboutUs/>
    <Footer/>
    </div>
  )
}