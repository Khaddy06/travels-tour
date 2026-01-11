'use client'
import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { onAuthStateChanged } from 'firebase/auth'
import {getClientAuth} from '@/lib/auth'

export default function AdminGuard({
    children,
}:{
    children: React.ReactNode
}){
const [loading, setLoading] = useState(true)
const router = useRouter()
useEffect(()=>{
   const auth =getClientAuth()
   if(!auth) return;

  const unsubscribe = onAuthStateChanged(auth, (user)=>{
    if(!user){
        router.push('/admin/login')
    }else{
        setLoading(false)
    }
  });
  return () => unsubscribe()
}, [router]);

if(loading){
    return <div>Checking auth state...</div>
}


  return <>{children}</>
}