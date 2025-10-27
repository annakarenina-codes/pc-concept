import api from '../axiosConfig';

// Blog interface matching your backend
export interface Blog {
  blog_id: number;           // ✅ Backend uses number
  title: string;
  introduction: string;      // ✅ Correct field name
  body: string;              // ✅ Correct field name
  conclusion: string;        // ✅ Correct field name
  image_url: string | null;  // ✅ Can be null
  author: string;            // ✅ Required, not optional
  date_published: string;    // ✅ Correct field name (Date as string from API)
}

// API Response interface
export interface BlogsResponse {
  blogs: Blog[];
  page: number;
  per_page: number;
  total: number;
  pages: number;
}

// Create Blog Request interface
export interface CreateBlogRequest {
  title: string;
  introduction: string;
  body: string;
  conclusion: string;
  image_url?: string | null;
  author: string;
  date_published: string;  // Format: "YYYY-MM-DD"
}

// Get all blogs (with pagination)
export const getAllBlogs = async (
  page: number = 1,
  perPage: number = 10
): Promise<BlogsResponse> => {
  try {
    const response = await api.get('/blogs/', {
      params: {
        page,
        per_page: perPage
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error loading blogs:', error);
    throw error;
  }
};

// Get single blog by ID
export const getBlogById = async (blogId: number): Promise<Blog> => {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Error loading blog:', error);
    throw error;
  }
};

// Create a new blog (Admin only)
export const createBlog = async (blogData: CreateBlogRequest): Promise<{ message: string; blog_id: number }> => {
  try {
    const response = await api.post('/blogs/', blogData);
    return response.data;
  } catch (error) {
    console.error('Error creating blog:', error);
    throw error;
  }
};

// Update blog (Admin only)
export const updateBlog = async (
  blogId: number,
  blogData: Partial<CreateBlogRequest>
): Promise<{ message: string }> => {
  try {
    const response = await api.put(`/blogs/${blogId}`, blogData);
    return response.data;
  } catch (error) {
    console.error('Error updating blog:', error);
    throw error;
  }
};

// Delete blog (Admin only)
export const deleteBlog = async (blogId: number): Promise<{ message: string }> => {
  try {
    const response = await api.delete(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting blog:', error);
    throw error;
  }
};
