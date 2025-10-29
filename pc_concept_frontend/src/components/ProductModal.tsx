import React, { useEffect } from 'react';
import type { Product } from '../api/services/productService';

type Props = {
  open: boolean;
  product: Product | null;
  onClose: () => void;
  onWriteReview?: (product: Product) => void;
};

const ProductModal: React.FC<Props> = ({ open, product, onClose, onWriteReview }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) {
      window.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Modal Content */}
      <div
        className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto"
        onClick={e => e.stopPropagation()}
      >
        <div className="grid md:grid-cols-2">
          {/* Product Image */}
          <div className="bg-gray-50 p-6">
            <img
              src={product.image_url || '/placeholder.png'}
              alt={product.name}
              className="w-full h-auto object-contain rounded"
            />
          </div>

          {/* Product Details */}
          <div className="p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
            {/* Basic Info */}
            <div className="space-y-2">
              {product.brand && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Brand:</span> {product.brand}
                </p>
              )}
              <p className="text-sm text-gray-600">
                <span className="font-medium">Category:</span> {product.category}
              </p>
              {product.subcategory && product.subcategory !== '_' && product.subcategory !== '-' && (
                <p className="text-sm text-gray-600">
                  <span className="font-medium">Subcategory:</span> {product.subcategory}
                </p>
              )}
            </div>
            {/* Price */}
            {typeof product.price === 'number' && (
              <p className="text-2xl font-bold text-red-700">
                ₱{product.price.toLocaleString()}
              </p>
            )}
            {/* Specifications */}
            {product.specifications && product.specifications.length > 0 && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Specifications</h3>
                <div className="space-y-3">
                  {product.specifications.map((spec, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row sm:justify-between gap-1 pb-3 border-b border-gray-100 last:border-0"
                    >
                      <span className="font-medium text-gray-700 text-sm">
                        {spec.spec_name}:
                      </span>
                      <span className="text-gray-600 text-sm sm:text-right max-w-md">
                        {spec.spec_value}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {/* Action Buttons */}
            <div className="pt-6 flex gap-3">
              <button
                onClick={onClose}
                className="px-6 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 transition-colors font-medium"
              >
                Close
              </button>
              {onWriteReview && (
                <button
                  onClick={() => onWriteReview(product)}
                  className="px-6 py-2 rounded-lg bg-red-700 text-white hover:bg-red-800 transition-colors font-medium"
                >
                  Write a review
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
