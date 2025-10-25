import api from '../axiosConfig';

export interface Blog {
  blog_id: string;
  title: string;
  content: string;
  image_url?: string;
  publish_date: string;
  author?: string;
}

export const getAllBlogs = async (): Promise<Blog[]> => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (blogId: string): Promise<Blog> => {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
