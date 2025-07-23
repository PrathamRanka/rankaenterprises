'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      className="bg-neutral-50 text-neutral-800 font-sans border-t border-neutral-200 px-6 md:px-20 pt-12 pb-8"
    >
      {/* Decorative dot */}
      <div className="w-10 h-[2px] bg-neutral-300 mx-auto rounded-full mb-10" />

      {/* Main Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-6 text-sm">
        {/* Location */}
        <div className="space-y-4 md:border-r border-neutral-200 pr-0 md:pr-6">
          <h3 className="uppercase tracking-wider text-xs font-medium text-neutral-600">
            Location
          </h3>
          <div className="flex items-start gap-3 text-neutral-700">
            <MapPin className="w-4 h-4 text-neutral-400 mt-0.5" />
            <div>
              <p>Ranka Enterprises</p>
              <p>Near DAV School, Talwandi</p>
              <p>Kota, Rajasthan, 324005</p>
            </div>
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-4 md:border-r border-neutral-200 px-0 md:px-6">
          <h3 className="uppercase tracking-wider text-xs font-medium text-neutral-600">
            Contact
          </h3>
          <div className="flex items-center gap-3 text-neutral-700">
            <Phone className="w-4 h-4 text-neutral-400" />
            <a
              href="tel:9829037914"
              className="hover:underline underline-offset-4 hover:text-black transition"
            >
              9829037914
            </a>
          </div>
          <div className="flex items-center gap-3 text-neutral-700">
            <Mail className="w-4 h-4 text-neutral-400" />
            <a
              href="mailto:sud1979@yahoo.com"
              className="hover:underline underline-offset-4 hover:text-black transition"
            >
              sud1979@yahoo.com
            </a>
          </div>
        </div>

        {/* Links */}
        <div className="space-y-4 pl-0 md:pl-6">
          <h3 className="uppercase tracking-wider text-xs font-medium text-neutral-600">
            Quick Links
          </h3>
          <ul className="space-y-2">
            {[
              { name: 'Home', href: '/' },
              { name: 'Products', href: '/products' },
              { name: 'Contact Us', href: '/contact' },
              { name: 'About Us', href: '/about' },
            ].map(({ name, href }) => (
              <li key={name}>
                <Link
                  href={href}
                  className="inline-block hover:underline underline-offset-4 hover:text-black transition-all duration-200"
                >
                  {name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Copyright */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="mt-12 text-center text-xs text-neutral-400"
      >
        &copy; {new Date().getFullYear()} Ranka Enterprises. All rights reserved.
      </motion.div>
    </motion.footer>
  );
}
