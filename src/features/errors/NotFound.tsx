import React from 'react';

/**
 * NotFound Component
 * Dedicated 404 error page, lazy-loaded to optimize bundle size.
 */
const NotFound: React.FC = () => (
  <div className="flex flex-col items-center justify-center py-20 text-center">
    <h1 className="text-4xl font-bold text-gray-900 mb-4">404</h1>
    <p className="text-gray-600">The page you are looking for does not exist.</p>
  </div>
);

export default NotFound;