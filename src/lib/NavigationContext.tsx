import React, { createContext, useContext, useState, ReactNode } from 'react';
import { clearToken } from './api';

export type Page = 'landing' | 'dashboard' | 'market' | 'transfers' | 'reserves' | 'support' | 'settings' | 'auth' | 'goals' | 'dca' | 'withdraw';

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: string;
}

interface NavigationContextType {
  currentPage: Page;
  navigateTo: (page: Page) => void;
  user: AuthUser | null;
  setUser: (user: AuthUser | null) => void;
  logout: () => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const NavigationProvider = ({ children }: { children: ReactNode }) => {
  const [currentPage, setCurrentPage] = useState<Page>('landing');
  const [user, setUser] = useState<AuthUser | null>(null);

  const navigateTo = (page: Page) => {
    window.scrollTo(0, 0);
    setCurrentPage(page);
  };

  const logout = () => {
    clearToken();
    setUser(null);
    navigateTo('landing');
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, user, setUser, logout }}>
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};
