import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Key, Fingerprint, FileText } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    userType: 'user',
    institution: '',
    department: '',
    phone: ''
  });
  const [errors, setErrors] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showAdminPopup, setShowAdminPopup] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  // Background Elements Component
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Security Icons */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.05]"
          style={{
            animation: `float ${18 + i * 4}s infinite ease-in-out ${i * 1.5}s`,
            top: `${20 + i * 18}%`,
            left: `${8 + i * 20}%`,
          }}
        >
          {i % 2 === 0 ? (
            <Key className="w-8 h-8 text-blue-400" />
          ) : (
            <Fingerprint className="w-8 h-8 text-purple-400" />
          )}
        </div>
      ))}

      {/* Certificate Icons */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.04]"
          style={{
            animation: `float-slow ${20 + i * 5}s infinite ease-in-out ${i * 2}s`,
            top: `${30 + i * 15}%`,
            right: `${12 + i * 18}%`,
          }}
        >
          <FileText className="w-10 h-10 text-cyan-400" />
        </div>
      ))}

      {/* Glowing Orbs */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            animation: `glow ${8 + i * 2}s infinite ease-in-out`,
            width: `${150 + i * 60}px`,
            height: `${150 + i * 60}px`,
            top: `${25 + i * 40}%`,
            left: `${20 + i * 25}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.06) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const newErrors: string[] = [];
    
    if (!formData.name.trim()) newErrors.push('Name is required');
    if (!formData.email.trim()) newErrors.push('Email is required');
    if (!formData.password) newErrors.push('Password is required');
    if (formData.password !== formData.confirmPassword) newErrors.push('Passwords do not match');
    if (formData.password.length < 6) newErrors.push('Password must be at least 6 characters');
    if (formData.userType === 'university' && !formData.institution.trim()) {
      newErrors.push('Institution name is required for university accounts');
    }
    
    setErrors(newErrors);
    return newErrors.length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    try {
      await register(formData);
      
      // Different behavior based on user type
      if (formData.userType === 'university') {
        // Show admin registration popup
        setShowAdminPopup(true);
      } else {
        // Regular user - redirect to login
        navigate('/login');
      }
    } catch (error) {
      setErrors(['Registration failed. Please try again.']);
    } finally {
      setIsLoading(false);
    }
  };

  const handleAdminPopupClose = () => {
    setShowAdminPopup(false);
    navigate('/'); // Redirect to home page
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      <BackgroundElements />
      
      <div className="max-w-4xl w-full relative z-10">
        {/* Admin Registration Success Popup */}
        {showAdminPopup && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
              <div className="text-center">
                <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                  <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Registration Submitted Successfully!
                </h3>
                
                <div className="text-gray-600 mb-2 space-y-3 text-left">
                  <p className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Thanks for registering your institution with AuthX
                  </p>
                  <p className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Your request has been forwarded to the Government verification team
                  </p>
                  <p className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    You will receive confirmation and account access details via email
                  </p>
                  <p className="flex items-start">
                    <span className="text-green-500 mr-2">✓</span>
                    Typical approval time: 2-3 business days
                  </p>
                </div>
                
                <p className="text-sm text-gray-500 mt-4 mb-6">
                  We've sent a confirmation email to <strong>{formData.email}</strong>
                </p>
                
                <button
                  onClick={handleAdminPopupClose}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Got it, Back to Home
                </button>
              </div>
            </div>
          </div>
        )}

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 bg-gradient-to-br from-indigo-50 to-blue-50">
              <button
                onClick={() => navigate('/')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center mb-6"
              >
                ← Back to Home
              </button>
              <div className="mx-auto h-12 w-12 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white text-xl font-bold">A</span>
              </div>
              <h2 className="mt-6 text-3xl font-extrabold text-gray-900">
                Create your account
              </h2>
              <p className="mt-2 text-sm text-gray-600">
                Join thousands of institutions using AuthX
              </p>
              <div className="mt-8 space-y-3 text-sm text-gray-600">
                <div className="flex items-center space-x-2"><span>✅</span><span>Secure and encrypted</span></div>
                <div className="flex items-center space-x-2"><span>⚡</span><span>Fast verification</span></div>
                <div className="flex items-center space-x-2"><span>📊</span><span>Insightful analytics</span></div>
              </div>
            </div>
            <div className="p-8">
              <form className="space-y-6" onSubmit={handleSubmit}>
                {errors.length > 0 && (
                  <div className="bg-red-50 border border-red-200 rounded-md p-4">
                    <ul className="text-sm text-red-600">
                      {errors.map((error, index) => (
                        <li key={index}>• {error}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                    <input id="name" name="name" type="text" required value={formData.name} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow" placeholder="Enter your full name" />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                    <input id="email" name="email" type="email" required value={formData.email} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow" placeholder="Enter your email" />
                  </div>
                  <div>
                    <label htmlFor="userType" className="block text-sm font-medium text-gray-700">Account Type</label>
                    <select id="userType" name="userType" value={formData.userType} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 bg-white rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow">
                      <option value="user">User / HR</option>
                      <option value="university">University Admin</option>
                    </select>
                  </div>
                  {formData.userType === 'university' && (
                    <div>
                      <label htmlFor="institution" className="block text-sm font-medium text-gray-700">Institution Name</label>
                      <input id="institution" name="institution" type="text" value={formData.institution} onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow" placeholder="Enter institution name" />
                    </div>
                  )}
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                    <input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow" placeholder="Enter your phone number" />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input id="password" name="password" type="password" required value={formData.password} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow" placeholder="Create a password" />
                  </div>
                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">Confirm Password</label>
                    <input id="confirmPassword" name="confirmPassword" type="password" required value={formData.confirmPassword} onChange={handleChange}
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm hover:shadow" placeholder="Confirm your password" />
                  </div>
                </div>

                <div>
                  <button type="submit" disabled={isLoading}
                    className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 transition-all">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </button>
                </div>

                <div className="text-center">
                  <p className="text-sm text-gray-600">Already have an account?{' '}
                    <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">Sign in here</Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) rotate(0deg); }
          33% { transform: translateY(-15px) translateX(10px) rotate(120deg); }
          66% { transform: translateY(-10px) translateX(-5px) rotate(240deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default RegisterPage;