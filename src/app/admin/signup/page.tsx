'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import Image from 'next/image'
import LogoOne from '../../../assest/logoOne.png'
import Link from 'next/link'

export default function SignupPage() {
    const {
        register,
        formState: { errors },
    } = useForm()
    
  return (
    <div className='min-h-screen bg-gradient-to-br from-teal-50 to-teal-100 flex items-center justify-center px-4 py-12'>
      <div className='w-full max-w-md'>
        {/* Logo and Title */}
        <div className='text-center mb-8'>
          <div className='flex justify-center mb-4'>
            <Image 
              src={LogoOne} 
              alt="diamonds & pearls logo" 
              width={80} 
              height={80}
            />
          </div>
          <h1 className='text-3xl font-bold text-teal-800 mb-2'>
            Create Account
          </h1>
          <p className='text-gray-600'>
            Sign up to access the admin dashboard
          </p>
        </div>

        {/* Signup Card */}
        <div className='bg-white rounded-lg shadow-xl p-8'>
          <form className='space-y-6'>
            <Input
              label='Full Name'
              register={register('name')}
              error={errors.name as any}
              type='text'
              placeholder='Enter your full name'
              required
            />

            <Input
              label='Email Address'
              register={register('email')}
              error={errors.email as any}
              type='email'
              placeholder='Enter your email'
              required
            />

            <Input
              label='Password'
              register={register('password')}
              error={errors.password as any}
              type='password'
              placeholder='Create a password'
              required
            />

            <Input
              label='Confirm Password'
              register={register('confirmPassword')}
              error={errors.confirmPassword as any}
              type='password'
              placeholder='Confirm your password'
              required
            />

            {/* Terms and Conditions */}
            <div className='flex items-center'>
              <input
                id='terms'
                name='terms'
                type='checkbox'
                className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
              />
              <label htmlFor='terms' className='ml-2 block text-sm text-gray-700'>
                I agree to the{' '}
                <a href='#' className='text-teal-600 hover:text-teal-500 font-medium'>
                  Terms and Conditions
                </a>
                {' '}and{' '}
                <a href='#' className='text-teal-600 hover:text-teal-500 font-medium'>
                  Privacy Policy
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors'
            >
              Create Account
            </button>

            {/* Login Link */}
            <div className='text-center'>
              <p className='text-sm text-gray-600'>
                Already have an account?{' '}
                <Link href='/admin/login' className='font-medium text-teal-600 hover:text-teal-500'>
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>

        {/* Footer */}
        <p className='mt-6 text-center text-sm text-gray-600'>
          © 2026 Diamonds & Pearls Travel. All rights reserved.
        </p>
      </div>
    </div>
  )
}

