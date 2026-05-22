'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function Home() {
  const router = useRouter()

  useEffect(() => {
    // Check if user is logged in
    const user = localStorage.getItem('saathiUser')
    if (user) {
      router.push('/dashboard')
    } else {
      router.push('/welcome')
    }
  }, [router])

  return (
    <div className="min-h-screen flex items-center justify-center bg-warm-50">
      <div className="text-2xl text-primary-600 animate-pulse">Loading Saathi...</div>
    </div>
  )
}
