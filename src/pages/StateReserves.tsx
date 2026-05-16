import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { Shield, Database, Landmark, TrendingUp } from 'lucide-react';
import { GeographyMap } from '@/components/ui/GeographyMap';

export const StateReserves = () => {
  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="mb-12">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="text-altyn-light" size={24} />
            <span className="text-xs font-bold text-altyn-light uppercase tracking-widest">Государственные гарантии</span>
          </div>
          <h2 className="text-4xl font-bold tracking-tight">Резервы и добыча</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-2 max-w-2xl leading-relaxed">
            Прозрачный мониторинг золотовалютных резервов Кыргызской Республики и объемов добычи.
          </p>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { label: 'Золотой запас КР', value: '560.4 т', icon: Database, color: 'text-altyn-light' },
            { label: 'Хранение в НБКР', value: '100%', icon: Landmark, color: 'text-blue-400' },
            { label: 'План добычи 2026', value: '18.5 т', icon: TrendingUp, color: 'text-green-400' },
            { label: 'Уровень покрытия', value: '124%', icon: Shield, color: 'text-purple-400' },
          ].map((item, i) => (
            <GoldCard key={i} delay={i * 0.1} className="p-6">
              <item.icon className={item.color + " mb-4"} size={24} />
              <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold mb-1">{item.label}</p>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white">{item.value}</h3>
            </GoldCard>
          ))}
        </div>

        {/* Dual Map Layout with Visible Margins */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-12">
          <div className="lg:col-span-2 space-y-12">
            
            {/* Map 1: Current */}
            <div className="space-y-6">
              <div className="flex justify-between items-end">
                <h4 className="text-xl font-bold flex items-center gap-3">
                  <span className="w-2 h-2 bg-altyn rounded-full animate-pulse" />
                  Текущая инфраструктура
                </h4>
                <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">Обновлено: Сегодня, 12:45</span>
              </div>
              <div className="p-1.5 bg-white/[0.03] rounded-[2.8rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                 <GeographyMap />
              </div>
            </div>

            {/* Map 2: Strategic (The "Paste") */}
            <div className="space-y-6">
              <h4 className="text-xl font-bold flex items-center gap-3">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                Стратегическое расширение 2026-2030
              </h4>
              <div className="p-1.5 bg-white/[0.03] rounded-[2.8rem] border border-white/10 shadow-2xl backdrop-blur-sm">
                 <GeographyMap />
              </div>
            </div>
          </div>

          {/* Side Panels */}
          <div className="space-y-8">
            <GoldCard variant="gold" className="p-8">
              <h4 className="text-lg font-bold mb-4">Стандарт качества</h4>
              <p className="text-sm text-altyn-pale/70 leading-relaxed mb-6">
                Все золото платформы соответствует мировому стандарту **Good Delivery** (LBMA).
              </p>
              <div className="p-4 bg-white/10 rounded-xl border border-white/10 flex items-center gap-4">
                <div className="text-2xl font-bold text-white">999.9</div>
                <div className="text-[10px] text-white/70 uppercase tracking-tighter leading-tight">
                  Проба чистоты <br /> государственного золота
                </div>
              </div>
            </GoldCard>

            <GoldCard className="p-8">
              <h4 className="text-lg font-bold mb-4">Аудит резервов</h4>
              <p className="text-xs text-gray-500 leading-relaxed mb-6">
                Ежеквартальный независимый аудит проводится международными компаниями для обеспечения 100% соответствия.
              </p>
              <button className="w-full py-4 bg-gray-50 dark:bg-background-tertiary border border-gray-100 dark:border-white/5 rounded-xl text-xs font-bold text-gray-400 hover:text-slate-900 dark:hover:text-white hover:border-gray-300 dark:hover:border-white/20 transition-all">
                Скачать отчет 2026 Q1
              </button>
            </GoldCard>

            <div className="p-6 bg-blue-500/5 rounded-3xl border border-blue-500/10">
               <h5 className="text-sm font-bold text-blue-400 mb-2">Системный статус</h5>
               <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Связь с НБКР: Активна</span>
               </div>
            </div>
          </div>
        </div>
    </div>
  );
};
