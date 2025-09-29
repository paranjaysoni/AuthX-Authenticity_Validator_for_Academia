import React from 'react';
import { useNavigate } from 'react-router-dom';

const PrivacyPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Home Button */}
        <div className="mb-6">
          <button
            onClick={() => navigate('/')}
            className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-md text-sm font-medium flex items-center mb-4"
          >
            ← Back to Home
          </button>
        </div>

        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-8">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Privacy Policy</h1>
            <p className="text-sm text-gray-500 mb-8">Your Information at AuthX: Under Academic Integrity</p>

            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p>
                At AuthX, we are creating a trusted platform. That starts with how we treat your information. This policy
                serves to inform you of our promises to protect and keep your information safe.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Information We Collect</h2>
                <p className="text-blue-900">
                  We collect the necessary information in order to verify your academic credentials. This information includes the
                  certificate information you upload (i.e. your name, institution, degree, etc.), your professional contact information
                  (for HR/Institute accounts) and data regarding your usage of the platform in order to improve our services.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-2">How We Use It</h2>
                <p className="text-green-900">
                  Your information has one purpose - academic verification. We will review your information against the institutional
                  records and generate verification reports. Data on usage will be compiled for analytic purposes and reported to
                  authorized parties such as universities and government entities. Your data will never be sold.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-900 mb-2">Our Approach to Security</h2>
                <p className="text-purple-900">
                  We have established strong security measures to protect your information from being accessed, altered or disclosed
                  without your consent. Your uploaded certificates and information are protected through encryption and secure storage.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-yellow-900 mb-2">Transparency & Control</h2>
                <p className="text-yellow-900">
                  You have a right to know what information we have regarding you. Institutions have the ability to monitor and manage
                  their uploaded certificates. Users can view their verification history. If you have questions about your data, please
                  contact us at <a href="mailto:24it3058@rgipt.ac.in" className="underline">24it3058@rgipt.ac.in</a>
                </p>
              </div>

              <p>
                When you use AuthX, you trust us with your data, and we will do everything within our power to ensure your information
                stays secure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPage;