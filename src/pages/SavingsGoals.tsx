import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldCard } from '@/components/ui/GoldCard';
import { Plus, Target, Home, Car, GraduationCap, Trash2 } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Goal {
  id: string;
  name: string;
  targetWeightG: number;
  currentWeightG: number;
  icon: any;
  color: string;
}

const MOCK_GOALS: Goal[] = [
  { id: '1', name: 'Квартира в Бишкеке', targetWeightG: 5000, currentWeightG: 1250, icon: Home, color: 'text-blue-500' },
  { id: '2', name: 'Новый автомобиль', targetWeightG: 1500, currentWeightG: 450, icon: Car, color: 'text-green-500' },
  { id: '3', name: 'Образование детей', targetWeightG: 2000, currentWeightG: 200, icon: GraduationCap, color: 'text-purple-500' },
];

export const SavingsGoals = () => {
  const [goals, setGoals] = useState<Goal[]>(MOCK_GOALS);
  const [showAdd, setShowAdd] = useState(false);
  const [newName, setNewName] = useState('');
  const [newTarget, setNewTarget] = useState('');

  const handleDelete = (id: string) => {
    setGoals(goals.filter(g => g.id !== id));
  };

  const handleAdd = () => {
    if (!newName || !newTarget) return;
    const newGoal: Goal = {
      id: Date.now().toString(),
      name: newName,
      targetWeightG: parseFloat(newTarget),
      currentWeightG: 0,
      icon: Target,
      color: 'text-altyn-light',
    };
    setGoals([...goals, newGoal]);
    setNewName('');
    setNewTarget('');
    setShowAdd(false);
  };

  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="flex justify-between items-center mb-10">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Цели накопления</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Превращайте ваши мечты в золотой эквивалент.</p>
        </div>
        <button 
          onClick={() => setShowAdd(true)}
          className="gold-button flex items-center gap-2 !py-3 !px-6"
        >
          <Plus size={18} />
          Добавить цель
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal, i) => {
          const percent = (goal.currentWeightG / goal.targetWeightG) * 100;
          return (
            <GoldCard key={goal.id} delay={i * 0.1} className="relative group overflow-hidden">
              <div className="flex justify-between items-start mb-6">
                <div className={cn("p-3 rounded-2xl bg-gray-100 dark:bg-white/5", goal.color)}>
                  <goal.icon size={24} />
                </div>
                <button 
                  onClick={() => handleDelete(goal.id)}
                  className="p-2 text-gray-400 hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                >
                  <Trash2 size={16} />
                </button>
              </div>

              <h3 className="text-xl font-bold mb-1">{goal.name}</h3>
              <p className="text-sm text-slate-500 dark:text-gray-400 mb-6">
                Цель: {goal.targetWeightG} г золота
              </p>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
                  <span className="text-altyn-light">{percent.toFixed(1)}%</span>
                  <span className="text-slate-400">{goal.currentWeightG} / {goal.targetWeightG} г</span>
                </div>
                <div className="h-2 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${percent}%` }}
                    transition={{ duration: 1, delay: i * 0.1 + 0.5 }}
                    className="h-full bg-gold-gradient"
                  />
                </div>
              </div>

              <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-gray-400">
                <Target size={14} className="text-altyn-light" />
                <span>Осталось накопить: {(goal.targetWeightG - goal.currentWeightG).toFixed(1)} г</span>
              </div>
            </GoldCard>
          );
        })}
      </div>

      {goals.length === 0 && (
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <div className="w-20 h-20 bg-gray-100 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 text-gray-400">
            <Target size={40} />
          </div>
          <h3 className="text-xl font-bold mb-2">У вас пока нет целей</h3>
          <p className="text-slate-500 dark:text-gray-400 max-w-sm mb-8">
            Создайте свою первую цель, чтобы наглядно видеть прогресс ваших накоплений в золоте.
          </p>
          <button 
            onClick={() => setShowAdd(true)}
            className="gold-button !py-3 !px-8"
          >
            Создать первую цель
          </button>
        </div>
      )}

      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-[200] flex items-center justify-center p-6">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-md bg-white dark:bg-background-secondary rounded-3xl p-8 shadow-2xl border border-gray-200 dark:border-white/10"
            >
              <h3 className="text-2xl font-bold mb-6">Новая цель</h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Название цели</label>
                  <input 
                    type="text" 
                    value={newName}
                    onChange={(e) => setNewName(e.target.value)}
                    placeholder="Напр. Путешествие" 
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-altyn-light transition-colors" 
                  />
                </div>
                <div>
                  <label className="text-xs font-bold uppercase text-gray-500 mb-2 block">Целевой вес (граммы)</label>
                  <input 
                    type="number" 
                    value={newTarget}
                    onChange={(e) => setNewTarget(e.target.value)}
                    placeholder="0.00" 
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 outline-none focus:border-altyn-light transition-colors" 
                  />
                </div>
                <div className="pt-4 flex gap-4">
                  <button onClick={() => setShowAdd(false)} className="flex-1 py-3 border border-gray-200 dark:border-white/10 rounded-xl text-sm font-bold hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">Отмена</button>
                  <button onClick={handleAdd} className="flex-1 py-3 gold-button text-sm">Создать</button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};
