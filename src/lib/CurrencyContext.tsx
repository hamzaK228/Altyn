import React, { createContext, useContext, useState, ReactNode } from 'react';

export type CurrencyCode = 'KGS' | 'USD' | 'RUB' | 'CNY';

interface CurrencyContextType {
  currency: CurrencyCode;
  setCurrency: (code: CurrencyCode) => void;
  convert: (amountKGS: number) => { amount: number; symbol: string };
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Mock rates (1 unit of currency in KGS)
const MOCK_RATES: Record<CurrencyCode, number> = {
  KGS: 1,
  USD: 89.50,
  RUB: 0.98,
  CNY: 12.40,
};

const SYMBOLS: Record<CurrencyCode, string> = {
  KGS: 'сом',
  USD: '$',
  RUB: '₽',
  CNY: '¥',
};

export const CurrencyProvider = ({ children }: { children: ReactNode }) => {
  const [currency, setCurrency] = useState<CurrencyCode>('KGS');

  const convert = (amountKGS: number) => {
    const rate = MOCK_RATES[currency];
    const amount = amountKGS / rate;
    return { amount, symbol: SYMBOLS[currency] };
  };

  return (
    <CurrencyContext.Provider value={{ currency, setCurrency, convert }}>
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context) throw new Error('useCurrency must be used within a CurrencyProvider');
  return context;
};

export const formatCurrency = (amount: number, code: CurrencyCode, symbol: string) => {
  if (code === 'KGS' || code === 'RUB') {
    return `${amount.toLocaleString('ru-RU', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} ${symbol}`;
  }
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
};
