import api from '../axiosConfig';

export const getAllBlogs = async () => {
  try {
    const response = await api.get('/blogs');
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getBlogById = async (blogId) => {
  try {
    const response = await api.get(`/blogs/${blogId}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
