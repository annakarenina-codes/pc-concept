import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, searchProducts, type Product } from '../api/services/productService';
import ProductCard from '../components/common/ProductCard';
import ProductModal from '../components/ProductModal';
import ReviewModal from '../components/ReviewModal';
import Loading from '../components/common/Loading';

const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // ✅ FIXED: Modal state - Only Product type (not ProductCard)
  const [selected, setSelected] = useState<Product | null>(null);
  const [reviewOpen, setReviewOpen] = useState(false);
  const [reviewTarget, setReviewTarget] = useState<Product | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        if (searchQuery) {
          // ✅ FIXED: Extract .products array from search response
          const data = await searchProducts(searchQuery, 1, 100, false);
          setProducts(data.products);  // ✅ Extract products array
          console.log('Search products loaded:', data.products);
          console.log('First product:', data.products[0]);
        } else {
          // ✅ FIXED: Extract .products array from getAllProducts response
          const data = await getAllProducts(1, 100, false);
          setProducts(data.products);  // ✅ Extract products array
          console.log('All products loaded:', data.products);
          console.log('First product:', data.products[0]);

          const laptops = data.products.filter(p => p.category === 'Laptops');
          console.log('=== LAPTOP BRANDS ===');
          laptops.forEach(laptop => {
              console.log(`"${laptop.brand}" (length: ${laptop.brand?.length}) - ${laptop.name}`);
          });

        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  // Filtered set - Now products is an array, so .filter() works!
  let filteredProducts = products;

  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }

  if (searchQuery && !selectedCategory) {
    const q = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p =>
      p.name.toLowerCase().includes(q) ||
      (p.brand && p.brand.toLowerCase().includes(q)) ||
      p.category.toLowerCase().includes(q) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(q))
    );
  }

  // Group by Brand (Laptops, Speakers) or Subcategory (others)
  const groupedProducts: Record<string, Product[]> = {};
  filteredProducts.forEach(product => {
    let key = '';
    if (product.category === 'Laptops' || product.category === 'Speakers') {
      key = product.brand || 'Other';
    } else {
      key = product.subcategory || 'Other';
    }
    if (!groupedProducts[key]) groupedProducts[key] = [];
    groupedProducts[key].push(product);
  });

  const getPageTitle = () => {
    if (searchQuery) return `SEARCH RESULTS FOR "${searchQuery}"`;
    const titles: Record<string, string> = {
      'Laptops': 'FOR LAPTOPS',
      'Desktop/PCs': 'FOR DESKTOP / PC',
      'Components': 'FOR PC COMPONENTS',
      'Accessories': 'FOR ACCESSORIES',
      'Speakers': 'FOR SPEAKERS',
    };
    return selectedCategory ? titles[selectedCategory] || 'PRODUCTS' : 'ALL PRODUCTS';
  };

  if (loading) return <div className="mt-[150px]"><Loading /></div>;
  if (error) return <div className="text-center py-12 mt-[150px] text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 py-12 mt-[150px] font-poppins min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-center text-red-700 text-2xl font-bold mb-12">
          {getPageTitle()}
        </h1>

        {/* Product Sections Grouped by Brand/Subcategory */}
        {Object.keys(groupedProducts).length > 0 ? (
          Object.entries(groupedProducts).map(([groupName, groupProducts]) => (
            <section key={groupName} className="mb-12">
              {/* Section Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900 uppercase">{groupName}</h2>
                <button className="text-sm text-gray-700 hover:text-red-700 transition-colors flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Product Grid - Show 5 products per row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
                {groupProducts.slice(0, 5).map((product) => (
                  <ProductCard
                    key={product.product_id}
                    product={product}
                    onOpenInfo={setSelected}
                    onWriteReview={(p) => { setReviewTarget(p); setReviewOpen(true); }}
                  />
                ))}
              </div>
            </section>
          ))
        ) : (
          <div className="text-center text-gray-500 py-12">
            {searchQuery
              ? `No products found matching "${searchQuery}"`
              : selectedCategory
                ? `No products found in ${selectedCategory}`
                : 'No products found'}
          </div>
        )}
      </div>

      {/* Product info modal */}
      <ProductModal
        open={!!selected}
        product={selected}
        onClose={() => setSelected(null)}
        onWriteReview={(p) => { setSelected(null); setReviewTarget(p); setReviewOpen(true); }}
      />

      {/* Review modal */}
      <ReviewModal
        isOpen={reviewOpen}
        onClose={() => setReviewOpen(false)}
        onSuccess={() => {/* optional: toast or refetch */}}
        product={reviewTarget}
      />
    </div>
  );
};

export default ProductsPage;
