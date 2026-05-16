import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, TrendingDown, ArrowRight, Activity, BrainCircuit } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MarketForecastCardProps {
  className?: string;
}

export const MarketForecastCard = ({ className }: MarketForecastCardProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white dark:bg-[#0a0a0f] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm relative overflow-hidden group", className)}
    >
      <div className="absolute top-0 right-0 w-64 h-64 bg-altyn/5 rounded-full blur-3xl -mr-20 -mt-20 group-hover:bg-altyn/10 transition-colors duration-500 pointer-events-none" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-altyn/10 text-altyn flex items-center justify-center">
            <BrainCircuit size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg dark:text-white">Altyn AI Прогноз</h3>
            <p className="text-xs text-gray-500">На основе 10-летних данных</p>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-50 dark:bg-green-500/10 text-green-600 rounded-full text-xs font-semibold">
          <TrendingUp size={14} />
          Бычий тренд
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6 relative z-10">
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <p className="text-xs text-gray-500 mb-1">Прогноз на 30 дней</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold dark:text-white">9,450</span>
            <span className="text-sm text-gray-500 mb-1 font-medium">KGS</span>
          </div>
          <p className="text-xs text-green-500 mt-1 flex items-center gap-1">
            <ArrowRight size={12} className="-rotate-45" /> +2.5% потенциал
          </p>
        </div>
        
        <div className="p-4 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5">
          <p className="text-xs text-gray-500 mb-1">Вероятность</p>
          <div className="flex items-end gap-2">
            <span className="text-2xl font-bold dark:text-white">78%</span>
          </div>
          <div className="w-full h-1.5 bg-gray-200 dark:bg-white/10 rounded-full mt-2.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '78%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full bg-altyn"
            />
          </div>
        </div>
      </div>

      <div className="relative z-10">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
          <Activity size={14} /> Ключевые факторы
        </h4>
        <ul className="space-y-3">
          {[
            { text: 'Ожидаемое снижение ставки ФРС в следующем месяце', positive: true },
            { text: 'Рекордные закупки золота Центральными банками', positive: true },
            { text: 'Укрепление доллара на фоне данных по занятости', positive: false }
          ].map((factor, i) => (
            <li key={i} className="flex gap-3 text-sm text-gray-700 dark:text-gray-300 items-start">
              <span className={cn(
                "mt-0.5 shrink-0",
                factor.positive ? "text-green-500" : "text-red-500"
              )}>
                {factor.positive ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              </span>
              <span className="leading-snug">{factor.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};
