export interface User {
  id: string;
  username: string;
  email: string;
  role: 'university' | 'user' | 'government';
  name: string;
  institution?: string;
}

export interface AuthContextType {
  user: User | null;
  login: (username: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export interface VerificationResult {
  id: string;
  filename: string;
  status: 'verified' | 'fraud' | 'pending';
  confidence: number;
  timestamp: string;
  institution: string;
  degreeType: string;
  studentName: string;
  graduationYear: string;
}

export interface DashboardStats {
  totalVerifications: number;
  fraudDetected: number;
  verifiedCount: number;
  pendingCount: number;
  fraudRate: number;
  todayVerifications: number;
}

export interface InstitutionData {
  name: string;
  verifications: number;
  fraudRate: number;
  lastActivity: string;
}

export interface FraudTrend {
  month: string;
  fraudCount: number;
  totalCount: number;
}

