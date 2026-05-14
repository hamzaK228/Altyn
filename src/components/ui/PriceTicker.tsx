import React from 'react';
import { motion } from 'framer-motion';

export const PriceTicker = () => {
  const prices = [
    { label: 'Золото (г)', price: '3 840 сом', change: '+1.2%' },
    { label: 'Серебро (г)', price: '42 сом', change: '-0.4%' },
    { label: 'USD/KGS', price: '89.45', change: '+0.1%' },
    { label: 'BTC/USD', price: '$64,230', change: '+2.5%' },
  ];

  return (
    <div className="bg-altyn-dark/30 border-b border-altyn/20 py-2 overflow-hidden whitespace-nowrap">
      <motion.div 
        animate={{ x: [0, -1000] }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="inline-flex gap-12"
      >
        {[...prices, ...prices, ...prices].map((item, i) => (
          <div key={i} className="flex items-center gap-3 text-xs font-medium">
            <span className="text-altyn-pale/60 uppercase tracking-wider">{item.label}</span>
            <span className="text-white">{item.price}</span>
            <span className={item.change.startsWith('+') ? 'text-green-400' : 'text-red-400'}>
              {item.change}
            </span>
          </div>
        ))}
      </motion.div>
    </div>
  );
};
