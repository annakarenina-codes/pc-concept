import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllProducts,
  getProductById, // Make sure this is imported!
  type Product,
  type ProductCard
} from '../api/services/productService';
import { getAllBlogs, type Blog } from '../api/services/blogService';
import ProductCardComponent from '../components/common/ProductCard';
import ProductModal from '../components/ProductModal';
import ReviewModal from '../components/ReviewModal';
import Loading from '../components/common/Loading';
import { FaTruck, FaCreditCard, FaTools } from 'react-icons/fa';

interface Category {
  name: string;
  value: string;
}

const HomePage: React.FC = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState<ProductCard[]>([]);
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Modal and Review state
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Product | null>(null);

  const categories: Category[] = [
    { name: "LAPTOPS", value: "Laptops" },
    { name: "DESKTOP/PC", value: "Desktop/PCs" },
    { name: "COMPONENTS", value: "Components" },
    { name: "ACCESSORIES", value: "Accessories" },
    { name: "SPEAKERS", value: "Speakers" }
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const productData = await getAllProducts(1, 100, true);
        setProducts(productData.products);

        const blogData = await getAllBlogs(1, 20);
        setBlogs(blogData.blogs);

        console.log('Products loaded:', productData.products);
        console.log('Blogs loaded:', blogData.blogs);
      } catch (err) {
        setError('Failed to load content. Please try again later.');
        console.error('Error fetching data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handler to fetch full product details before showing modal
  const handleOpenInfo = async (product: ProductCard | Product) => {
    setModalLoading(true);
    try {
      const fullProduct = await getProductById(product.product_id);
      setSelectedProduct(fullProduct);
    } catch (err) {
      setError('Failed to load product details.');
      setSelectedProduct(null);
      console.error('Error fetching full product:', err);
    } finally {
      setModalLoading(false);
    }
  };

  // Filter blogs by IDs 7-11 for Latest Promotions
  const latestPromotionBlogs = blogs.filter(blog =>
    blog.blog_id >= 7 && blog.blog_id <= 11
  );

  const newArrivals = products.slice(5, 10);
  const onSale = products.slice(40, 45);
  const bestSellers = products.slice(16, 21);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

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
              href="/blogs"
              onClick={(e) => {
                e.preventDefault();
                navigate('/blogs');
              }}
              className="text-sm text-red-700 font-medium flex items-center gap-1 hover:underline"
            >
              View All →
            </a>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
            {latestPromotionBlogs.length > 0 ? (
              latestPromotionBlogs.map((blog) => (
                <div
                  key={blog.blog_id}
                  onClick={() => navigate('/blogs')}
                  className="bg-white rounded-lg overflow-hidden hover:shadow-xl transition-all duration-300 border border-gray-200 cursor-pointer group"
                >
                  <div className="relative overflow-hidden h-48">
                    <img
                      src={blog.image_url || '/placeholder.jpg'}
                      alt={blog.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                        e.currentTarget.src = '/placeholder.jpg';
                      }}
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-2 line-clamp-2 min-h-[40px]">
                      {blog.title}
                    </h3>
                    <p className="text-xs text-gray-700 mb-3 line-clamp-2 leading-relaxed">
                      {blog.introduction}
                    </p>
                    <button className="w-full bg-red-700 text-white text-xs font-semibold px-4 py-2 rounded hover:bg-black transition-colors duration-300">
                      CONTINUE READING
                    </button>
                    <p className="text-xs text-gray-500 italic mt-2 text-right">
                      {formatDate(blog.date_published)}
                    </p>
                  </div>
                </div>
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
                <ProductCardComponent
                  key={product.product_id}
                  product={product}
                  onOpenInfo={handleOpenInfo}
                  onWriteReview={(p) => { setReviewTarget(p as Product); setReviewOpen(true); }}
                />
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
                <ProductCardComponent
                  key={product.product_id}
                  product={product}
                  onOpenInfo={handleOpenInfo}
                  onWriteReview={(p) => { setReviewTarget(p as Product); setReviewOpen(true); }}
                />
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
                <ProductCardComponent
                  key={product.product_id}
                  product={product}
                  onOpenInfo={handleOpenInfo}
                  onWriteReview={(p) => { setReviewTarget(p as Product); setReviewOpen(true); }}
                />
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
            <div className="flex flex-col items-center text-center">
              <FaTruck className="w-16 h-16 mb-4 text-gray-800" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Free Delivery
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                We Provide Free Delivery Services To Ensure A Smooth Shopping Experience.
              </p>
            </div>

            <div className="flex flex-col items-center text-center">
              <FaCreditCard className="w-16 h-16 mb-4 text-gray-800" />
              <h3 className="text-lg font-bold text-gray-900 mb-2">
                Installment Plan
              </h3>
              <p className="text-sm text-gray-600 max-w-xs">
                Flexible Installment Options Are Available For Your Convenience.
              </p>
            </div>

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

      {/* Product Info Modal */}
      <ProductModal
        open={!!selectedProduct}
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
        onWriteReview={(p) => {
          setSelectedProduct(null);
          setReviewTarget(p);
          setReviewOpen(true);
        }}
      />

      {/* Modal loading spinner */}
      {modalLoading && (
        <div className="fixed inset-0 z-[101] flex items-center justify-center bg-black bg-opacity-30">
          <Loading />
        </div>
      )}

      {/* Review Modal */}
      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSuccess={() => {/* optionally refresh */}}
        product={reviewTarget}
      />
    </div>
  );
};

export default HomePage;
