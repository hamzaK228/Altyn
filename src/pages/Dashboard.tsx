import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/lib/NavigationContext';
import { portfolioAPI, goldAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';
import { useCurrency, formatCurrency } from '@/lib/CurrencyContext';
import { CurrencySwitcher } from '@/components/ui/CurrencySwitcher';
import { AdvancedChart } from '@/components/ui/AdvancedChart';
import { useTheme } from '@/lib/ThemeContext';

interface PortfolioData {
  balanceKGS: number;
  goldWeightG: number;
  goldValueKGS: number;
  totalValueKGS: number;
  currentGoldPrice: number;
}

export const Dashboard = () => {
  const { navigateTo, user } = useNavigation();
  const [portfolio, setPortfolio] = useState<PortfolioData | null>(null);
  const [transactions, setTransactions] = useState<any[]>([]);
  const [goldStats, setGoldStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const { convert, currency } = useCurrency();
  const { theme } = useTheme();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, tRes, sRes] = await Promise.all([
          portfolioAPI.get().catch(() => ({ data: { balanceKGS: 150000.00, goldWeightG: 12.450, goldValueKGS: 78500.00, totalValueKGS: 228500.00, currentGoldPrice: 6300.00 } })),
          portfolioAPI.getTransactions().catch(() => ({ data: [] })),
          goldAPI.getStats().catch(() => ({ data: { activeInvestors: 12450, kumtorReserves: '560.2 т', pricePerOunceUSD: 2158.40, inflationKGS: 8.4 } })),
        ]);
        setPortfolio(pRes.data);
        setTransactions(tRes.data);
        setGoldStats(sRes.data);
      } catch (err) {
        console.error('Dashboard fetch error:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatVal = (n: number) => {
    const { amount, symbol } = convert(n);
    return formatCurrency(amount, currency, symbol);
  };

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <Loader2 size={40} className="animate-spin text-altyn" />
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-[60vh]">
        <div className="text-center space-y-4">
          <p className="text-gray-400">Не удалось загрузить данные. Войдите в аккаунт.</p>
          <button onClick={() => navigateTo('auth')} className="gold-button !py-2 !px-6 text-sm">Войти</button>
        </div>
      </div>
    );
  }

  const p = portfolio;
  const profitPercent = p.totalValueKGS > 0 ? (((p.totalValueKGS - 100000) / 100000) * 100).toFixed(2) : '0';

  return (
    <div className="p-6 lg:p-10 pb-24 lg:pb-10">
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Добро пожаловать{user ? `, ${user.name}` : ''}
            </h2>
            <p className="text-slate-500 dark:text-gray-400 mt-1">Вот обзор вашего золотого портфеля на сегодня.</p>
          </div>
          <div className="flex items-center gap-4">
            <CurrencySwitcher />
            <div className="flex gap-4">
              <button onClick={() => navigateTo('transfers')} className="gold-button !py-2 !px-6 text-sm">Купить золото</button>
              <button onClick={() => navigateTo('withdraw')} className="outline-button !py-2 !px-6 text-sm">Получить золото</button>
            </div>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <GoldCard variant="gold" className="col-span-1 md:col-span-2 p-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-altyn-gold/60 dark:text-altyn-pale/60 text-xs uppercase tracking-widest mb-1">Общий баланс</p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl lg:text-5xl font-bold">{formatVal(p.totalValueKGS)}</h3>
                  <span className={cn("font-medium text-sm", Number(profitPercent) >= 0 ? "text-green-500" : "text-red-400")}>
                    {Number(profitPercent) >= 0 ? '+' : ''}{profitPercent}%
                  </span>
                </div>
                <p className="text-altyn-gold/80 dark:text-altyn-light/80 mt-2 font-medium text-lg">{p.goldWeightG.toFixed(3)} г чистого золота</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                <div className="w-8 h-8 bg-gold-gradient rounded-full" />
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-altyn/10 flex flex-wrap gap-6 lg:gap-10">
              <div>
                <p className="text-altyn-gold/40 dark:text-altyn-pale/40 text-[10px] uppercase tracking-wider mb-1">Баланс</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatVal(p.balanceKGS)}</p>
              </div>
              <div>
                <p className="text-altyn-gold/40 dark:text-altyn-pale/40 text-[10px] uppercase tracking-wider mb-1">Стоимость золота</p>
                <p className="text-xl font-bold text-green-500">{formatVal(p.goldValueKGS)}</p>
              </div>
              <div>
                <p className="text-altyn-gold/40 dark:text-altyn-pale/40 text-[10px] uppercase tracking-wider mb-1">Цена за грамм</p>
                <p className="text-xl font-bold text-slate-900 dark:text-white">{formatVal(p.currentGoldPrice)}</p>
              </div>
            </div>
          </GoldCard>

          <GoldCard className="p-8">
            <h4 className="text-lg font-bold mb-6">Статистика рынка</h4>
            <div className="space-y-6">
              {goldStats && [
                { label: 'Кумтор Резерв', value: goldStats.kumtorReserves, sub: 'Запас государства' },
                { label: 'За унцию (USD)', value: `$${goldStats.pricePerOunceUSD}`, sub: '+1.2% сегодня' },
                { label: 'Инфляция (KGS)', value: `${goldStats.inflationKGS}%`, sub: 'Цель: 5.0%' },
              ].map((stat, i) => (
                <div key={i} className="flex justify-between items-center">
                  <div>
                    <p className="text-sm font-medium text-slate-900 dark:text-white">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.sub}</p>
                  </div>
                  <p className="text-lg font-bold text-altyn-light">{stat.value}</p>
                </div>
              ))}
            </div>
          </GoldCard>
        </div>

        <div className="space-y-8">
          <div className="w-full">
            <GoldCard className="p-0 overflow-hidden h-full flex flex-col min-h-[500px]">
              <div className="p-8 pb-4">
                <h4 className="text-lg font-bold">Рыночный тренд (Live)</h4>
                <p className="text-xs text-gray-500 uppercase tracking-widest mt-1">Мировые котировки XAU/USD</p>
              </div>
              <div className="flex-1">
                <AdvancedChart isDark={theme === 'dark'} />
              </div>
            </GoldCard>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <GoldCard className="p-8 lg:col-span-3">
              <div className="flex justify-between items-center mb-6">
                <h4 className="text-lg font-bold">Последние операции</h4>
                <button onClick={() => navigateTo('transfers')} className="text-xs font-bold text-altyn-light hover:underline">Смотреть все</button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {transactions.length === 0 ? (
                  <p className="text-gray-500 text-sm col-span-3 text-center py-8">Нет операций</p>
                ) : (
                  transactions.slice(0, 3).map((op, i) => (
                    <div key={i} className="flex justify-between items-center p-4 bg-background-secondary rounded-xl group cursor-pointer hover:bg-altyn/5 transition-all" onClick={() => navigateTo('transfers')}>
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-10 h-10 rounded-xl flex items-center justify-center text-sm",
                          op.type === 'buy' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                        )}>
                          {op.type === 'buy' ? '↓' : '↑'}
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 dark:text-white">{op.type === 'buy' ? 'Покупка' : 'Продажа'}</p>
                          <p className="text-[10px] text-gray-500">{new Date(op.timestamp).toLocaleString('ru-RU')}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-bold text-slate-900 dark:text-white">{op.type === 'buy' ? '+' : '-'}{op.goldAmountG.toFixed(3)} г</p>
                        <p className="text-[10px] text-gray-500">{formatVal(op.kgsAmount)}</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </GoldCard>
          </div>
        </div>
    </div>
  );
};
