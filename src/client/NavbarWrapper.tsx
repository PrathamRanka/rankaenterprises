'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import HeroSection from '@/components/HeroSection';
import InfiniteCarousel from '@/components/InfiniteCarousel'; // ⬅️ Import the carousel

export default function NavbarWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const hideOnRoutes = ['/signin', '/login'];
  const isHome = pathname === '/';
  const shouldHide = hideOnRoutes.includes(pathname);

  return (
    <>
      {!shouldHide && <Navbar />}
      {isHome && (
        <>
          <HeroSection />
          <InfiniteCarousel /> {/* ⬅️ Add carousel below hero only on home */}
        </>
      )}
      <main>{children}</main>
      {!shouldHide && <Footer />}
    </>
  );
}
