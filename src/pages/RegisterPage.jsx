import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import RegisterForm from '../components/Auth/Register';

export default function RegisterPage() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard');
    }
  }, [currentUser, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-purple-100 p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="mx-auto bg-white rounded-full p-3 w-16 h-16 flex items-center justify-center shadow-lg mb-4">
          </div>
          <h1 className="text-3xl font-bold text-gray-800">Create Account</h1>
          <p className="text-gray-600 mt-2">Join us to get started</p>
        </div>
        
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8">
            <RegisterForm />
          </div>
          
          <div className="bg-gray-50 px-6 py-4">
            <div className="text-center text-sm text-gray-600">
              Already have an account?{' '}
              <Link 
                to="/login" 
                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
              >
                Sign in
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}