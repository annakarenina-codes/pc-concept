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

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const data = await getAllReviews();
        setReviews(data);
      } catch (err) {
        setError('Failed to load reviews. Please try again later.');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  // Group reviews by category
  const groupedReviews = reviews.reduce((acc, review) => {
    const category = review.category || 'UNCATEGORIZED';
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(review);
    return acc;
  }, {} as Record<string, Review[]>);

  // Scroll function for carousel
  const scroll = (category: string, direction: 'left' | 'right') => {
    const container = scrollRefs.current[category];
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

  // Check if scroll buttons should be shown
  const canScrollLeft = (category: string) => {
    const container = scrollRefs.current[category];
    return container && container.scrollLeft > 0;
  };

  const canScrollRight = (category: string) => {
    const container = scrollRefs.current[category];
    if (!container) return false;
    return container.scrollLeft < (container.scrollWidth - container.clientWidth - 10);
  };

  if (loading) return <div className="mt-[150px]"><Loading /></div>;
  if (error) return <div className="text-center py-12 mt-[150px] text-red-600">{error}</div>;

  return (
    <div className="bg-gray-50 py-12 mt-[150px] font-poppins min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-center text-red-700 text-2xl font-semibold mb-8">
          WHAT OUR CUSTOMERS SAY
        </h1>

        {/* Reviews by Category */}
        {Object.keys(groupedReviews).map((category) => (
          <div key={category} className="mb-12">
            {/* Category Header with Slider Buttons */}
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-900">{category}</h2>
              
              {/* Slider Controls */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => scroll(category, 'left')}
                  disabled={!canScrollLeft(category)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    canScrollLeft(category)
                      ? 'bg-red-700 text-white hover:bg-black'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={() => scroll(category, 'right')}
                  disabled={!canScrollRight(category)}
                  className={`p-2 rounded-full transition-all duration-200 ${
                    canScrollRight(category)
                      ? 'bg-red-700 text-white hover:bg-black'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Scrollable Review Cards */}
            <div className="relative">
              <div
                ref={(el) => {
                  scrollRefs.current[category] = el;
                }}
                className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
              >
                {groupedReviews[category].map((review) => (
                  <div
                    key={review.review_id}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300 flex-shrink-0 w-[calc(33.333%-16px)] min-w-[300px]"
                  >
                    {/* Product Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 text-center">
                      {review.product_name}
                    </h3>

                    {/* Reviewer Name */}
                    <p className="text-sm text-gray-600 italic text-center mb-4">
                      By {review.reviewer_name}
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
        ))}

        {/* Empty State */}
        {Object.keys(groupedReviews).length === 0 && (
          <div className="text-center text-gray-500 py-12">
            No reviews available yet
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
