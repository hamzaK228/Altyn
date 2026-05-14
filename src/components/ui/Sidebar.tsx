import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart3, Wallet, Settings } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoldCard } from './GoldCard';
import { useNavigation } from '@/App';

const navItems = [
  { icon: Home, label: 'Главная', page: 'dashboard' as const },
  { icon: BarChart3, label: 'Рынок', page: 'market' as const },
  { icon: Wallet, label: 'Портфель', page: 'transfers' as const },
  { icon: Settings, label: 'Настройки', page: 'settings' as const },
];

export const Sidebar = () => {
  const { currentPage, navigateTo } = useNavigation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 border-r border-border h-screen sticky top-0 bg-background-primary flex-col p-6">
      <div className="mb-10 cursor-pointer group" onClick={() => navigateTo('landing')}>
        <h1 className="text-2xl font-bold text-altyn-light tracking-tight flex items-center gap-2 group-hover:text-white transition-colors">
          <div className="w-8 h-8 bg-gold-gradient rounded-lg shadow-gold-glow" />
          Алтын
        </h1>
        <p className="text-[10px] text-altyn-light/50 uppercase tracking-[0.2em] mt-1">
          State Treasury
        </p>
      </div>

      <nav className="flex-1 space-y-2">
        {navItems.map((item, i) => (
          <motion.button
            key={item.label}
            whileHover={{ x: 4 }}
            onClick={() => navigateTo(item.page)}
            className={cn(
              "w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all",
              currentPage === item.page 
                ? "bg-altyn/10 text-altyn-light border border-altyn/20" 
                : "text-gray-400 hover:text-white hover:bg-white/5 border border-transparent"
            )}
          >
            <div className={cn(
              "w-5 h-5 flex items-center justify-center",
              currentPage === item.page ? "text-altyn-light" : "text-gray-500"
            )}>
              <item.icon size={18} />
            </div>
            {item.label}
          </motion.button>
        ))}
      </nav>

      <div className="mt-auto">
        <GoldCard variant="gold" className="p-4 rounded-xl border-altyn/10">
          <p className="text-[10px] uppercase tracking-wider text-altyn-pale/60 mb-1">
            Курс покупки
          </p>
          <p className="text-lg font-bold text-white">3 840.00 сом</p>
          <button 
            onClick={() => navigateTo('transfers')}
            className="w-full mt-3 bg-white text-altyn-deep py-2 rounded-lg text-xs font-bold hover:bg-altyn-pale transition-colors"
          >
            Купить сейчас
          </button>
        </GoldCard>
      </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-background-secondary/90 backdrop-blur-xl border-t border-white/5 z-[100] px-6 flex items-center justify-between">
        {navItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => navigateTo(item.page)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all",
              currentPage === item.page ? "text-altyn-light" : "text-gray-500"
            )}
          >
            <item.icon size={20} />
            <span className="text-[10px] font-bold uppercase tracking-wider">{item.label}</span>
          </button>
        ))}
      </nav>
    </>
  );
};
