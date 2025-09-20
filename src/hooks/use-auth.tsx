'use client';

import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

export interface AuthUser {
  name: string;
  email: string;
  photoURL: string;
}

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  login: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    try {
      const storedUser = localStorage.getItem('legalease-user');
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    } catch (error) {
      console.error('Failed to parse user from localStorage', error);
      localStorage.removeItem('legalease-user');
    }
    setLoading(false);
  }, []);

  const login = () => {
    const dummyUser: AuthUser = {
      name: 'Alex Doe',
      email: 'alex.doe@example.com',
      photoURL: 'https://picsum.photos/seed/user/100/100',
    };
    localStorage.setItem('legalease-user', JSON.stringify(dummyUser));
    setUser(dummyUser);
  };

  const logout = () => {
    localStorage.removeItem('legalease-user');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
