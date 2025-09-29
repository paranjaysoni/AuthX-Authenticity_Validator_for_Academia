import React from 'react';

interface LearnMoreModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const LearnMoreModal: React.FC<LearnMoreModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-900">About AuthX</h2>
            <button
              onClick={onClose}
              className="bg-red-100 hover:bg-red-200 text-red-700 px-4 py-2 rounded-md text-sm font-medium"
            >
              ✕ Close
            </button>
          </div>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-blue-900 mb-4">What is AuthX?</h3>
              <p className="text-blue-800 leading-relaxed">
                AuthX is a trusted certificate verification platform focused on academic integrity. We enable
                instant verification of degrees, diplomas, and certificates from authorized institutions with
                enterprise-grade security and transparency.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-green-900 mb-3">🔐 Security & Trust</h4>
                <ul className="text-green-800 space-y-2">
                  <li>• Tamper-evident verification</li>
                  <li>• Encrypted storage</li>
                  <li>• Audit-ready logs</li>
                  <li>• Role-based access</li>
                </ul>
              </div>

              <div className="bg-purple-50 p-6 rounded-lg">
                <h4 className="text-lg font-semibold text-purple-900 mb-3">⚡ Why AuthX</h4>
                <ul className="text-purple-800 space-y-2">
                  <li>• Instant verification</li>
                  <li>• Lower fraud risk</li>
                  <li>• Operational efficiency</li>
                  <li>• Insightful analytics</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h4 className="text-lg font-semibold text-gray-900 mb-3">🌍 Impact</h4>
              <p className="text-gray-700 leading-relaxed">
                AuthX helps institutions, employers, and authorities verify credentials responsibly while
                upholding user privacy and data protection norms.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LearnMoreModal;
