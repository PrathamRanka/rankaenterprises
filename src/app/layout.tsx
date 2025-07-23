// app/layout.tsx


import '../styles/globals.css';
import type { Metadata } from 'next';
import { AuthProvider } from '@/providers/AuthProvider';
import { CartProvider } from '@/providers/CartProvider';

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
          <CartProvider>
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
