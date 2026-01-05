import { db } from "@/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"
import type { BookingFormDataFromSchema } from "@/types"

export const createBooking = async (data: BookingFormDataFromSchema) => {
    const bookingRef = collection(db, "bookings")
   
    return await addDoc(bookingRef, {
        ...data,
        createdAt: Timestamp.now()
    })
}