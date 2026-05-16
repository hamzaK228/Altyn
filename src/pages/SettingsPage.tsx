import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { User, Shield, Bell, CreditCard, LogOut, Check, X } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';
import { authAPI } from '@/lib/api';
import { cn } from '@/lib/utils';

export const SettingsPage = () => {
  const { navigateTo, user, logout } = useNavigation();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(user?.name || 'Пользователь');
  const [email, setEmail] = useState(user?.email || '');

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await authAPI.getMe();
        setName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.error('Failed to load profile:', err);
      }
    };
    loadProfile();
  }, []);

  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Настройки</h2>
          <p className="text-slate-500 dark:text-gray-400 mt-1">Управляйте вашим аккаунтом и параметрами безопасности.</p>
        </header>

        <div className="max-w-4xl space-y-6">
          <GoldCard className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-gray-200 dark:border-white/5">
              <div className="w-20 h-20 bg-gold-gradient rounded-full flex items-center justify-center text-3xl font-bold text-white shadow-gold-glow shrink-0">
                {name.charAt(0).toUpperCase()}
              </div>
              <div className="text-center md:text-left flex-1">
                {isEditing ? (
                  <div className="space-y-3 max-w-sm">
                    <input 
                      type="text" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:border-altyn outline-none transition-all"
                    />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-lg px-3 py-2 text-slate-900 dark:text-white focus:border-altyn outline-none transition-all text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold">{name}</h4>
                    <p className="text-sm text-slate-500 dark:text-gray-400">{email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded">Верифицирован</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 bg-green-500/10 text-green-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-500/20 transition-all border border-green-500/20"
                    >
                      <Check size={16} /> Сохранить
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-gray-200 dark:hover:bg-white/10 transition-all border border-gray-200 dark:border-white/10"
                    >
                      <X size={16} />
                    </button>
                  </>
                ) : (
                  <button 
                    onClick={() => setIsEditing(true)}
                    className="outline-button !py-2 !px-6 text-xs"
                  >
                    Редактировать
                  </button>
                )}
              </div>
            </div>

            <div className="space-y-8">
              <section>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <Shield size={16} className="text-altyn-light" /> Безопасность и сессии
                </h4>
                <div className="space-y-4">
                  {[
                    { device: 'MacBook Pro (Chrome)', ip: '192.168.1.10', status: 'Текущая', color: 'bg-green-500' },
                    { device: 'iPhone 15 Pro (Safari)', ip: '172.20.10.2', status: 'Активна 2ч назад', color: 'bg-altyn' },
                  ].map((session, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-gray-50 dark:bg-white/5 rounded-2xl border border-gray-100 dark:border-white/5">
                      <div className="flex items-center gap-4">
                        <div className={cn("w-2 h-2 rounded-full", session.color)} />
                        <div>
                          <p className="text-sm font-bold">{session.device}</p>
                          <p className="text-[10px] text-gray-500">IP: {session.ip}</p>
                        </div>
                      </div>
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{session.status}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-6 flex items-center gap-2">
                  <CreditCard size={16} className="text-altyn-light" /> Белый список счетов
                </h4>
                <div className="space-y-4">
                  <div className="p-4 border-2 border-dashed border-gray-100 dark:border-white/5 rounded-2xl flex flex-col items-center justify-center py-8 text-center">
                    <p className="text-xs text-gray-400 mb-4">Для безопасности вывод разрешен только на проверенные счета.</p>
                    <button className="gold-button !py-2 !px-6 text-xs">+ Добавить счет</button>
                  </div>
                </div>
              </section>
            </div>
          </GoldCard>

          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 px-4">
             <button 
               onClick={() => navigateTo('support')}
               className="text-sm text-altyn-light font-bold hover:underline"
             >
               Нужна помощь? Обратиться в поддержку
             </button>
             <button 
               onClick={logout}
               className="flex items-center gap-2 text-red-500 text-sm font-bold hover:bg-red-500/10 px-4 py-2 rounded-lg transition-all"
             >
               <LogOut size={18} />
               Выйти
             </button>
          </div>
        </div>
    </div>
  );
};
