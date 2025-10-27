import api from '../axiosConfig';

// Review interface matching your backend
export interface Review {
  review_id: number;
  product_id: string;
  product_name?: string;  // Optional, included when include_product_name=true
  user_alias: string;
  review_text: string;
  category: string;
  subcategory: string | null;
  brand: string | null;
  date_posted: string;
}

// API Response interfaces
export interface ReviewsResponse {
  reviews: Review[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
}

export interface ProductReviewsResponse {
  reviews: Review[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
  product_id: string;
  product_name: string;
}

// Create Review Request interface
export interface CreateReviewRequest {
  product_id: string;
  user_alias: string;
  review_text: string;
  category: string;
  brand?: string | null;
  subcategory?: string | null;
}

// Get all reviews (with pagination)
export const getAllReviews = async (
  page: number = 1,
  perPage: number = 100,  // Get more reviews at once
  includeProductName: boolean = true  // Always include product name
): Promise<Review[]> => {  // ← Return Review[] not ReviewsResponse
  try {
    const response = await api.get('/reviews/', {
      params: {
        page,
        per_page: perPage,
        include_product_name: includeProductName
      }
    });
    // ✅ Return just the reviews array
    return response.data.reviews;
  } catch (error) {
    console.error('Error loading reviews:', error);
    throw error;
  }
};

// Get review by ID
export const getReviewById = async (reviewId: number): Promise<Review> => {
  try {
    const response = await api.get(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading review:', error);
    throw error;
  }
};

// Get reviews for a specific product
export const getReviewsByProduct = async (
  productId: string,
  page: number = 1,
  perPage: number = 10
): Promise<ProductReviewsResponse> => {
  try {
    const response = await api.get(`/reviews/product/${productId}`, {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error loading product reviews:', error);
    throw error;
  }
};

// Filter reviews by category
export const getReviewsByCategory = async (
  category: string,
  page: number = 1,
  perPage: number = 20,
  includeProductName: boolean = true
): Promise<ReviewsResponse> => {
  try {
    const response = await api.get('/reviews/filter', {
      params: {
        category,
        page,
        per_page: perPage,
        include_product_name: includeProductName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error filtering reviews by category:', error);
    throw error;
  }
};

// Filter reviews by brand (Laptops only)
export const getReviewsByBrand = async (
  brand: string,
  page: number = 1,
  perPage: number = 20,
  includeProductName: boolean = true
): Promise<ReviewsResponse> => {
  try {
    const response = await api.get('/reviews/filter', {
      params: {
        category: 'Laptops',
        brand,
        page,
        per_page: perPage,
        include_product_name: includeProductName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error filtering reviews by brand:', error);
    throw error;
  }
};

// Filter reviews by subcategory
export const getReviewsBySubcategory = async (
  category: string,
  subcategory: string,
  page: number = 1,
  perPage: number = 20,
  includeProductName: boolean = true
): Promise<ReviewsResponse> => {
  try {
    const response = await api.get('/reviews/filter', {
      params: {
        category,
        subcategory,
        page,
        per_page: perPage,
        include_product_name: includeProductName
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error filtering reviews by subcategory:', error);
    throw error;
  }
};

// Create a new review
export const createReview = async (reviewData: CreateReviewRequest): Promise<{ message: string; review_id: number }> => {
  try {
    const response = await api.post('/reviews/', reviewData);
    return response.data;
  } catch (error) {
    console.error('Error creating review:', error);
    throw error;
  }
};

// Update review
export const updateReview = async (
  reviewId: number,
  reviewData: Partial<CreateReviewRequest>
): Promise<{ message: string }> => {
  try {
    const response = await api.put(`/reviews/${reviewId}`, reviewData);
    return response.data;
  } catch (error) {
    console.error('Error updating review:', error);
    throw error;
  }
};

// Delete review
export const deleteReview = async (reviewId: number): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/reviews/${reviewId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting review:', error);
    throw error;
  }
};
