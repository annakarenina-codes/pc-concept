import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <div className="flex flex-col items-center gap-4">
        {/* Red Spinning Circle */}
        <div className="w-16 h-16 border-4 border-gray-200 border-t-red-700 rounded-full animate-spin"></div>
        
        {/* Loading Text */}
        <p className="text-gray-700 text-lg font-semibold">Loading...</p>
      </div>
    </div>
  );
};

export default Loading;
