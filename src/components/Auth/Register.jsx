import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../services/api';

export default function RegisterForm() {
  const [formData, setFormData] = useState({ 
    username: '', 
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    // Password confirmation check
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }
    
    try {
      await registerUser({
        username: formData.username,
        password: formData.password
      });
      
      setSuccess('Account created successfully! Redirecting to login...');
      setFormData({ username: '', password: '', confirmPassword: '' });
      
      // Redirect to login after delay
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setError(err.response?.data?.error || 'Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {error && (
        <div className="bg-red-50 text-red-700 p-3 rounded-lg mb-6 border border-red-200 flex items-center">
          {error}
        </div>
      )}
      
      {success && (
        <div className="bg-green-50 text-green-700 p-3 rounded-lg mb-6 border border-green-200 flex items-center">
          {success}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input
              type="text"
              name="username"
              className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={formData.username}
              onChange={handleChange}
              required
              placeholder="Choose a username"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input
              type="password"
              name="password"
              className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
            />
          </div>
          <p className="mt-1 text-xs text-gray-500">
            Use 8 or more characters with a mix of letters, numbers & symbols
          </p>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            </div>
            <input
              type="password"
              name="confirmPassword"
              className="pl-10 block w-full border border-gray-300 rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
            />
          </div>
        </div>
        
        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
            required
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the <a href="#" className="text-purple-600 hover:text-purple-500">Terms of Service</a> and <a href="#" className="text-purple-600 hover:text-purple-500">Privacy Policy</a>
          </label>
        </div>
        
        <button 
          type="submit" 
          className="w-full bg-purple-600 border border-transparent rounded-lg py-3 px-4 flex items-center justify-center text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 disabled:opacity-50"
          disabled={loading}
        >
          {loading ? (
            <>
              Creating account...
            </>
          ) : 'Create Account'}
        </button>
      </form>
    </>
  );
}