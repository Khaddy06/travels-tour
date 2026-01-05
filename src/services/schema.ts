import * as yup from 'yup'


export const schema = yup.object({
    name: yup.string().required('Name is required'),
    email: yup.string().email('Invalid email address').required('Email is required'),
    phone: yup.string().required('Phone number is required'),
    destination: yup.string().required('Destination is required'),
    travelDate: yup.string().required('Travel date is required'),
    numberOfTravelers: yup.number().min(1, 'At least 1 traveler required').required('Number of travelers is required'),
    message: yup.string().notRequired()
  })