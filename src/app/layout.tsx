// app/layout.tsx (keep this as is, just remove <Navbar />)
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import '../styles/globals.css';
import { AuthProvider } from '../providers/AuthProvider';
import NavbarWrapper from '../client/NavbarWrapper'; // we'll make this

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Ranka Enterprises',
  description: 'Quality computer accessories in Kota',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <NavbarWrapper>
            <main>{children}</main>
          </NavbarWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
