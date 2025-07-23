//  # Firebase login (Google)

// src/app/login/page.tsx
'use client'

import { signInWithGoogle } from '@/lib/auth'
import { ArrowRight } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const user = await signInWithGoogle()
      alert(`Logged in as ${user.displayName}`)
      router.push('/') // ✅ Redirect after successful login
    } catch (err) {
      alert('Login failed')
    }
  }

  return (
    <div className="h-screen w-full flex items-center justify-center bg-white px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-gray-900 tracking-tight">
            Welcome to Ranka Enterprises
          </h1>
          <p className="text-gray-500 text-sm">
            Sign in to continue shopping premium tech accessories.
          </p>
        </div>

        <button
          onClick={handleLogin}
          className="group w-full flex items-center justify-center gap-2 px-6 py-3 bg-black text-white font-medium rounded-xl transition hover:bg-gray-900"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 533.5 544.3"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M533.5 278.4c0-17.4-1.5-34.1-4.4-50.3H272v95.3h146.9c-6.3 33.8-25 62.4-53.4 81.5v67.7h86.4c50.6-46.7 81.6-115.5 81.6-194.2z"
              fill="#4285F4"
            />
            <path
              d="M272 544.3c72.8 0 133.8-24.1 178.4-65.4l-86.4-67.7c-24.1 16.2-54.9 25.8-92 25.8-70.8 0-130.8-47.9-152.3-112.1H31.8v70.4c44.6 88 136.6 149 240.2 149z"
              fill="#34A853"
            />
            <path
              d="M119.7 324.9c-10.1-30.3-10.1-62.9 0-93.2V161.3H31.8c-39.6 79.2-39.6 173.3 0 252.5l87.9-68.9z"
              fill="#FBBC05"
            />
            <path
              d="M272 107.7c39.5 0 75.1 13.6 103.2 40.2l77.4-77.4C405.8 24.2 344.8 0 272 0 168.4 0 76.4 61 31.8 149l87.9 68.8C141.2 155.6 201.2 107.7 272 107.7z"
              fill="#EA4335"
            />
          </svg>
          Sign in with Google
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  )
}
