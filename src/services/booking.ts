import { db } from "@/firebase"
import { collection, addDoc, Timestamp } from "firebase/firestore"


export const createBooking = async (data: any) => {
    const bookingRef = collection(db, "bookings")
   
    return await addDoc(bookingRef, {
        ...data,
        createdAt :Timestamp.now()
    })
}