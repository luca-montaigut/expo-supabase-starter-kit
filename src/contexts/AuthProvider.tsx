import React, { useState, useContext, createContext, useEffect } from 'react';
import { Alert } from 'react-native';
import { ApiError } from '@supabase/supabase-js';
import { supabase } from 'src/services/supabaseClient';
import { getUserProfile } from 'src/queries/users';
import type { UserProfile } from 'src/queries/users';

interface AuthContextProps {
  currentUser: UserProfile | null;
  loading: boolean;
  registerWithEmailAndPassword: (
    email: string,
    password: string,
  ) => Promise<void>;
  loginWithEmailAndPassword: (email: string, password: string) => Promise<void>;
  updateCurrentUser: (
    fields: Partial<Omit<UserProfile, 'id' | 'email'>>,
  ) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setUserInitialState();
    })();

    const { data: authListener } = supabase.auth.onAuthStateChange(
      async (_event, currentSession) => {
        if (currentSession && currentSession.user) {
          const user = await getUserProfile(currentSession.user.id);
          setCurrentUser(user);
        } else {
          setCurrentUser(null);
        }
        setLoading(false);
      },
    );
    return () => {
      authListener!.unsubscribe();
    };
  }, []);

  const setUserInitialState = async () => {
    setLoading(true);
    const user = supabase.auth.user();
    if (supabase.auth.session() && user !== null) {
      const profile = await getUserProfile(user.id);
      setCurrentUser(profile);
    } else {
      setCurrentUser(null);
    }
    setLoading(false);
  };

  const updateCurrentUser = async (
    fields: Partial<Omit<UserProfile, 'id' | 'email'>>,
  ) => {
    // @ts-ignore
    setCurrentUser(prevUser => ({ ...prevUser, ...fields }));
  };

  const signWrapper = async (
    func: (args: any) => Promise<{ error: ApiError | null }>,
    funcArgs: {} | undefined = undefined,
  ) => {
    try {
      const { error } = await func(funcArgs);
      if (error) throw new Error(`Error ${error.status}: ${error.message}`);
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert('An error occured', error.message);
      }
      console.error(error);
    }
  };

  const registerWithEmailAndPassword = async (
    email: string,
    password: string,
  ) => {
    setLoading(true);
    signWrapper(supabase.auth.signUp.bind(supabase.auth), {
      email,
      password,
    });
  };

  const loginWithEmailAndPassword = async (email: string, password: string) => {
    setLoading(true);
    signWrapper(supabase.auth.signIn.bind(supabase.auth), {
      email,
      password,
    });
  };

  const logout = async () => {
    setLoading(true);
    signWrapper(supabase.auth.signOut.bind(supabase.auth));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        loading,
        registerWithEmailAndPassword,
        loginWithEmailAndPassword,
        updateCurrentUser,
        logout,
      }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextProps => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
};

export const useCurrentUser = (): UserProfile => {
  const { currentUser } = useAuth();

  if (!currentUser) {
    throw new Error('useCurrentUser must be used in an authenticated screen');
  }

  return currentUser;
};
