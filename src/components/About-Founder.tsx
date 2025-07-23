'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Playfair_Display, Inter } from 'next/font/google'
import clsx from 'clsx'
import {
  Rocket,
  Building2,
  MonitorSmartphone,
  BadgeCheck,
  Globe2
} from 'lucide-react'

const playfair = Playfair_Display({ subsets: ['latin'], weight: '700' })
const inter = Inter({ subsets: ['latin'], weight: ['400', '600'] })

const timeline = [
  { year: '2005', icon: <Rocket className="w-6 h-6 text-indigo-500" />, event: 'Brand founded' },
  { year: '2010', icon: <Building2 className="w-6 h-6 text-indigo-500" />, event: 'First major expansion' },
  { year: '2020', icon: <MonitorSmartphone className="w-6 h-6 text-indigo-500" />, event: 'Online launch' },  
  { year: '2024–Present', icon: <Globe2 className="w-6 h-6 text-indigo-500" />, event: 'Trusted across Rajasthan' }
]

export default function AboutFounder() {
  return (
    <main className="bg-white text-gray-900 overflow-hidden">
      {/* Hero Section */}
      <section className="pt-12 pb-8 px-4 text-center">
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          className={clsx('text-4xl md:text-6xl tracking-tight', playfair.className)}
        >
          Our Founder
        </motion.h1>
        <motion.div
          className="w-20 h-1 mt-3 bg-gradient-to-r from-indigo-300 to-blue-300 rounded-full mx-auto"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        />
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className={clsx('mt-4 max-w-xl mx-auto text-base text-gray-500', inter.className)}
        >
          From a single accessory in 2005 to a legacy in the making.
        </motion.p>
      </section>

      {/* Founder Profile */}
      <section className="flex flex-col md:flex-row items-center justify-center gap-10 px-4 py-12 max-w-6xl mx-auto">
        <motion.div
          className="w-[340px] h-[480px] md:w-[420px] md:h-[540px] relative rounded-[30%] overflow-hidden shadow-xl"
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <Image
            src="/Sudeep.jpg"
            alt="Sudeep Ranka"
            fill
            className="object-cover"
          />
        </motion.div>

        <motion.div
          className="md:w-1/2 text-left bg-white/70 backdrop-blur-sm p-8 rounded-xl shadow-md"
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className={clsx('text-2xl', playfair.className)}>Sudeep Ranka</h2>
          <p className={clsx('text-xs uppercase mt-1 text-gray-500 tracking-wider', inter.className)}>
            Founder & Visionary, Ranka Enterprises
          </p>
          <p className={clsx('mt-4 leading-relaxed text-gray-700 text-base', inter.className)}>
            I started with a single cable in a city that barely noticed. No investors, no shortcuts — just a stubborn drive to make tech simpler, more durable, and honest.
            <br /><br />
            I believed accessories could feel premium without costing a fortune. I believed every customer deserved our best. And I still do.
            <br /><br />
            From dusty warehouses to doorsteps across Rajasthan — this is more than a brand. It’s a belief system built on trust, quality, and putting people first.
          </p>
        </motion.div>
      </section>

      {/* Vision Quote */}
      <section className="py-12 px-4 bg-gradient-to-b from-white via-gray-50 to-white relative">
        <motion.blockquote
          className="relative max-w-3xl mx-auto text-center text-xl italic text-gray-800 leading-normal"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="absolute left-[-30px] top-[-20px] text-8xl text-gray-300 opacity-10 font-serif">“</span>
          To bring quality and innovation to everyday tech — making reliable accessories accessible for everyone.
        </motion.blockquote>
      </section>

      {/* Timeline */}
      <section className="py-12 px-4 max-w-6xl mx-auto">
        <div className="flex flex-wrap justify-center gap-6">
          {timeline.map((item, index) => (
            <motion.div
              key={item.year}
              className="bg-white rounded-xl p-5 w-[220px] text-center border border-gray-100 hover:shadow-md transition-all shadow-sm"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              <div className="flex justify-center mb-2">{item.icon}</div>
              <h3 className="text-base font-semibold text-gray-800">{item.year}</h3>
              <p className="text-sm text-gray-500 mt-1">{item.event}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Letter from the Founder */}
      <section className="py-12 px-4 bg-white">
        <motion.div
          className="max-w-3xl mx-auto bg-white/60 backdrop-blur-lg border border-gray-200 p-8 rounded-xl shadow-lg"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className={clsx('text-lg leading-relaxed text-gray-800', playfair.className)}>
            There’s no playbook for building something meaningful. But I knew from day one: if we focus on craft and care, people will notice.
            <br /><br />
            Every cable we’ve made, every promise we’ve kept — it’s shaped who we are. Ranka Enterprises isn’t just my legacy. It’s our shared story.
            <br /><br />
            And we’re just getting started.
          </p>
        </motion.div>
      </section>
    </main>
  )
}
