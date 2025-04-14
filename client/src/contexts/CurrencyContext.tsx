import { createContext, useContext, useState, ReactNode } from 'react';

type Currency = 'USD' | 'CLP';

interface CurrencyContextType {
  currency: Currency;
  setCurrency: (currency: Currency) => void;
  convertPrice: (priceUSD: number) => number;
  formatPrice: (price: number) => string;
}

const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

// Tipo de cambio fijo (para propósitos de demostración)
// En producción, esto debería venir de una API de tipo de cambio
const USD_TO_CLP_RATE = 870;

export function CurrencyProvider({ children }: { children: ReactNode }) {
  const [currency, setCurrency] = useState<Currency>('USD');

  const convertPrice = (priceUSD: number): number => {
    if (currency === 'USD') return priceUSD;
    return Math.round(priceUSD * USD_TO_CLP_RATE);
  };

  const formatPrice = (price: number): string => {
    if (currency === 'USD') {
      return `$${price.toLocaleString('en-US')}`;
    } else {
      return `CLP ${price.toLocaleString('es-CL')}`;
    }
  };

  const value = {
    currency,
    setCurrency,
    convertPrice,
    formatPrice,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

export function useCurrency() {
  const context = useContext(CurrencyContext);
  if (context === undefined) {
    throw new Error('useCurrency must be used within a CurrencyProvider');
  }
  return context;
}