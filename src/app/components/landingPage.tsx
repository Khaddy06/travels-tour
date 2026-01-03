import React from 'react'
import Navbar from './navbar'
import Footer from './footer'
import TravelBlog from './travelBlog'

export default function LandingPage() {
  return (
    <div className='bg-gray-100 min-h-screen'>
    <Navbar/>
    <TravelBlog/>
    <Footer/>
    </div>
  )
}