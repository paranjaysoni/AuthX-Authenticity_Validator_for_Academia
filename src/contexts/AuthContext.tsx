import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, AuthContextType } from '../types';

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Demo credentials
const DEMO_CREDENTIALS = {
  university: { username: 'admin@university.edu', password: 'admin123', role: 'university' as const },
  user: { username: 'hr@company.com', password: 'hr123', role: 'user' as const },
  government: { username: 'gov@ministry.gov', password: 'gov123', role: 'government' as const }
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Check for stored user session
    const storedUser = localStorage.getItem('authx_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check demo credentials
    const credentials = Object.values(DEMO_CREDENTIALS).find(
      cred => cred.username === username && cred.password === password
    );
    
    if (credentials) {
      const userData: User = {
        id: Math.random().toString(36).substr(2, 9),
        username: credentials.username,
        email: credentials.username,
        role: credentials.role,
        name: credentials.role === 'university' ? 'University Admin' : 
              credentials.role === 'user' ? 'HR Manager' : 'Government Official',
        institution: credentials.role === 'university' ? 'Tech University' : 
                    credentials.role === 'user' ? 'Tech Corp' : 'Ministry of Education'
      };
      
      setUser(userData);
      localStorage.setItem('authx_user', JSON.stringify(userData));
      setIsLoading(false);
      return true;
    }
    
    setIsLoading(false);
    return false;
  };

  const register = async (userData: any): Promise<boolean> => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Create new user
    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      username: userData.email,
      email: userData.email,
      role: userData.userType,
      name: userData.name,
      institution: userData.institution || 'N/A'
    };
    
    setUser(newUser);
    localStorage.setItem('authx_user', JSON.stringify(newUser));
    setIsLoading(false);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('authx_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

