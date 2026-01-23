'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

export default function LogoutPage() {
  const router = useRouter()

  useEffect(() => {
    // Clear local/session storage or Redux state
    localStorage.removeItem('token') // or any auth-related key
    sessionStorage.clear()

    // You can also dispatch a Redux logout action here if needed

    // Redirect to login or homepage
    router.push('/login') // or change to '/' or '/dashboard'
  }, [router])

  return (
    <div className="p-6 text-center">
      <p className="text-lg">Logging you out...</p>
    </div>
  )
}
