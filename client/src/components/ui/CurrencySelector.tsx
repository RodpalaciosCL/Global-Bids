import { useCurrency } from '@/contexts/CurrencyContext';

export function CurrencySelector() {
  const { currency, setCurrency } = useCurrency();
  
  return (
    <div className="flex items-center space-x-2 p-1 bg-gray-100 rounded-lg">
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currency === 'USD' 
            ? 'bg-primary text-white' 
            : 'bg-transparent text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => setCurrency('USD')}
      >
        USD
      </button>
      <button
        className={`px-3 py-1 rounded-md text-sm font-medium transition-colors ${
          currency === 'CLP' 
            ? 'bg-primary text-white' 
            : 'bg-transparent text-gray-600 hover:bg-gray-200'
        }`}
        onClick={() => setCurrency('CLP')}
      >
        CLP
      </button>
    </div>
  );
}