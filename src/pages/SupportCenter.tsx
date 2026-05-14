import React from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { Search, MessageSquare, Phone, Mail, HelpCircle, FileText, Shield } from 'lucide-react';

export const SupportCenter = () => {
  return (
    <div className="flex min-h-screen bg-background-primary">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
        <header className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Центр поддержки</h2>
          <p className="text-gray-400 mb-8 text-lg">Как мы можем помочь вам сегодня?</p>
          
          <div className="relative group max-w-2xl mx-auto">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-altyn-light transition-colors" size={20} />
            <input 
              type="text" 
              placeholder="Поиск по базе знаний (например: как купить золото?)"
              className="w-full bg-background-secondary border border-border rounded-2xl px-16 py-5 text-white focus:border-altyn-light transition-all outline-none shadow-2xl"
            />
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {[
            { icon: MessageSquare, title: 'Онлайн чат', desc: 'Среднее время ответа: 2 мин', action: 'Начать чат' },
            { icon: Phone, title: 'Горячая линия', desc: '+996 (312) 123 456', action: 'Позвонить' },
            { icon: Mail, title: 'Email поддержка', desc: 'support@altyn.kg', action: 'Написать' },
          ].map((item, i) => (
            <GoldCard key={i} delay={i * 0.1} className="p-8 text-center flex flex-col items-center">
              <div className="w-16 h-16 bg-altyn/10 rounded-2xl flex items-center justify-center border border-altyn/20 mb-6">
                <item.icon className="text-altyn-light" size={32} />
              </div>
              <h4 className="text-xl font-bold mb-2">{item.title}</h4>
              <p className="text-sm text-gray-500 mb-8">{item.desc}</p>
              <button className="outline-button w-full !py-3 !text-sm">{item.action}</button>
            </GoldCard>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div>
            <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <HelpCircle className="text-altyn-light" /> Популярные вопросы
            </h4>
            <div className="space-y-4">
              {[
                'Как пройти идентификацию через мобильное приложение?',
                'Где физически хранится мое золото?',
                'Какие налоги нужно платить при продаже золота?',
                'Можно ли забрать золото в виде слитков в банке?',
                'Что такое стандарт Good Delivery?',
              ].map((q, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 + i * 0.05 }}
                  className="p-5 bg-background-secondary border border-border rounded-xl hover:border-altyn/30 transition-all cursor-pointer group flex justify-between items-center"
                >
                  <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{q}</span>
                  <span className="text-gray-600 group-hover:text-altyn-light transition-all">→</span>
                </motion.div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <FileText className="text-altyn-light" /> База знаний
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {[
                { title: 'Руководство инвестора', items: 12 },
                { title: 'Юридические документы', items: 8 },
                { title: 'Безопасность и хранение', items: 15 },
                { title: 'Тарифы и комиссии', items: 5 },
              ].map((cat, i) => (
                <GoldCard key={i} variant="glass" className="p-6 cursor-pointer hover:bg-white/[0.05] transition-all">
                  <h5 className="font-bold text-white mb-1">{cat.title}</h5>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest">{cat.items} статей</p>
                </GoldCard>
              ))}
            </div>
            
            <GoldCard variant="gold" className="mt-8 p-8 relative overflow-hidden">
              <div className="relative z-10">
                <h4 className="text-xl font-bold mb-2 text-white">Инструкция по безопасности</h4>
                <p className="text-sm text-altyn-pale/70 mb-6 leading-relaxed">
                  Узнайте, как защитить свой аккаунт и избежать мошенничества при работе с цифровыми активами.
                </p>
                <button className="bg-white text-altyn-deep px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-altyn-pale transition-colors">
                  Читать руководство
                </button>
              </div>
              <Shield className="absolute -right-4 -bottom-4 text-white/5" size={120} />
            </GoldCard>
          </div>
        </div>
      </main>
    </div>
  );
};
