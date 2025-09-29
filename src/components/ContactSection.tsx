import React, { useState, useEffect } from 'react';
import { Mail, Phone, Github, Linkedin, Shield, Users, ArrowLeft, Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContactSection: React.FC = () => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="mb-8">
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center px-6 py-3 bg-white text-gray-700 rounded-xl shadow-lg hover:shadow-xl border border-gray-200 hover:border-blue-300 transition-all duration-300 hover:-translate-x-1"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Home
          </button>
        </div>

        {/* Header Section */}
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg mb-6">
            <Users className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-blue-600 bg-clip-text text-transparent mb-4">
            Team Xerox
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            A dedicated team of innovators and problem-solvers committed to revolutionizing 
            academic verification through cutting-edge technology and robust security solutions.
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl border border-gray-100 transition-all duration-300 hover:-translate-y-1"
            >
              {/* Avatar with Gradient */}
              <div className="relative mb-6">
                <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-2xl mx-auto flex items-center justify-center group-hover:scale-105 transition-transform duration-300 shadow-lg">
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
                  className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-50 hover:text-blue-600 transition-all duration-300 hover:scale-105"
                  title="Email"
                >
                  <Mail className="w-5 h-5" />
                </a>
                {member.github && (
                  <a 
                    href={member.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-gray-900 hover:text-white transition-all duration-300 hover:scale-105"
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
                    className="p-3 bg-gray-50 text-gray-600 rounded-xl hover:bg-blue-600 hover:text-white transition-all duration-300 hover:scale-105"
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

        {/* Contact CTA */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-2xl overflow-hidden mb-12">
          <div className="relative p-12 text-center">
            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-1/2 -translate-y-1/2" />
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-white/5 rounded-full translate-x-1/2 translate-y-1/2" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-2xl mb-6">
                <Shield className="w-8 h-8 text-white" />
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
                  className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                >
                  <Mail className="w-5 h-5 mr-3" />
                  Send us an Email
                </a>
                <a 
                  href="tel:8965875409" 
                  className="inline-flex items-center justify-center px-8 py-4 bg-white/10 text-white border-2 border-white/30 rounded-xl font-semibold hover:bg-white/20 transition-all duration-300 hover:scale-105"
                >
                  <Phone className="w-5 h-5 mr-3" />
                  Call Us
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
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
    </div>
  );
};

export default ContactSection;