'use client';

import { motion } from 'framer-motion';
import { Typewriter } from 'react-simple-typewriter';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';

const credibility = [
  { emoji: '🔒', text: 'Secure Payments via Razorpay' },
  { emoji: '🚚', text: 'Free Shipping Over ₹999' },
  { emoji: '🌟', text: '1,500+ Happy Customers' },
  
];

export default function HeroSection() {
  return (
    <section className="relative w-full bg-white text-[#1C1C1C] overflow-hidden px-6 md:px-24 py-20">
      {/* Background orb */}
      <motion.div
        className="absolute -top-32 -left-32 w-[400px] h-[400px] rounded-full bg-[#00ffcc30] blur-3xl z-0"
        animate={{ scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ repeat: Infinity, duration: 10, ease: 'easeInOut' }}
      />

      <div className="relative z-10 flex flex-col-reverse md:flex-row items-center justify-between gap-10">
        {/* Left: Visual Magic */}
        <motion.div
          className="w-full md:w-1/2"
          whileHover={{ scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          <div className="relative w-full h-[350px] md:h-[500px]">
            <Image
              src="https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg"
              alt="Premium Setup"
              fill
              priority
              className="object-contain rounded-xl shadow-xl"
            />

            {/* Floating product cards */}
            <motion.div
              className="absolute top-4 left-4 bg-white/80 backdrop-blur-xl p-3 rounded-lg shadow-md"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              🖱 Gaming Mouse
            </motion.div>
            <motion.div
              className="absolute bottom-6 right-6 bg-white/80 backdrop-blur-xl p-3 rounded-lg shadow-md"
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.6 }}
            >
              🎧 RGB Headphones
            </motion.div>
          </div>
        </motion.div>

        {/* Right: Content */}
        <div className="w-full md:w-1/2 space-y-6">
          <h1 className="font-[ClashDisplay] text-5xl md:text-7xl font-extrabold leading-tight tracking-tight">
            Power Up Your Setup
          </h1>

          <h2 className="text-xl md:text-2xl text-[#005F2F] font-medium">
            <Typewriter
              words={[
                'Keyboards',
                'Gaming Mice',
                'Headphones',
                'RGB Lights',
                'Cooling Pads',
                'USB Hubs',
              ]}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={80}
              deleteSpeed={60}
              delaySpeed={1200}
            />
          </h2>

          <p className="text-base md:text-lg font-light text-gray-700">
            Premium gear, trusted by creators and gamers across India.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#005F2F] text-white px-6 py-3 rounded-lg text-sm font-semibold shadow-md hover:shadow-lg hover:brightness-110"
            >
              Shop Now
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border border-[#1C1C1C] text-[#1C1C1C] px-6 py-3 rounded-lg text-sm font-semibold flex items-center gap-2 group"
            >
              View All Products
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </motion.button>
          </div>

          {/* Credibility Bar */}
          <div className="mt-6 w-full">
            <div className="flex gap-3 flex-wrap md:flex-nowrap overflow-x-auto md:overflow-visible">
              {credibility.map((item, i) => (
                <div
                  key={i}
                  className="flex-shrink-0 flex items-center gap-2 text-sm font-medium bg-gray-100 rounded-full px-4 py-2 whitespace-nowrap"
                >
                  <span>{item.emoji} {item.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
