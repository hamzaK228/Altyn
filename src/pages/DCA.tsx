import React, { useState } from 'react';
import { GoldCard } from '@/components/ui/GoldCard';
import { Calendar, Clock, Play, Pause, Trash2, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useCurrency, formatCurrency } from '@/lib/CurrencyContext';

interface DCAPlan {
  id: string;
  amountKGS: number;
  frequency: 'daily' | 'weekly' | 'monthly';
  nextRun: string;
  isActive: boolean;
}

const MOCK_PLANS: DCAPlan[] = [
  { id: '1', amountKGS: 5000, frequency: 'weekly', nextRun: '2026-05-20', isActive: true },
  { id: '2', amountKGS: 20000, frequency: 'monthly', nextRun: '2026-06-01', isActive: false },
];

export const DCAPage = () => {
  const [plans, setPlans] = useState<DCAPlan[]>(MOCK_PLANS);
  const [showAdd, setShowAdd] = useState(false);
  const [newAmount, setNewAmount] = useState('');
  const [newFreq, setNewFreq] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const { convert, currency } = useCurrency();

  const handleAdd = () => {
    if (!newAmount) return;
    const newPlan: DCAPlan = {
      id: Date.now().toString(),
      amountKGS: parseFloat(newAmount),
      frequency: newFreq,
      nextRun: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      isActive: true,
    };
    setPlans([...plans, newPlan]);
    setNewAmount('');
    setShowAdd(false);
  };

  const togglePlan = (id: string) => {
    setPlans(plans.map(p => p.id === id ? { ...p, isActive: !p.isActive } : p));
  };

  const deletePlan = (id: string) => {
    setPlans(plans.filter(p => p.id !== id));
  };

  const formatVal = (n: number) => {
    const { amount, symbol } = convert(n);
    return formatCurrency(amount, currency, symbol);
  };

  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Авто-инвестирование</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Настройте регулярную покупку золота и забудьте о рутине.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="gold-button flex items-center gap-2 !py-3 !px-6"
        >
          <Plus size={18} />
          Создать план
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
          <h3 className="text-xl font-bold flex items-center gap-2">
            <Clock className="text-altyn-light" size={20} />
            Ваши планы
          </h3>
          
          {plans.map((plan, i) => (
            <GoldCard key={plan.id} delay={i * 0.1} className={cn("p-6", !plan.isActive && "opacity-60")}>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-altyn/10 rounded-2xl flex items-center justify-center text-altyn-light">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{plan.frequency === 'daily' ? 'Ежедневно' : plan.frequency === 'weekly' ? 'Еженедельно' : 'Ежемесячно'}</p>
                    <p className="text-xs text-slate-500 dark:text-gray-400">Следующая покупка: {new Date(plan.nextRun).toLocaleDateString('ru-RU')}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-altyn-light">{formatVal(plan.amountKGS)}</p>
                  <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Сумма покупки</p>
                </div>
              </div>

              <div className="mt-6 pt-6 border-t border-gray-100 dark:border-white/5 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <div className={cn("w-2 h-2 rounded-full", plan.isActive ? "bg-green-500 animate-pulse" : "bg-gray-400")} />
                  <span className="text-[10px] font-bold uppercase tracking-widest text-gray-500">
                    {plan.isActive ? 'Активен' : 'Приостановлен'}
                  </span>
                </div>
                <div className="flex gap-2">
                  <button 
                    onClick={() => togglePlan(plan.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-altyn"
                  >
                    {plan.isActive ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                  <button 
                    onClick={() => deletePlan(plan.id)}
                    className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg transition-colors text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            </GoldCard>
          ))}

          {plans.length === 0 && (
            <div className="py-10 text-center text-gray-500">
              У вас пока нет активных планов авто-инвестирования.
            </div>
          )}
        </div>

        <div className="space-y-8">
          <GoldCard variant="gold" className="p-8">
            <h4 className="text-xl font-bold mb-4">Почему DCA это выгодно?</h4>
            <p className="text-sm text-white/80 dark:text-altyn-pale/80 leading-relaxed mb-6">
              Стратегия **Dollar-Cost Averaging** позволяет снизить влияние волатильности рынка. Вы покупаете больше, когда цена низкая, и меньше, когда цена высокая.
            </p>
            <ul className="space-y-4">
              {[
                'Никаких эмоций при покупке',
                'Автоматическое накопление',
                'Усреднение цены входа',
                'Минимальные затраты времени'
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-3 text-xs font-medium text-slate-900 dark:text-white">
                  <div className="w-5 h-5 rounded-full bg-altyn/20 dark:bg-white/20 flex items-center justify-center text-[10px]">
                    {i + 1}
                  </div>
                  {item}
                </li>
              ))}
            </ul>
          </GoldCard>
        </div>
      </div>

      {showAdd && (
        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/60 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-background-secondary rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-white/10">
            <h3 className="text-2xl font-bold mb-6">Новый план</h3>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Сумма в KGS</label>
                <input 
                  type="number" 
                  value={newAmount}
                  onChange={(e) => setNewAmount(e.target.value)}
                  placeholder="1000" 
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-altyn-light transition-colors" 
                />
              </div>
              <div>
                <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Частота</label>
                <select 
                  value={newFreq}
                  onChange={(e) => setNewFreq(e.target.value as any)}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-altyn-light transition-colors appearance-none"
                >
                  <option value="daily">Ежедневно</option>
                  <option value="weekly">Еженедельно</option>
                  <option value="monthly">Ежемесячно</option>
                </select>
              </div>
              <div className="pt-4 flex gap-4">
                <button onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Отмена</button>
                <button onClick={handleAdd} className="flex-1 py-3 gold-button text-sm">Создать</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
