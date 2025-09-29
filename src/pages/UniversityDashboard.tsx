import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PieChart from '../components/PieChart';
import { Shield, Users, FileText, Database, Key, Fingerprint } from 'lucide-react';

const UniversityDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [bulkUploadFile, setBulkUploadFile] = useState<File | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [studentData, setStudentData] = useState<any[]>([]);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);
  const [stats, setStats] = useState({
    totalStudents: 2847,
    certificatesIssued: 1856,
    pendingRequests: 23,
    successRate: 98.5
  });

  // Background Elements Component
  const BackgroundElements = () => (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Floating Security Icons */}
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
            <Key className="w-6 h-6 text-blue-400" />
          ) : (
            <Fingerprint className="w-6 h-6 text-purple-400" />
          )}
        </div>
      ))}

      {/* Certificate Icons */}
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

  const handleBulkUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setBulkUploadFile(file);
    }
  };

  const processBulkUpload = async () => {
    if (bulkUploadFile) {
      setIsProcessing(true);
      
      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Generate sample student data
      const newStudents = Array.from({ length: 50 }, (_, index) => ({
        id: Date.now().toString() + index,
        studentId: `STU-${Math.floor(Math.random() * 10000)}`,
        name: ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson', 'David Brown'][Math.floor(Math.random() * 5)],
        email: `student${index + 1}@university.edu`,
        degree: ['Computer Science', 'Business Administration', 'Engineering', 'Medicine', 'Arts'][Math.floor(Math.random() * 5)],
        graduationYear: 2023 + Math.floor(Math.random() * 3),
        status: Math.random() > 0.1 ? 'verified' : 'pending',
        certificateId: `CERT-${Date.now()}-${index}`,
        uploadDate: new Date().toISOString().split('T')[0]
      }));
      
      setStudentData(prev => [...prev, ...newStudents]);
      setBulkUploadFile(null);
      setIsProcessing(false);
      
      // Update stats
      setStats(prev => ({
        ...prev,
        totalStudents: prev.totalStudents + newStudents.length,
        certificatesIssued: prev.certificatesIssued + newStudents.filter(s => s.status === 'verified').length,
        pendingRequests: prev.pendingRequests + newStudents.filter(s => s.status === 'pending').length
      }));

      // Show success popup
      setShowSuccessPopup(true);
    }
  };

  const closeSuccessPopup = () => {
    setShowSuccessPopup(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-slate-900 to-blue-900 relative overflow-hidden">
      <BackgroundElements />
      
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4">
          <div className="bg-gradient-to-br from-gray-800 to-slate-800 rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100 border border-gray-700">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-900 bg-opacity-30 mb-6">
                <svg className="h-8 w-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-white mb-4">
                Data Uploaded Successfully!
              </h3>
              
              <div className="text-gray-300 mb-2 space-y-3 text-left">
                <p className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Student data has been processed successfully
                </p>
                <p className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  {studentData.length} student records added to the system
                </p>
                <p className="flex items-start">
                  <span className="text-green-400 mr-2">✓</span>
                  Certificates are being generated automatically
                </p>
              </div>
              
              <p className="text-sm text-gray-400 mt-4 mb-6">
                The data is now available in the Data Management section
              </p>
              
              <button
                onClick={closeSuccessPopup}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-semibold transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

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
                <h1 className="text-xl font-bold text-white">University Admin Portal</h1>
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
              { id: 'dashboard', name: 'Admin Dashboard', icon: '📊' },
              { id: 'bulk-upload', name: 'Bulk Upload', icon: '📁' },
              { id: 'data-management', name: 'Data Management', icon: '🗂️' }
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
          {activeTab === 'dashboard' && (
            <>
              {/* Enhanced Admin Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-blue-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Total Students</p>
                        <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full">
                        <Users className="h-6 w-6 text-blue-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-green-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-200 text-sm font-medium">Certificates Issued</p>
                        <p className="text-3xl font-bold">{stats.certificatesIssued.toLocaleString()}</p>
                      </div>
                      <div className="bg-green-500 bg-opacity-30 p-3 rounded-full">
                        <FileText className="h-6 w-6 text-green-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-yellow-600 to-orange-600 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-yellow-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-yellow-200 text-sm font-medium">Pending Requests</p>
                        <p className="text-3xl font-bold">{stats.pendingRequests}</p>
                      </div>
                      <div className="bg-yellow-500 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">⏳</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-purple-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm font-medium">Success Rate</p>
                        <p className="text-3xl font-bold">{stats.successRate}%</p>
                      </div>
                      <div className="bg-purple-500 bg-opacity-30 p-3 rounded-full">
                        <Database className="h-6 w-6 text-purple-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
                  <PieChart
                    title="Certificate Distribution by Department"
                    data={[
                      { name: 'Computer Science', value: 45, color: '#3B82F6' },
                      { name: 'Business', value: 30, color: '#10B981' },
                      { name: 'Engineering', value: 25, color: '#F59E0B' }
                    ]}
                  />
                </div>
                
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
                  <PieChart
                    title="Certificate Status Distribution"
                    data={[
                      { name: 'Verified', value: 85, color: '#10B981' },
                      { name: 'Pending', value: 12, color: '#F59E0B' },
                      { name: 'Rejected', value: 3, color: '#EF4444' }
                    ]}
                  />
                </div>
              </div>

              {/* Recent Activity */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">📋</span>
                    Recent Certificate Activity
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {studentData.slice(-5).reverse().map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-gray-600 hover:bg-opacity-50 transition-colors border border-gray-600">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${student.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <p className="font-medium text-white">{student.name}</p>
                            <p className="text-sm text-gray-300">{student.degree} • {student.graduationYear}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === 'verified' 
                              ? 'bg-green-900 bg-opacity-50 text-green-300' 
                              : 'bg-yellow-900 bg-opacity-50 text-yellow-300'
                          }`}>
                            {student.status === 'verified' ? 'Verified' : 'Pending'}
                          </span>
                          <span className="text-sm text-gray-400">{student.uploadDate}</span>
                        </div>
                      </div>
                    ))}
                    {studentData.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-500 text-6xl mb-4">📄</div>
                        <p className="text-gray-400 text-lg">No student data yet</p>
                        <p className="text-gray-500 text-sm">Upload student data to get started</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </>
          )}

          {activeTab === 'bulk-upload' && (
            <div className="space-y-6">
              {/* Bulk Upload Section */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-blue-900 bg-opacity-50 to-indigo-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">📁</span>
                    Bulk Student Data Upload
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Upload student data in bulk for certificate generation</p>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-blue-500 border-opacity-50 rounded-xl p-8 hover:border-blue-400 transition-colors bg-gray-700 bg-opacity-30">
                    <div className="text-center">
                      <div className="mx-auto h-16 w-16 text-blue-400 mb-4">
                        <svg className="h-16 w-16" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="bulk-upload" className="cursor-pointer">
                          <span className="text-lg font-medium text-white block">
                            Drop your CSV file here, or click to browse
                          </span>
                          <span className="text-sm text-gray-300 mt-1 block">
                            CSV format with student data (Name, Email, Degree, Graduation Year, etc.)
                          </span>
                        </label>
                        <input
                          id="bulk-upload"
                          type="file"
                          accept=".csv"
                          onChange={handleBulkUpload}
                          className="sr-only"
                        />
                      </div>
                    </div>
                  </div>

                  {bulkUploadFile && (
                    <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700 border-opacity-50">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-400 text-2xl">📄</span>
                          <div>
                            <p className="font-medium text-blue-200">{bulkUploadFile.name}</p>
                            <p className="text-sm text-blue-300">Size: {(bulkUploadFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setBulkUploadFile(null)}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium transition-colors"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={processBulkUpload}
                          disabled={isProcessing}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                              <span>Processing...</span>
                            </>
                          ) : (
                            <>
                              <span>⚡</span>
                              <span>Process Upload</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'data-management' && (
            <div className="space-y-6">
              {/* Data Management Overview */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-green-900 bg-opacity-50 to-emerald-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <span className="mr-2">🗂️</span>
                    Student Data Management
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Manage all uploaded student data and certificates</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-900 bg-opacity-50 text-blue-300 px-3 py-1 rounded-full text-sm font-medium border border-blue-700 border-opacity-50">
                        Total Students: {studentData.length}
                      </div>
                      <div className="bg-green-900 bg-opacity-50 text-green-300 px-3 py-1 rounded-full text-sm font-medium border border-green-700 border-opacity-50">
                        Verified: {studentData.filter(s => s.status === 'verified').length}
                      </div>
                      <div className="bg-yellow-900 bg-opacity-50 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium border border-yellow-700 border-opacity-50">
                        Pending: {studentData.filter(s => s.status === 'pending').length}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-blue-500 border-opacity-30">
                        Export Data
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors border border-green-500 border-opacity-30">
                        Generate Certificates
                      </button>
                    </div>
                  </div>

                  {/* Student Data Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-700">
                      <thead className="bg-gray-700 bg-opacity-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Degree</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-gray-800 bg-opacity-50 divide-y divide-gray-700">
                        {studentData.length > 0 ? (
                          studentData.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-700 hover:bg-opacity-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {student.studentId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-white">
                                {student.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {student.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {student.degree}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                  student.status === 'verified' 
                                    ? 'bg-green-900 bg-opacity-50 text-green-300 border border-green-700 border-opacity-50' 
                                    : 'bg-yellow-900 bg-opacity-50 text-yellow-300 border border-yellow-700 border-opacity-50'
                                }`}>
                                  {student.status === 'verified' ? '✅ Verified' : '⏳ Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-400 hover:text-blue-300 mr-3 transition-colors">View</button>
                                <button className="text-green-400 hover:text-green-300 mr-3 transition-colors">Edit</button>
                                <button className="text-red-400 hover:text-red-300 transition-colors">Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                              <div className="text-gray-500 text-6xl mb-4">📄</div>
                              <p className="text-gray-400 text-lg">No student data available</p>
                              <p className="text-gray-500 text-sm">Upload student data to get started</p>
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
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

export default UniversityDashboard;