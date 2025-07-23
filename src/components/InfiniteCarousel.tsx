'use client';

import { useRef, useEffect } from 'react';
import { motion } from 'framer-motion';

const products = [
  {
    title: 'RGB Mechanical Keyboard',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
    tag: 'Best Seller',
  },
  {
    title: 'Gaming Mouse',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
    tag: 'Limited Edition',
  },
  {
    title: 'RGB Headphones',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
    tag: 'New',
  },
  {
    title: 'USB Hub',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
  },
  {
    title: '1TB SSD',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
    tag: 'Best Seller',
  },
  {
    title: 'Cooling Fan',
    image: 'https://m.media-amazon.com/images/I/61mpMH5TzkL._AC_SL1500_.jpg',
  },
];

export default function InfiniteCarousel() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let animationFrame: number;
    const scroll = () => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 0.5;
        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
      animationFrame = requestAnimationFrame(scroll);
    };
    animationFrame = requestAnimationFrame(scroll);
    return () => cancelAnimationFrame(animationFrame);
  }, []);

  const duplicatedProducts = [...products, ...products];

  return (
    <section className="relative w-full py-20 bg-[#f9f9fa] overflow-hidden">
      {/* Ambient Orbs */}
      <div className="absolute top-[-80px] left-[-60px] w-96 h-96 bg-green-100 opacity-30 rounded-full blur-3xl z-0" />
      <div className="absolute bottom-[-60px] right-[-40px] w-72 h-72 bg-gray-300 opacity-20 rounded-full blur-2xl z-0" />

      {/* Headings */}
      <div className="relative z-10 text-center px-6">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 font-[ClashDisplay,SpaceGrotesk,Satoshi,sans-serif]">
          Look Into the Details
        </h2>
        <p className="mt-4 text-gray-500 text-md md:text-lg">
          Explore the precision and performance that sets us apart.
        </p>
      </div>

      {/* Carousel */}
      <div
        ref={containerRef}
        className="relative z-10 mt-12 flex whitespace-nowrap overflow-x-scroll pointer-events-none select-none"
        style={{
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <style jsx>{`
          div::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {duplicatedProducts.map((product, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="relative flex-shrink-0 w-[240px] md:w-[300px] h-[300px] md:h-[340px] m-4 backdrop-blur-md bg-white/10 border border-white/20 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
          >
            <img
              src={product.image}
              alt={product.title}
              className="object-contain w-full h-full p-6"
              loading="lazy"
            />
            <div className="absolute bottom-4 left-4 text-white text-sm font-medium">
              {product.title}
            </div>
            {product.tag && (
              <div className="absolute top-3 right-3 bg-white/20 text-white text-[10px] px-2 py-[2px] rounded-full backdrop-blur-sm border border-white/30 animate-pulse">
                {product.tag}
              </div>
            )}
          </motion.div>
        ))}
      </div>

      {/* Ghost Arrows (Optional Aesthetic) */}
      <div className="absolute top-1/2 left-2 md:left-6 -translate-y-1/2 z-20 opacity-20">
        <div className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-md" />
      </div>
      <div className="absolute top-1/2 right-2 md:right-6 -translate-y-1/2 z-20 opacity-20">
        <div className="w-8 h-8 rounded-full bg-black/10 backdrop-blur-md" />
      </div>
    </section>
  );
}
