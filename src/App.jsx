import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Dashboard/Navbar';
import HomePage from './pages/Home';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/Dashboard';
import { AuthProvider, useAuth } from './context/AuthContext';

const AppRoutes = () => {
  const { currentUser } = useAuth();
  
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/register" element={!currentUser ? <RegisterPage /> : <Navigate to="/dashboard" />} />
      <Route path="/login" element={!currentUser ? <LoginPage /> : <Navigate to="/dashboard" />} />
      <Route path="/dashboard" element={currentUser ? <DashboardPage /> : <Navigate to="/login" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <Navbar />
        <div className="container py-8">
          <AppRoutes />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;