'use client'

import React from 'react'
import Image from 'next/image'

const Home: React.FC = () => {
  return (
    <div className='min-h-screen relative'>
      {/* Header */}
      <header className='fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-sm shadow-sm z-50'>
        <div className='container mx-auto px-4 py-4 flex justify-between items-center'>
          <h1 className='text-xl font-bold text-gray-800'>OpenDay</h1>
          <div className='space-x-4'>
            <button className='px-4 py-2 text-gray-700 hover:text-gray-900 transition-colors'>
              Sign In
            </button>
            <button className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors'>
              Sign Up
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className='relative min-h-screen flex items-center justify-center'>
        {/* Background Image */}
        <div className='absolute inset-0 w-full h-full -z-10'>
          {/* <Image
            src="https://images.unsplash.com/photo-1492684223066-81342ee5ff30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
            alt="Background"
            fill
            className='object-cover'
            priority
            sizes="100vw"
          /> */}
          <div className='absolute inset-0 bg-black/40' /> {/* Overlay */}
        </div>

        {/* Content */}
        <div className='relative z-20 text-center px-4'>
          <h2 className='text-6xl font-bold text-white mb-4'>
            OpenDay 2025
          </h2>
          <p className='text-xl text-white/90'>
            Join us for the biggest tech event of the year
          </p>
        </div>
      </main>
    </div>
  )
}

export default Home