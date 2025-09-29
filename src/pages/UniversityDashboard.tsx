import React, { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PieChart from '../components/PieChart';

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
    <div className="min-h-screen bg-gray-50">
      {/* Success Popup */}
      {showSuccessPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 transform transition-all duration-300 scale-100">
            <div className="text-center">
              <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Data Uploaded Successfully!
              </h3>
              
              <div className="text-gray-600 mb-2 space-y-3 text-left">
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Student data has been processed successfully
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  {studentData.length} student records added to the system
                </p>
                <p className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span>
                  Certificates are being generated automatically
                </p>
              </div>
              
              <p className="text-sm text-gray-500 mt-4 mb-6">
                The data is now available in the Data Management section
              </p>
              
              <button
                onClick={closeSuccessPopup}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              >
                Continue to Dashboard
              </button>
            </div>
          </div>
        </div>
      )}

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
                <h1 className="text-xl font-bold text-gray-900">🏫 University Admin Portal</h1>
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
              { id: 'dashboard', name: 'Admin Dashboard', icon: '📊' },
              { id: 'bulk-upload', name: 'Bulk Upload', icon: '📁' },
              { id: 'data-management', name: 'Data Management', icon: '🗂️' }
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
          {activeTab === 'dashboard' && (
            <>
              {/* Enhanced Admin Dashboard Stats */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-500 to-blue-600 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-100 text-sm font-medium">Total Students</p>
                        <p className="text-3xl font-bold">{stats.totalStudents.toLocaleString()}</p>
                      </div>
                      <div className="bg-blue-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">👥</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-500 to-green-600 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-100 text-sm font-medium">Certificates Issued</p>
                        <p className="text-3xl font-bold">{stats.certificatesIssued.toLocaleString()}</p>
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
                        <p className="text-yellow-100 text-sm font-medium">Pending Requests</p>
                        <p className="text-3xl font-bold">{stats.pendingRequests}</p>
                      </div>
                      <div className="bg-yellow-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">⏳</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-500 to-purple-600 overflow-hidden shadow-xl rounded-xl transform hover:scale-105 transition-all duration-300">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-100 text-sm font-medium">Success Rate</p>
                        <p className="text-3xl font-bold">{stats.successRate}%</p>
                      </div>
                      <div className="bg-purple-400 bg-opacity-30 p-3 rounded-full">
                        <span className="text-2xl">📈</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Analytics Section */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                <PieChart
                  title="Certificate Distribution by Department"
                  data={[
                    { name: 'Computer Science', value: 45, color: '#3B82F6' },
                    { name: 'Business', value: 30, color: '#10B981' },
                    { name: 'Engineering', value: 25, color: '#F59E0B' }
                  ]}
                />
                
                <PieChart
                  title="Certificate Status Distribution"
                  data={[
                    { name: 'Verified', value: 85, color: '#10B981' },
                    { name: 'Pending', value: 12, color: '#F59E0B' },
                    { name: 'Rejected', value: 3, color: '#EF4444' }
                  ]}
                />
              </div>

              {/* Recent Activity */}
              <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📋</span>
                    Recent Certificate Activity
                  </h3>
                </div>
                <div className="p-6">
                  <div className="space-y-4">
                    {studentData.slice(-5).reverse().map((student) => (
                      <div key={student.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <div className="flex items-center space-x-4">
                          <div className={`w-3 h-3 rounded-full ${student.status === 'verified' ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
                          <div>
                            <p className="font-medium text-gray-900">{student.name}</p>
                            <p className="text-sm text-gray-500">{student.degree} • {student.graduationYear}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                            student.status === 'verified' 
                              ? 'bg-green-100 text-green-800' 
                              : 'bg-yellow-100 text-yellow-800'
                          }`}>
                            {student.status === 'verified' ? 'Verified' : 'Pending'}
                          </span>
                          <span className="text-sm text-gray-500">{student.uploadDate}</span>
                        </div>
                      </div>
                    ))}
                    {studentData.length === 0 && (
                      <div className="text-center py-12">
                        <div className="text-gray-400 text-6xl mb-4">📄</div>
                        <p className="text-gray-500 text-lg">No student data yet</p>
                        <p className="text-gray-400 text-sm">Upload student data to get started</p>
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
              <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">📁</span>
                    Bulk Student Data Upload
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Upload student data in bulk for certificate generation</p>
                </div>
                <div className="p-6">
                  <div className="border-2 border-dashed border-blue-300 rounded-xl p-8 hover:border-blue-400 transition-colors">
                    <div className="text-center">
                      <div className="mx-auto h-16 w-16 text-blue-400 mb-4">
                        <svg className="h-16 w-16" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                      <div>
                        <label htmlFor="bulk-upload" className="cursor-pointer">
                          <span className="text-lg font-medium text-gray-900 block">
                            Drop your CSV file here, or click to browse
                          </span>
                          <span className="text-sm text-gray-500 mt-1 block">
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
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-3">
                          <span className="text-blue-500 text-2xl">📄</span>
                          <div>
                            <p className="font-medium text-blue-900">{bulkUploadFile.name}</p>
                            <p className="text-sm text-blue-600">Size: {(bulkUploadFile.size / 1024).toFixed(1)} KB</p>
                          </div>
                        </div>
                        <button
                          onClick={() => setBulkUploadFile(null)}
                          className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                        >
                          Remove
                        </button>
                      </div>
                      <div className="flex space-x-3">
                        <button 
                          onClick={processBulkUpload}
                          disabled={isProcessing}
                          className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
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
              <div className="bg-white shadow-xl rounded-xl overflow-hidden">
                <div className="bg-gradient-to-r from-green-50 to-emerald-50 px-6 py-4 border-b">
                  <h3 className="text-lg font-semibold text-gray-900 flex items-center">
                    <span className="mr-2">🗂️</span>
                    Student Data Management
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">Manage all uploaded student data and certificates</p>
                </div>
                <div className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <div className="flex items-center space-x-4">
                      <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                        Total Students: {studentData.length}
                      </div>
                      <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
                        Verified: {studentData.filter(s => s.status === 'verified').length}
                      </div>
                      <div className="bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full text-sm font-medium">
                        Pending: {studentData.filter(s => s.status === 'pending').length}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Export Data
                      </button>
                      <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
                        Generate Certificates
                      </button>
                    </div>
                  </div>

                  {/* Student Data Table */}
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Student ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Degree</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {studentData.length > 0 ? (
                          studentData.map((student) => (
                            <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                                {student.studentId}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                {student.name}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.email}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                {student.degree}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${
                                  student.status === 'verified' 
                                    ? 'bg-green-100 text-green-800' 
                                    : 'bg-yellow-100 text-yellow-800'
                                }`}>
                                  {student.status === 'verified' ? '✅ Verified' : '⏳ Pending'}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                <button className="text-blue-600 hover:text-blue-900 mr-3">View</button>
                                <button className="text-green-600 hover:text-green-900 mr-3">Edit</button>
                                <button className="text-red-600 hover:text-red-900">Delete</button>
                              </td>
                            </tr>
                          ))
                        ) : (
                          <tr>
                            <td colSpan={6} className="px-6 py-12 text-center">
                              <div className="text-gray-400 text-6xl mb-4">📄</div>
                              <p className="text-gray-500 text-lg">No student data available</p>
                              <p className="text-gray-400 text-sm">Upload student data to get started</p>
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
    </div>
  );
};

export default UniversityDashboard;