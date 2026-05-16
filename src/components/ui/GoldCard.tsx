import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface GoldCardProps {
  children: React.ReactNode;
  className?: string;
  variant?: 'default' | 'gold' | 'glass';
  delay?: number;
}

export const GoldCard: React.FC<GoldCardProps> = ({ 
  children, 
  className, 
  variant = 'default',
  delay = 0 
}) => {
  const variants = {
    default: "bg-white dark:bg-background-secondary border-gray-200 dark:border-white/5 transition-colors duration-300 shadow-xl",
    gold: "bg-gold-gradient dark:bg-[radial-gradient(circle_at_top_left,rgba(184,134,11,0.2),rgba(184,134,11,0.05))] backdrop-blur-2xl border border-altyn/40 dark:border-altyn/30 transition-all duration-500 shadow-gold-glow",
    glass: "bg-white/40 dark:bg-white/[0.03] backdrop-blur-3xl border border-gray-200/50 dark:border-white/10 transition-all duration-500 shadow-premium",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: delay }}
      whileHover={{ y: -4, transition: { duration: 0.2 } }}
      className={cn(
        "rounded-2xl p-6 border transition-all shadow-lg",
        variants[variant],
        className
      )}
    >
      {children}
    </motion.div>
  );
};
