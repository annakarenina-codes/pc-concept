import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getAllBlogs } from '../api/services/blogService';
import type { Blog } from '../api/services/blogService';
import Loading from '../components/common/Loading';

const BlogPage: React.FC = () => {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const data = await getAllBlogs(1, 20);
        setBlogs(data.blogs);
        console.log('✅ Blogs loaded:', data.blogs);
      } catch (err) {
        setError('Failed to load blogs. Please try again later.');
        console.error('❌ Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const formatDate = (dateString: string) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });
    } catch {
      return dateString;
    }
  };

  if (loading) return <div className="mt-[150px]"><Loading /></div>;
  if (error) return <div className="text-center py-12 mt-[150px] text-red-600">{error}</div>;

  return (
    <div className="bg-white py-12 mt-[110px] font-poppins min-h-screen">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-center text-red-700 text-2xl font-semibold mb-12">
          READ OUR ARTICLES
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {blogs.length > 0 ? (
            blogs.map((blog) => (
              <div
                key={blog.blog_id}
                className="bg-white rounded-lg overflow-hidden hover:shadow-2xl transition-shadow duration-300 border border-gray-200"
              >
                <Link
                  to={`/blogs/${blog.blog_id}`}
                  className="relative overflow-hidden h-64 block"
                >
                  <img
                    src={blog.image_url || '/placeholder.jpg'}
                    alt={blog.title}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = '/placeholder.jpg';
                    }}
                  />
                </Link>
                <div className="p-6">
                  <h2 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-gray-600 mb-2">
                    By <span className="font-medium">{blog.author}</span>
                  </p>
                  <p className="text-sm text-gray-700 mb-4 line-clamp-3 leading-relaxed">
                    {blog.introduction}
                  </p>
                  <div className="flex items-center justify-between">
                    <Link to={`/blogs/${blog.blog_id}`}>
                      <button
                        className="bg-red-700 text-white text-sm font-semibold px-6 py-2 rounded-lg hover:bg-black transition-colors duration-300"
                      >
                        Read More
                      </button>
                    </Link>
                    <span className="text-sm text-gray-600 italic">
                      {formatDate(blog.date_published)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 text-center text-gray-500 py-12">
              No blog articles available yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
