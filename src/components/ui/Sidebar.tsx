import React from 'react';
import { motion } from 'framer-motion';
import { Home, BarChart3, Wallet, Settings, Target, Clock } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoldCard } from './GoldCard';
import { useNavigation } from '@/lib/NavigationContext';
import { ThemeToggle } from './ThemeToggle';

const navItems = [
  { icon: Home, label: 'Главная', page: 'dashboard' as const },
  { icon: BarChart3, label: 'Рынок', page: 'market' as const },
  { icon: Wallet, label: 'Портфель', page: 'transfers' as const },
  { icon: Clock, label: 'Копилка', page: 'dca' as const },
  { icon: Target, label: 'Цели', page: 'goals' as const },
  { icon: Settings, label: 'Настройки', page: 'settings' as const },
];

export const Sidebar = () => {
  const { currentPage, navigateTo } = useNavigation();

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-72 border-r border-gray-200 dark:border-white/5 h-screen sticky top-0 bg-white dark:bg-background-primary flex-col p-8 transition-colors duration-300">
        <div className="flex flex-col gap-8 mb-12">
          <div className="flex items-center justify-between">
            <div 
              className="cursor-pointer group flex items-center gap-3" 
              onClick={() => navigateTo('landing')}
            >
              <div className="w-10 h-10 bg-gold-gradient rounded-xl shadow-gold-glow flex items-center justify-center shrink-0">
                <div className="w-5 h-5 border-2 border-white/30 rounded-md" />
              </div>
              <div className="flex flex-col">
                <h1 className="text-2xl font-black text-slate-900 dark:text-white tracking-tighter leading-none group-hover:text-altyn-light transition-colors">
                  Алтын
                </h1>
                <p className="text-[9px] text-gray-400 dark:text-gray-500 uppercase tracking-[0.3em] font-black mt-1">
                  Treasury
                </p>
              </div>
            </div>
            <ThemeToggle />
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-altyn/5 border border-altyn/10 flex items-center justify-between">
            <span className="text-[10px] font-black text-altyn-light uppercase tracking-widest">Status</span>
            <span className="px-2 py-0.5 rounded-md bg-gold-gradient text-[8px] font-black text-white uppercase shadow-sm">
              Gold Tier
            </span>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {navItems.map((item, i) => (
            <button
              key={item.label}
              onClick={() => navigateTo(item.page)}
              className={cn(
                "w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-sm font-bold transition-all duration-300 group",
                currentPage === item.page 
                  ? "bg-gold-gradient text-white shadow-gold-glow" 
                  : "text-gray-500 dark:text-gray-400 hover:text-slate-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5"
              )}
            >
              <div className={cn(
                "transition-transform duration-300 group-hover:scale-110",
                currentPage === item.page ? "text-white" : "text-gray-400"
              )}>
                <item.icon size={20} strokeWidth={currentPage === item.page ? 3 : 2} />
              </div>
              <span className="tracking-tight">{item.label}</span>
              {currentPage === item.page && (
                <motion.div 
                  layoutId="active-pill"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_8px_white]"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8">
          <GoldCard variant="gold" className="p-5 rounded-[2rem] border-white/10 overflow-hidden relative group">
            <div className="absolute inset-0 bg-white/5 translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative z-10">
              <p className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-black mb-1">
                Курс покупки
              </p>
              <p className="text-xl font-black text-white tracking-tighter">3 840.00 <span className="text-xs opacity-40">KGS</span></p>
              <button 
                onClick={() => navigateTo('transfers')}
                className="w-full mt-4 bg-white text-altyn-deep py-3 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-altyn-pale transition-all shadow-xl active:scale-95"
              >
                Купить
              </button>
            </div>
          </GoldCard>
        </div>
      </aside>

      {/* Mobile Bottom Bar */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-20 bg-white/80 dark:bg-background-secondary/80 backdrop-blur-2xl border-t border-gray-200 dark:border-white/5 z-[100] px-4 flex items-center justify-around transition-all duration-300">
        {navItems.map((item) => (
          <button 
            key={item.label}
            onClick={() => navigateTo(item.page)}
            className={cn(
              "flex flex-col items-center gap-1 transition-all relative py-2 px-3 rounded-xl",
              currentPage === item.page 
                ? "text-altyn-light bg-altyn/5" 
                : "text-gray-400 hover:text-gray-600 dark:hover:text-white"
            )}
          >
            <item.icon size={20} strokeWidth={currentPage === item.page ? 2.5 : 2} />
            <span className="text-[8px] font-black uppercase tracking-widest">{item.label}</span>
            {currentPage === item.page && (
              <motion.div 
                layoutId="mobile-pill"
                className="absolute -top-px left-1/2 -translate-x-1/2 w-8 h-1 bg-gold-gradient rounded-full shadow-gold-glow"
              />
            )}
          </button>
        ))}
      </nav>
    </>
  );
};
