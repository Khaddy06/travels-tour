import React from 'react'
import Image from 'next/image'

const destinations = [
  {
    id: 1,
    country: 'Indonesia',
    image: '/placeholder-indonesia.jpg',
    tag: 'TOURISM'
  },
  {
    id: 2,
    country: 'Rwanda',
    image: '/placeholder-rwanda.jpg',
    tag: 'TOURISM'
  },
  {
    id: 3,
    country: 'Lebanon',
    image: '/placeholder-lebanon.jpg',
    tag: 'TOURISM'
  },
  {
    id: 4,
    country: 'Thailand',
    image: '/placeholder-thailand.jpg',
    tag: 'TOURISM'
  }
]

export default function TravelBlog() {
  return (
    <section className='bg-white py-16 px-8'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='text-center mb-12'>
          <h2 className='text-4xl font-bold text-teal-600 mb-4'>
            Travel Blog
          </h2>
          <p className='text-gray-600 text-lg'>
            Explore your dream destinations with Diamonds and Pearls Travel..
          </p>
        </div>

        {/* Cards Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6'>
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className='bg-white rounded-lg overflow-hidden'
            >
              {/* Image Container */}
              <div className='relative h-64 w-full'>
                <Image
                  src={destination.image}
                  alt={`${destination.country} destination`}
                  fill
                  className='object-cover'
                  sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw'
                />
                {/* Tourism Tag */}
                <div className='absolute top-4 left-4'>
                  <span className='bg-amber-800 text-white px-5 py-1.5 rounded-full text-xs font-semibold'>
                    {destination.tag}
                    <span className='bg-amber-800 text-white px-5 py-1.5 rounded-full text-xs font-semibold'>
                    {destination.tag}
                  </span>
                  </span>
                </div>
              </div>

              {/* Text Section */}
              <div className='p-4 border border-teal-600 rounded-b-lg'>
                <p className='text-teal-600 text-sm text-center font-medium leading-tight'>
                  BOOK CUSTOMIZED AFFORDABLE HOLIDAY PACKAGES IN {destination.country.toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

