import React from 'react'

export default function AboutUs() {
  return (
    <section className='bg-white py-16 px-8'>
      <div className='max-w-4xl mx-auto'>
        <div className='text-center mb-12'>
          <h1 className='text-3xl font-bold text-gray-900 mb-6'>
            About Diamonds & Pearls Travel
          </h1>
        </div>

        <div className='space-y-8 text-gray-700 leading-relaxed'>
          <p>
            Diamonds & Pearls Travel is a travel agency dedicated to making your dream 
            destinations a reality. We specialize in creating customized, affordable 
            holiday packages that cater to your unique travel preferences and budget.
          </p>

          <p>
            Whether you're planning a solo adventure, a romantic getaway, a family 
            vacation, or a group tour, we are committed to providing exceptional 
            service and unforgettable experiences.
          </p>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-3 mt-8'>
              What We Offer
            </h2>
            <ul className='list-disc list-inside space-y-2'>
              <li>Customized Tour Packages</li>
              <li>Visa Processing Assistance</li>
              <li>Hotel Reservations</li>
              <li>Flight Ticket Booking</li>
              <li>Airport Transfers</li>
              <li>Study Abroad Programs</li>
            </ul>
          </div>

          <div>
            <h2 className='text-xl font-semibold text-gray-900 mb-3 mt-8'>
              Our Mission
            </h2>
            <p>
              To simplify travel planning and make extraordinary journeys accessible to everyone. 
              We combine modern technology with personalized service to create seamless, 
              stress-free travel experiences.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
