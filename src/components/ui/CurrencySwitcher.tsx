import React from 'react';
import { useCurrency, CurrencyCode } from '@/lib/CurrencyContext';
import { cn } from '@/lib/utils';

const currencies: CurrencyCode[] = ['KGS', 'USD', 'RUB', 'CNY'];

export const CurrencySwitcher = () => {
  const { currency, setCurrency } = useCurrency();

  return (
    <div className="flex bg-gray-100 dark:bg-white/5 p-1 rounded-xl border border-gray-200 dark:border-white/10">
      {currencies.map((code) => (
        <button
          key={code}
          onClick={() => setCurrency(code)}
          className={cn(
            "px-3 py-1.5 rounded-lg text-[10px] font-bold transition-all",
            currency === code
              ? "bg-white dark:bg-white/10 text-altyn-light shadow-sm"
              : "text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
          )}
        >
          {code}
        </button>
      ))}
    </div>
  );
};
