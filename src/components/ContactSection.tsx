import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Shield, Users, ArrowLeft, Heart, Cpu, Database, Code, Zap } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactSection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Background Elements Component
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Tech Elements */}
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.04]"
          style={{
            animation: `float ${18 + i * 4}s infinite ease-in-out ${i * 1.5}s`,
            top: `${20 + i * 18}%`,
            left: `${8 + i * 22}%`,
          }}
        >
          {i % 3 === 0 ? (
            <Code className="w-8 h-8 text-blue-400" />
          ) : i % 3 === 1 ? (
            <Database className="w-8 h-8 text-cyan-400" />
          ) : (
            <Cpu className="w-8 h-8 text-purple-400" />
          )}
        </div>
      ))}

      {/* Glowing Orbs */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            animation: `glow ${8 + i * 2}s infinite ease-in-out`,
            width: `${120 + i * 60}px`,
            height: `${120 + i * 60}px`,
            top: `${25 + i * 40}%`,
            right: `${15 + i * 25}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.06) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.05) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );

  const teamMembers = [
    { 
      name: 'Paranjay Soni', 
      email: '24it3058@rgipt.ac.in',
      github: 'https://github.com/paranjaysoni',
      linkedin: 'https://linkedin.com/in/paranjaysoni'
    },
    { 
      name: 'Vedanshi Shrivastava', 
      email: '24EC3044@rgipt.ac.in',
      github: 'https://github.com/vedanshi25686',
      linkedin: 'https://www.linkedin.com/in/vedanshi-shrivastava-748b4531a'
    },
    { 
      name: 'Shashank', 
      email: '24IT3056@rgipt.ac.in',
      github: 'https://github.com/shashank7109',
      linkedin: 'https://www.linkedin.com/in/shashank-488615323'
    },
    { 
      name: 'Abhijeet Biswas', 
      email: '24EV3002@rgipt.ac.in',
      github: 'https://github.com/a6h1j33t',
      linkedin: 'https://www.linkedin.com/in/abhijeet-biswas-287584271'
    },
    { 
      name: 'Ayush Ranjan', 
      email: '24CS2012@rgipt.ac.in',
      github: 'https://github.com/Arexreva',
      linkedin: 'https://www.linkedin.com/in/ayush-ranjan-4a0324314'
    },
    { 
      name: 'Shubham Ranjan', 
      email: '24EC3033@rgipt.ac.in',
      github: 'https://github.com/TheXeroX',
      linkedin: 'https://www.linkedin.com/in/shubham-ranjan-861614351'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12 relative overflow-hidden">
      <BackgroundElements />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Enhanced Back to Home Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-white/80 backdrop-blur-sm text-gray-700 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-x-1 hover:bg-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Enhanced Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-5xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent mb-4">
            Team Xerox
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A dedicated team of innovators and problem-solvers committed to revolutionizing 
            academic verification through cutting-edge technology and robust security solutions.
          </p>
        </div>

        {/* Enhanced Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-500 hover:-translate-y-2"
            >
              {/* Dark Glimpse Effect */}
              <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-gray-900/5 to-blue-900/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              
              {/* Avatar with Gradient */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
              </div>

              {/* Name and Info */}
              <h3 className="text-xl font-bold text-gray-900 text-center mb-4 hover:text-blue-600 transition-colors duration-300 cursor-pointer">
                {member.name}
              </h3>
              
              {/* Social Links */}
              <div className="flex justify-center space-x-3 mb-4">
                <a 
                  href={`mailto:${member.email}`} 
                  className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-300"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                {member.github && (
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-gray-800"
                    title="GitHub"
                  >
                    <Github className="w-5 h-5" />
                  </a>
                )}
                {member.linkedin && (
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-110 border border-gray-200 hover:border-blue-500"
                    title="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                )}
              </div>

              {/* Email */}
              <div className="text-center">
                <div className="text-sm text-gray-500 font-medium bg-gray-50 rounded-lg py-2 px-4 border border-gray-200 group-hover:border-blue-200 transition-colors duration-300">
                  {member.email}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Enhanced Contact CTA - Dark Section */}
        <div className="bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 rounded-2xl shadow-2xl overflow-hidden mb-12 border border-gray-700">
          <div className="relative p-12 text-center">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-3xl font-bold text-white mb-4">
                Let's Build Something Amazing Together
              </h3>
              <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
                Have questions about AuthX or interested in collaboration? 
                We're always excited to discuss new opportunities and partnerships.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a 
                  href="mailto:24it3058@rgipt.ac.in" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 hover:bg-gray-50"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Send us an Email
                </a>
                <a 
                  href="tel:+918965875409" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Enhanced Footer */}
        <div className="text-center">
          <div className="inline-flex items-center justify-center px-6 py-3 bg-white rounded-xl shadow-lg border border-gray-200 mb-4">
            <div className="flex items-center space-x-2 text-gray-700">
              <span className="text-sm font-medium">© 2025 Team Xerox</span>
              <Heart className="w-4 h-4 text-red-500 fill-current" />
              <span className="text-sm font-medium">Built for Smart India Hackathon</span>
            </div>
          </div>
          <p className="text-gray-500 text-sm max-w-md mx-auto">
            Revolutionizing academic verification through innovation, security, and excellence.
          </p>
        </div>
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }
        @keyframes glow {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 0.6; transform: scale(1.1); }
        }
      `}</style>
    </div>
  );
};

export default ContactSection;