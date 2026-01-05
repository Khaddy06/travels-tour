'use client'

import React from 'react'
import { useForm } from 'react-hook-form'
import Input from '../../components/Input'
import Image from 'next/image'
import LogoOne from '../../../assest/logoOne.png'
import { login } from '@/lib/auth'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
    const router = useRouter()
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm()

    const onSubmit = async (data: any) => {
        try {
            await login(data.email, data.password)
            router.push('/admin')
        }catch (error: any) {
            console.error(error)
            alert("Invalid credentials")
        }
    }
    
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
            Admin Login
          </h1>
          <p className='text-gray-600'>
            Sign in to access the admin dashboard
          </p>
        </div>

        {/* Login Card */}
        <div className='bg-white rounded-lg shadow-xl p-8'>
          <form  onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
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
              placeholder='Enter your password'
              required
            />

            {/* Remember Me & Forgot Password */}
            <div className='flex items-center justify-between'>
              <div className='flex items-center'>
                <input
                  id='remember-me'
                  name='remember-me'
                  type='checkbox'
                  className='h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded'
                />
                <label htmlFor='remember-me' className='ml-2 block text-sm text-gray-700'>
                  Remember me
                </label>
              </div>

              <div className='text-sm'>
                <a href='#' className='font-medium text-teal-600 hover:text-teal-500'>
                  Forgot password?
                </a>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type='submit'
              className='w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-teal-600 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-colors'
            >
              Sign in
            </button>
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