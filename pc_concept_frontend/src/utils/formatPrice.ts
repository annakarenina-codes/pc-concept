export const formatPrice = (price) => {
  return `₱${parseFloat(price).toLocaleString('en-PH', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;
};

export const calculateDiscount = (originalPrice, salePrice) => {
  if (!originalPrice || !salePrice) return 0;
  return Math.round(((originalPrice - salePrice) / originalPrice) * 100);
};
