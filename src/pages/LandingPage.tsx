import React from 'react';
import { motion } from 'framer-motion';
import { GoldCard } from '@/components/ui/GoldCard';
import { PriceTicker } from '@/components/ui/PriceTicker';
import { Shield, TrendingUp, Landmark, ArrowRight, CheckCircle2, Globe, Lock, Zap } from 'lucide-react';
import { useNavigation } from '@/App';

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
      <section className="relative pt-40 pb-20 px-6 overflow-hidden min-h-[90vh] flex items-center">
        <div className="absolute top-1/4 -right-20 w-[500px] h-[500px] bg-altyn/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-1/4 -left-20 w-[300px] h-[300px] bg-altyn/5 blur-[80px] rounded-full" />
        
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-altyn/10 border border-altyn/20 mb-6">
              <span className="w-2 h-2 rounded-full bg-altyn-light animate-pulse" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-altyn-light">Государственная платформа КР</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold leading-[1.1] mb-8">
              Ваш золотой <br />
              <span className="text-gold-gradient">запас будущего</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
              Первая цифровая платформа Кыргызстана для покупки и хранения физического золота с государственными гарантиями безопасности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => navigateTo('auth')}
                className="gold-button !py-4 !px-10 text-lg flex items-center justify-center gap-2 group"
              >
                Создать аккаунт <ArrowRight className="group-hover:translate-x-1 transition-transform" />
              </button>
              <button 
                onClick={() => navigateTo('market')}
                className="outline-button !py-4 !px-10 text-lg"
              >
                Курсы валют
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="relative"
          >
            <GoldCard variant="gold" className="p-10 transform rotate-3 hover:rotate-0 transition-transform duration-700 shadow-gold-glow relative z-10">
               <div className="flex justify-between mb-12">
                  <div className="w-12 h-12 bg-white/20 rounded-xl" />
                  <Landmark size={32} className="text-altyn-pale" />
               </div>
               <div className="space-y-2">
                 <p className="text-altyn-pale/60 text-xs uppercase tracking-widest">Инвестиционный портфель</p>
                 <h3 className="text-4xl font-bold">124 480 сом</h3>
                 <p className="text-altyn-light/80 text-lg">32.41 г золота</p>
               </div>
               <div className="mt-12 flex items-center gap-4 text-xs font-bold text-white/40">
                  <span className="px-2 py-1 bg-white/10 rounded">AU 999.9</span>
                  <span className="px-2 py-1 bg-white/10 rounded">GOOD DELIVERY</span>
               </div>
            </GoldCard>
            <div className="absolute -bottom-10 -right-10 w-full h-full bg-altyn/5 border border-white/5 rounded-[2rem] -z-10" />
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
      <section className="py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-3xl md:text-5xl font-bold mb-6">Почему выбирают <span className="text-altyn-light">Алтын</span></h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Мы объединили многовековую ценность золота с современными цифровыми технологиями для вашего финансового суверенитета.</p>
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
              <GoldCard key={i} className="p-10 flex flex-col items-center text-center hover:translate-y-[-10px] transition-all duration-500">
                <div className="w-16 h-16 bg-altyn/10 rounded-2xl flex items-center justify-center mb-8 border border-altyn/20">
                  <feature.icon className="text-altyn-light" size={32} />
                </div>
                <h4 className="text-xl font-bold mb-4">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </GoldCard>
            ))}
          </div>
        </div>
      </section>

      {/* Trust & Verification Section (Expanded) */}
      <section className="py-32 px-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-full h-full bg-altyn/5 skew-y-3 -z-10" />
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          <div className="order-2 lg:order-1">
             <div className="grid grid-cols-2 gap-4">
                <GoldCard variant="glass" className="p-6">
                   <Globe className="text-altyn-light mb-4" />
                   <h5 className="font-bold mb-2">Глобальный стандарт</h5>
                   <p className="text-xs text-gray-500">Соответствие LBMA Good Delivery</p>
                </GoldCard>
                <GoldCard variant="glass" className="p-6 mt-8">
                   <Shield className="text-altyn-light mb-4" />
                   <h5 className="font-bold mb-2">Аудит 24/7</h5>
                   <p className="text-xs text-gray-500">Прозрачность каждого грамма</p>
                </GoldCard>
                <GoldCard variant="glass" className="p-6">
                   <TrendingUp className="text-altyn-light mb-4" />
                   <h5 className="font-bold mb-2">Ликвидность</h5>
                   <p className="text-xs text-gray-500">Обратный выкуп по рыночной цене</p>
                </GoldCard>
                <GoldCard variant="glass" className="p-6 mt-8">
                   <Landmark className="text-altyn-light mb-4" />
                   <h5 className="font-bold mb-2">Нацбанк КР</h5>
                   <p className="text-xs text-gray-500">Официальный эмитент платформы</p>
                </GoldCard>
             </div>
          </div>
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl md:text-5xl font-bold mb-8 leading-tight">Ваше доверие — <br /> наш главный актив</h2>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Алтын — это не просто приложение, это часть государственной стратегии по обеспечению финансовой стабильности граждан. Мы гарантируем, что каждый цифровой грамм на вашем балансе подтвержден реальным слитком в хранилище.
            </p>
            <ul className="space-y-4">
              {['Физическое золото пробы 999.9', 'Независимый международный аудит', 'Мгновенный вывод средств на карты КР'].map(item => (
                <li key={item} className="flex items-center gap-3 text-sm font-medium">
                  <CheckCircle2 className="text-altyn-light" size={18} /> {item}
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
