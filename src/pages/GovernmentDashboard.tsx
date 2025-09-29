import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PieChart from '../components/PieChart';
import { Shield, Building, FileText, Users, AlertCircle, CheckCircle, Download } from 'lucide-react';

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

  // Background Elements Component
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Government Icons */}
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.03]"
          style={{
            animation: `float ${18 + i * 4}s infinite ease-in-out ${i * 1.5}s`,
            top: `${15 + i * 25}%`,
            right: `${5 + i * 15}%`,
          }}
        >
          {i % 2 === 0 ? (
            <Building className="w-6 h-6 text-blue-400" />
          ) : (
            <Shield className="w-6 h-6 text-purple-400" />
          )}
        </div>
      ))}

      {/* Document Icons */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="absolute opacity-[0.02]"
          style={{
            animation: `float-slow ${20 + i * 5}s infinite ease-in-out ${i * 2}s`,
            top: `${40 + i * 20}%`,
            left: `${10 + i * 20}%`,
          }}
        >
          <FileText className="w-8 h-8 text-cyan-400" />
        </div>
      ))}

      {/* Glowing Orbs */}
      {[...Array(2)].map((_, i) => (
        <div
          key={i}
          className="absolute rounded-full blur-xl"
          style={{
            animation: `glow ${10 + i * 3}s infinite ease-in-out`,
            width: `${120 + i * 80}px`,
            height: `${120 + i * 80}px`,
            top: `${20 + i * 60}%`,
            left: `${10 + i * 30}%`,
            background: i % 2 === 0 
              ? 'radial-gradient(circle, rgba(59, 130, 246, 0.04) 0%, transparent 70%)'
              : 'radial-gradient(circle, rgba(139, 92, 246, 0.03) 0%, transparent 70%)',
          }}
        />
      ))}
    </div>
  );

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
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 relative overflow-hidden">
      <BackgroundElements />
      
      <nav className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-sm border-b border-gray-700 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => window.location.href = '/'}
                className="bg-gray-700 hover:bg-gray-600 text-gray-200 px-3 py-2 rounded-md text-sm font-medium flex items-center transition-colors"
              >
                ← Home
              </button>
              <div className="flex-shrink-0 flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-400" />
                <h1 className="text-xl font-bold text-white">Government Portal</h1>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-300">Welcome, {user?.name}</span>
              <button
                onClick={logout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Tab Navigation */}
      <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm border-b border-gray-700 shadow-sm relative z-10">
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
                    ? 'border-blue-500 text-blue-400 bg-blue-900 bg-opacity-20'
                    : 'border-transparent text-gray-400 hover:text-gray-300 hover:border-gray-600 hover:bg-gray-700 hover:bg-opacity-50'
                }`}
              >
                <span>{tab.icon}</span>
                <span>{tab.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8 relative z-10">
        <div className="px-4 py-6 sm:px-0">
          {activeTab === 'overview' && (
            <>
              {/* Enhanced Government Overview Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-blue-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Total Institutions</p>
                        <p className="text-3xl font-bold">{stats.totalInstitutions.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full">
                        <Building className="w-6 h-6 text-blue-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-green-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-200 text-sm font-medium">Verified Certificates</p>
                        <p className="text-3xl font-bold">{stats.verifiedCertificates.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-500 bg-opacity-30 p-3 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-yellow-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-200 text-sm font-medium">Pending Verifications</p>
                        <p className="text-3xl font-bold">{stats.pendingVerifications.toLocaleString()}</p>
                      </div>
                      <div className="bg-yellow-500 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">⏳</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-red-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-200 text-sm font-medium">Fraud Cases</p>
                        <p className="text-3xl font-bold">{stats.fraudCases}</p>
                      </div>
                      <div className="bg-red-500 bg-opacity-30 p-3 rounded-full">
                        <AlertCircle className="w-6 h-6 text-red-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
                  <PieChart
                    title="Institution Type Distribution"
                    data={[
                      { name: 'Public Universities', value: 45, color: '#3B82F6' },
                      { name: 'Private Universities', value: 35, color: '#10B981' },
                      { name: 'Community Colleges', value: 20, color: '#F59E0B' }
                    ]}
                  />
                </div>
                
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
                  <PieChart
                    title="Verification Status Overview"
                    data={[
                      { name: 'Verified', value: 85, color: '#10B981' },
                      { name: 'Pending', value: 12, color: '#F59E0B' },
                      { name: 'Fraud', value: 3, color: '#EF4444' }
                    ]}
                  />
                </div>
              </div>

              {/* Institution Performance Comparison */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden mb-8 border border-gray-700">
                <div className="bg-gradient-to-r from-purple-900 bg-opacity-50 to-indigo-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">📊</span>
                    Institution Performance Comparison
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Fraud detection and verification rates by institution</p>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {institutions.map((institution) => (
                      <div key={institution.id} className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-gray-600 hover:bg-opacity-50 transition-colors border border-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className="w-12 h-12 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center border border-blue-700 border-opacity-50">
                            <span className="text-blue-400 font-bold text-lg">🏫</span>
                          </div>
                          <div>
                            <p className="font-medium text-white">{institution.name}</p>
                            <p className="text-sm text-gray-300">{institution.type} • {institution.location}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-6">
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Verification Rate</p>
                            <p className="text-lg font-bold text-green-400">{institution.verificationRate}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Fraud Rate</p>
                            <p className="text-lg font-bold text-red-400">{institution.fraudRate}%</p>
                          </div>
                          <div className="text-center">
                            <p className="text-sm text-gray-400">Certificates</p>
                            <p className="text-lg font-bold text-blue-400">{institution.certificatesIssued.toLocaleString()}</p>
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
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-blue-900 bg-opacity-50 to-indigo-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">🏫</span>
                    Registered Institutions
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Complete overview of all registered educational institutions</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-900 bg-opacity-50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-700 border-opacity-50">
                        Total: {institutions.length}
                      </div>
                      <div className="bg-green-900 bg-opacity-50 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-700 border-opacity-50">
                        Active: {institutions.length}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-500 border-opacity-30">
                        Export Data
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-green-500 border-opacity-30">
                        Add Institution
                      </button>
                    </div>
                  </div>

                  {/* Institutions Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700 bg-opacity-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Institution</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Type</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Location</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Students</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Certificates</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Performance</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 bg-opacity-50 divide-y divide-gray-700">
                        {institutions.map((institution) => (
                          <tr key={institution.id} className="hover:bg-gray-700 hover:bg-opacity-50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="w-10 h-10 bg-blue-900 bg-opacity-50 rounded-full flex items-center justify-center mr-3 border border-blue-700 border-opacity-50">
                                  <span className="text-blue-400 font-bold">🏫</span>
                                </div>
                                <div>
                                  <div className="text-sm font-medium text-white">{institution.name}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {institution.type}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {institution.location}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {institution.students.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                              {institution.certificatesIssued.toLocaleString()}
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center space-x-2">
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">Verification</div>
                                  <div className="text-sm font-bold text-green-400">{institution.verificationRate}%</div>
                                </div>
                                <div className="text-center">
                                  <div className="text-xs text-gray-400">Fraud</div>
                                  <div className="text-sm font-bold text-red-400">{institution.fraudRate}%</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                              <button className="text-blue-400 hover:text-blue-300 mr-3 transition-colors">View</button>
                              <button className="text-green-400 hover:text-green-300 mr-3 transition-colors">Edit</button>
                              <button className="text-red-400 hover:text-red-300 transition-colors">Suspend</button>
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
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-purple-900 bg-opacity-50 to-indigo-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">📊</span>
                    Government Reports & Analytics
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Download comprehensive reports and analytics</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-gradient-to-r from-blue-900 bg-opacity-30 to-blue-800 bg-opacity-30 p-6 rounded-xl border border-blue-700 border-opacity-50 hover:shadow-lg transition-shadow hover:border-blue-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">📈</span>
                        </div>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                      <h4 className="font-semibold text-white mb-2">Monthly Verification Report</h4>
                      <p className="text-sm text-gray-300 mb-3">Comprehensive monthly statistics and trends</p>
                      <div className="text-xs text-gray-400">Last updated: 2 days ago</div>
                    </div>

                    <div className="bg-gradient-to-r from-green-900 bg-opacity-30 to-green-800 bg-opacity-30 p-6 rounded-xl border border-green-700 border-opacity-50 hover:shadow-lg transition-shadow hover:border-green-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">🏫</span>
                        </div>
                        <button className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                      <h4 className="font-semibold text-white mb-2">Institution Performance Report</h4>
                      <p className="text-sm text-gray-300 mb-3">Detailed analysis of institution performance</p>
                      <div className="text-xs text-gray-400">Last updated: 1 week ago</div>
                    </div>

                    <div className="bg-gradient-to-r from-red-900 bg-opacity-30 to-red-800 bg-opacity-30 p-6 rounded-xl border border-red-700 border-opacity-50 hover:shadow-lg transition-shadow hover:border-red-500">
                      <div className="flex items-center justify-between mb-4">
                        <div className="w-12 h-12 bg-red-600 rounded-lg flex items-center justify-center">
                          <span className="text-white text-xl">🚨</span>
                        </div>
                        <button className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded-lg text-sm font-medium transition-colors flex items-center space-x-1">
                          <Download className="w-4 h-4" />
                          <span>Download</span>
                        </button>
                      </div>
                      <h4 className="font-semibold text-white mb-2">Fraud Detection Report</h4>
                      <p className="text-sm text-gray-300 mb-3">Security analysis and fraud patterns</p>
                      <div className="text-xs text-gray-400">Last updated: 3 days ago</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

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

export default GovernmentDashboard;