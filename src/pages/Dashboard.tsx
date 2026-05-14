import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { cn } from '@/lib/utils';
import { useNavigation } from '@/App';
import { portfolioAPI, goldAPI } from '@/lib/api';
import { Loader2 } from 'lucide-react';

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [pRes, tRes, sRes] = await Promise.all([
          portfolioAPI.get(),
          portfolioAPI.getTransactions(),
          goldAPI.getStats(),
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

  const formatKGS = (n: number) => n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  if (loading) {
    return (
      <div className="flex min-h-screen bg-background-primary text-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <Loader2 size={40} className="animate-spin text-altyn" />
        </main>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="flex min-h-screen bg-background-primary text-white">
        <Sidebar />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center space-y-4">
            <p className="text-gray-400">Не удалось загрузить данные. Войдите в аккаунт.</p>
            <button onClick={() => navigateTo('auth')} className="gold-button !py-2 !px-6 text-sm">Войти</button>
          </div>
        </main>
      </div>
    );
  }

  const p = portfolio;
  const profitPercent = p.totalValueKGS > 0 ? (((p.totalValueKGS - 100000) / 100000) * 100).toFixed(2) : '0';

  return (
    <div className="flex min-h-screen bg-background-primary text-white">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">
              Добро пожаловать{user ? `, ${user.name}` : ''}
            </h2>
            <p className="text-gray-400 mt-1">Вот обзор вашего золотого портфеля на сегодня.</p>
          </div>
          <div className="flex gap-4">
            <button onClick={() => navigateTo('transfers')} className="gold-button !py-2 !px-6 text-sm">Купить золото</button>
            <button onClick={() => navigateTo('transfers')} className="outline-button !py-2 !px-6 text-sm">Вывести средства</button>
          </div>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
          <GoldCard variant="gold" className="col-span-1 md:col-span-2 p-8">
            <div className="flex justify-between items-start">
              <div>
                <p className="text-altyn-pale/60 text-xs uppercase tracking-widest mb-1">Общий баланс</p>
                <div className="flex items-baseline gap-3">
                  <h3 className="text-4xl lg:text-5xl font-bold">{formatKGS(p.totalValueKGS)} сом</h3>
                  <span className={cn("font-medium text-sm", Number(profitPercent) >= 0 ? "text-green-400" : "text-red-400")}>
                    {Number(profitPercent) >= 0 ? '+' : ''}{profitPercent}%
                  </span>
                </div>
                <p className="text-altyn-light/80 mt-2 font-medium text-lg">{p.goldWeightG.toFixed(3)} г чистого золота</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center border border-white/10">
                <div className="w-8 h-8 bg-gold-gradient rounded-full" />
              </div>
            </div>
            
            <div className="mt-10 pt-6 border-t border-altyn/10 flex flex-wrap gap-6 lg:gap-10">
              <div>
                <p className="text-altyn-pale/40 text-[10px] uppercase tracking-wider mb-1">Баланс KGS</p>
                <p className="text-xl font-bold text-white">{formatKGS(p.balanceKGS)} сом</p>
              </div>
              <div>
                <p className="text-altyn-pale/40 text-[10px] uppercase tracking-wider mb-1">Стоимость золота</p>
                <p className="text-xl font-bold text-green-400">{formatKGS(p.goldValueKGS)} сом</p>
              </div>
              <div>
                <p className="text-altyn-pale/40 text-[10px] uppercase tracking-wider mb-1">Цена за грамм</p>
                <p className="text-xl font-bold text-white">{formatKGS(p.currentGoldPrice)} сом</p>
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
                    <p className="text-sm font-medium text-white">{stat.label}</p>
                    <p className="text-xs text-gray-500">{stat.sub}</p>
                  </div>
                  <p className="text-lg font-bold text-altyn-light">{stat.value}</p>
                </div>
              ))}
            </div>
          </GoldCard>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <GoldCard className="p-8 h-full">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
                <h4 className="text-lg font-bold">График цены золота</h4>
                <div className="flex gap-2 bg-background-tertiary p-1 rounded-lg">
                  {['1Д', '1Н', '1М', '1Г', 'Все'].map(t => (
                    <button key={t} className={cn(
                      "px-3 py-1 text-xs rounded-md transition-all",
                      t === '1М' ? "bg-altyn text-white shadow-sm" : "text-gray-500 hover:text-white"
                    )}>
                      {t}
                    </button>
                  ))}
                </div>
              </div>
              <div className="h-64 flex items-end gap-2">
                {[40, 55, 45, 60, 75, 65, 80, 90, 85, 100].map((h, i) => (
                  <motion.div
                    key={i}
                    initial={{ height: 0 }}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 1, delay: i * 0.05 }}
                    className={cn(
                      "flex-1 rounded-t-lg transition-colors",
                      i === 9 ? "bg-gold-gradient" : "bg-altyn/20 hover:bg-altyn/40"
                    )}
                  />
                ))}
              </div>
              <div className="flex justify-between mt-4 px-2 text-[10px] text-gray-500 uppercase tracking-widest font-bold">
                <span>01 Мая</span>
                <span>10 Мая</span>
                <span>20 Мая</span>
                <span>Сегодня</span>
              </div>
            </GoldCard>
          </div>

          <GoldCard className="p-8">
            <h4 className="text-lg font-bold mb-6">Последние операции</h4>
            <div className="space-y-5">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-8">Нет операций</p>
              ) : (
                transactions.slice(0, 3).map((op, i) => (
                  <div key={i} className="flex justify-between items-center group cursor-pointer" onClick={() => navigateTo('transfers')}>
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-10 h-10 rounded-xl flex items-center justify-center text-sm",
                        op.type === 'buy' ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"
                      )}>
                        {op.type === 'buy' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="text-sm font-bold text-white">{op.type === 'buy' ? 'Покупка' : 'Продажа'}</p>
                        <p className="text-[10px] text-gray-500">{new Date(op.timestamp).toLocaleString('ru-RU')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-white">{op.type === 'buy' ? '+' : '-'}{op.goldAmountG.toFixed(3)} г</p>
                      <p className="text-[10px] text-gray-500">{formatKGS(op.kgsAmount)} сом</p>
                    </div>
                  </div>
                ))
              )}
            </div>
            <button onClick={() => navigateTo('transfers')} className="w-full mt-8 py-3 border border-border rounded-xl text-xs font-bold text-gray-400 hover:text-white hover:border-white/20 transition-all">
              Показать все
            </button>
          </GoldCard>
        </div>
      </main>
    </div>
  );
};
