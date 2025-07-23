'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useAuth } from '../providers/AuthProvider'
import { useState, useRef, useEffect } from 'react'
import { UserIcon, ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline'

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
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <nav className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-6 py-3 sm:py-4 gap-4">

        {/* Left: Brand */}
        <div className="flex-shrink-0 text-left w-full sm:w-auto sm:flex-1">
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900 select-none">
            RANKA ENTERPRISES
          </h1>
        </div>

        {/* Center: Nav Links */}
        <div className="flex flex-grow justify-center gap-10 flex-wrap text-gray-700 font-medium text-sm sm:text-base">
          {['/', '/products', '/about', '/contact'].map((path, i) => {
            const labels = ['Home', 'Products', 'About', 'Contact']
            return (
              <Link
                key={path}
                href={path}
                className="relative group px-2 py-1 hover:text-gray-900 focus:outline-none focus:text-gray-900"
              >
                {labels[i]}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full" />
              </Link>
            )
          })}
        </div>

        {/* Right: User/Profile */}
        <div className="flex-shrink-0 w-full sm:w-auto sm:flex-1 flex justify-end" ref={menuRef}>
          {!user ? (
            <button
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-5 py-2 text-sm font-semibold rounded-full border border-black text-black bg-white hover:bg-black hover:text-white transition-shadow shadow-sm hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-black"
              aria-label="Sign In"
            >
              <UserIcon className="w-5 h-5" />
              Sign In
            </button>
          ) : (
            <div className="relative">
              <Image
                src={user.photoURL ?? '/default-avatar.png'}
                alt="Profile"
                width={40}
                height={40}
                className="rounded-full border border-gray-300 cursor-pointer hover:scale-105 transition-transform shadow-sm"
                onClick={() => setMenuOpen((prev) => !prev)}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && setMenuOpen((prev) => !prev)}
                aria-haspopup="true"
                aria-expanded={menuOpen}
              />
              {menuOpen && (
                <div
                  className="absolute right-0 mt-2 w-44 bg-white backdrop-blur-sm bg-opacity-80 shadow-lg rounded-md py-2 border border-gray-100 z-50 animate-fadeIn"
                  role="menu"
                  aria-label="User menu"
                >
                  <button
                    onClick={() => router.push('/account')}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-900 hover:bg-gray-100 transition"
                    role="menuitem"
                  >
                    <UserIcon className="w-5 h-5" />
                    Your Account
                  </button>
                  <button
                    onClick={signOut}
                    className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 transition"
                    role="menuitem"
                  >
                    <ArrowRightOnRectangleIcon className="w-5 h-5" />
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
