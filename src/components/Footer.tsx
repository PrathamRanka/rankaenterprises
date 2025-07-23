'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: 'easeOut' }}
      className="bg-white text-gray-800 py-12 px-6 md:px-20 border-t border-gray-200 font-[Garamond]"
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-sm">
        {/* Left: Location */}
        <div className="space-y-3">
          <h2 className="text-xl font-[Bodoni] underline underline-offset-4 decoration-green-600 text-gray-900 tracking-wide">
            Ranka Enterprises
          </h2>
          <p className="text-gray-600">Near DAV School, Talwandi</p>
          <p className="text-gray-600">Kota, Rajasthan, 324005</p>
        </div>

        {/* Middle: Contact */}
        <div className="space-y-3">
          <h2 className="text-xl font-[Futura] underline underline-offset-4 decoration-green-600 text-gray-900 tracking-wide">
            Contact
          </h2>
          <p className="text-gray-600">
            Phone:{' '}
            <a
              href="tel:9829037914"
              className="text-black hover:text-green-700 transition"
            >
              9829037914
            </a>
          </p>
          <p className="text-gray-600">
            Email:{' '}
            <a
              href="mailto:sud1979@yahoo.com"
              className="text-black hover:text-green-700 transition"
            >
              sud1979@yahoo.com
            </a>
          </p>
        </div>

        {/* Right: Links */}
        <div className="space-y-3">
          <h2 className="text-xl font-[Helvetica] underline underline-offset-4 decoration-green-600 text-gray-900 tracking-wide">
            Quick Links
          </h2>
          <ul className="space-y-1 text-gray-600">
            <li>
              <Link href="/" className="hover:text-green-700 transition">
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" className="hover:text-green-700 transition">
                Products
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-green-700 transition">
                Contact Us
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-green-700 transition">
                About Us
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="text-center text-xs text-gray-400 mt-10 font-[Helvetica]"
      >
        &copy; {new Date().getFullYear()} Ranka Enterprises. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
