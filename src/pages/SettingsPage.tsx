import React, { useState, useEffect } from 'react';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { User, Shield, Bell, CreditCard, LogOut, Check, X } from 'lucide-react';
import { useNavigation } from '@/App';
import { authAPI } from '@/lib/api';

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
    <div className="flex min-h-screen bg-background-primary text-white">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Настройки</h2>
          <p className="text-gray-400 mt-1">Управляйте вашим аккаунтом и параметрами безопасности.</p>
        </header>

        <div className="max-w-4xl space-y-6">
          <GoldCard className="p-8">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-8 pb-8 border-b border-white/5">
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
                      className="w-full bg-background-secondary border border-altyn/30 rounded-lg px-3 py-2 text-white focus:border-altyn outline-none transition-all"
                    />
                    <input 
                      type="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full bg-background-secondary border border-altyn/30 rounded-lg px-3 py-2 text-white focus:border-altyn outline-none transition-all text-sm"
                    />
                  </div>
                ) : (
                  <>
                    <h4 className="text-xl font-bold">{name}</h4>
                    <p className="text-sm text-gray-500">{email}</p>
                    <span className="inline-block mt-2 px-2 py-0.5 bg-green-500/10 text-green-500 text-[10px] font-bold uppercase rounded">Верифицирован</span>
                  </>
                )}
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 bg-green-500/20 text-green-500 px-4 py-2 rounded-xl text-xs font-bold hover:bg-green-500/30 transition-all"
                    >
                      <Check size={16} /> Сохранить
                    </button>
                    <button 
                      onClick={() => setIsEditing(false)}
                      className="flex items-center gap-2 bg-white/5 text-gray-400 px-4 py-2 rounded-xl text-xs font-bold hover:bg-white/10 transition-all"
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

            <div className="space-y-6">
              {[
                { icon: Shield, title: 'Безопасность', desc: 'Двухфакторная аутентификация, смена пароля' },
                { icon: Bell, title: 'Уведомления', desc: 'Настройка PUSH и Email оповещений о курсе' },
                { icon: CreditCard, title: 'Платежные методы', desc: 'Управление привязанными картами и счетами' },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-4 group cursor-pointer">
                  <div className="w-10 h-10 bg-white/5 rounded-xl flex items-center justify-center group-hover:bg-altyn/10 transition-colors">
                    <item.icon className="text-gray-400 group-hover:text-altyn-light" size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold">{item.title}</p>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                  <span className="ml-auto text-gray-700 group-hover:text-altyn-light">→</span>
                </div>
              ))}
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
      </main>
    </div>
  );
};
