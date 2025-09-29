import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PieChart from '../components/PieChart';

const GovernmentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');
  const [institutions, setInstitutions] = useState<any[]>([]);
  const [stats, setStats] = useState({
    totalInstitutions: 156,
    verifiedCertificates: 125430,
    pendingVerifications: 2341,
    fraudCases: 89
  });

  useEffect(() => {
    // Generate sample institution data
    const sampleInstitutions = [
      {
        id: 1,
        name: 'University of Technology',
        type: 'Public University',
        location: 'New York',
        students: 25000,
        certificatesIssued: 15420,
        fraudRate: 0.2,
        verificationRate: 98.5
      },
      {
        id: 2,
        name: 'MIT',
        type: 'Private University',
        location: 'Massachusetts',
        students: 12000,
        certificatesIssued: 8750,
        fraudRate: 0.1,
        verificationRate: 99.2
      },
      {
        id: 3,
        name: 'Stanford University',
        type: 'Private University',
        location: 'California',
        students: 18000,
        certificatesIssued: 12300,
        fraudRate: 0.3,
        verificationRate: 97.8
      }
    ];
    setInstitutions(sampleInstitutions);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-2 rounded-md text-sm font-medium flex items-center"
              >
                ← Home
              </button>
              <div className="flex-shrink-0">
                <h1 className="text-xl font-bold text-gray-900">🏛️ Government Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-white border-b shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex space-x-8">
            {[
              { id: 'overview', name: 'Overview', icon: '🏛️' },
              { id: 'institutions', name: 'Institutions', icon: '🏫' },
              { id: 'reports', name: 'Reports', icon: '📊' }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm transition-all duration-200 flex items-center space-x-2 ${
                  activeTab === tab.id
                    ? 'border-blue-500 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300 hover:bg-gray-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'overview' && (
            <>
              {/* Enhanced Government Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Institutions</p>
                        <p className="text-3xl font-bold">{stats.totalInstitutions.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">🏛️</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Verified Certificates</p>
                        <p className="text-3xl font-bold">{stats.verifiedCertificates.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">✅</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-500 to-orange-500 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-100 text-sm font-medium">Pending Verifications</p>
                        <p className="text-3xl font-bold">{stats.pendingVerifications.toLocaleString()}</p>
                      </div>
                      <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">⏳</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-500 to-red-600 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-100 text-sm font-medium">Fraud Cases</p>
                        <p className="text-3xl font-bold">{stats.fraudCases}</p>
                      </div>
                      <div className="bg-red-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">🚨</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <PieChart
                  title="Institution Type Distribution"
                  data={[
                    { name: 'Public Universities', value: 45, color: '#3B82F6' },
                    { name: 'Private Universities', value: 35, color: '#10B981' },
                    { name: 'Community Colleges', value: 20, color: '#F59E0B' }
                  ]}
                />
                
                <PieChart
                  title="Verification Status Overview"
                  data={[
                    { name: 'Verified', value: 85, color: '#10B981' },
                    { name: 'Pending', value: 12, color: '#F59E0B' },
                    { name: 'Fraud', value: 3, color: '#EF4444' }
                  ]}
                />
              </div>

              {/* Institution Performance Comparison */}
              <div className="bg-white shadow-xl rounded-xl overflow-hidden mb-8">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📊</span>
                    Institution Performance Comparison
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Fraud detection and verification rates by institution</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {institutions.map((institution) => (
                      <div key={institution.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-blue-600 font-bold text-lg">🏫</span>
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{institution.name}</p>
                            <p className="text-sm text-gray-500">{institution.type} • {institution.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Verification Rate</p>
                            <p className="text-lg font-bold text-green-600">{institution.verificationRate}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Fraud Rate</p>
                            <p className="text-lg font-bold text-red-600">{institution.fraudRate}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-500">Certificates</p>
                            <p className="text-lg font-bold text-blue-600">{institution.certificatesIssued.toLocaleString()}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'institutions' && (
            <div className="space-y-6">
              {/* Enhanced Institutions Section */}
              <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">🏫</span>
                    Registered Institutions
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Complete overview of all registered educational institutions</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Total: {institutions.length}
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Active: {institutions.length}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Export Data
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Add Institution
                      </button>
                    </div>
                  </div>

                  {/* Institutions Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Institution</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Certificates</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Performance</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {institutions.map((institution) => (
                          <tr key={institution.id} className="hover:bg-gray-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                                  <span className="text-blue-600 font-bold">🏫</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-gray-900">{institution.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {institution.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {institution.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {institution.students.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                              {institution.certificatesIssued.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="text-center">
                                  <div className="text-xs text-gray-500">Verification</div>
                                  <div className="text-sm font-bold text-green-600">{institution.verificationRate}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-gray-500">Fraud</div>
                                  <div className="text-sm font-bold text-red-600">{institution.fraudRate}%</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                              <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                              <button className="text-red-600 hover:text-red-900">Suspend</button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* Enhanced Reports Section */}
              <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-purple-50 to-indigo-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📊</span>
                    Government Reports & Analytics
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Download comprehensive reports and analytics</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl border border-blue-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">📈</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                          Download
                        </button>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Monthly Verification Report</h4>
                      <p className="text-sm text-gray-600 mb-3">Comprehensive monthly statistics and trends</p>
                      <div className="text-xs text-gray-500">Last updated: 2 days ago</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-50 to-green-100 p-6 rounded-xl border border-green-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">🏫</span>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                          Download
                        </button>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Institution Performance Report</h4>
                      <p className="text-sm text-gray-600 mb-3">Detailed analysis of institution performance</p>
                      <div className="text-xs text-gray-500">Last updated: 1 week ago</div>
                    </div>

                    <div className="bg-gradient-to-r from-red-50 to-red-100 p-6 rounded-xl border border-red-200 hover:shadow-lg transition-shadow">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-500 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">🚨</span>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors">
                          Download
                        </button>
                      </div>
                      <h4 className="font-semibold text-gray-900 mb-2">Fraud Detection Report</h4>
                      <p className="text-sm text-gray-600 mb-3">Security analysis and fraud patterns</p>
                      <div className="text-xs text-gray-500">Last updated: 3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default GovernmentDashboard;