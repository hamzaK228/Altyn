import React from 'react';
import { LandingPage } from './pages/LandingPage';
import { Dashboard } from './pages/Dashboard';
import { MarketData } from './pages/MarketData';
import { Transfers } from './pages/Transfers';
import { StateReserves } from './pages/StateReserves';
import { SupportCenter } from './pages/SupportCenter';
import { SettingsPage } from './pages/SettingsPage';
import { SavingsGoals } from './pages/SavingsGoals';
import { DCAPage } from './pages/DCA';
import { WithdrawGold } from './pages/WithdrawGold';
import { RegistrationForm } from './components/auth/RegistrationForm';
import { ThemeProvider } from './lib/ThemeContext';
import { CurrencyProvider } from './lib/CurrencyContext';
import { Sidebar } from './components/ui/Sidebar';
import { NavigationProvider, useNavigation } from './lib/NavigationContext';
import { AIChatWidget } from './components/ui/AIChatWidget';

function AppContent() {
  const { currentPage } = useNavigation();

  const renderPage = () => {
    switch (currentPage) {
      case 'landing': return <LandingPage />;
      case 'auth': return <RegistrationForm />;
      case 'dashboard': return <Dashboard />;
      case 'market': return <MarketData />;
      case 'transfers': return <Transfers />;
      case 'reserves': return <StateReserves />;
      case 'support': return <SupportCenter />;
      case 'settings': return <SettingsPage />;
      case 'goals': return <SavingsGoals />;
      case 'dca': return <DCAPage />;
      case 'withdraw': return <WithdrawGold />;
      default: return <LandingPage />;
    }
  };

  const isFullPage = currentPage === 'landing' || currentPage === 'auth';

  return (
    <ThemeProvider>
      <CurrencyProvider>
        {isFullPage ? (
          renderPage()
        ) : (
          <div className="flex min-h-screen bg-white dark:bg-background-primary text-slate-900 dark:text-white transition-colors duration-300">
            <Sidebar />
            <main className="flex-1 relative overflow-y-auto h-screen">
               {renderPage()}
            </main>
            <AIChatWidget />
          </div>
        )}
      </CurrencyProvider>
    </ThemeProvider>
  );
}

function App() {
  return (
    <NavigationProvider>
      <AppContent />
    </NavigationProvider>
  );
}

export default App;
