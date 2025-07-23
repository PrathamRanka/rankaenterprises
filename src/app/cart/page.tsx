'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

import { useCart } from '@/providers/CartProvider';
import { useAuth } from '@/providers/AuthProvider';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const router = useRouter();

//   useEffect(() => {
//     if (!user) router.push('/signin');
//   }, [user]);

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div className="min-h-screen px-4 py-8 bg-white text-black">
      <h1 className="text-2xl font-bold mb-6 text-center">Shopping Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500 text-center">Your cart is empty.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Items */}
          <div className="lg:col-span-2 space-y-4">
            {cart.map((item) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-col sm:flex-row items-center gap-4 p-4 border rounded-lg shadow-sm"
              >
                <Image
                  src={item.imageurl}
                  alt={item.title}
                  width={80}
                  height={80}
                  className="w-20 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h2 className="font-semibold">{item.title}</h2>
                  <p className="text-sm text-gray-500">₹{item.price}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <input
                      type="number"
                      min={1}
                      value={item.quantity}
                      onChange={(e) =>
                        updateQuantity(item.id, Number(e.target.value))
                      }
                      className="w-16 px-2 py-1 border rounded"
                    />
                    <div
                      onClick={() => removeFromCart(item.id)}
                      className="cursor-pointer p-1 rounded hover:bg-red-100"
                    >
                      <Trash2 className="w-4 h-4 text-red-500" />
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Summary */}
          <div className="p-4 border rounded-lg shadow-md bg-neutral-50 space-y-4">
            <h2 className="text-lg font-semibold">Order Summary</h2>
            <p className="text-sm text-gray-700">
              Items: <strong>{cart.length}</strong>
            </p>
            <p className="text-sm text-gray-700">
              Total: <strong>₹{totalPrice}</strong>
            </p>
            <div
              onClick={() => router.push('/checkout')}
              className="w-full text-center bg-black text-white py-2 rounded cursor-pointer hover:bg-gray-800"
            >
              Proceed to Checkout
            </div>
            <div
              onClick={clearCart}
              className="w-full text-center py-2 text-red-600 border border-red-200 rounded cursor-pointer hover:bg-red-50"
            >
              Clear Cart
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
