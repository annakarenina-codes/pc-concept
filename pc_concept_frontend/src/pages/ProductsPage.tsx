import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getAllProducts, searchProducts, type Product } from '../api/services/productService';
import ProductCard from '../components/common/ProductCard';
import Loading from '../components/common/Loading';


const ProductsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const selectedCategory = searchParams.get('category') || '';
  const searchQuery = searchParams.get('search') || '';
  
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        // If search query exists, use search endpoint
        if (searchQuery) {
          const data = await searchProducts(searchQuery);
          setProducts(data);
        } else {
          // Otherwise get all products
          const data = await getAllProducts();
          setProducts(data);
        }
      } catch (err) {
        setError('Failed to load products. Please try again later.');
        console.error('Error fetching products:', err);
      } finally {
        setLoading(false);
      }
    };


    fetchProducts();
  }, [searchQuery]); // Re-fetch when search query changes


  // Filter products by selected category (client-side filtering)
  let filteredProducts = products;


  // Filter by category if selected
  if (selectedCategory) {
    filteredProducts = filteredProducts.filter(p => p.category === selectedCategory);
  }


  // Filter by search query if entered (additional client-side filter for category search)
  if (searchQuery && !selectedCategory) {
    const query = searchQuery.toLowerCase();
    filteredProducts = filteredProducts.filter(p => 
      p.name.toLowerCase().includes(query) ||
      (p.brand && p.brand.toLowerCase().includes(query)) ||
      p.category.toLowerCase().includes(query) ||
      (p.subcategory && p.subcategory.toLowerCase().includes(query))
    );
  }


  // Group products by Brand for Laptops and Speakers, Subcategory for others
  const groupedProducts: Record<string, Product[]> = {};
  
  filteredProducts.forEach(product => {
    let groupKey: string;
    
    // For Laptops and Speakers, group by Brand
    if (product.category === 'Laptops' || product.category === 'Speakers') {
      groupKey = product.brand || 'Other';
    } else {
      // For Desktop/PCs, Components, Accessories - group by Subcategory
      groupKey = product.subcategory || 'Other';
    }
    
    if (!groupedProducts[groupKey]) {
      groupedProducts[groupKey] = [];
    }
    groupedProducts[groupKey].push(product);
  });


  // Get category/search title
  const getPageTitle = () => {
    if (searchQuery) {
      return `SEARCH RESULTS FOR "${searchQuery}"`;
    }
    
    const titles: Record<string, string> = {
      'Laptops': 'FOR LAPTOPS',
      'Desktop/PCs': 'FOR DESKTOP / PC',
      'Components': 'FOR PC COMPONENTS',
      'Accessories': 'FOR ACCESSORIES',
      'Speakers': 'FOR SPEAKERS'
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
                  <ProductCard key={product.product_id} product={product} />
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
    </div>
  );
};


export default ProductsPage;