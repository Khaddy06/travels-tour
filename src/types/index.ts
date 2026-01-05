import { Timestamp } from 'firebase/firestore'
import type { InferType } from 'yup'
import { schema } from '@/services/schema'

// Booking Types - Using schema-inferred type
export type BookingFormDataFromSchema = InferType<typeof schema>

export interface Booking extends BookingFormDataFromSchema {
  id: string
  createdAt: Timestamp | null
  status?: string
}

// Login Types
export interface LoginFormData {
  email: string
  password: string
}

// Signup Types
export interface SignupFormData {
  name: string
  email: string
  password: string
  confirmPassword?: string
}

