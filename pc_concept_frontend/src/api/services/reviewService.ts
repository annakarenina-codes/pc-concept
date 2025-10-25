import api from '../axiosConfig';

export interface Review {
  review_id: string;
  product_name: string;
  reviewer_name: string;
  review_text: string;
  category: string;
  created_at?: string;
}

export const getAllReviews = async (): Promise<Review[]> => {
  try {
    const response = await api.get<Review[]>('/reviews');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createReview = async (reviewData: Omit<Review, 'review_id' | 'created_at'>): Promise<Review> => {
  try {
    const response = await api.post<Review>('/reviews', reviewData);
    return response.data;
  } catch (error) {
    throw error;
  }
};
