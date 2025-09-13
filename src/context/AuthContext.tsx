import React, { createContext, useEffect, useState } from 'react';
import EncryptedStorage from 'react-native-encrypted-storage';
import { login as loginService } from '../services/authService';

interface AuthContextProps {
  token: string | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

export const AuthContext = createContext<AuthContextProps>({
  token: null,
  login: async () => false,
  logout: () => {},
  isLoading: true,
});

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const login = async (email: string, password: string): Promise<boolean> => {
    const result = await loginService(email, password);
    if (result?.token) {
      await EncryptedStorage.setItem('jwt_token', result.token);
      setToken(result.token);
      return true;
    }
    return false;
  };

  const logout = async () => {
    await EncryptedStorage.removeItem('jwt_token');
    setToken(null);
  };

  const checkToken = async () => {
    const storedToken = await EncryptedStorage.getItem('jwt_token');
    if (storedToken) setToken(storedToken);
    setIsLoading(false);
  };

  useEffect(() => {
    checkToken();
  }, []);

  return (
    <AuthContext.Provider value={{ token, login, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};