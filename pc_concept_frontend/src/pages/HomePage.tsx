import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllProducts, type Product } from '../api/services/productService';
import ProductCard from '../components/common/ProductCard';
import Loading from '../components/common/Loading';
import { FaTruck, FaCreditCard, FaTools } from 'react-icons/fa';

interface Category {
  name: string;
  value: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const categories: Category[] = [
    { name: "LAPTOPS", value: "Laptops" },
    { name: "DESKTOP/PC", value: "Desktop/PCs" },
    { name: "COMPONENTS", value: "Components" },
    { name: "ACCESSORIES", value: "Accessories" },
    { name: "SPEAKERS", value: "Speakers" }
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const data = await getAllProducts();
        setProducts(data);
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by different criteria
  // Note: These assume your products have additional fields like 'is_new', 'is_on_sale', 'is_bestseller'
  // If not available, you can use date-based filtering or random selection
  
  // Latest Promotions - Products with descriptions containing "promo" or recent products
  const latestPromotions = products
    .filter(p => p.description?.toLowerCase().includes('promo') || p.description?.toLowerCase().includes('sale'))
    .slice(0, 5);

  // New Arrivals - Most recent products (you can sort by date if you have created_at field)
  const newArrivals = products.slice(0, 5);

  // On Sale - Products with "sale" in description or with significant price drops
  const onSale = products
    .filter(p => p.description?.toLowerCase().includes('sale') || p.description?.toLowerCase().includes('discount'))
    .slice(0, 5);

  // Best Sellers - Random selection or you can add a 'sales_count' field in backend
  const bestSellers = products.slice(5, 10);

  if (loading) return <div className="mt-[150px]"><Loading /></div>;
  if (error) return <div className="text-center py-12 mt-[150px] text-red-600">{error}</div>;

  return (
    <div className="font-sans">
      {/* Hero Banner Section */}
      <section className="relative mt-[150px] w-full bg-gray-100">
        <div className="w-full">
          <img
            src="/banner.png"
            alt="PC Concept - We Value Our Customers"
            className="w-full h-auto object-cover"
          />
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-semibold text-center mb-12 text-black text-2xl">
            CATEGORIES
          </h2>
          <div className="flex items-center justify-center gap-10 flex-wrap">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => navigate(`/products?category=${category.value}`)}
                className="px-8 py-4 font-medium transition-all duration-300 text-white bg-red-700 rounded-lg hover:bg-black hover:scale-105"
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Promotions Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Latest Promotions</h2>
            <a
              href="/products"
              className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline"
            >
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestPromotions.length > 0 ? (
              latestPromotions.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-5 text-center">No promotions available</p>
            )}
          </div>
        </div>
      </section>

      {/* New Arrivals Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">New Arrivals</h2>
            <a
              href="/products"
              className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline"
            >
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {newArrivals.length > 0 ? (
              newArrivals.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-5 text-center">No new arrivals available</p>
            )}
          </div>
        </div>
      </section>

      {/* On Sale Section */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">On Sale</h2>
            <a
              href="/products"
              className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline"
            >
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {onSale.length > 0 ? (
              onSale.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-5 text-center">No sale items available</p>
            )}
          </div>
        </div>
      </section>

      {/* Our Best Sellers Section */}
      <section className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Our Best Sellers</h2>
            <a
              href="/products"
              className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline"
            >
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {bestSellers.length > 0 ? (
              bestSellers.map((product) => (
                <ProductCard key={product.product_id} product={product} />
              ))
            ) : (
              <p className="text-gray-500 col-span-5 text-center">No best sellers available</p>
            )}
          </div>
        </div>
      </section>

      {/* Features/Benefits Section */}
<section className="bg-gray-50 py-16">
  <div className="max-w-7xl mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Feature 1: Free Delivery */}
      <div className="flex flex-col items-center text-center">
        <FaTruck className="w-16 h-16 mb-4 text-gray-800" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Free Delivery
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          We Provide Free Delivery Services To Ensure A Smooth Shopping Experience.
        </p>
      </div>

      {/* Feature 2: Installment Plan */}
      <div className="flex flex-col items-center text-center">
        <FaCreditCard className="w-16 h-16 mb-4 text-gray-800" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Installment Plan
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          Flexible Installment Options Are Available For Your Convenience.
        </p>
      </div>

      {/* Feature 3: Custom Build & Repair Service */}
      <div className="flex flex-col items-center text-center">
        <FaTools className="w-16 h-16 mb-4 text-gray-800" />
        <h3 className="text-lg font-bold text-gray-900 mb-2">
          Custom Build & Repair Service
        </h3>
        <p className="text-sm text-gray-600 max-w-xs">
          Offering Tailored PC Builds And Trusted Repair Services To Meet Your Needs.
        </p>
      </div>
    </div>
  </div>
</section>
    </div>
  );
};

export default HomePage;
