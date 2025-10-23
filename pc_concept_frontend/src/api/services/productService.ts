import api from '../axiosConfig';

// THIS IS THE MISSING PART - ADD THIS!
export interface Product {
  product_id: string;
  name: string;
  brand: string;
  category: string;
  subcategory?: string;
  price: number;
  description?: string;
  image_url?: string;
}

// Now the functions
export const getAllProducts = async (): Promise<Product[]> => {
  try {
    const response = await api.get('/products/', {
      params: { per_page: 100 }
    });
    console.log('Products loaded:', response.data);
    return response.data.products || [];
  } catch (error) {
    console.error('Error:', error);
    return [];
  }
};

export const getProductById = async (productId: string): Promise<Product> => {
  const response = await api.get(`/products/${productId}`);
  return response.data;
};

export const searchProducts = async (searchTerm: string): Promise<Product[]> => {
  try {
    const response = await api.get('/products/search', {
      params: { q: searchTerm }
    });
    return response.data.products || [];
  } catch (error) {
    console.error('Search error:', error);
    return [];
  }
};
