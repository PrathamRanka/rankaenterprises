'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import AboutFounder from '@/components/About-Founder';
import InfiniteCarousel from '@/components/InfiniteCarousel';
import { AuthProvider } from '@/providers/AuthProvider';

export default function HomePage() {
  const pathname = usePathname();
  const hideOnRoutes = ['/signin', '/login'];
  const isHome = pathname === '/';
  const shouldHide = hideOnRoutes.includes(pathname);

  return (
    <AuthProvider>
      {!shouldHide && <Navbar />}

      {isHome && (
        <>
          <HeroSection />
          <InfiniteCarousel />
          <div id='about-founder'>
          <AboutFounder />
          </div>
        </>
      )}

      <main>{/* Additional content can go here */}</main>

      {!shouldHide && <div id='footer'><Footer /></div>}
    </AuthProvider>
  );
}
