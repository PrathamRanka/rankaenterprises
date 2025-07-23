'use client';

import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import Image from 'next/image';
import Link from 'next/link';
import toast, { Toaster } from 'react-hot-toast';
import { useCart } from '@/providers/CartProvider'; // 👈 Correct place for hook
import Footer from '@/components/Footer';
import Navbar from '@/components/Navbar';

type Product = {
  id: string;
  title: string;
  imageurl: string;
  price: number;
  description: string;
  inStock: boolean;
  category?: string;
  rating?: number;
  discount?: number;
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [filtered, setFiltered] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('latest');
  const [priceFilters, setPriceFilters] = useState<string[]>([]);
  const [categoryFilters, setCategoryFilters] = useState<string[]>([]);
  const [search, setSearch] = useState('');

  const { addToCart } = useCart(); // ✅ moved up so it's ready before usage

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const querySnapshot = await getDocs(collection(db, 'products'));
      const items: Product[] = [];
      querySnapshot.forEach((doc) => {
        items.push({ id: doc.id, ...doc.data() } as Product);
      });
      setProducts(items);
      setLoading(false);
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let result = [...products];

    if (categoryFilters.length > 0) {
      result = result.filter((item) =>
        categoryFilters.includes(item.category || '')
      );
    }

    if (priceFilters.length > 0) {
      result = result.filter((item) => {
        if (priceFilters.includes('under500') && item.price < 500) return true;
        if (
          priceFilters.includes('500to1000') &&
          item.price >= 500 &&
          item.price <= 1000
        )
          return true;
        if (priceFilters.includes('above1000') && item.price > 1000) return true;
        return false;
      });
    }

    if (search) {
      result = result.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sortBy === 'price-low') result.sort((a, b) => a.price - b.price);
    if (sortBy === 'price-high') result.sort((a, b) => b.price - a.price);

    setFiltered(result);
  }, [products, sortBy, priceFilters, categoryFilters, search]);

  const handlePriceFilter = (key: string) => {
    setPriceFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleCategoryFilter = (key: string) => {
    setCategoryFilters((prev) =>
      prev.includes(key) ? prev.filter((k) => k !== key) : [...prev, key]
    );
  };

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: product.id,
      title: product.title,
      imageurl: product.imageurl,
      price: product.price,
      quantity: 1,
    });
    toast.success(`${product.title} added to cart`);
  };

  const handleAddToWishlist = (title: string) => {
    toast.success(`${title} added to wishlist`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-neutral-50 text-gray-900 font-sans">
      <Navbar />
      <Toaster position="top-right" />
      <main className="flex flex-1 px-4 md:px-8 py-6 gap-6">
        <aside className="hidden md:block w-1/4">
          <div className="bg-white p-5 rounded-xl shadow border space-y-6 sticky top-24">
            <div>
              <h2 className="font-semibold text-lg mb-3">Search</h2>
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name..."
                className="w-full px-3 py-2 border rounded"
              />
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-3">Price</h2>
              <div className="space-y-2 text-sm text-gray-700">
                {[{ label: 'Under ₹500', key: 'under500' },
                  { label: '₹500 - ₹1000', key: '500to1000' },
                  { label: '₹1000+', key: 'above1000' },
                ].map(({ label, key }) => (
                  <label key={key} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={() => handlePriceFilter(key)}
                      checked={priceFilters.includes(key)}
                    />
                    {label}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-semibold text-lg mb-3">Category</h2>
              <div className="space-y-2 text-sm text-gray-700">
                {['T-Shirts', 'Accessories', 'Shoes'].map((cat) => (
                  <label key={cat} className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      onChange={() => handleCategoryFilter(cat)}
                      checked={categoryFilters.includes(cat)}
                    />
                    {cat}
                  </label>
                ))}
              </div>
            </div>
          </div>
        </aside>

        <section className="w-full md:w-3/4">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-5 gap-4">
            <h1 className="text-2xl font-bold">Products</h1>
            <select
              className="p-2 border rounded-md text-sm bg-white shadow-sm"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="latest">Sort: Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {loading
              ? Array(6)
                  .fill(0)
                  .map((_, i) => (
                    <div
                      key={i}
                      className="h-64 w-full bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-xl animate-pulse"
                    />
                  ))
              : filtered.length === 0 ? (
                  <p className="col-span-full text-center text-gray-500">
                    No products match your filters.
                  </p>
                ) : (
                  filtered.map((product) => (
                    <Link
                      key={product.id}
                      href={`/products/${product.id}`}
                      className="group"
                    >
                      <div className="relative bg-white rounded-xl border shadow group overflow-hidden transition hover:shadow-lg hover:scale-[1.02] cursor-pointer">
                        {product.discount && (
                          <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs px-2 py-1 rounded">
                            -{product.discount}% OFF
                          </span>
                        )}

                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition flex items-center justify-center gap-3 z-10">
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToWishlist(product.title);
                            }}
                            className="bg-white text-sm px-3 py-1 rounded hover:bg-gray-200"
                          >
                            ❤️ Wishlist
                          </button>
                          <button
                            onClick={(e) => {
                              e.preventDefault();
                              handleAddToCart(product);
                            }}
                            className="bg-black text-white text-sm px-3 py-1 rounded hover:bg-gray-800"
                          >
                            🛒 Add to Cart
                          </button>
                        </div>

                        <Image
                          src={product.imageurl}
                          alt={product.title}
                          width={300}
                          height={200}
                          loading="lazy"
                          className="object-cover w-full h-48 group-hover:scale-105 transition-transform duration-300"
                        />

                        <div className="p-4">
                          <h3 className="font-semibold text-md truncate">{product.title}</h3>
                          <div className="flex items-center gap-2 mt-1 text-sm">
                            <span className="font-medium">₹{product.price}</span>
                            {product.discount && (
                              <span className="line-through text-gray-400 text-xs">
                                ₹
                                {Math.floor(
                                  product.price / (1 - product.discount / 100)
                                )}
                              </span>
                            )}
                          </div>
                          {product.rating && (
                            <div className="text-yellow-500 text-sm mt-1">
                              {'★'.repeat(Math.floor(product.rating))}
                              {'☆'.repeat(5 - Math.floor(product.rating))}
                              <span className="text-gray-500 text-xs ml-1">
                                ({product.rating.toFixed(1)})
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    </Link>
                  ))
                )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
