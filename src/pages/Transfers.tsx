import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Sidebar } from '@/components/ui/Sidebar';
import { GoldCard } from '@/components/ui/GoldCard';
import { ArrowRightLeft, CreditCard, Landmark, History, Loader2, CheckCircle2 } from 'lucide-react';
import { useNavigation } from '@/App';
import { portfolioAPI, goldAPI } from '@/lib/api';

export const Transfers = () => {
  const { navigateTo } = useNavigation();
  const [mode, setMode] = useState<'buy' | 'sell'>('buy');
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [goldPrice, setGoldPrice] = useState(0);
  const [portfolio, setPortfolio] = useState<any>(null);
  const [transactions, setTransactions] = useState<any[]>([]);

  const fetchData = async () => {
    try {
      const [pRes, gRes, tRes] = await Promise.all([
        portfolioAPI.get(),
        goldAPI.getPrice(),
        portfolioAPI.getTransactions(),
      ]);
      setPortfolio(pRes.data);
      setGoldPrice(gRes.data.price);
      setTransactions(tRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => { fetchData(); }, []);

  const formatKGS = (n: number) => n.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 });

  const handleTrade = async () => {
    const num = parseFloat(amount);
    if (!num || num <= 0) { setError('Введите корректную сумму'); return; }
    
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      if (mode === 'buy') {
        const res = await portfolioAPI.buy(num);
        setSuccess(res.data.message);
      } else {
        const res = await portfolioAPI.sell(num);
        setSuccess(res.data.message);
      }
      setAmount('');
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const goldPreview = amount && goldPrice > 0
    ? mode === 'buy'
      ? `≈ ${(parseFloat(amount) / goldPrice).toFixed(3)} г золота`
      : `≈ ${formatKGS(parseFloat(amount) * goldPrice)} сом`
    : '';

  return (
    <div className="flex min-h-screen bg-background-primary text-white">
      <Sidebar />
      
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto pb-24 lg:pb-10">
        <header className="mb-10">
          <h2 className="text-3xl font-bold tracking-tight">Переводы и обмен</h2>
          <p className="text-gray-400 mt-1">Покупайте и продавайте золото мгновенно с государственными гарантиями.</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Trading Terminal */}
          <div className="lg:col-span-2">
            <GoldCard className="p-8">
              {/* Buy/Sell Toggle */}
              <div className="flex gap-2 bg-background-tertiary p-1 rounded-xl mb-8">
                <button
                  onClick={() => { setMode('buy'); setError(''); setSuccess(''); }}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'buy' ? 'bg-green-500/20 text-green-500' : 'text-gray-500 hover:text-white'}`}
                >
                  Купить золото
                </button>
                <button
                  onClick={() => { setMode('sell'); setError(''); setSuccess(''); }}
                  className={`flex-1 py-3 rounded-lg text-sm font-bold transition-all ${mode === 'sell' ? 'bg-red-500/20 text-red-500' : 'text-gray-500 hover:text-white'}`}
                >
                  Продать золото
                </button>
              </div>

              {/* Price Info */}
              <div className="flex flex-wrap gap-6 mb-8 p-4 bg-background-secondary rounded-xl">
                <div>
                  <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Текущая цена</p>
                  <p className="text-lg font-bold text-altyn-light">{goldPrice > 0 ? formatKGS(goldPrice) : '...'} сом/г</p>
                </div>
                {portfolio && (
                  <>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Ваш баланс</p>
                      <p className="text-lg font-bold text-white">{formatKGS(portfolio.balanceKGS)} сом</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500 uppercase tracking-wider mb-1">Ваше золото</p>
                      <p className="text-lg font-bold text-white">{portfolio.goldWeightG.toFixed(3)} г</p>
                    </div>
                  </>
                )}
              </div>

              {/* Amount Input */}
              <div className="space-y-3 mb-6">
                <label className="text-xs font-bold text-gray-400 uppercase tracking-widest">
                  {mode === 'buy' ? 'Сумма в сомах (KGS)' : 'Количество золота (граммы)'}
                </label>
                <input
                  type="number"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  placeholder={mode === 'buy' ? '10000' : '1.5'}
                  className="w-full bg-background-secondary border border-border rounded-xl px-4 py-4 text-white text-xl font-bold focus:border-altyn-light transition-all outline-none"
                />
                {goldPreview && (
                  <p className="text-sm text-altyn-light font-medium">{goldPreview}</p>
                )}
              </div>

              {/* Quick Amounts */}
              {mode === 'buy' && (
                <div className="flex gap-2 mb-8 flex-wrap">
                  {[5000, 10000, 25000, 50000].map(v => (
                    <button
                      key={v}
                      onClick={() => setAmount(String(v))}
                      className="px-4 py-2 bg-background-secondary border border-border rounded-lg text-sm font-medium text-gray-400 hover:text-white hover:border-altyn/30 transition-all"
                    >
                      {v.toLocaleString()} сом
                    </button>
                  ))}
                </div>
              )}

              {error && <p className="text-red-400 text-sm mb-4 font-medium">{error}</p>}
              {success && (
                <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-green-400 text-sm mb-4 font-medium">
                  <CheckCircle2 size={16} /> {success}
                </motion.div>
              )}

              <button
                onClick={handleTrade}
                disabled={loading || !amount}
                className={`w-full py-4 rounded-xl text-sm font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 ${
                  mode === 'buy' ? 'bg-green-500 hover:bg-green-600 text-white' : 'bg-red-500 hover:bg-red-600 text-white'
                }`}
              >
                {loading && <Loader2 size={18} className="animate-spin" />}
                {mode === 'buy' ? 'Подтвердить покупку' : 'Подтвердить продажу'}
              </button>
            </GoldCard>
          </div>

          {/* Transaction History */}
          <GoldCard className="p-8">
            <div className="flex items-center gap-2 mb-6">
              <History size={18} className="text-altyn-light" />
              <h4 className="text-lg font-bold">История операций</h4>
            </div>
            <div className="space-y-4">
              {transactions.length === 0 ? (
                <p className="text-gray-500 text-sm text-center py-12">Операций пока нет.<br/>Совершите первую покупку!</p>
              ) : (
                transactions.map((tx, i) => (
                  <div key={i} className="flex justify-between items-center py-2 border-b border-white/5 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs ${
                        tx.type === 'buy' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'
                      }`}>
                        {tx.type === 'buy' ? '↓' : '↑'}
                      </div>
                      <div>
                        <p className="text-xs font-bold">{tx.type === 'buy' ? 'Покупка' : 'Продажа'}</p>
                        <p className="text-[10px] text-gray-500">{new Date(tx.timestamp).toLocaleString('ru-RU')}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold">{tx.type === 'buy' ? '+' : '-'}{tx.goldAmountG.toFixed(3)} г</p>
                      <p className="text-[10px] text-gray-500">{formatKGS(tx.kgsAmount)} сом</p>
                    </div>
                  </div>
                ))
              )}
            </div>
          </GoldCard>
        </div>
      </main>
    </div>
  );
};
