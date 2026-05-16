import React from 'react';
import { motion } from 'framer-motion';
import { GoldCard } from '@/components/ui/GoldCard';
import { PriceTicker } from '@/components/ui/PriceTicker';
import { Shield, TrendingUp, Landmark, ArrowRight, CheckCircle2, Globe, Lock, Zap } from 'lucide-react';
import { useNavigation } from '@/lib/NavigationContext';

export const LandingPage = () => {
  const { navigateTo } = useNavigation();

  return (
    <div className="min-h-screen bg-background-primary text-white selection:bg-altyn selection:text-white overflow-x-hidden">
      <PriceTicker />
      
      {/* Navigation Header */}
      <nav className="fixed top-10 left-1/2 -translate-x-1/2 w-[90%] max-w-7xl z-50 px-6 py-4 bg-background-secondary/80 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-between shadow-2xl">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigateTo('landing')}>
          <div className="w-8 h-8 bg-gold-gradient rounded-lg shadow-gold-glow" />
          <span className="text-xl font-bold tracking-tight">Алтын</span>
        </div>
        
        <div className="hidden md:flex items-center gap-8">
          {['Рынок', 'Резервы', 'Поддержка'].map((item) => (
            <button 
              key={item} 
              onClick={() => navigateTo(item === 'Рынок' ? 'market' : item === 'Резервы' ? 'reserves' : 'support')}
              className="text-sm font-medium text-gray-400 hover:text-altyn-light transition-colors"
            >
              {item}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button onClick={() => navigateTo('auth')} className="hidden sm:block text-sm font-bold text-gray-400 hover:text-white transition-colors">Войти</button>
          <button onClick={() => navigateTo('auth')} className="gold-button !py-2 !px-6 text-sm">Начать</button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[95vh] flex items-center">
        {/* Animated Background Elements */}
        <div className="absolute top-1/4 -right-20 w-[600px] h-[600px] bg-altyn/20 blur-[140px] rounded-full animate-pulse" />
        <div className="absolute bottom-1/4 -left-20 w-[400px] h-[400px] bg-altyn/10 blur-[100px] rounded-full" />
        <div className="absolute top-0 left-0 w-full h-full opacity-30 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[radial-gradient(circle,rgba(240,200,80,0.1)_0%,transparent_70%)]" />
        </div>
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-altyn/10 border border-altyn/20 mb-8">
              <span className="w-2 h-2 rounded-full bg-altyn-light shadow-[0_0_8px_#f0c850]" />
              <span className="text-[11px] font-black uppercase tracking-[0.2em] text-altyn-light">Государственная гарантия КР</span>
            </div>
            <h1 className="text-6xl md:text-8xl font-black leading-[0.95] mb-8 tracking-tighter">
              Твое золото <br />
              <span className="text-gold-gradient">в цифре</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-lg leading-relaxed font-medium">
              Первая национальная платформа для инвестиций в физическое золото с мгновенной ликвидностью.
            </p>
            <div className="flex flex-col sm:flex-row gap-6">
              <button 
                onClick={() => navigateTo('auth')}
                className="gold-button !py-5 !px-12 text-xl flex items-center justify-center gap-3 group overflow-hidden relative"
              >
                <span className="relative z-10">Начать инвестировать</span>
                <ArrowRight className="relative z-10 group-hover:translate-x-2 transition-transform duration-300" />
                <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-[-20deg]" />
              </button>
              <button 
                onClick={() => navigateTo('market')}
                className="outline-button !py-5 !px-12 text-xl hover:border-altyn/50 transition-all"
              >
                Курс золота
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
            animate={{ opacity: 1, scale: 1, rotate: 3 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="relative"
          >
            <GoldCard variant="gold" className="p-12 transform hover:rotate-0 transition-all duration-1000 shadow-[0_40px_100px_rgba(0,0,0,0.6)] border-white/20 dark:border-altyn/40 group overflow-hidden">
               <div className="absolute -top-24 -right-24 w-48 h-48 bg-white/10 blur-3xl rounded-full group-hover:bg-white/20 transition-all duration-1000" />
               <div className="flex justify-between mb-16 items-start">
                  <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-2xl border border-white/20 flex items-center justify-center shadow-inner">
                     <div className="w-10 h-10 bg-gold-gradient rounded-lg" />
                  </div>
                  <Landmark size={40} className="text-white/40 group-hover:text-white transition-colors duration-500" />
               </div>
               <div className="space-y-4">
                 <p className="text-white/40 text-[11px] font-black uppercase tracking-[0.4em]">Investment Portfolio</p>
                 <h3 className="text-5xl font-black text-white tracking-tighter">124 480 <span className="text-2xl font-bold opacity-40 uppercase tracking-normal">сом</span></h3>
                 <div className="flex items-center gap-3">
                   <p className="text-altyn-light text-xl font-bold">32.41 г золота</p>
                   <span className="px-2 py-0.5 bg-green-500/20 text-green-500 text-[10px] font-black rounded">+12.4%</span>
                 </div>
               </div>
               <div className="mt-20 flex justify-between items-end">
                  <div className="flex gap-4">
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white/40 tracking-widest uppercase">AU 999.9</span>
                    <span className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-xl text-[10px] font-black text-white/40 tracking-widest uppercase">LBMA</span>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] font-black text-white/20 uppercase tracking-widest mb-1">Status</p>
                    <p className="text-xs font-black text-altyn-light uppercase tracking-widest">Verified</p>
                  </div>
               </div>
            </GoldCard>
            {/* Decorative Shadow Layer */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-altyn/10 border border-white/10 rounded-[3rem] -z-10 blur-sm" />
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background-secondary/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { label: 'Пользователей', value: '45k+' },
              { label: 'Золотой запас', value: '560 т' },
              { label: 'Объем сделок', value: '1.2 млрд' },
              { label: 'Рейтинг надежности', value: 'AAA' },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <p className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-[10px] md:text-xs text-gray-500 uppercase tracking-widest font-bold">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-32 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-altyn/5 blur-[150px] rounded-full -z-10" />
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-bold mb-6">Почему выбирают <span className="text-gold-gradient">Алтын</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto text-lg">Мы объединили многовековую ценность золота с современными цифровыми технологиями для вашего финансового суверенитета.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: Shield, 
                title: 'Госгарантии', 
                desc: 'Ваше золото физически хранится в Национальном банке КР и застраховано государством.' 
              },
              { 
                icon: Zap, 
                title: 'Мгновенность', 
                desc: 'Покупайте и продавайте золото за считанные секунды в режиме реального времени.' 
              },
              { 
                icon: Lock, 
                title: 'Безопасность', 
                desc: 'Многоуровневая система защиты активов и персональных данных мирового уровня.' 
              },
            ].map((feature, i) => (
              <GoldCard key={feature.title} delay={i * 0.1} className="p-10 flex flex-col items-center text-center hover:bg-white/[0.03] transition-all duration-500 group">
                <div className="w-20 h-20 bg-altyn/10 rounded-[2rem] flex items-center justify-center mb-8 border border-altyn/20 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 shadow-gold-glow">
                  <feature.icon className="text-altyn-light" size={40} />
                </div>
                <h4 className="text-2xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed group-hover:text-gray-400 transition-colors">{feature.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification Section (Expanded) */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-altyn/[0.02] skew-y-3 -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1 relative">
             <div className="absolute -inset-4 bg-altyn/10 blur-3xl rounded-full opacity-20" />
             <div className="grid grid-cols-2 gap-6 relative z-10">
                <GoldCard variant="glass" className="p-8 hover:border-altyn/30 transition-all group">
                   <Globe className="text-altyn-light mb-6 group-hover:scale-110 transition-transform" size={28} />
                   <h5 className="text-lg font-bold mb-2">Глобальный стандарт</h5>
                   <p className="text-xs text-gray-500">Соответствие LBMA Good Delivery</p>
                </GoldCard>
                <GoldCard variant="glass" className="p-8 mt-12 hover:border-altyn/30 transition-all group">
                   <Shield className="text-altyn-light mb-6 group-hover:scale-110 transition-transform" size={28} />
                   <h5 className="text-lg font-bold mb-2">Аудит 24/7</h5>
                   <p className="text-xs text-gray-500">Прозрачность каждого грамма</p>
                </GoldCard>
                <GoldCard variant="glass" className="p-8 hover:border-altyn/30 transition-all group">
                   <TrendingUp className="text-altyn-light mb-6 group-hover:scale-110 transition-transform" size={28} />
                   <h5 className="text-lg font-bold mb-2">Ликвидность</h5>
                   <p className="text-xs text-gray-500">Обратный выкуп по рыночной цене</p>
                </GoldCard>
                <GoldCard variant="glass" className="p-8 mt-12 hover:border-altyn/30 transition-all group">
                   <Landmark className="text-altyn-light mb-6 group-hover:scale-110 transition-transform" size={28} />
                   <h5 className="text-lg font-bold mb-2">Нацбанк КР</h5>
                   <p className="text-xs text-gray-500">Официальный эмитент платформы</p>
                </GoldCard>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 leading-tight">Ваше доверие — <br /> <span className="text-gold-gradient">наш главный актив</span></h2>
            <p className="text-gray-400 mb-10 text-lg leading-relaxed">
              Алтын — это не просто приложение, это часть государственной стратегии по обеспечению финансовой стабильности граждан. Мы гарантируем, что каждый цифровой грамм на вашем балансе подтвержден реальным слитком в хранилище.
            </p>
            <ul className="space-y-6">
              {[
                { title: 'Физическое золото пробы 999.9', desc: 'Максимальная чистота слитка' },
                { title: 'Независимый международный аудит', desc: 'Ежеквартальная проверка резервов' },
                { title: 'Мгновенный вывод средств', desc: 'Прямая связь с картами Элкарт и Visa' }
              ].map(item => (
                <li key={item.title} className="flex gap-4 items-start">
                  <div className="mt-1 w-6 h-6 rounded-full bg-altyn/10 flex items-center justify-center shrink-0 border border-altyn/20">
                    <CheckCircle2 className="text-altyn-light" size={14} />
                  </div>
                  <div>
                    <h6 className="font-bold text-white leading-none mb-1">{item.title}</h6>
                    <p className="text-xs text-gray-500">{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <GoldCard variant="gold" className="max-w-5xl mx-auto p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 blur-[100px] rounded-full" />
          <h2 className="text-3xl md:text-5xl font-bold mb-8 relative z-10">Готовы стать владельцем <br /> цифрового золота?</h2>
          <p className="text-altyn-pale text-lg mb-12 max-w-xl mx-auto relative z-10">
            Регистрация займет не более 5 минут. Все, что вам нужно — это паспорт и смартфон.
          </p>
          <button 
            onClick={() => navigateTo('auth')}
            className="bg-white text-altyn-deep px-12 py-5 rounded-2xl font-bold text-xl hover:shadow-gold-glow hover:scale-105 transition-all relative z-10"
          >
            Зарегистрироваться сейчас
          </button>
        </GoldCard>
      </section>

      {/* Footer */}
      <footer className="py-20 border-t border-white/5 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-8 h-8 bg-gold-gradient rounded-lg" />
              <span className="text-xl font-bold tracking-tight">Алтын</span>
            </div>
            <p className="text-gray-500 text-sm max-w-xs leading-relaxed">
              Официальная государственная платформа по торговле золотом в Кыргызской Республике. Лицензия НБКР №001-2024.
            </p>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-sm">Навигация</h6>
            <ul className="space-y-4 text-sm text-gray-500">
              <li className="hover:text-altyn-light cursor-pointer" onClick={() => navigateTo('market')}>Рынок</li>
              <li className="hover:text-altyn-light cursor-pointer" onClick={() => navigateTo('reserves')}>Резервы</li>
              <li className="hover:text-altyn-light cursor-pointer" onClick={() => navigateTo('support')}>Поддержка</li>
            </ul>
          </div>
          <div>
            <h6 className="font-bold mb-6 text-sm">Контакты</h6>
            <ul className="space-y-4 text-sm text-gray-500">
              <li>г. Бишкек, пр. Чуй 168</li>
              <li>+996 (312) 66 90 11</li>
              <li>info@altyn.kg</li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:row justify-between items-center gap-4">
          <p className="text-[10px] text-gray-600 uppercase tracking-widest">© 2026 Altyn State Treasury. Все права защищены.</p>
          <div className="flex gap-6 text-[10px] text-gray-600 uppercase tracking-widest font-bold">
            <span className="hover:text-white cursor-pointer transition-colors">Конфиденциальность</span>
            <span className="hover:text-white cursor-pointer transition-colors">Публичная оферта</span>
          </div>
        </div>
      </footer>
    </div>
  );
};
