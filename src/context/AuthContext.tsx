import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, UserRole, AppState } from '../types';

interface AuthContextType extends AppState {
  login: (role: UserRole) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AppState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Simulate auth check from local storage or session
    const savedUser = localStorage.getItem('dresstown_user');
    if (savedUser) {
      setState({
        user: JSON.parse(savedUser),
        isAuthenticated: true,
        isLoading: false,
      });
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = (role: UserRole) => {
    const mockUser: User = {
      id: '1',
      name: `Test ${role.toUpperCase()}`,
      email: `${role}@dresstown.com`,
      role: role,
    };
    localStorage.setItem('dresstown_user', JSON.stringify(mockUser));
    setState({ user: mockUser, isAuthenticated: true, isLoading: false });
  };

  const logout = () => {
    localStorage.removeItem('stitchflow_user');
    setState({ user: null, isAuthenticated: false, isLoading: false });
  };

  return (
    <AuthContext.Provider value={{ ...state, login, logout }}>
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
