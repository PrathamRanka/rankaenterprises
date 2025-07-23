'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useAuth } from '../providers/AuthProvider';
import { useState, useRef, useEffect } from 'react';
import {
  UserIcon,
  ArrowRightOnRectangleIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

export default function Navbar() {
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  // Close dropdown if clicked outside
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md border-b border-gray-200">
      <nav className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between px-6 py-3 sm:py-4 gap-4">
        {/* Left: Brand */}
        <div className="flex items-center gap-4 w-full sm:w-auto">
          <h1
            onClick={() => router.push('/')}
            className="text-2xl sm:text-3xl font-extrabold tracking-wide text-gray-900 select-none cursor-pointer"
          >
            RANKA ENTERPRISES
          </h1>
        </div>

        {/* Center: Nav Links */}
        <div className="hidden md:flex gap-10 flex-wrap justify-center text-gray-700 font-medium text-sm sm:text-base flex-1">
          {['/', '/products', '/about', '/contact'].map((path, i) => {
            const labels = ['Home', 'Products', 'About', 'Contact'];
            return (
              <Link
                key={path}
                href={path}
                className="relative group px-2 py-1 hover:text-gray-900 focus:outline-none"
              >
                {labels[i]}
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-black transition-all group-hover:w-full" />
              </Link>
            );
          })}
        </div>

        {/* Right: User + Cart */}
        <div className="flex items-center gap-4 ml-auto" ref={menuRef}>
          {/* Cart Icon */}
          <button
            onClick={() => router.push('/cart')}
            className="relative hover:bg-gray-100 p-2 rounded-full transition"
            aria-label="Go to Cart"
          >
            <ShoppingCartIcon className="w-6 h-6 text-gray-800" />
          </button>

          {/* Auth Buttons */}
          {!user ? (
            <button
              onClick={() => router.push('/login')}
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold rounded-full border border-black text-black bg-white hover:bg-black hover:text-white transition-shadow shadow-sm hover:shadow-lg"
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

      {/* Mobile Nav Links */}
      <div className="block md:hidden px-6 pb-3">
        <div className="flex justify-around text-sm font-medium text-gray-700 border-t pt-2">
          {['/', '/products', '/about', '/contact'].map((path, i) => {
            const labels = ['Home', 'Products', 'About', 'Contact'];
            return (
              <Link key={path} href={path} className="hover:text-black">
                {labels[i]}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
