import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { getAllReviews } from '../api/services/reviewService';
import type { Review } from '../api/services/reviewService';
import Loading from '../components/common/Loading';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const scrollRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // ✅ Define category order to match ProductsPage
  const CATEGORY_ORDER = ['Laptops', 'Desktop/PCs', 'Components', 'Accessories', 'Speakers'];

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getAllReviews(1, 100, true);
        setReviews(data);
        console.log('✅ Reviews loaded:', data);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error('❌ Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // ✅ Group reviews by category, then by brand/subcategory
  const groupedReviews = reviews.reduce((acc, review) => {
    const category = review.category || 'UNCATEGORIZED';
    
    if (!acc[category]) {
      acc[category] = {};
    }

    // Determine grouping key based on category
    let groupKey = '';
    
    if (category === 'Laptops') {
      groupKey = review.brand?.trim().toUpperCase() || 'OTHER';
    } else if (category === 'Desktop/PCs' || category === 'Components' || category === 'Accessories') {
      groupKey = review.subcategory?.trim() || 'OTHER';
    } else if (category === 'Speakers') {
      groupKey = 'ALL';
    } else {
      groupKey = 'OTHER';
    }

    if (!acc[category][groupKey]) {
      acc[category][groupKey] = [];
    }
    
    acc[category][groupKey].push(review);
    return acc;
  }, {} as Record<string, Record<string, Review[]>>);

  // ✅ Format date for display
  const formatDate = (dateString: string) => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'long', 
        day: 'numeric' 
      });
    } catch {
      return dateString;
    }
  };

  // Scroll function for carousel
  const scroll = (key: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[key];
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const newPosition = direction === 'left' 
      ? container.scrollLeft - scrollAmount 
      : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: 'smooth'
    });
  };

  // Check if can scroll
  const [scrollState, setScrollState] = useState(0);

  const updateScrollState = () => {
    setScrollState(prev => prev + 1);
  };

  const canScrollLeft = (key: string) => {
    const container = scrollRefs.current[key];
    return container && container.scrollLeft > 10;
  };

  const canScrollRight = (key: string) => {
    const container = scrollRefs.current[key];
    if (!container) return false;
    return container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
  };

  if (loading) return <div className="mt-[150px]"><Loading /></div>;
  if (error) return <div className="text-center py-12 mt-[150px] text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 py-12 mt-[112px] font-poppins min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-center text-red-700 text-2xl font-semibold mb-12">
          WHAT OUR CUSTOMERS SAY
        </h1>

        {/* ✅ Reviews by Category in SPECIFIC ORDER */}
        {CATEGORY_ORDER.map((category) => {
          // Skip category if no reviews exist for it
          if (!groupedReviews[category]) return null;

          return (
            <div key={category} className="mb-16">
              {/* Category Label - "FOR LAPTOPS" style */}
              <h2 className="text-center text-red-700 text-lg font-medium mb-8">
                FOR {category.toUpperCase()}
              </h2>

              {/* Brand/Subcategory Sections */}
              {Object.keys(groupedReviews[category]).sort().map((groupKey) => {
                const scrollKey = `${category}-${groupKey}`;
                const reviewGroup = groupedReviews[category][groupKey];

                // Skip "ALL" label for Speakers
                const showGroupLabel = !(category === 'Speakers' && groupKey === 'ALL');

                return (
                  <div key={scrollKey} className="mb-12">
                    {/* Brand/Subcategory Header with Arrow Buttons */}
                    <div className="flex items-center justify-between mb-6">
                      <h3 className="text-xl font-bold text-gray-900 uppercase">
                        {showGroupLabel ? groupKey : ''}
                      </h3>
                      
                      {/* Slider Controls - Only show if more than 3 reviews */}
                      {reviewGroup.length > 3 && (
                        <div className="flex items-center gap-2 key={scrollState}">
                          <button
                            onClick={() => {
                              scroll(scrollKey, 'left');
                              setTimeout(updateScrollState, 100);
                            }}
                            disabled={!canScrollLeft(scrollKey)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              canScrollLeft(scrollKey)
                                ? 'bg-red-700 text-white hover:bg-red-800'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            aria-label="Scroll left"
                          >
                            <ChevronLeft className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => {
                              scroll(scrollKey, 'right');
                              setTimeout(updateScrollState, 100);
                            }}
                            disabled={!canScrollRight(scrollKey)}
                            className={`p-2 rounded-full transition-all duration-200 ${
                              canScrollRight(scrollKey)
                                ? 'bg-red-700 text-white hover:bg-red-800'
                                : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                            }`}
                            aria-label="Scroll right"
                          >
                            <ChevronRight className="w-5 h-5" />
                          </button>
                        </div>
                      )}
                    </div>

                    {/* Scrollable Review Cards */}
                    <div className="relative">
                      <div
                        ref={(el) => {
                          scrollRefs.current[scrollKey] = el;
                        }}
                        onScroll={updateScrollState}
                        className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                        style={{ 
                          scrollbarWidth: 'none', 
                          msOverflowStyle: 'none',
                          WebkitOverflowScrolling: 'touch'
                        }}
                      >
                        {reviewGroup.map((review) => (
                          <div
                            key={review.review_id}
                            className= "bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-[calc(25%-18px)] min-w-[220px]"
                          >
                            {/* Product Name */}
                            <h4 className="font-semibold text-gray-900 mb-2 text-center uppercase text-sm">
                              {review.product_name || 'Product'}
                            </h4>

                            {/* Reviewer Name */}
                            <p className="text-sm text-gray-600 italic text-center mb-1">
                              By {review.user_alias}
                            </p>

                            {/* Date Posted */}
                            <p className="text-xs text-gray-500 text-center mb-4">
                              Posted: {formatDate(review.date_posted)}
                            </p>

                            {/* Review Text */}
                            <p className="text-sm text-gray-700 leading-relaxed text-center">
                              "{review.review_text}"
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          );
        })}

        {/* Empty State */}
        {Object.keys(groupedReviews).length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No reviews available yet. Be the first to write a review!
          </div>
        )}
      </div>

      {/* Hide scrollbar globally */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
};

export default ReviewsPage;
