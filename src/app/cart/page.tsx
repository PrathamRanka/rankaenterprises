'use client';

import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';
import { useCart } from '@/providers/CartProvider';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Trash2, ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, clearCart } = useCart();
  const router = useRouter();

  const totalPrice = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-neutral-50 px-4 py-12 text-black font-[Inter]">
        <div className="max-w-6xl mx-auto space-y-10">
          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl font-semibold text-center tracking-tight"
          >
            Your Shopping Cart
          </motion.h1>

          {cart.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center justify-center text-gray-500 py-20 space-y-4"
            >
              <ShoppingCart className="w-16 h-16 text-gray-400" />
              <p className="text-lg">Your cart is currently empty.</p>
              <button
                onClick={() => router.push('/products')}
                className="mt-4 px-6 py-2 bg-black text-white rounded hover:bg-gray-900 transition"
              >
                Browse Products
              </button>
            </motion.div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-6">
                {cart.map((item) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-6 bg-white border border-gray-200 rounded-2xl shadow-sm p-5 hover:shadow-md transition"
                  >
                    <Image
                      src={item.imageurl}
                      alt={item.title}
                      width={100}
                      height={100}
                      className="rounded-lg w-24 h-24 object-cover"
                    />
                    <div className="flex-1">
                      <h2 className="font-medium text-lg mb-1">{item.title}</h2>
                      <p className="text-sm text-gray-500 mb-3">₹{item.price}</p>

                      <div className="flex items-center gap-3">
                        {/* Quantity control */}
                        <div className="flex items-center border rounded-md overflow-hidden">
                          <button
                            onClick={() =>
                              updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                            }
                            className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                          >
                            -
                          </button>
                          <div className="px-4 py-1 text-sm">{item.quantity}</div>
                          <button
                            onClick={() =>
                              updateQuantity(item.id, item.quantity + 1)
                            }
                            className="px-3 py-1 text-lg bg-gray-100 hover:bg-gray-200"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-2 hover:bg-red-100 rounded transition"
                        >
                          <Trash2 className="w-4 h-4 text-red-500" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Summary */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white border border-gray-200 rounded-2xl shadow-md p-6 sticky top-24 h-fit"
              >
                <h2 className="text-xl font-semibold mb-4">Order Summary</h2>

                <div className="space-y-3 text-sm text-gray-700">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>₹{totalPrice}</span>
                  </div>

                  <div className="border-t pt-3 flex justify-between font-medium text-black">
                    <span>Total</span>
                    <span>₹{totalPrice}</span>
                  </div>
                </div>

                <div className="mt-6 space-y-3">
                  <button
                    onClick={() => router.push('/checkout')}
                    className="w-full bg-black text-white py-2 rounded-lg hover:bg-gray-900 transition"
                  >
                    Proceed to Checkout
                  </button>
                  <button
                    onClick={clearCart}
                    className="w-full py-2 border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition"
                  >
                    Clear Cart
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
