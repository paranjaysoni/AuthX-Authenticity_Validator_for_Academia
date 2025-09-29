import React from 'react';
import { useNavigate } from 'react-router-dom';

const TermsPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <h1 className="text-3xl font-extrabold text-gray-900 mb-4">Terms and Conditions</h1>
            <p className="text-sm text-gray-500 mb-8">Guidelines for Ethical Use of AuthX</p>

            <div className="space-y-6 text-gray-800 leading-relaxed">
              <p>
                Welcome to AuthX. These terms outline your rights and obligations when using our service to create a safe
                and trustworthy environment for everyone.
              </p>

              <div className="bg-blue-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-blue-900 mb-2">Permissible Use</h2>
                <p className="text-blue-900">
                  You agree to use AuthX for purposes of verification and not for dubious, fake, falsified, or otherwise
                  illegitimate purposes. Violation of this rule may result in civil action and being banned permanently
                  from the AuthX platform.
                </p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-green-900 mb-2">Accountability</h2>
                <p className="text-green-900">
                  You assume all responsibility for maintaining the confidentiality of your login information and for all
                  activity under your account.
                </p>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-purple-900 mb-2">Ownership</h2>
                <p className="text-purple-900">
                  The AuthX Platform (including designs, logos, and related software) belongs to Team Xerox. Academic data
                  belongs to the related institution or individuals.
                </p>
              </div>

              <div className="bg-yellow-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-yellow-900 mb-2">Accuracy of Provided Data</h2>
                <p className="text-yellow-900">
                  We strive for accuracy but AuthX uses data provided by users and institutions. AuthX cannot guarantee full
                  accuracy and is not responsible for consequences resulting from decisions based on the results of AuthX.
                </p>
              </div>

              <div className="bg-indigo-50 p-6 rounded-lg">
                <h2 className="text-xl font-semibold text-indigo-900 mb-2">Modifying Service</h2>
                <p className="text-indigo-900">
                  We are consistently updating AuthX. You agree that we can use discretion to update and iterate on features
                  at any time. Access and use of the AuthX technology represents an acceptance of the updates to be made.
                </p>
              </div>

              <p>
                When you use or access AuthX, you agree to follow the terms and community to create an environment of academic
                honesty and integrity.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsPage;