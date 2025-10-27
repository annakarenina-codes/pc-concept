import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../api/services/productService';
import { createReview, type CreateReviewRequest } from '../api/services/reviewService';
import { toast } from "react-toastify";

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSuccess, product }) => {
  const [userAlias, setUserAlias] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!isOpen || !product) return null;

  const canShowBrand = product.category === 'Laptops';
  const canShowSub = ['Desktop/PCs', 'Components', 'Accessories'].includes(product.category);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const payload: CreateReviewRequest = {
        product_id: product.product_id,
        user_alias: userAlias.trim(),
        review_text: reviewText.trim(),
        category: product.category,
        brand: canShowBrand && product.brand ? product.brand : null,
        subcategory: canShowSub && product.subcategory ? product.subcategory : null,
      };

      await createReview(payload);

      // ✅ Show success toast!
      toast.success("Your review was posted!", {
        style: {
        background: "#fff",
        color: "#2d2f31",
        fontWeight: 500,
        borderLeft: "8px solid #c81e1e",
        boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
        },
        icon: <span style={{
        color: "#c81e1e",
        fontWeight: 900,
        fontSize: "1.4em"
      }}>✔</span>
    });


      // Success - reset form and close
      onSuccess();
      setUserAlias('');
      setReviewText('');
      onClose();
    } catch (err: any) {
      const errorMessage = err.response?.data?.error || 'Failed to submit review. Please try again.';
      setError(errorMessage);
      console.error('Error submitting review:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Write Your Review</h2>
            <button 
              onClick={onClose} 
              className="text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Product Summary */}
          <div className="px-6 pt-4 pb-2 bg-gray-50 border-b border-gray-200">
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium mb-2">
              Review For:
            </p>
            <div className="text-sm text-gray-700 space-y-1">
              <div><span className="font-semibold">Product:</span> {product.name}</div>
              <div><span className="font-semibold">Category:</span> {product.category}</div>
              {canShowBrand && product.brand && (
                <div><span className="font-semibold">Brand:</span> {product.brand}</div>
              )}
              {canShowSub && product.subcategory && (
                <div><span className="font-semibold">Subcategory:</span> {product.subcategory}</div>
              )}
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-4">
            {/* User Alias */}
            <div>
              <label htmlFor="userAlias" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name <span className="text-red-600">*</span>
              </label>
              <input
                id="userAlias"
                type="text"
                required
                value={userAlias}
                onChange={(e) => setUserAlias(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent transition-all"
                placeholder="e.g., Joshua T."
                maxLength={100}
              />
              <p className="text-xs text-gray-500 mt-1">
                This will be displayed as "By {userAlias || 'Your Name'}"
              </p>
            </div>

            {/* Review Text */}
            <div>
              <label htmlFor="reviewText" className="block text-sm font-medium text-gray-700 mb-2">
                Your Review <span className="text-red-600">*</span>
              </label>
              <textarea
                id="reviewText"
                required
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none transition-all"
                placeholder="Share your experience with this product..."
                maxLength={1000}
              />
              <p className="text-xs text-gray-500 mt-1">
                {reviewText.length}/1000 characters
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg text-sm">
                {error}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !userAlias.trim() || !reviewText.trim()}
              className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-red-800 transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-red-700"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : (
                'Submit Review'
              )}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
