import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { GoldCard } from '@/components/ui/GoldCard';
import { useNavigation } from '@/lib/NavigationContext';
import { ChevronLeft, Loader2 } from 'lucide-react';
import { authAPI, setToken } from '@/lib/api';

export const RegistrationForm = () => {
  const { navigateTo, setUser } = useNavigation();
  const [mode, setMode] = useState<'register' | 'login'>('register');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async () => {
    setError('');
    setLoading(true);

    try {
      let result;
      if (mode === 'register') {
        if (!name || !email || !password) {
          setError('Заполните все поля');
          setLoading(false);
          return;
        }
        result = await authAPI.register(email, password, name);
      } else {
        if (!email || !password) {
          setError('Введите email и пароль');
          setLoading(false);
          return;
        }
        result = await authAPI.login(email, password);
      }

      setToken(result.token);
      setUser(result.user);
      navigateTo('dashboard');
    } catch (err: any) {
      setError(err.message || 'Произошла ошибка');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background-primary p-6 relative text-white">
      <button 
        onClick={() => navigateTo('landing')}
        className="absolute top-10 left-10 flex items-center gap-2 text-gray-500 hover:text-white transition-colors"
      >
        <ChevronLeft size={20} />
        Вернуться на главную
      </button>

      <GoldCard variant="glass" className="w-full max-w-md p-10 relative overflow-hidden">
        <div className="text-center mb-10">
          <div className="w-16 h-16 bg-gold-gradient rounded-2xl mx-auto mb-4 shadow-gold-glow flex items-center justify-center">
             <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                <div className="w-4 h-4 bg-white rounded-full" />
             </div>
          </div>
          <h2 className="text-2xl font-bold">
            {mode === 'register' ? 'Создать аккаунт' : 'Войти в систему'}
          </h2>
          <p className="text-gray-500 text-sm mt-1">
            {mode === 'register' ? 'Начните инвестировать в золото сегодня' : 'Добро пожаловать обратно'}
          </p>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="space-y-5"
          >
            {mode === 'register' && (
              <div className="space-y-2">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Имя и Фамилия</label>
                <input 
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Айбек Марат уулу"
                  className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-white focus:border-altyn-light transition-all outline-none"
                />
              </div>
            )}

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Email</label>
              <input 
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aibek@example.com"
                className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-white focus:border-altyn-light transition-all outline-none"
              />
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">Пароль</label>
              <input 
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Минимум 8 символов"
                className="w-full bg-background-secondary border border-border rounded-xl px-4 py-3 text-white focus:border-altyn-light transition-all outline-none"
              />
            </div>
          </motion.div>
        </AnimatePresence>

        {error && (
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="text-red-400 text-sm mt-4 text-center font-medium"
          >
            {error}
          </motion.p>
        )}

        <button 
          onClick={handleSubmit}
          disabled={loading}
          className="w-full gold-button !py-3 mt-8 flex items-center justify-center gap-2 disabled:opacity-50"
        >
          {loading && <Loader2 size={18} className="animate-spin" />}
          {mode === 'register' ? 'Зарегистрироваться' : 'Войти'}
        </button>

        <p className="text-center text-sm text-gray-500 mt-6">
          {mode === 'register' ? 'Уже есть аккаунт?' : 'Нет аккаунта?'}{' '}
          <button 
            onClick={() => { setMode(mode === 'register' ? 'login' : 'register'); setError(''); }}
            className="text-altyn-light font-bold hover:underline"
          >
            {mode === 'register' ? 'Войти' : 'Создать'}
          </button>
        </p>

        <p className="text-center text-[10px] text-gray-600 mt-6 uppercase tracking-widest leading-relaxed">
          Нажимая кнопку, вы соглашаетесь с <br /> 
          <span className="text-altyn-light/50 cursor-pointer hover:text-altyn-light transition-colors">условиями использования</span> и политикой конфиденциальности.
        </p>
      </GoldCard>
    </div>
  );
};
