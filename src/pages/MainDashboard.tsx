import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LearnMoreModal from '../components/LearnMoreModal';
import { Shield, Users, CheckCircle, Globe, Star, TrendingUp, Award, Lock, Zap, Target, Headphones, FileText, Key, Fingerprint, QrCode } from 'lucide-react';

const MainDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [showLearnMore, setShowLearnMore] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    // Add CSS animations to head
    const style = document.createElement('style');
    style.textContent = `
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
      @keyframes drift {
        0% { transform: translateX(-100px) translateY(-50px) rotate(0deg); }
        50% { transform: translateX(100px) translateY(50px) rotate(180deg); }
        100% { transform: translateX(-100px) translateY(-50px) rotate(360deg); }
      }
      @keyframes pulse-glow {
        0%, 100% { opacity: 0.1; transform: scale(1); }
        50% { opacity: 0.3; transform: scale(1.2); }
      }
      @keyframes certificate-float {
        0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
        25% { transform: translateY(-10px) rotate(5deg) scale(1.05); }
        50% { transform: translateY(-5px) rotate(-3deg) scale(1.02); }
        75% { transform: translateY(-8px) rotate(2deg) scale(1.03); }
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, []);

  // Professional Background Elements for Hero Section
  const HeroBackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated Certificate Icons */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.08]"
          style={{
            animation: `certificate-float ${15 + i * 3}s infinite ease-in-out ${i * 2}s`,
            top: `${20 + i * 12}%`,
            left: `${10 + i * 15}%`,
          }}
        >
          <FileText className="w-16 h-16 text-blue-300" />
        </div>
      ))}

      {/* Floating Security Icons */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.06]"
          style={{
            animation: `float ${18 + i * 4}s infinite ease-in-out ${i * 1.5}s`,
            top: `${15 + i * 16}%`,
            right: `${5 + i * 18}%`,
          }}
        >
          {i % 3 === 0 ? (
            <Shield className="w-12 h-12 text-cyan-300" />
          ) : i % 2 === 0 ? (
            <Key className="w-12 h-12 text-purple-300" />
          ) : (
            <Fingerprint className="w-12 h-12 text-blue-300" />
          )}
        </div>
      ))}

      {/* Blockchain Network Nodes */}
      {[...Array(8)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.04]"
          style={{
            animation: `drift ${25 + i * 5}s infinite linear ${i * 3}s`,
            top: `${30 + i * 8}%`,
            left: `${5 + i * 12}%`,
          }}
        >
          <div className="flex items-center justify-center">
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
            <div className="w-12 h-0.5 bg-green-400/50"></div>
            <div className="w-3 h-3 bg-green-400 rounded-full"></div>
          </div>
        </div>
      ))}

      {/* Scanning Lines Effect */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-blue-400 to-transparent"
          style={{
            animation: `float 8s infinite ease-in-out`,
            top: '30%'
          }}
        />
        <div 
          className="absolute w-full h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"
          style={{
            animation: `float 12s infinite ease-in-out`,
            top: '60%'
          }}
        />
      </div>

      {/* Geometric Grid Pattern */}
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px),
              linear-gradient(180deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
            animation: 'float-slow 20s infinite linear'
          }}
        />
      </div>

      {/* Pulse Orbs */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            animation: `pulse-glow ${6 + i * 2}s infinite ease-in-out`,
            width: `${150 + i * 80}px`,
            height: `${150 + i * 80}px`,
            top: `${15 + i * 25}%`,
            left: `${20 + i * 20}%`,
            background: i % 3 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%)'
              : i % 3 === 1
              ? 'radial-gradient(circle, rgba(34, 197, 94, 0.1) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%)',
          }}
        />
      ))}

      {/* QR Code Elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.05]"
          style={{
            animation: `float-slow ${22 + i * 4}s infinite ease-in-out ${i * 2}s`,
            bottom: `${10 + i * 15}%`,
            right: `${10 + i * 12}%`,
          }}
        >
          <QrCode className="w-14 h-14 text-cyan-300" />
        </div>
      ))}

      {/* Verification Check Marks */}
      {[...Array(5)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.07]"
          style={{
            animation: `float ${16 + i * 3}s infinite ease-in-out ${i * 1.8}s`,
            top: `${40 + i * 10}%`,
            left: `${60 + i * 8}%`,
          }}
        >
          <CheckCircle className="w-10 h-10 text-green-300" />
        </div>
      ))}
    </div>
  );

  // Floating Elements for other sections
  const FloatingElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Subtle geometric shapes for content sections */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.02]"
          style={{
            animation: `float-slow ${20 + i * 5}s infinite ease-in-out ${i * 2}s`,
            top: `${10 + i * 12}%`,
            left: `${5 + i * 15}%`,
          }}
        >
          {i % 3 === 0 ? (
            <div className="w-16 h-16 border-2 border-blue-400 rounded-lg rotate-45" />
          ) : i % 3 === 1 ? (
            <div className="w-12 h-12 border-2 border-purple-400 rounded-full" />
          ) : (
            <div className="w-20 h-20 border-2 border-cyan-400 rotate-12" />
          )}
        </div>
      ))}

      {/* Glowing orbs */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            animation: `glow ${8 + i * 2}s infinite ease-in-out`,
            width: `${100 + i * 50}px`,
            height: `${100 + i * 50}px`,
            top: `${20 + i * 20}%`,
            left: `${10 + i * 25}%`,
            background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );

  const stats = [
    { 
      label: 'Partner Institutions', 
      value: '2,847', 
      icon: <Users className="w-6 h-6" />, 
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
      delay: 0
    },
    { 
      label: 'Certificates Verified', 
      value: '1.2M+', 
      icon: <CheckCircle className="w-6 h-6" />, 
      color: 'from-green-500 to-green-600',
      bgColor: 'bg-green-50',
      delay: 100
    },
    { 
      label: 'Countries Served', 
      value: '45', 
      icon: <Globe className="w-6 h-6" />, 
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
      delay: 200
    },
    { 
      label: 'Years of Trust', 
      value: '8+', 
      icon: <Award className="w-6 h-6" />, 
      color: 'from-amber-500 to-amber-600',
      bgColor: 'bg-amber-50',
      delay: 300
    }
  ];

  const features = [
    {
      title: 'Blockchain Security',
      description: 'All certificates are secured using advanced blockchain technology ensuring tamper-proof verification',
      icon: <Lock className="w-8 h-8" />,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
      delay: 0
    },
    {
      title: 'Instant Verification',
      description: 'Verify any certificate in seconds with our advanced verification system',
      icon: <Zap className="w-8 h-8" />,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
      delay: 100
    },
    {
      title: 'Global Recognition',
      description: 'Trusted by governments and prestigious institutions worldwide',
      icon: <Target className="w-8 h-8" />,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      delay: 200
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock dedicated support for all your verification needs',
      icon: <Headphones className="w-8 h-8" />,
      color: 'text-amber-600',
      bgColor: 'bg-amber-50',
      delay: 300
    }
  ];

  const testimonials = [
    {
      name: 'Dr. Meera Iyer',
      role: 'Registrar, IIT Delhi',
      content: 'AuthX transformed our verification workflow. Turnaround went from weeks to minutes while maintaining impeccable security standards.',
      rating: 5,
      delay: 0
    },
    {
      name: 'Rohit Verma',
      role: 'HR Director, TCS',
      content: 'Reliable, fast and secure. AuthX has become our gold standard for background verification across all hiring processes.',
      rating: 5,
      delay: 100
    },
    {
      name: 'Ananya Gupta',
      role: 'Officer, Govt. of India',
      content: 'The analytics dashboard and fraud prevention capabilities we achieved with AuthX have been exceptional for national security.',
      rating: 5,
      delay: 200
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 overflow-hidden">
      {/* Enhanced Header */}
      <nav className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <div className="flex-shrink-0 flex items-center space-x-3">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                  <Shield className="h-6 w-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AuthX
                </h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {user ? (
                <>
                  <span className="text-sm font-medium text-gray-700">Welcome, {user.name}</span>
                  <button
                    onClick={logout}
                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Logout
                  </button>
                </>
              ) : (
                <div className="flex space-x-3">
                  <Link
                    to="/login"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-6 py-2 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                  >
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* NEW: Dark Hero Section with Background Elements */}
      <div className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 min-h-[85vh] flex items-center">
        <HeroBackgroundElements />
        
        {/* Premium Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500 rounded-full blur-3xl"></div>
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-purple-500 rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto relative z-10 w-full">
          <div className="relative z-10 py-20 lg:py-28">
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
              <div className={`text-center transition-all duration-700 transform ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                <div className="flex justify-center mb-6">
                  <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 text-sm font-medium border border-blue-400/30 backdrop-blur-sm">
                    <TrendingUp className="w-4 h-4 mr-2" />
                    Trusted by 2,847+ institutions worldwide
                  </div>
                </div>
                
                <h1 className="text-5xl tracking-tight font-bold text-white sm:text-6xl md:text-7xl lg:text-8xl mb-6">
                  <span className="block">Secure Certificate</span>
                  <span className="block bg-gradient-to-r from-blue-400 via-cyan-400 to-indigo-400 bg-clip-text text-transparent mt-4">
                    Verification Platform
                  </span>
                </h1>
                
                <p className="mt-8 text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
                  Enterprise-grade certificate verification powered by blockchain technology. 
                  Instantly verify credentials with military-grade security and complete data integrity.
                </p>
                
                <div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center">
                  <Link
                    to="/login"
                    className="group relative inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-white bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:from-blue-700 hover:to-indigo-700 border border-blue-500/30"
                  >
                    <Zap className="w-6 h-6 mr-3" />
                    Get Started
                    <div className="absolute inset-0 rounded-2xl bg-white opacity-0 group-hover:opacity-10 transition-opacity duration-300" />
                  </Link>
                  
                  <button
                    onClick={() => setShowLearnMore(true)}
                    className="group inline-flex items-center justify-center px-10 py-5 text-lg font-semibold text-gray-200 bg-gray-800/50 border-2 border-gray-600/50 rounded-2xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:border-blue-400/50 backdrop-blur-sm"
                  >
                    Learn More
                    <div className="absolute inset-0 rounded-2xl bg-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </button>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Enhanced Stats Section */}
      <div className="py-20 bg-white relative">
        <FloatingElements />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${stat.delay}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl ${stat.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={`text-white bg-gradient-to-r ${stat.color} p-3 rounded-xl`}>
                    {stat.icon}
                  </div>
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-lg font-semibold text-gray-600">{stat.label}</div>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-blue-50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Features Section */}
      <div className="py-20 bg-gradient-to-br from-slate-50 to-blue-50 relative">
        <FloatingElements />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Enterprise-Grade Features
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with security and reliability at its core, AuthX delivers unmatched verification capabilities
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${feature.delay}ms` }}
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-2xl ${feature.bgColor} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <div className={feature.color}>
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                <div className="absolute inset-0 rounded-2xl border-2 border-transparent group-hover:border-blue-200 transition-all duration-300" />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced Testimonials */}
      <div className="py-20 bg-white relative">
        <FloatingElements />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Trusted by Industry Leaders
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of organizations that trust AuthX for their verification needs
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 transform hover:-translate-y-2"
                style={{ animationDelay: `${testimonial.delay}ms` }}
              >
                <div className="flex mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 text-lg leading-relaxed mb-6 italic">
                  "{testimonial.content}"
                </p>
                <div className="border-t border-gray-200 pt-6">
                  <div className="font-bold text-gray-900 text-lg">{testimonial.name}</div>
                  <div className="text-gray-600 font-medium">{testimonial.role}</div>
                </div>
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Enhanced CTA Section */}
      <div className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 overflow-hidden">
        <div className="absolute inset-0 bg-black/10" />
        <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
        
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            Ready to Transform Your Verification Process?
          </h2>
          <p className="text-xl text-blue-100 mb-10 max-w-2xl mx-auto leading-relaxed">
            Join thousands of institutions already using AuthX to streamline their credential verification with enterprise-grade security
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-blue-600 bg-white rounded-xl shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 hover:bg-gray-50"
            >
              <Shield className="w-5 h-5 mr-3" />
              Start Free Trial
              <div className="absolute inset-0 rounded-xl bg-blue-600 opacity-0 group-hover:opacity-5 transition-opacity duration-300" />
            </Link>
            
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center px-10 py-4 text-lg font-semibold text-white border-2 border-white/30 rounded-xl hover:bg-white/10 transform hover:scale-105 transition-all duration-300 backdrop-blur-sm"
            >
              Schedule Demo
            </Link>
          </div>
        </div>
      </div>

      {/* Enhanced Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <h3 className="text-3xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
                AuthX
              </h3>
            </div>
            <p className="text-gray-400 text-lg mb-8 max-w-md mx-auto">
              Enterprise-grade certificate verification for the modern world
            </p>
            
            <div className="flex justify-center space-x-8 mb-12">
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">
                Contact
              </Link>
              <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">
                Privacy
              </Link>
              <Link to="/terms" className="text-gray-400 hover:text-white transition-colors duration-300 font-medium">
                Terms
              </Link>
            </div>
            
            {/* Enhanced Developer Information */}
            <div className="border-t border-gray-800 pt-12">
              <h4 className="text-xl font-semibold mb-8 text-gray-300">Development Team</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 text-sm max-w-4xl mx-auto">
                {[
                  { name: 'Paranjay Soni', email: '24it3058@rgipt.ac.in' },
                  { name: 'Vedanshi Shrivastava', email: '24ec3044@rgipt.ac.in' },
                  { name: 'Shashank', email: '24it3056@rgipt.ac.in' },
                  { name: 'Abhijeet Biswas', email: '24EV3002@rgipt.ac.in' },
                  { name: 'Ayush Ranjan', email: '24CS2012@rgipt.ac.in' },
                  { name: 'Shubham Ranjan', email: '24EC3033@rgipt.ac.in' }
                ].map((dev, index) => (
                  <div 
                    key={index}
                    className="bg-gray-800/50 rounded-lg p-4 hover:bg-gray-800 transition-colors duration-300 border border-gray-700/50 hover:border-gray-600"
                  >
                    <div className="font-medium text-gray-200">{dev.name}</div>
                    <div className="text-gray-400 text-xs mt-1">{dev.email}</div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-500 text-sm">
                © 2025 AuthX. Built with excellence for the Smart India Hackathon.
              </p>
            </div>
          </div>
        </div>
      </footer>

      {/* Learn More Modal */}
      <LearnMoreModal 
        isOpen={showLearnMore} 
        onClose={() => setShowLearnMore(false)} 
      />
    </div>
  );
};

export default MainDashboard;