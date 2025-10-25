import React, { useEffect } from 'react';
import { X } from 'lucide-react';
import type { Blog } from '../api/services/blogService';

type Props = {
  open: boolean;
  blog: Blog | null;
  onClose: () => void;
};

const BlogModal: React.FC<Props> = ({ open, blog, onClose }) => {
  useEffect(() => {
    const onEsc = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    if (open) {
      window.addEventListener('keydown', onEsc);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onEsc);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  if (!open || !blog) return null;

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <div className="fixed inset-0 z-[100]">
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />

      {/* Modal */}
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex justify-between items-start">
            <div className="flex-1 pr-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{blog.title}</h2>
              <p className="text-sm text-gray-600 italic">
                Published on {formatDate(blog.publish_date)}
              </p>
            </div>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors flex-shrink-0"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Image */}
            {blog.image_url && (
              <div className="mb-6">
                <img
                  src={blog.image_url}
                  alt={blog.title}
                  className="w-full h-auto rounded-lg shadow-md"
                  onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                    e.currentTarget.src = '/placeholder.jpg';
                  }}
                />
              </div>
            )}

            {/* Blog Content */}
            <div className="prose prose-lg max-w-none">
              <div className="text-gray-700 leading-relaxed whitespace-pre-wrap text-base">
                {blog.content}
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t border-gray-200 p-4">
            <button
              onClick={onClose}
              className="w-full md:w-auto px-6 py-2 bg-red-700 text-white rounded-lg hover:bg-black transition-colors font-semibold"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogModal;
