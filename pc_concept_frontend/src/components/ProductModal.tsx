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
    if (open) window.addEventListener('keydown', onEsc);
    return () => window.removeEventListener('keydown', onEsc);
  }, [open, onClose]);

  if (!open || !product) return null;

  return (
    <div className="fixed inset-0 z-[100]">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="bg-gray-50 p-6">
              <img
                src={product.image_url || '/placeholder.png'}
                alt={product.name}
                className="w-full h-auto object-contain rounded"
              />
            </div>
            <div className="p-6 space-y-3">
              <h2 className="text-2xl font-semibold text-gray-900">{product.name}</h2>
              {product.brand && <p className="text-sm text-gray-600">Brand: {product.brand}</p>}
              <p className="text-sm text-gray-600">Category: {product.category}</p>
              {product.subcategory && <p className="text-sm text-gray-600">Subcategory: {product.subcategory}</p>}
              {typeof product.price === 'number' && (
                <p className="text-lg font-bold text-red-700">₱{product.price.toLocaleString()}</p>
              )}
              {product.description && <p className="text-sm text-gray-700">{product.description}</p>}

              <div className="pt-4 flex gap-3">
                <button onClick={onClose} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
                  Close
                </button>
                {onWriteReview && (
                  <button
                    onClick={() => onWriteReview(product)}
                    className="px-4 py-2 rounded bg-red-700 text-white hover:bg-red-800"
                  >
                    Write a review
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
