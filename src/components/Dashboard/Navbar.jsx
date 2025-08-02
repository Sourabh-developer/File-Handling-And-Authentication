import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Navbar() {
  const { currentUser, logout } = useAuth();
  const location = useLocation();
  
  if (!currentUser) return null;
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container py-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/dashboard" className="text-xl font-bold text-primary">
              JSON Storage
            </Link>
          </div>
          
          <div className="flex items-center space-x-4">
            <span className="text-gray-700">Welcome, {currentUser.username}</span>
            <button
              onClick={logout}
              className="btn btn-outline"
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}