import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { useNavigation } from '@/App';
import { goldAPI } from '@/lib/api';

export const MarketData = () => {
  const { navigateTo } = useNavigation();
  const [price, setPrice] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const [pRes, sRes] = await Promise.all([goldAPI.getPrice(), goldAPI.getStats()]);
        setPrice(pRes.data);
        setStats(sRes.data);
      } catch (err) { console.error(err); }
    };
    load();
  }, []);

  const formatKGS = (n: number) => n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const marketCards = price && stats ? [
    { label: 'Спот Цена (USD)', value: `$${price.priceUSD}`, change: `+${price.changePercent}%` },
    { label: 'Цена в Сомах (KGS)', value: formatKGS(price.price), change: '+0.85%' },
    { label: 'Активные инвесторы', value: stats.activeInvestors.toLocaleString(), change: '+3.2%' },
    { label: 'Резерв Кумтор', value: stats.kumtorReserves, change: '+0.05%' },
  ] : [
    { label: 'Спот Цена (USD)', value: '...', change: '' },
    { label: 'Цена в Сомах (KGS)', value: '...', change: '' },
    { label: 'Активные инвесторы', value: '...', change: '' },
    { label: 'Резерв Кумтор', value: '...', change: '' },
  ];

  return (
    <div className="flex min-h-screen bg-background-primary text-white">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Рыночные данные</h2>
          <p className="text-gray-400 mt-1">Аналитика и котировки золота в реальном времени.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
          {marketCards.map((stat, i) => (
            <GoldCard key={i} delay={i * 0.1} className="p-6">
              <p className="text-gray-500 text-[10px] uppercase tracking-widest font-bold mb-1">{stat.label}</p>
              <div className="flex justify-between items-end">
                <h3 className="text-2xl font-bold">{stat.value}</h3>
                {stat.change && (
                  <span className={`text-xs font-bold ${stat.change.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                    {stat.change}
                  </span>
                )}
              </div>
            </GoldCard>
          ))}
        </div>


        <GoldCard className="p-8 mb-10 h-[600px] flex flex-col">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
            <h4 className="text-xl font-bold">Интерактивный график LBMA</h4>
            <div className="flex gap-4 w-full sm:w-auto">
              <button className="outline-button !py-2 !px-4 text-xs flex-1 sm:flex-initial">Тех. анализ</button>
              <button onClick={() => navigateTo('transfers')} className="gold-button !py-2 !px-4 text-xs flex-1 sm:flex-initial">Торговать</button>
            </div>
          </div>
          <div className="flex-1 bg-white/[0.02] rounded-2xl border border-white/5 overflow-hidden">
             <iframe 
               src="https://s.tradingview.com/widgetembed/?frameElementId=tradingview_76d87&symbol=OANDA%3AXAUUSD&interval=D&hidesidetoolbar=1&hidetoptoolbar=1&symboledit=1&saveimage=1&toolbarbg=f1f3f6&studies=%5B%5D&theme=dark&style=1&timezone=Etc%2FUTC&studies_overrides=%7B%7D&overrides=%7B%7D&enabled_features=%5B%5D&disabled_features=%5B%5D&locale=en&utm_source=localhost&utm_medium=widget&utm_campaign=chart&utm_term=OANDA%3AXAUUSD"
               style={{ width: '100%', height: '100%', border: 'none' }}
               title="TradingView Chart"
             />
          </div>
        </GoldCard>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <GoldCard className="p-8">
            <h4 className="text-lg font-bold mb-6">Влияние инфляции</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Золото является историческим хеджем против инфляции. В 2024 году золото показало доходность +14.2% при инфляции в 8.4%.
            </p>
            <button onClick={() => navigateTo('reserves')} className="text-altyn-light text-xs font-bold hover:underline">Подробнее о резервах →</button>
          </GoldCard>
          <GoldCard className="p-8">
            <h4 className="text-lg font-bold mb-6">Прогноз Нацбанка</h4>
            <p className="text-sm text-gray-400 leading-relaxed mb-6">
              Ожидается стабильный рост спроса на физическое золото со стороны центральных банков развивающихся стран.
            </p>
            <button onClick={() => navigateTo('support')} className="text-altyn-light text-xs font-bold hover:underline">Читать аналитику →</button>
          </GoldCard>
        </div>
      </main>
    </div>
  );
};
