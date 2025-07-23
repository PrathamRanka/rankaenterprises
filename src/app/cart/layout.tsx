// src/app/products/layout.tsx
import { CartProvider } from '@/providers/CartProvider';
import { AuthProvider } from '@/providers/AuthProvider';

export default function ProductsLayout({ children }: { children: React.ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
