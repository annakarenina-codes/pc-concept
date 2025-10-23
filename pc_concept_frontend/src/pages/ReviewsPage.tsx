import React, { useState, useEffect } from 'react';
import { getAllReviews } from '../api/services/reviewService';
import type { Review } from '../api/services/reviewService';
import Loading from '../components/common/Loading';
import ReviewModal from '../components/ReviewModal';

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

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

  if (loading) return <div className="mt-[150px]"><Loading /></div>;
  if (error) return <div className="text-center py-12 mt-[150px] text-red-600">{error}</div>;

  return (
    <>
      <div className="bg-gray-50 py-12 mt-[150px] font-poppins min-h-screen">
        <div className="max-w-7xl mx-auto px-4">
          {/* Page Title */}
          <h1 className="text-center text-red-700 text-2xl font-semibold mb-8">
            WHAT OUR CUSTOMERS SAY
          </h1>

          {/* Reviews by Category */}
          {Object.keys(groupedReviews).map((category) => (
            <div key={category} className="mb-12">
              {/* Category Header */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">{category}</h2>
                <button className="text-sm text-gray-700 hover:text-red-700 transition-colors flex items-center gap-1">
                  View All
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              {/* Review Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {groupedReviews[category].slice(0, 3).map((review) => (
                  <div
                    key={review.review_id}
                    className="bg-white rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300"
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
          ))}

          {/* Empty State */}
          {Object.keys(groupedReviews).length === 0 && (
            <div className="text-center text-gray-500 py-12">
              No reviews available yet
            </div>
          )}
        </div>
      </div>

      {/* Floating "Write Yours" Button */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="fixed bottom-8 right-8 bg-red-700 text-white px-6 py-3 rounded-full font-semibold hover:bg-black transition-colors duration-300 shadow-lg flex items-center gap-2 z-40"
      >
        WRITE YOURS
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Review Modal */}
      <ReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={() => {
          setIsModalOpen(false);
          // Optionally refetch reviews here
        }}
      />
    </>
  );
};

export default ReviewsPage;
