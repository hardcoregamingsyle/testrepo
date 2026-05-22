import React from 'react';

export const Footer: React.FC = () => (
  <footer className="bg-gray-50 border-t border-gray-200 py-6 mt-auto">
    <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
      © {new Date().getFullYear()} SecureApp. All rights reserved.
    </div>
  </footer>
);