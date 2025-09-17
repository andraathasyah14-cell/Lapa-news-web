
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { onAuthStateChanged, GoogleAuthProvider, signInWithPopup, getRedirectResult, signOut, User } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { useRouter, useSearchParams } from 'next/navigation';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  loginWithGoogle: (redirectUrl?: string) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    // Also handle redirect result on initial load
    getRedirectResult(auth)
      .then((result) => {
        if (result?.user) {
          setUser(result.user);
        }
      })
      .catch((error) => {
        console.error("Error getting redirect result:", error);
      })
      .finally(() => {
        setLoading(false);
      });

    return () => unsubscribe();
  }, []);

  const loginWithGoogle = async (redirectUrl: string = '/') => {
    const provider = new GoogleAuthProvider();
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      router.push(redirectUrl);
    } catch (error: any) {
      // Don't log an error if the user closes the popup.
      if (error.code === 'auth/popup-closed-by-user') {
        return;
      }
      console.error("Error during Google sign-in:", error);
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      // setUser(null) is handled by onAuthStateChanged
      router.push('/');
    } catch (error) {
      console.error("Error during sign-out:", error);
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, loginWithGoogle, logout }}>
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
