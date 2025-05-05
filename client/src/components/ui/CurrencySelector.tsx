import { useCurrency } from '@/contexts/CurrencyContext';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  
  return (
    <div className="flex items-center p-1 bg-gray-900 rounded-md">
      <button
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
          currency === 'USD' 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}
        onClick={() => setCurrency('USD')}
      >
        USD
      </button>
      <button
        className={`px-3 py-1 rounded-md text-xs font-semibold transition-colors ${
          currency === 'CLP' 
            ? 'bg-gray-900 text-white' 
            : 'bg-gray-100 text-gray-900'
        }`}
        onClick={() => setCurrency('CLP')}
      >
        CLP
      </button>
    </div>
  );
}