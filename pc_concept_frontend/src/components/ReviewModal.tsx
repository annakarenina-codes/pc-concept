import React, { useState } from 'react';
import { X } from 'lucide-react';
import type { Product } from '../api/services/productService';
import { createReview } from '../api/services/reviewService';

interface ReviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  product: Product | null;
}

const ReviewModal: React.FC<ReviewModalProps> = ({ isOpen, onClose, onSuccess, product }) => {
  const [reviewerName, setReviewerName] = useState('');
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
      // Build payload dynamically to avoid sending undefined values
      const payload: any = {
        product_id: product.product_id,
        reviewer_name: reviewerName.trim(),
        review_text: reviewText.trim(),
      };

      // Include optional metadata only when applicable
      if (product.name) payload.product_name = product.name;
      if (product.category) payload.category = product.category;
      if (canShowBrand && product.brand) payload.brand = product.brand;
      if (canShowSub && product.subcategory) payload.subcategory = product.subcategory;

      await createReview(payload);

      onSuccess();
      setReviewerName('');
      setReviewText('');
      onClose();
    } catch (err) {
      setError('Failed to submit review. Please try again.');
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
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Read-only product summary */}
          <div className="px-6 pt-4 pb-2 text-sm text-gray-700 space-y-1">
            <div><span className="font-medium">Product:</span> {product.name}</div>
            <div><span className="font-medium">Category:</span> {product.category}</div>
            {canShowBrand && product.brand && (
              <div><span className="font-medium">Brand:</span> {product.brand}</div>
            )}
            {canShowSub && product.subcategory && (
              <div><span className="font-medium">Subcategory:</span> {product.subcategory}</div>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
            {/* Reviewer Name */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Name *
              </label>
              <input
                type="text"
                required
                value={reviewerName}
                onChange={(e) => setReviewerName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent"
                placeholder="e.g., Joshua T."
              />
            </div>

            {/* Review Text */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Review *
              </label>
              <textarea
                required
                rows={5}
                value={reviewText}
                onChange={(e) => setReviewText(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-700 focus:border-transparent resize-none"
                placeholder="Share your experience with this product..."
              />
            </div>

            {/* Error Message */}
            {error && <div className="text-red-600 text-sm">{error}</div>}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || !reviewerName.trim() || !reviewText.trim()}
              className="w-full bg-red-700 text-white py-3 rounded-lg font-semibold hover:bg-black transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Review'}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ReviewModal;
