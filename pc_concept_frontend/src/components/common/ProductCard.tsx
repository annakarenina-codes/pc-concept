import React from 'react';
import type { Product } from '../../api/services/productService';

interface ProductCardProps {
  product: Product;
  onOpenInfo?: (p: Product) => void;     // open ProductModal
  onWriteReview?: (p: Product) => void;  // open ReviewModal
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onOpenInfo, onWriteReview }) => {
  const formatPrice = (price: number) =>
    new Intl.NumberFormat('en-PH', { style: 'currency', currency: 'PHP', minimumFractionDigits: 2 }).format(price);

  const handleCardClick = () => onOpenInfo?.(product);
  const handleWriteReview = (e: React.MouseEvent) => {
    e.stopPropagation();
    onWriteReview?.(product);
  };

  return (
    <div
      className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
      onClick={handleCardClick}
    >
      {/* Product Image */}
      <div className="relative h-48 bg-gray-100">
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.currentTarget.style.display = 'none';
              e.currentTarget.parentElement!.innerHTML =
                '<div class="flex items-center justify-center h-full text-gray-400 text-sm">No Image</div>';
            }}
          />
        ) : (
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">No Image</div>
        )}

        {/* Category Badge */}
        {product.category && (
          <div className="absolute top-2 left-2 bg-red-700 text-white text-xs px-2 py-1 rounded">
            {product.category}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-sm font-semibold text-gray-800 mb-2 line-clamp-2 h-10">
          {product.name}
        </h3>

        {product.brand && (
          <p className="text-xs text-gray-500 mb-2">
            <span className="font-medium">Brand:</span> {product.brand}
          </p>
        )}

        {product.subcategory && (
          <p className="text-xs text-gray-500 mb-2">
            <span className="font-medium">Type:</span> {product.subcategory}
          </p>
        )}

        <p className="text-lg font-bold text-red-700 mb-3">{formatPrice(product.price)}</p>

        {product.description && (
          <p className="text-xs text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        )}

        {/* Write Review Button */}
        <button
          onClick={handleWriteReview}
          className="w-full bg-red-700 text-white py-2 px-4 rounded hover:bg-black transition-colors duration-300 text-sm font-medium"
        >
          WRITE A REVIEW
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
