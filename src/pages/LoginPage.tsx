import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Shield, GraduationCap, Building, Users } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [selectedCredential, setSelectedCredential] = useState<string | null>(null);
  const { login, isLoading } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    const success = await login(username, password);
    if (success) {
      const credentials = {
        'admin@university.edu': '/university',
        'hr@company.com': '/user',
        'gov@ministry.gov': '/government'
      };
      navigate(credentials[username as keyof typeof credentials] || '/login');
    } else {
      setError('Invalid credentials');
    }
  };

  const demoCredentials = [
    {
      title: 'University Admin',
      username: 'admin@university.edu',
      password: 'admin123',
      icon: GraduationCap,
      color: 'bg-blue-500',
      description: 'Manage degree verifications and view analytics'
    },
    {
      title: 'HR Manager',
      username: 'hr@company.com',
      password: 'hr123',
      icon: Users,
      color: 'bg-green-500',
      description: 'Verify candidate degrees and generate reports'
    },
    {
      title: 'Government Official',
      username: 'gov@ministry.gov',
      password: 'gov123',
      icon: Building,
      color: 'bg-purple-500',
      description: 'Monitor fraud trends and institutional data'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="max-w-6xl w-full">
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center mb-4"
          >
            ← Back to Home
          </button>
        </div>
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Shield className="h-12 w-12 text-blue-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-900">AuthX</h1>
          </div>
          <p className="text-xl text-gray-600">Secure Degree Verification Platform</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Login Form */}
          <div className="bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Sign In</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Username
                </label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your username"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your password"
                  required
                />
              </div>
              {error && (
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? 'Signing in...' : 'Sign In'}
              </button>
              
              {/* Sign Up Link */}
              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link 
                    to="/register" 
                    className="font-medium text-blue-600 hover:text-blue-500 transition-colors"
                  >
                    Sign up here
                  </Link>
                </p>
              </div>
            </form>
          </div>

          {/* Demo Credentials */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold text-gray-900 mb-4">Demo Credentials</h3>
            {demoCredentials.map((cred, index) => (
              <div
                key={index}
                className={`bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:scale-105 border-2 ${
                  selectedCredential === cred.username 
                    ? 'border-green-400 bg-green-50 shadow-green-200' 
                    : 'border-transparent hover:border-gray-200'
                }`}
                onClick={() => {
                  setUsername(cred.username);
                  setPassword(cred.password);
                  setSelectedCredential(cred.username);
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className={`p-3 rounded-lg ${cred.color} text-white relative`}>
                    <cred.icon className="h-6 w-6" />
                    {selectedCredential === cred.username && (
                      <div className="absolute -top-1 -right-1 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold animate-pulse">
                        ✓
                      </div>
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{cred.title}</h4>
                      {selectedCredential === cred.username && (
                        <span className="bg-green-100 text-green-800 text-xs font-medium px-2 py-1 rounded-full animate-bounce">
                          Selected
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{cred.description}</p>
                    <div className="text-xs text-gray-500">
                      <div>Username: {cred.username}</div>
                      <div>Password: {cred.password}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;