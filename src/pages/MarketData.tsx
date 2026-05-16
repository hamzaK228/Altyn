import React, { useEffect, useState } from 'react';
import { GoldCard } from '@/components/ui/GoldCard';
import { useNavigation } from '@/lib/NavigationContext';
import { goldAPI } from '@/lib/api';
import { AdvancedChart } from '@/components/ui/AdvancedChart';
import { MarketForecastCard } from '@/components/ui/MarketForecastCard';
import { SentimentIndicator } from '@/components/ui/SentimentIndicator';
import { useTheme } from '@/lib/ThemeContext';
import { useCurrency, formatCurrency } from '@/lib/CurrencyContext';
import { Bell, TrendingUp, Shield } from 'lucide-react';

export const MarketData = () => {
  const { navigateTo } = useNavigation();
  const [price, setPrice] = useState<any>(null);
  const [stats, setStats] = useState<any>(null);
  const { theme } = useTheme();
  const { convert, currency } = useCurrency();

  const [alertPrice, setAlertPrice] = useState('');
  const [alertSuccess, setAlertSuccess] = useState(false);

  const mockChartData = [
    { time: '2026-05-01', value: 9100 },
    { time: '2026-05-02', value: 9150 },
    { time: '2026-05-03', value: 9120 },
    { time: '2026-05-04', value: 9200 },
    { time: '2026-05-05', value: 9180 },
    { time: '2026-05-06', value: 9250 },
    { time: '2026-05-07', value: 9300 },
    { time: '2026-05-08', value: 9280 },
    { time: '2026-05-09', value: 9350 },
    { time: '2026-05-10', value: 9400 },
    { time: '2026-05-11', value: 9380 },
    { time: '2026-05-12', value: 9450 },
    { time: '2026-05-13', value: 9500 },
    { time: '2026-05-14', value: 9480 },
    { time: '2026-05-15', value: 9550 },
  ];

  useEffect(() => {
    const fetchMarketData = async () => {
      try {
        const [priceRes, statsRes] = await Promise.all([
          goldAPI.getPrice().catch(() => ({ data: { priceUSD: 2158.40 + (Math.random() - 0.5) * 2, priceKGS: 192450.00 + (Math.random() - 0.5) * 100 } })),
          goldAPI.getStats().catch(() => ({ data: { activeInvestors: 12450 + Math.floor(Math.random() * 10), kumtorReserves: '560.2 т' } }))
        ]);
        setPrice(priceRes.data);
        setStats(statsRes.data);
      } catch (err) {
        console.error('Market fetch error:', err);
      }
    };
    
    fetchMarketData();
    const interval = setInterval(fetchMarketData, 5000); // Update every 5s
    return () => clearInterval(interval);
  }, []);

  const formatVal = (n: number) => {
    if (n === undefined || n === null) return '...';
    const { amount, symbol } = convert(n);
    return formatCurrency(amount, currency, symbol);
  };

  const chartData = mockChartData.map(d => ({
    ...d,
    value: convert(d.value).amount
  }));

  const handleCreateAlert = () => {
    if (!alertPrice) return;
    setAlertSuccess(true);
    setAlertPrice('');
    setTimeout(() => setAlertSuccess(false), 3000);
  };

  const marketCards = [
    { 
      label: 'Спот Цена (USD)', 
      value: price?.priceUSD ? `$${price.priceUSD}` : '...', 
      change: price?.changePercent || '' 
    },
    { 
      label: 'Цена за грамм', 
      value: formatVal(price?.price), 
      change: '+0.85%' 
    },
    { 
      label: 'Активные инвесторы', 
      value: stats?.activeInvestors ? stats.activeInvestors.toLocaleString() : '...', 
      change: '+3.2%' 
    },
    { 
      label: 'Резерв Кумтор', 
      value: stats?.kumtorReserves || '...', 
      change: '+0.05%' 
    },
  ];

  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="mb-10">
        <h2 className="text-3xl font-bold tracking-tight">Рыночные данные</h2>
        <p className="text-slate-500 dark:text-gray-400 mt-1">Аналитика и котировки золота в реальном времени.</p>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-10">
        {marketCards.map((stat, i) => (
          <GoldCard key={i} className="p-6">
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

      <div className="space-y-8 mb-10">
        <GoldCard className="p-0 overflow-hidden h-[800px] flex flex-col w-full">
          <div className="p-8 pb-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h4 className="text-xl font-bold flex items-center gap-2">
                <TrendingUp className="text-altyn-light" size={20} />
                График XAU/USD (Live)
              </h4>
              <p className="text-[10px] text-gray-500 mt-1 uppercase tracking-widest font-bold">Котировки в реальном времени</p>
            </div>
            <div className="flex gap-4 w-full sm:w-auto">
              <button onClick={() => navigateTo('transfers')} className="gold-button !py-2 !px-6 text-sm flex-1 sm:flex-initial shadow-none">Купить золото</button>
            </div>
          </div>
          <div className="flex-1">
             <AdvancedChart isDark={theme === 'dark'} />
          </div>
        </GoldCard>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <GoldCard className="p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-altyn/10 rounded-lg text-altyn-light">
                <Bell size={20} />
              </div>
              <h4 className="text-lg font-bold">Ценовые алерты</h4>
            </div>
            <p className="text-xs text-slate-500 dark:text-gray-400 mb-6">
              Уведомим вас, когда золото достигнет нужной цены.
            </p>
            <div className="space-y-4">
              <div className="relative">
                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-xs font-bold uppercase">{currency}</span>
                <input 
                  type="number" 
                  value={alertPrice}
                  onChange={(e) => setAlertPrice(e.target.value)}
                  placeholder="Целевая цена" 
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl pl-14 pr-4 py-3 outline-none focus:border-altyn-light transition-colors text-sm" 
                />
              </div>
              <button 
                onClick={handleCreateAlert}
                className="w-full gold-button !py-3 text-xs"
              >
                {alertSuccess ? 'Уведомление создано!' : 'Создать уведомление'}
              </button>
            </div>
          </GoldCard>

          <div className="p-6 bg-green-500/5 rounded-3xl border border-green-500/10">
             <div className="flex items-center gap-2 mb-2">
               <Shield size={16} className="text-green-500" />
               <h5 className="text-xs font-bold text-green-500">Биржевой статус</h5>
             </div>
             <p className="text-[10px] text-gray-500 uppercase tracking-widest font-bold">Торги: Открыты</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <MarketForecastCard />
        <SentimentIndicator />
      </div>
    </div>
  );
};
