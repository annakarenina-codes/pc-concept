import React from 'react';


const ContactPage: React.FC = () => {
  // Social media links - UPDATE THESE WITH YOUR ACTUAL LINKS
  const socialLinks = {
    facebook: 'https://www.facebook.com/pcconceptph',  // Replace with your Facebook page URL
    instagram: 'https://www.instagram.com/pcconceptph',  // Replace with your Instagram URL
    tiktok: 'https://www.tiktok.com/@pcconceptph',  // Replace with your TikTok URL
  };

  return (
    <div className="bg-gray-50 py-16 mt-[150px] font-poppins min-h-screen">
      <div className="max-w-4xl mx-auto px-4">
        {/* Page Title */}
        <h1 className="text-center text-red-700 text-3xl font-bold mb-8">
          CONTACT INFORMATION
        </h1>

        {/* Introduction Text */}
        <div className="text-center mb-8">
          <p className="text-gray-700 leading-relaxed mb-4">
            If you have any questions or feedback, please don't hesitate to reach out.
          </p>
          <p className="text-gray-700 leading-relaxed">
            We offer real-time chat support via Messenger everyday from 10AM-7PM
          </p>
        </div>

        {/* Contact Details */}
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <ul className="space-y-4">
            {/* Social Media */}
            <li className="flex items-start gap-3">
              <span className="text-gray-700">•</span>
              <div>
                <strong className="text-gray-900">Social Media:</strong>
                <span className="text-gray-700"> PC Concept Nueva Ecija</span>
              </div>
            </li>

            {/* Email */}
            <li className="flex items-start gap-3">
              <span className="text-gray-700">•</span>
              <div>
                <strong className="text-gray-900">Email:</strong>
                <a 
                  href="mailto:pcconceptsales@gmail.com" 
                  className="text-blue-600 hover:underline ml-1"
                >
                  pcconceptsales@gmail.com
                </a>
              </div>
            </li>

            {/* Phone */}
            <li className="flex items-start gap-3">
              <span className="text-gray-700">•</span>
              <div>
                <strong className="text-gray-900">Phone:</strong>
                <a 
                  href="tel:+63942236718" 
                  className="text-blue-600 hover:underline ml-1"
                >
                  +63 942 236 7180
                </a>
              </div>
            </li>

            {/* Address */}
            <li className="flex items-start gap-3">
              <span className="text-gray-700">•</span>
              <div>
                <strong className="text-gray-900">Address:</strong>
                <span className="text-gray-700 ml-1">Quimson Street, Cabanatuan City, Philippines</span>
              </div>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="text-center mb-8">
          <p className="text-gray-700 leading-relaxed mb-6">
            Stay updated with our latest products, blogs, and announcements by connecting with us on social media. Join our
            community and be the first to know about special offers, new arrivals, and tech tips.
          </p>

          {/* Social Media Icons */}
          <div className="flex items-center justify-center gap-6">
            {/* Facebook */}
            <a
              href={socialLinks.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors duration-300"
              aria-label="Visit our Facebook page"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>

            {/* Instagram */}
            <a
              href={socialLinks.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:opacity-90 text-white rounded-full transition-opacity duration-300"
              aria-label="Visit our Instagram profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>

            {/* TikTok */}
            <a
              href={socialLinks.tiktok}
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 flex items-center justify-center bg-black hover:bg-gray-800 text-white rounded-full transition-colors duration-300"
              aria-label="Visit our TikTok profile"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
