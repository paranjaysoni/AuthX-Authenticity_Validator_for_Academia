import React from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import MainDashboard from './pages/MainDashboard';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import UniversityDashboard from './pages/UniversityDashboard';
import UserDashboard from './pages/UserDashboard';
import GovernmentDashboard from './pages/GovernmentDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import ContactSection from './components/ContactSection';
import PrivacyPage from './pages/PrivacyPage';
import TermsPage from './pages/TermsPage';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Routes>
            <Route path="/" element={<MainDashboard />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/university" element={
              <ProtectedRoute role="university">
                <UniversityDashboard />
              </ProtectedRoute>
            } />
            <Route path="/user" element={
              <ProtectedRoute role="user">
                <UserDashboard />
              </ProtectedRoute>
            } />
            <Route path="/government" element={
              <ProtectedRoute role="government">
                <GovernmentDashboard />
              </ProtectedRoute>
            } />
            <Route path="/contact" element={<ContactSection />} />
            <Route path="/privacy" element={<PrivacyPage />} />
            <Route path="/terms" element={<TermsPage />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
