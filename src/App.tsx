import React, { createContext, useContext, useState, ReactNode } from 'react';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { MarketData } from './pages/MarketData';
import { Transfers } from './pages/Transfers';
import { StateReserves } from './pages/StateReserves';
import { SupportCenter } from './pages/SupportCenter';
import { SettingsPage } from './pages/SettingsPage';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { getToken, clearToken } from './lib/api';

type Page = 'landing' | 'dashboard' | 'market' | 'transfers' | 'reserves' | 'support' | 'settings' | 'auth';

interface AuthUser {
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

export const useNavigation = () => {
  const context = useContext(NavigationContext);
  if (!context) throw new Error('useNavigation must be used within a NavigationProvider');
  return context;
};

function App() {
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

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'dashboard': return <Dashboard />;
      case 'market': return <MarketData />;
      case 'transfers': return <Transfers />;
      case 'reserves': return <StateReserves />;
      case 'support': return <SupportCenter />;
      case 'settings': return <SettingsPage />;
      case 'auth': return <RegistrationForm />;
      default: return <LandingPage />;
    }
  };

  return (
    <NavigationContext.Provider value={{ currentPage, navigateTo, user, setUser, logout }}>
      <div className="relative">
        {renderPage()}
      </div>
    </NavigationContext.Provider>
  );
}

export default App;
