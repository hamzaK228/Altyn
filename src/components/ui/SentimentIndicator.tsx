import React from 'react';
import { motion } from 'framer-motion';
import { Newspaper, Rss } from 'lucide-react';
import { cn } from '@/lib/utils';

interface SentimentIndicatorProps {
  className?: string;
}

export const SentimentIndicator = ({ className }: SentimentIndicatorProps) => {
  const score = 68; // 0 to 100
  const angle = (score / 100) * 180 - 90; // Map 0-100 to -90 to 90 degrees

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn("bg-white dark:bg-[#0a0a0f] border border-gray-100 dark:border-white/5 rounded-3xl p-6 shadow-sm", className)}
    >
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="font-bold text-lg dark:text-white flex items-center gap-2">
            <Rss className="text-altyn" size={20} /> Индекс настроений
          </h3>
          <p className="text-xs text-gray-500 mt-1">Анализ 5,000+ новостей за 24 часа</p>
        </div>
      </div>

      <div className="relative flex flex-col items-center mb-8">
        {/* Semi-circle Gauge */}
        <div className="relative w-48 h-24 overflow-hidden">
          {/* Background Track */}
          <div className="absolute w-48 h-48 rounded-full border-[16px] border-gray-100 dark:border-white/5" />
          
          {/* Gradient Fill - Masked */}
          <div 
            className="absolute w-48 h-48 rounded-full border-[16px] border-transparent"
            style={{
              borderTopColor: '#ef4444', // Red
              borderRightColor: '#eab308', // Yellow
              borderBottomColor: '#22c55e', // Green
              borderLeftColor: '#ef4444', // Red
              transform: 'rotate(-45deg)',
              clipPath: 'polygon(0 0, 100% 0, 100% 50%, 0 50%)'
            }}
          />

          {/* Needle */}
          <motion.div 
            initial={{ rotate: -90 }}
            animate={{ rotate: angle }}
            transition={{ type: "spring", stiffness: 50, damping: 15, delay: 0.5 }}
            className="absolute bottom-0 left-1/2 w-1 h-20 bg-slate-800 dark:bg-white origin-bottom rounded-full z-10"
            style={{ x: '-50%', y: '50%' }}
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-slate-800 dark:bg-white rounded-full shadow-md" />
          </motion.div>
          
          {/* Center Pin */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-6 h-6 bg-white dark:bg-[#0a0a0f] border-4 border-slate-800 dark:border-white rounded-full z-20" />
        </div>
        
        <div className="mt-4 text-center">
          <div className="text-3xl font-bold dark:text-white">{score}</div>
          <div className="text-sm font-semibold text-green-500 uppercase tracking-wider mt-1">Жадность</div>
        </div>
      </div>

      <div>
        <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400 mb-3 flex items-center gap-2">
          <Newspaper size={14} /> Последние сигналы
        </h4>
        <div className="space-y-3">
          {[
            { text: 'Золото привлекает инвесторов как защитный актив', sentiment: 'positive', time: '1ч назад' },
            { text: 'Аналитики предсказывают рост цен до $2,500', sentiment: 'positive', time: '3ч назад' },
            { text: 'Рост доходности гособлигаций оказывает давление', sentiment: 'negative', time: '5ч назад' }
          ].map((news, i) => (
            <div key={i} className="flex flex-col gap-1 pb-3 border-b border-gray-100 dark:border-white/5 last:border-0 last:pb-0">
              <div className="flex justify-between items-start gap-4">
                <p className="text-sm text-gray-700 dark:text-gray-300 leading-snug">{news.text}</p>
                <span className={cn(
                  "shrink-0 w-2 h-2 rounded-full mt-1.5",
                  news.sentiment === 'positive' ? "bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.5)]" : 
                  news.sentiment === 'negative' ? "bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" : "bg-gray-300"
                )} />
              </div>
              <span className="text-[10px] text-gray-400">{news.time}</span>
            </div>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
