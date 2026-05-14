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
    default: "bg-background-secondary border-border",
    gold: "glass-gold border-altyn/30",
    glass: "glass border-white/10",
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
