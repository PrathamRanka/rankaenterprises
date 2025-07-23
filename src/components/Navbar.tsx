    'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/AuthProvider'
import { useState, useRef, useEffect } from 'react'

export default function Navbar() {
  const router = useRouter()
  const { user, signOut } = useAuth()
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement | null>(null)

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <nav className="max-w-screen-xl mx-auto flex flex-col sm:flex-row items-center justify-between px-4 py-3 sm:py-4 sm:px-6 gap-4 sm:gap-0">
        
        {/* Left Nav */}
        <div className="flex flex-wrap justify-center sm:justify-start gap-4 text-sm font-medium text-gray-600">
          <Link href="/" className="hover:text-black transition duration-200 hover:underline underline-offset-4">Home</Link>
          <Link href="/products" className="hover:text-black transition duration-200 hover:underline underline-offset-4">Products</Link>
          <Link href="/about" className="hover:text-black transition duration-200 hover:underline underline-offset-4">About</Link>
          <Link href="/contact" className="hover:text-black transition duration-200 hover:underline underline-offset-4">Contact</Link>
        </div>

        {/* Center Brand */}
        <h1 className="text-xl sm:text-2xl font-bold text-center text-gray-900 tracking-widest">
          RANKA ENTERPRISES
        </h1>

        {/* Right: User/Profile */}
        <div className="relative" ref={menuRef}>
          {!user ? (
            <button
              onClick={() => router.push('/login')}
              className="px-4 py-2 text-sm font-medium rounded-full bg-black text-white hover:bg-gray-800 transition duration-300 shadow hover:shadow-lg"
            >
              Sign In
            </button>
          ) : (
            <div className="relative">
              <Image
                src={user.photoURL ?? '/default-avatar.png'}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition duration-200 shadow-sm"
                onClick={() => setMenuOpen(prev => !prev)}
              />
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white shadow-lg rounded-md py-2 border border-gray-100 z-50 animate-fadeIn">
                  <button
                    onClick={() => router.push('/account')}
                    className="w-full text-left px-4 py-2 text-sm text-black hover:bg-gray-100 transition"
                  >
                    Your Account
                  </button>
                  <button
                    onClick={signOut}
                    className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                  >
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </nav>
    </header>
  )
}
