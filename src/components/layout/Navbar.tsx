import React, { memo } from 'react';
import { NavLink } from 'react-router-dom';

/**
 * Navbar Component
 * Memoized to prevent re-renders on route changes.
 */
export const Navbar = memo(() => {
  return (
    <nav className="p-4 bg-white shadow-sm">
      <NavLink to="/">Home</NavLink>
    </nav>
  );
});