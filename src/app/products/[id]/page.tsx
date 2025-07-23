'use client';

import { useEffect, useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { AiOutlineHeart, AiFillStar } from 'react-icons/ai';
import { FaFacebookF, FaWhatsapp, FaXTwitter } from 'react-icons/fa6';
import { useRouter } from 'next/navigation';
import { Truck, PackageCheck, ShieldCheck, Share2 } from 'lucide-react';
import { useCart } from '@/providers/CartProvider';
import toast from 'react-hot-toast';

type Product = {
  id: string;
  title: string;
  imageurl: string;
  price: number;
  description: string;
  discount?: number;
  rating?: number;
  inStock: boolean;
  category?: string;
};

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();
  const router = useRouter();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const ref = doc(db, 'products', params.id);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setProduct({ id: snap.id, ...snap.data() } as Product);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [params.id]);

  if (loading) {
    return (
      <div className="w-full py-16 px-6 bg-white text-black">
        <div className="grid md:grid-cols-2 gap-8 animate-pulse">
          <div className="h-[28rem] bg-gray-200 rounded-xl" />
          <div className="space-y-4">
            <div className="h-6 w-1/2 bg-gray-300 rounded" />
            <div className="h-5 w-3/4 bg-gray-300 rounded" />
            <div className="h-6 w-1/4 bg-gray-300 rounded" />
            <div className="h-10 w-full bg-gray-300 rounded" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="w-full bg-white text-center py-20 text-black">
        <p className="text-xl text-gray-600">Product not found.</p>
        <button
          className="mt-6 px-4 py-2 bg-black text-white rounded"
          onClick={() => router.push('/products')}
        >
          Back to Products
        </button>
      </div>
    );
  }

  const discountedPrice = product.discount
    ? product.price - (product.price * product.discount) / 100
    : product.price;

  const handleAddToCart = () => {
    addToCart({
      id: product.id,
      title: product.title,
      imageurl: product.imageurl,
      price: discountedPrice,
      quantity,
    });
    toast.success('Added to cart!');
  };

  return (
    <>
      <Navbar />

      <div className="w-full bg-white text-black px-4 md:px-10 py-12 grid grid-cols-1 md:grid-cols-2 gap-10">
        <div className="relative">
          <Image
            src={product.imageurl}
            alt={product.title}
            width={500}
            height={500}
            className="rounded-xl object-contain bg-white shadow w-full h-[28rem]"
            loading="lazy"
          />
          {product.discount && (
            <span className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full shadow">
              {product.discount}% OFF
            </span>
          )}
          <div className="absolute bottom-3 left-3 bg-black text-white text-sm px-4 py-1 rounded-lg shadow">
            ₹{discountedPrice.toFixed(0)}
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-2xl font-bold">{product.title}</h1>
              <p className="text-sm text-gray-500">{product.category || 'Uncategorized'}</p>
            </div>
            <button className="text-xl text-gray-600 hover:text-red-500">
              <AiOutlineHeart />
            </button>
          </div>

          <div className="flex items-center gap-2 text-sm">
            <div className="flex items-center text-yellow-500">
              {Array(Math.round(product.rating || 4))
                .fill(0)
                .map((_, i) => (
                  <AiFillStar key={i} />
                ))}
            </div>
            <span className="text-gray-600">({Math.floor(100 + Math.random() * 200)} reviews)</span>
          </div>

          <p className="text-base">{product.description}</p>

          <p
            className={`text-sm font-semibold ${
              product.inStock ? 'text-green-600' : 'text-red-600'
            }`}
          >
            {product.inStock ? 'In Stock — Ready to Ship' : 'Out of Stock'}
          </p>

          <div className="flex items-center gap-3 mt-3">
            <span className="text-sm font-medium">Quantity</span>
            <div className="flex items-center gap-1 border px-2 py-1 rounded">
              <button
                className="px-2 text-lg"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                -
              </button>
              <span className="px-2">{quantity}</span>
              <button className="px-2 text-lg" onClick={() => setQuantity((q) => q + 1)}>
                +
              </button>
            </div>
          </div>

          <div className="flex gap-4 mt-4 flex-wrap">
            <button className="bg-black text-white px-6 py-2 rounded hover:bg-gray-900">
              Buy Now
            </button>
            <button
              onClick={handleAddToCart}
              className="border px-6 py-2 rounded hover:bg-gray-100"
            >
              Add to Cart
            </button>
          </div>

          <div className="mt-6 border-t pt-4 space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Truck className="text-green-600 w-5 h-5" />
              Get it by <strong>July 27–29</strong>
            </div>
            <div className="flex items-center gap-2">
              <PackageCheck className="text-blue-600 w-5 h-5" />
              Free, Fast Delivery Available
            </div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="text-purple-600 w-5 h-5" />
              Secure Payments, Easy Returns, 100% Genuine
            </div>
          </div>

          <div className="flex gap-4 mt-4 text-gray-600 text-xl">
            <Share2 />
            <FaWhatsapp className="hover:text-green-500 cursor-pointer" />
            <FaFacebookF className="hover:text-blue-600 cursor-pointer" />
            <FaXTwitter className="hover:text-black cursor-pointer" />
          </div>
        </div>
      </div>

      <div className="w-full bg-white px-4 md:px-10 py-10">
        <h2 className="text-lg font-bold mb-4 text-black">You Might Also Like</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
          {Array(4)
            .fill(0)
            .map((_, i) => (
              <div key={i} className="h-40 bg-gray-100 rounded-lg animate-pulse" />
            ))}
        </div>
      </div>

      <Footer />
    </>
  );
}
