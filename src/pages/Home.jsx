import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="card">
        <h1 className="text-3xl font-bold mb-6 text-center">JSON Data Storage</h1>
        <p className="text-lg mb-8 text-gray-600 text-center">
          Securely store and manage your JSON data with JWT authentication
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">For New Users</h2>
            <p className="mb-4">Create an account to start storing your JSON data securely</p>
            <Link 
              to="/register" 
              className="btn btn-primary block text-center"
            >
              Create Account
            </Link>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-lg border border-gray-200">
            <h2 className="text-xl font-semibold mb-4">Existing Users</h2>
            <p className="mb-4">Sign in to access your stored JSON data</p>
            <Link 
              to="/login" 
              className="btn btn-outline block text-center"
            >
              Sign In
            </Link>
          </div>
        </div>        
      </div>
    </div>
  );
}