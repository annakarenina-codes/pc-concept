import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  getAllProducts,
  getProductById,
  type Product,
  type ProductCard
} from '../api/services/productService';
import { getAllBlogs, type Blog } from '../api/services/blogService';
import ProductCardComponent from '../components/common/ProductCard';
import ProductModal from '../components/ProductModal';
import ReviewModal from '../components/ReviewModal';
import Loading from '../components/common/Loading';

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
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

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

  const onSale = products.slice(40, 45);

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
      <section className="relative mt-[112px] w-full bg-gray-100">
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
          onMouseEnter={() => setHoveredIndex(index)}
          onMouseLeave={() => setHoveredIndex(null)}
          className="relative px-8 py-4 font-medium text-white bg-red-700 rounded-lg overflow-hidden group"
          style={{
            transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
            transform: hoveredIndex === index ? 'translateY(-8px) scale(1.05)' : 'translateY(0) scale(1)',
            boxShadow: hoveredIndex === index 
              ? '0 20px 40px rgba(220, 38, 38, 0.4), 0 0 0 2px rgba(0, 0, 0, 0.1)' 
              : '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          {/* Animated background gradient */}
          <div 
            className="absolute inset-0 bg-gradient-to-r from-black via-gray-900 to-black opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              backgroundSize: '200% 100%',
              animation: hoveredIndex === index ? 'gradientShift 2s ease infinite' : 'none',
            }}
          />
          
          {/* Shine effect */}
          <div 
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)',
              transform: hoveredIndex === index ? 'translateX(100%)' : 'translateX(-100%)',
              transition: 'transform 0.8s ease-in-out',
            }}
          />
          
          {/* Pulsing border */}
          <div 
            className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100"
            style={{
              border: '2px solid rgba(255, 255, 255, 0.5)',
              animation: hoveredIndex === index ? 'pulse 1.5s ease-in-out infinite' : 'none',
            }}
          />
          
          {/* Text with letter spacing animation */}
          <span 
            className="relative z-10 block transition-all duration-300"
            style={{
              letterSpacing: hoveredIndex === index ? '0.15em' : '0.05em',
              textShadow: hoveredIndex === index ? '0 0 20px rgba(255,255,255,0.5)' : 'none',
            }}
          >
            {category.name}
          </span>
          
          {/* Bottom accent line */}
          <div 
            className="absolute bottom-0 left-0 h-1 bg-white transition-all duration-500 ease-out"
            style={{
              width: hoveredIndex === index ? '100%' : '0%',
              boxShadow: hoveredIndex === index ? '0 0 10px rgba(255,255,255,0.8)' : 'none',
            }}
          />
        </button>
      ))}
    </div>
  </div>
  
  <style>{`
    @keyframes gradientShift {
      0%, 100% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
    }
    
    @keyframes pulse {
      0%, 100% {
        opacity: 1;
        transform: scale(1);
      }
      50% {
        opacity: 0.5;
        transform: scale(1.02);
      }
    }
  `}</style>
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
