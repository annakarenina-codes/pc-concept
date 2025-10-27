import api from '../axiosConfig';

// Product interface for CARD MODE (minimal data)
export interface ProductCard {
  product_id: string;
  name: string;
  price: number;
  image_url: string;
}

// Specification interface
export interface Specification {
  spec_name: string;
  spec_value: string;
}

// Full Product interface (with all details)
export interface Product {
  product_id: string;
  name: string;
  brand: string | null;
  category: string;
  subcategory: string | null;
  price: number;
  image_url: string;
  description?: string;
  specifications?: Array<{  // ✅ Make sure this exists
    spec_name: string;
    spec_value: string;
  }>;
}


// API Response interfaces
export interface ProductsResponse {
  products: ProductCard[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
}

export interface SearchResponse {
  products: Product[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
  search_term: string;
}

// Get all products (with pagination and card mode)
export const getAllProducts = async (
  page: number = 1,
  perPage: number = 24,
  cardMode: boolean = true
): Promise<ProductsResponse> => {
  try {
    const response = await api.get('/products/', {
      params: {
        page,
        per_page: perPage,
        card_mode: cardMode
      }
    });
    console.log('Products loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error loading products:', error);
    throw error;
  }
};

// Get single product by ID (includes specifications)
export const getProductById = async (productId: string): Promise<Product> => {
  try {
    const response = await api.get(`/products/${productId}`);
    console.log('Product detail loaded:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error loading product:', error);
    throw error;
  }
};

// Get products by category
export const getProductsByCategory = async (
  category: string,
  page: number = 1,
  perPage: number = 24,
  cardMode: boolean = true
): Promise<ProductsResponse> => {
  try {
    const response = await api.get(`/products/category/${category}`, {
      params: {
        page,
        per_page: perPage,
        card_mode: cardMode
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error loading products by category:', error);
    throw error;
  }
};

// Get laptops by brand
export const getLaptopsByBrand = async (
  brand: string,
  page: number = 1,
  perPage: number = 24,
  cardMode: boolean = true
): Promise<ProductsResponse> => {
  try {
    const response = await api.get(`/products/category/Laptops/brand/${brand}`, {
      params: {
        page,
        per_page: perPage,
        card_mode: cardMode
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error loading laptops by brand:', error);
    throw error;
  }
};

// Get products by category and subcategory
export const getProductsBySubcategory = async (
  category: string,
  subcategory: string,
  page: number = 1,
  perPage: number = 24,
  cardMode: boolean = true
): Promise<ProductsResponse> => {
  try {
    const response = await api.get(
      `/products/category/${encodeURIComponent(category)}/subcategory/${encodeURIComponent(subcategory)}`,
      {
        params: {
          page,
          per_page: perPage,
          card_mode: cardMode
        }
      }
    );
    return response.data;
  } catch (error) {
    console.error('Error loading products by subcategory:', error);
    throw error;
  }
};

// Search products
export const searchProducts = async (
  searchTerm: string,
  page: number = 1,
  perPage: number = 24,
  cardMode: boolean = true
): Promise<SearchResponse> => {
  try {
    const response = await api.get('/products/search', {
      params: {
        q: searchTerm,
        page,
        per_page: perPage,
        card_mode: cardMode
      }
    });
    return response.data;
  } catch (error) {
    console.error('Search error:', error);
    throw error;
  }
};
