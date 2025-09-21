'use client';

import {
  GoogleAuthProvider,
  User,
  getAuth,
  onAuthStateChanged,
  signInWithRedirect,
  getRedirectResult,
  signOut,
} from 'firebase/auth';
import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from 'react';
import { app } from '@/lib/firebase';
import { useToast } from './use-toast';

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
  const auth = getAuth(app);
  const { toast } = useToast();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { displayName, email, photoURL } = user;
        if (displayName && email && photoURL) {
          setUser({
            name: displayName,
            email: email,
            photoURL: photoURL,
          });
        }
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  // Handle redirect result on component mount
  useEffect(() => {
    getRedirectResult(auth)
      .then((result) => {
        if (result) {
          // User has successfully signed in.
          toast({
            title: 'Signed In',
            description: `Welcome back, ${result.user.displayName}!`,
          });
        }
      })
      .catch((error) => {
        console.error('Redirect sign-in failed:', error);
        toast({
          variant: 'destructive',
          title: 'Sign In Failed',
          description: 'Could not sign in with Google. Please try again.',
        });
      })
      .finally(() => setLoading(false));
  }, [auth, toast]);

  const login = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      await signInWithRedirect(auth, provider);
    } catch (error) {
      console.error('Login failed:', error);
      setUser(null);
      setLoading(false);
      toast({
        variant: 'destructive',
        title: 'Sign In Failed',
        description: 'Could not start the sign-in process. Please try again.',
      });
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
    } finally {
      setLoading(false);
    }
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
