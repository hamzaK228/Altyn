import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { GoldCard } from '@/components/ui/GoldCard';
import { Package, Landmark, Info, ShieldCheck } from 'lucide-react';
import { cn } from '@/lib/utils';

const GoldBarIcon = ({ size = "md" }: { size?: "sm" | "md" | "lg" }) => (
  <div className={cn(
    "bg-gold-gradient rounded-sm shadow-gold-glow border border-altyn/30 relative overflow-hidden",
    size === "sm" ? "w-8 h-4" : size === "md" ? "w-16 h-8" : "w-24 h-12"
  )}>
    <div className="absolute inset-0 bg-white/10 skew-x-12 -translate-x-1/2" />
  </div>
);

const BARS = [
  { weight: 1, label: '1 грамм', size: 'sm' as const },
  { weight: 5, label: '5 грамм', size: 'sm' as const },
  { weight: 10, label: '10 грамм', size: 'md' as const },
  { weight: 31.1, label: '1 унция', size: 'md' as const },
  { weight: 100, label: '100 грамм', size: 'lg' as const },
];

export const WithdrawGold = () => {
  const [selectedWeight, setSelectedWeight] = useState<number | null>(null);
  const [method, setMethod] = useState<'pickup' | 'delivery'>('pickup');
  const [success, setSuccess] = useState(false);

  const handleOrder = () => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      setSelectedWeight(null);
    }, 4000);
  };

  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Получение золота</h2>
        <p className="text-slate-500 dark:text-gray-400 mt-1">Обменяйте ваш цифровой баланс на физические слитки высшей пробы.</p>
      </header>

      {success ? (
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-2xl mx-auto py-20 text-center space-y-6"
        >
          <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto mb-8">
            <ShieldCheck size={40} />
          </div>
          <h3 className="text-3xl font-bold">Заявка принята!</h3>
          <p className="text-gray-500">
            Ваша заявка на получение {selectedWeight} г золота успешно создана. 
            Менеджер свяжется с вами в ближайшее время для подтверждения.
          </p>
          <button 
            onClick={() => setSuccess(false)}
            className="gold-button !py-3 !px-8"
          >
            Вернуться назад
          </button>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-altyn/10 text-altyn-light rounded-full flex items-center justify-center text-sm">1</span>
                Выберите слиток
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {BARS.map((bar) => (
                  <button
                    key={bar.weight}
                    onClick={() => setSelectedWeight(bar.weight)}
                    className={cn(
                      "p-6 rounded-3xl border-2 transition-all flex flex-col items-center justify-center gap-6 min-h-[160px]",
                      selectedWeight === bar.weight
                        ? "border-altyn-light bg-altyn/5 shadow-gold-glow"
                        : "border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-altyn/30"
                    )}
                  >
                    <GoldBarIcon size={bar.size} />
                    <div className="text-center">
                      <p className="font-bold">{bar.label}</p>
                      <p className="text-[10px] text-gray-500 uppercase tracking-widest">Проба 999.9</p>
                    </div>
                  </button>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-6 flex items-center gap-2">
                <span className="w-8 h-8 bg-altyn/10 text-altyn-light rounded-full flex items-center justify-center text-sm">2</span>
                Способ получения
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button
                  onClick={() => setMethod('pickup')}
                  className={cn(
                    "p-6 rounded-3xl border-2 transition-all flex items-start gap-4 text-left",
                    method === 'pickup'
                      ? "border-altyn-light bg-altyn/5"
                      : "border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-altyn/30"
                  )}
                >
                  <div className="p-3 bg-white dark:bg-white/10 rounded-2xl text-altyn-light">
                    <Landmark size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Самовывоз из банка</p>
                    <p className="text-xs text-gray-500 mt-1">Бесплатно в любом отделении НБКР.</p>
                  </div>
                </button>

                <button
                  onClick={() => setMethod('delivery')}
                  className={cn(
                    "p-6 rounded-3xl border-2 transition-all flex items-start gap-4 text-left",
                    method === 'delivery'
                      ? "border-altyn-light bg-altyn/5"
                      : "border-gray-100 dark:border-white/5 bg-gray-50 dark:bg-white/5 hover:border-altyn/30"
                  )}
                >
                  <div className="p-3 bg-white dark:bg-white/10 rounded-2xl text-altyn-light">
                    <Package size={24} />
                  </div>
                  <div>
                    <p className="font-bold">Бронированная доставка</p>
                    <p className="text-xs text-gray-500 mt-1">Безопасная доставка курьером до двери.</p>
                  </div>
                </button>
              </div>
            </section>
          </div>

          <div className="space-y-6">
            <GoldCard className="p-8 sticky top-10">
              <h4 className="text-lg font-bold mb-6">Ваша заявка</h4>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Вес:</span>
                  <span className="font-bold">{selectedWeight ? `${selectedWeight} г` : 'Не выбран'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Способ:</span>
                  <span className="font-bold">{method === 'pickup' ? 'Самовывоз' : 'Доставка'}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-500">Комиссия за выдачу:</span>
                  <span className="font-bold text-green-500">0.00 сом</span>
                </div>
                <div className="h-px bg-gray-100 dark:bg-white/5 my-2" />
                <div className="flex justify-between items-end">
                  <span className="text-gray-500 text-xs font-bold uppercase tracking-widest">Итого к списанию:</span>
                  <span className="text-2xl font-bold text-altyn-light">{selectedWeight || 0} г</span>
                </div>
              </div>

              <button 
                onClick={handleOrder}
                disabled={!selectedWeight}
                className="w-full gold-button py-4 disabled:opacity-50 disabled:grayscale transition-all"
              >
                Оформить заявку
              </button>

              <div className="mt-6 p-4 bg-green-500/5 rounded-2xl border border-green-500/10 flex items-start gap-3">
                <ShieldCheck className="text-green-500 shrink-0" size={18} />
                <p className="text-[10px] text-gray-500 leading-relaxed">
                  Все слитки застрахованы и сертифицированы. Вы получите официальный сертификат соответствия при выдаче.
                </p>
              </div>
            </GoldCard>

            <div className="p-6 bg-gray-50 dark:bg-white/5 rounded-3xl border border-gray-200 dark:border-white/10">
               <h5 className="text-xs font-bold uppercase tracking-widest text-gray-500 mb-4 flex items-center gap-2">
                 <Info size={14} />
                 Information
               </h5>
               <p className="text-xs text-slate-500 dark:text-gray-400 leading-relaxed">
                 Минимальный вес для выдачи — 1 грамм. Для получения при себе необходимо иметь паспорт (ID-карта КР).
               </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
