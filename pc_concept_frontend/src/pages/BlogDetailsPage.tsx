import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById } from '../api/services/blogService';
import type { Blog } from '../api/services/blogService';

const BlogDetailsPage: React.FC = () => {
  const { blogId } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState<Blog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(Number(blogId));
        setBlog(data);
      } catch {
        navigate('/blogs'); // Or show an error message
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [blogId, navigate]);

  const formatDate = (dateString: string) =>
    new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  if (loading)
    return <div className="mt-[150px] text-center">Loading...</div>;

  if (!blog)
    return <div className="mt-[150px] text-center text-red-700">Blog not found.</div>;

  return (
    <div className="mt-[112px] bg-white min-h-screen py-12 font-poppins">
      <div className="max-w-3xl mx-auto px-4">
        <img
          src={blog.image_url || '/placeholder.jpg'}
          alt={blog.title}
          className="w-full h-72 object-cover rounded-lg shadow-lg mb-8"
        />
        <h1 className="text-3xl font-bold text-gray-900 mb-2">{blog.title}</h1>
        <p className="text-sm text-gray-600 mb-6">
          By <span className="font-medium">{blog.author}</span> • {formatDate(blog.date_published)}
        </p>
        {blog.introduction && (
          <div className="mb-6 text-gray-700">
            <p className="whitespace-pre-wrap text-justify">{blog.introduction}</p>
          </div>
        )}
        {blog.body && (
          <div className="mb-6 text-gray-700">
            <p className="whitespace-pre-wrap text-justify">{blog.body}</p>
          </div>
        )}
        {blog.conclusion && (
          <div className="mb-6 text-gray-700">
            <p className="whitespace-pre-wrap text-justify">{blog.conclusion}</p>
          </div>
        )}
        <button
          onClick={() => navigate('/blogs')}
          className="mt-8 px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-black font-semibold"
        >
          Back to Blogs
        </button>
      </div>
    </div>
  );
};

export default BlogDetailsPage;
