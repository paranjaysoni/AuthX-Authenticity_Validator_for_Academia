import React, { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import PieChart from '../components/PieChart';
import { Upload, Camera, FileText, Image, X, CheckCircle, AlertCircle, Shield, Key, Fingerprint } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('dashboard');
  const [uploadFiles, setUploadFiles] = useState<File[]>([]);
  const [verificationResults, setVerificationResults] = useState<any[]>([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [uploadMethod, setUploadMethod] = useState<'file' | 'camera'>('file');
  const [cameraActive, setCameraActive] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const [stats, setStats] = useState({
    totalVerified: 0,
    totalFraud: 0,
    totalProcessed: 0
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

  // Camera functions
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
      }
      setCameraActive(true);
    } catch (error) {
      alert('Unable to access camera. Please check permissions.');
      console.error('Camera error:', error);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureImage = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        stopCamera();
        
        // Convert data URL to File object
        fetch(imageData)
          .then(res => res.blob())
          .then(blob => {
            const file = new File([blob], `captured-certificate-${Date.now()}.jpg`, { type: 'image/jpeg' });
            setUploadFiles(prev => [...prev, file]);
          });
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    setUploadFiles(prev => [...prev, ...files]);
  };

  const removeFile = (index: number) => {
    setUploadFiles(prev => prev.filter((_, i) => i !== index));
  };

  const processCertificates = async () => {
    if (uploadFiles.length === 0) {
      alert('Please select files to upload');
      return;
    }

    setIsProcessing(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const results = uploadFiles.map((file, index) => {
      const isVerified = Math.random() > 0.25; // 75% chance of being verified
      return {
        id: Date.now().toString() + index,
        fileName: file.name,
        status: isVerified ? 'verified' : 'fraud',
        confidence: Math.floor(Math.random() * 30) + 70,
        timestamp: new Date().toISOString(),
        institution: isVerified ? ['University of Technology', 'MIT', 'Stanford', 'Harvard'][Math.floor(Math.random() * 4)] : 'Unknown Institution',
        studentName: isVerified ? ['John Doe', 'Jane Smith', 'Mike Johnson', 'Sarah Wilson'][Math.floor(Math.random() * 4)] : 'Fake Certificate',
        degree: isVerified ? ['Computer Science', 'Business Administration', 'Engineering', 'Medicine'][Math.floor(Math.random() * 4)] : 'Fake Degree'
      };
    });

    setVerificationResults(prev => [...prev, ...results]);
    setUploadFiles([]);
    setCapturedImage(null);
    setIsProcessing(false);
    
    // Update stats
    const verified = results.filter(r => r.status === 'verified').length;
    const fraud = results.filter(r => r.status === 'fraud').length;
    setStats(prev => ({
      totalVerified: prev.totalVerified + verified,
      totalFraud: prev.totalFraud + fraud,
      totalProcessed: prev.totalProcessed + results.length
    }));
  };

  const downloadReport = () => {
    const reportData = {
      totalProcessed: stats.totalProcessed,
      verified: stats.totalVerified,
      fraud: stats.totalFraud,
      successRate: ((stats.totalVerified / stats.totalProcessed) * 100).toFixed(1),
      timestamp: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `verification-report-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  useEffect(() => {
    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
    };
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
                ← Back to Home
              </button>
              <div className="flex-shrink-0 flex items-center space-x-2">
                <Shield className="h-6 w-6 text-blue-400" />
                <h1 className="text-xl font-semibold text-white">User Portal</h1>
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
              { id: 'dashboard', name: 'Dashboard', icon: '📊' },
              { id: 'upload', name: 'Upload & Verify', icon: '📁' },
              { id: 'reports', name: 'Reports', icon: '📈' }
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
              {/* Enhanced Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-blue-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-blue-200 text-sm font-medium">Total Processed</p>
                        <p className="text-3xl font-bold">{stats.totalProcessed}</p>
                      </div>
                      <div className="bg-blue-500 bg-opacity-30 p-3 rounded-full">
                        <FileText className="w-6 h-6 text-blue-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-green-600 to-green-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-green-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-green-200 text-sm font-medium">Verified</p>
                        <p className="text-3xl font-bold">{stats.totalVerified}</p>
                      </div>
                      <div className="bg-green-500 bg-opacity-30 p-3 rounded-full">
                        <CheckCircle className="w-6 h-6 text-green-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-red-600 to-red-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-red-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-red-200 text-sm font-medium">Fraud Detected</p>
                        <p className="text-3xl font-bold">{stats.totalFraud}</p>
                      </div>
                      <div className="bg-red-500 bg-opacity-30 p-3 rounded-full">
                        <AlertCircle className="w-6 h-6 text-red-200" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-r from-purple-600 to-purple-700 overflow-hidden shadow-2xl rounded-xl transform hover:scale-105 transition-all duration-300 border border-purple-500 border-opacity-30">
                  <div className="p-6 text-white">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-purple-200 text-sm font-medium">Success Rate</p>
                        <p className="text-3xl font-bold">
                          {stats.totalProcessed > 0 ? ((stats.totalVerified / stats.totalProcessed) * 100).toFixed(1) : 0}%
                        </p>
                      </div>
                      <div className="bg-purple-500 bg-opacity-30 p-3 rounded-full">
                        <Upload className="w-6 h-6 text-purple-200" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Results */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-gray-700 to-gray-800 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Recent Verification Results
                  </h3>
                </div>
                <div className="p-6">
                  {verificationResults.length > 0 ? (
                    <div className="space-y-4">
                      {verificationResults.slice(-5).reverse().map((result) => (
                        <div key={result.id} className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg hover:bg-gray-600 hover:bg-opacity-50 transition-colors border border-gray-600">
                          <div className="flex items-center space-x-4">
                            <div className={`w-3 h-3 rounded-full ${result.status === 'verified' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                            <div>
                              <p className="font-medium text-white">{result.studentName}</p>
                              <p className="text-sm text-gray-300">{result.institution} • {result.degree}</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                              result.status === 'verified' 
                                ? 'bg-green-900 bg-opacity-50 text-green-300 border border-green-700 border-opacity-50' 
                                : 'bg-red-900 bg-opacity-50 text-red-300 border border-red-700 border-opacity-50'
                            }`}>
                              {result.status === 'verified' ? 'Verified' : 'Fraud'}
                            </span>
                            <span className="text-sm text-gray-400">{result.confidence}%</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <FileText className="mx-auto h-16 w-16 text-gray-500 mb-4" />
                      <p className="text-gray-400 text-lg">No certificates processed yet</p>
                      <p className="text-gray-500 text-sm">Upload certificates to get started</p>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}

          {activeTab === 'upload' && (
            <div className="space-y-6">
              {/* Upload Method Selection */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-blue-900 bg-opacity-50 to-indigo-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Upload Method
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Choose how you want to upload certificates</p>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <button
                      onClick={() => setUploadMethod('file')}
                      className={`p-6 border-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
                        uploadMethod === 'file'
                          ? 'border-blue-500 bg-blue-900 bg-opacity-30 shadow-md'
                          : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700 hover:bg-opacity-50'
                      }`}
                    >
                      <FileText className={`w-12 h-12 ${uploadMethod === 'file' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className={`font-medium ${uploadMethod === 'file' ? 'text-blue-300' : 'text-gray-300'}`}>
                        File Upload
                      </span>
                      <span className="text-sm text-gray-400 text-center">
                        Upload PDF, PNG, JPG files from your device
                      </span>
                    </button>

                    <button
                      onClick={() => setUploadMethod('camera')}
                      className={`p-6 border-2 rounded-xl transition-all duration-300 flex flex-col items-center justify-center space-y-3 ${
                        uploadMethod === 'camera'
                          ? 'border-blue-500 bg-blue-900 bg-opacity-30 shadow-md'
                          : 'border-gray-600 hover:border-blue-400 hover:bg-gray-700 hover:bg-opacity-50'
                      }`}
                    >
                      <Camera className={`w-12 h-12 ${uploadMethod === 'camera' ? 'text-blue-400' : 'text-gray-400'}`} />
                      <span className={`font-medium ${uploadMethod === 'camera' ? 'text-blue-300' : 'text-gray-300'}`}>
                        Camera Capture
                      </span>
                      <span className="text-sm text-gray-400 text-center">
                        Use your camera to capture certificate photos
                      </span>
                    </button>
                  </div>

                  {/* File Upload Section */}
                  {uploadMethod === 'file' && (
                    <div className="border-2 border-dashed border-blue-500 border-opacity-50 rounded-xl p-8 hover:border-blue-400 transition-colors bg-gray-700 bg-opacity-30">
                      <div className="text-center">
                        <FileText className="mx-auto h-16 w-16 text-blue-400 mb-4" />
                        <div>
                          <label htmlFor="bulk-upload" className="cursor-pointer">
                            <span className="text-lg font-medium text-white block">
                              Drop your certificates here, or click to browse
                            </span>
                            <span className="text-sm text-gray-300 mt-1 block">
                              Supports PDF, PNG, JPG files up to 10MB each
                            </span>
                          </label>
                          <input
                            id="bulk-upload"
                            type="file"
                            accept=".pdf,.png,.jpg,.jpeg"
                            multiple
                            onChange={handleFileUpload}
                            className="sr-only"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Camera Capture Section */}
                  {uploadMethod === 'camera' && (
                    <div className="space-y-4">
                      {!cameraActive && !capturedImage && (
                        <div className="border-2 border-dashed border-blue-500 border-opacity-50 rounded-xl p-8 text-center bg-gray-700 bg-opacity-30">
                          <Camera className="mx-auto h-16 w-16 text-blue-400 mb-4" />
                          <h4 className="text-lg font-medium text-white mb-2">Capture Certificate</h4>
                          <p className="text-sm text-gray-300 mb-4">Use your camera to take a photo of the certificate</p>
                          <button
                            onClick={startCamera}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors flex items-center space-x-2 mx-auto"
                          >
                            <Camera className="w-5 h-5" />
                            <span>Start Camera</span>
                          </button>
                        </div>
                      )}

                      {cameraActive && (
                        <div className="border-2 border-blue-500 border-opacity-50 rounded-xl overflow-hidden bg-gray-800">
                          <div className="bg-gray-900 p-4 flex justify-between items-center">
                            <span className="text-white text-sm">Camera Active - Position certificate in frame</span>
                            <button
                              onClick={stopCamera}
                              className="text-white hover:text-gray-300 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            className="w-full h-64 object-cover"
                          />
                          <div className="p-4 bg-gray-700 border-t border-gray-600">
                            <button
                              onClick={captureImage}
                              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                            >
                              <Camera className="w-5 h-5" />
                              <span>Capture Certificate</span>
                            </button>
                          </div>
                        </div>
                      )}

                      {capturedImage && (
                        <div className="border-2 border-green-500 border-opacity-50 rounded-xl overflow-hidden bg-gray-800">
                          <div className="bg-green-900 bg-opacity-30 p-4 flex justify-between items-center">
                            <span className="text-green-300 text-sm font-medium">Certificate Captured Successfully</span>
                            <button
                              onClick={() => {
                                setCapturedImage(null);
                                setUploadFiles(prev => prev.filter(file => !file.name.startsWith('captured-certificate')));
                              }}
                              className="text-green-400 hover:text-green-300 transition-colors"
                            >
                              <X className="w-5 h-5" />
                            </button>
                          </div>
                          <img
                            src={capturedImage}
                            alt="Captured certificate"
                            className="w-full h-64 object-contain bg-gray-700"
                          />
                        </div>
                      )}
                    </div>
                  )}

                  {/* Selected Files Preview */}
                  {uploadFiles.length > 0 && (
                    <div className="mt-6 p-4 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700 border-opacity-50">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-blue-200 flex items-center">
                          <FileText className="w-4 h-4 mr-2" />
                          Selected Files ({uploadFiles.length})
                        </h4>
                        <button
                          onClick={() => {
                            setUploadFiles([]);
                            setCapturedImage(null);
                          }}
                          className="text-blue-400 hover:text-blue-300 text-sm font-medium flex items-center transition-colors"
                        >
                          <X className="w-4 h-4 mr-1" />
                          Clear All
                        </button>
                      </div>
                      <div className="space-y-2 max-h-40 overflow-y-auto">
                        {uploadFiles.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-3 bg-gray-700 rounded-lg border border-gray-600">
                            <div className="flex items-center space-x-3">
                              {file.type.startsWith('image/') ? (
                                <Image className="w-5 h-5 text-blue-400" />
                              ) : (
                                <FileText className="w-5 h-5 text-blue-400" />
                              )}
                              <div>
                                <span className="text-sm font-medium text-white block">{file.name}</span>
                                <span className="text-xs text-gray-400">{(file.size / 1024).toFixed(1)} KB</span>
                              </div>
                            </div>
                            <button
                              onClick={() => removeFile(index)}
                              className="text-gray-400 hover:text-red-400 transition-colors"
                            >
                              <X className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4">
                        <button 
                          onClick={processCertificates}
                          disabled={isProcessing}
                          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white py-3 rounded-lg font-medium transition-colors flex items-center justify-center space-x-2"
                        >
                          {isProcessing ? (
                            <>
                              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                              <span>Processing Certificates...</span>
                            </>
                          ) : (
                            <>
                              <CheckCircle className="w-5 h-5" />
                              <span>Verify {uploadFiles.length} Certificate{uploadFiles.length !== 1 ? 's' : ''}</span>
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Results Section */}
              {verificationResults.length > 0 && (
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                  <div className="bg-gradient-to-r from-green-900 bg-opacity-50 to-emerald-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                    <h3 className="text-lg font-semibold text-white flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2" />
                      Verification Results
                    </h3>
                  </div>
                  <div className="p-6">
                    <div className="overflow-x-auto">
                      <table className="min-w-full divide-y divide-gray-700">
                        <thead className="bg-gray-700 bg-opacity-50">
                          <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Student</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Institution</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Degree</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Status</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider">Confidence</th>
                          </tr>
                        </thead>
                        <tbody className="bg-gray-800 bg-opacity-50 divide-y divide-gray-700">
                          {verificationResults.map((result) => (
                            <tr key={result.id} className="hover:bg-gray-700 hover:bg-opacity-50 transition-colors">
                              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-white">
                                {result.studentName}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {result.institution}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {result.degree}
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap">
                                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                                  result.status === 'verified' 
                                    ? 'bg-green-900 bg-opacity-50 text-green-300 border border-green-700 border-opacity-50' 
                                    : 'bg-red-900 bg-opacity-50 text-red-300 border border-red-700 border-opacity-50'
                                }`}>
                                  {result.status === 'verified' ? (
                                    <>
                                      <CheckCircle className="w-3 h-3 mr-1" />
                                      Verified
                                    </>
                                  ) : (
                                    <>
                                      <AlertCircle className="w-3 h-3 mr-1" />
                                      Fraud
                                    </>
                                  )}
                                </span>
                              </td>
                              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-300">
                                {result.confidence}%
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'reports' && (
            <div className="space-y-6">
              {/* Report Overview */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-700">
                  <PieChart
                    title="Verification Status Distribution"
                    data={[
                      { name: 'Verified', value: stats.totalVerified, color: '#10B981' },
                      { name: 'Fraud Detected', value: stats.totalFraud, color: '#EF4444' }
                    ]}
                  />
                </div>
                
                <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl p-6 border border-gray-700">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center">
                    <FileText className="w-5 h-5 mr-2" />
                    Summary Statistics
                  </h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-900 bg-opacity-30 rounded-lg border border-blue-700 border-opacity-50">
                      <span className="text-sm font-medium text-blue-300">Total Processed</span>
                      <span className="text-2xl font-bold text-blue-400">{stats.totalProcessed}</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-900 bg-opacity-30 rounded-lg border border-green-700 border-opacity-50">
                      <span className="text-sm font-medium text-green-300">Success Rate</span>
                      <span className="text-2xl font-bold text-green-400">
                        {stats.totalProcessed > 0 ? ((stats.totalVerified / stats.totalProcessed) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-red-900 bg-opacity-30 rounded-lg border border-red-700 border-opacity-50">
                      <span className="text-sm font-medium text-red-300">Fraud Rate</span>
                      <span className="text-2xl font-bold text-red-400">
                        {stats.totalProcessed > 0 ? ((stats.totalFraud / stats.totalProcessed) * 100).toFixed(1) : 0}%
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Download Report */}
              <div className="bg-gray-800 bg-opacity-80 backdrop-blur-sm shadow-2xl rounded-xl overflow-hidden border border-gray-700">
                <div className="bg-gradient-to-r from-purple-900 bg-opacity-50 to-indigo-900 bg-opacity-50 px-6 py-4 border-b border-gray-600">
                  <h3 className="text-lg font-semibold text-white flex items-center">
                    <Upload className="w-5 h-5 mr-2" />
                    Download Verification Report
                  </h3>
                  <p className="text-sm text-gray-300 mt-1">Export detailed verification data and analytics</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between p-4 bg-gray-700 bg-opacity-50 rounded-lg border border-gray-600">
                    <div>
                      <h4 className="font-medium text-white">Complete Verification Report</h4>
                      <p className="text-sm text-gray-300">Includes all verification results, statistics, and analytics</p>
                    </div>
                    <button
                      onClick={downloadReport}
                      className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2"
                    >
                      <Upload className="w-5 h-5" />
                      <span>Download Report</span>
                    </button>
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

export default UserDashboard;