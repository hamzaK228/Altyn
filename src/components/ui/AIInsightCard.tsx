import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, X, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';
import { cn } from '@/lib/utils';
import { aiAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';

export const AIInsightCard = () => {
  const { currentPage, navigateTo } = useNavigation();
  const [isVisible, setIsVisible] = useState(true);
  const [insight, setInsight] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    if (currentPage !== 'dashboard') return;
    const fetchInsight = async () => {
      try {
        const res = await aiAPI.getInsights();
        if (res.data && res.data.length > 0) {
          setInsight(res.data[0]);
        }
      } catch (err) {
        console.error('Insight fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchInsight();
  }, [currentPage]);

  if (!isVisible || loading || !insight) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, y: -20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="mb-8 relative overflow-hidden"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-altyn/20 via-altyn/5 to-transparent rounded-3xl" />
        
        <div className="relative bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-xl border border-altyn/20 rounded-3xl p-6 shadow-gold-glow flex flex-col md:flex-row gap-6 items-start md:items-center">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-altyn to-altyn-light text-white flex items-center justify-center shrink-0 shadow-lg">
            <Lightbulb size={24} className="animate-pulse" />
          </div>
          
          <div className="flex-1">
            <h3 className="text-lg font-bold flex items-center gap-2 dark:text-white">
              Altyn AI Инсайт
              <span className="px-2 py-0.5 rounded-full bg-altyn/10 text-altyn text-[10px] uppercase tracking-wider">Новое</span>
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
              {insight.text}
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
            {insight.action && (
              <button 
                onClick={() => navigateTo(insight.action === 'buy' ? 'transfers' : 'dca')}
                className="gold-button !py-2.5 !px-5 text-sm flex items-center justify-center gap-2 group"
              >
                {insight.actionLabel || 'Начать'}
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </button>
            )}
            <button 
              onClick={() => setIsVisible(false)}
              className="px-5 py-2.5 rounded-xl border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors text-sm font-medium text-gray-600 dark:text-gray-300"
            >
              Скрыть
            </button>
          </div>

          <button 
            onClick={() => setIsVisible(false)}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 dark:hover:text-white transition-colors"
          >
            <X size={16} />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
