import React from "react";
import { FaFacebookF, FaInstagram, FaTiktok, FaEnvelope } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-red-700 text-white mt-12 w-full">
      <div className="max-w-7xl mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 text-sm">
        
        {/* Contact Us */}
        <div>
          <h3 className="font-semibold mb-3">Contact Us</h3>
          <p>PC Concept Store</p>
          <p>Quimson Street, Cabanatuan City,<br />Philippines, 3100</p>
          <p className="mt-1">+63942 236 7180</p>
          <p className="mt-1">pcconceptsales@gmail.com</p>
        </div>

        {/* Support */}
        <div>
          <h3 className="font-semibold mb-3">Support</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">FAQs</a></li>
            <li><a href="#" className="hover:underline">Warranty Service</a></li>
            <li><a href="#" className="hover:underline">Repair & Maintenance</a></li>
            <li><a href="#" className="hover:underline">Custom Build Support</a></li>
            <li><a href="#" className="hover:underline">Delivery & Installment</a></li>
          </ul>
        </div>

        {/* About */}
        <div>
          <h3 className="font-semibold mb-3">About Us</h3>
          <ul className="space-y-1">
            <li><a href="#" className="hover:underline">Blog / Articles</a></li>
            <li><a href="#" className="hover:underline">Partnership / Affiliate</a></li>
            <li><a href="#" className="hover:underline">Customer Feedback</a></li>
            <li><a href="#" className="hover:underline">Careers</a></li>
          </ul>
        </div>

        {/* Social / Branding */}
        <div className="text-center md:text-right flex flex-col items-center md:items-end justify-center">
          <img src="/logo.png" alt="PC Concept Logo" className="w-40 mb-2" />
          <p className="font-bold text-lg">WE VALUE OUR</p>
          <p className="text-2xl font-extrabold tracking-wide">CUSTOMERS</p>
          <div className="flex justify-center gap-4 mt-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
              <FaInstagram />
            </a>
            <a href="https://tiktok.com" target="_blank" rel="noopener noreferrer" className="text-white text-2xl hover:text-gray-300">
              <FaTiktok />
            </a>
            <a href="mailto:pcconceptsales@gmail.com" className="text-white text-2xl hover:text-gray-300">
              <FaEnvelope />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="text-center py-3 text-xs bg-red-800">
        © {new Date().getFullYear()} PC Concept Store. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
