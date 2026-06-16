import { useState, useEffect } from 'react';

function useCurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // ✅ Usar ExchangeRate API (permite CORS)
      const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      console.log('Rates available:', Object.keys(data.rates));
      console.log('COP rate:', data.rates.COP);
      
      if (!data.rates.COP) {
        console.log('COP not found in API, adding manually...');
        data.rates.COP = 3850;
      }
      
      setRates(data.rates);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      console.error('Error fetching rates, using fallback:', err);
      
      const fallbackRates = {
        USD: 1,
        EUR: 0.92,
        GBP: 0.78,
        JPY: 148.50,
        CAD: 1.37,
        AUD: 1.50,
        CHF: 0.88,
        CNY: 7.24,
        MXN: 18.50,
        COP: 3850
      };
      
      setRates(fallbackRates);
      setLastUpdate(new Date());
      setError('Using fallback rates. Please refresh later.');
      setLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRates();
    const interval = setInterval(fetchRates, 60 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);

  // ✅ CONVERSIÓN ASÍNCRONA - Usa ExchangeRate API (permite CORS)
  const convertCurrency = async (amount, fromCurrency, toCurrency) => {
    if (!rates) return amount;
    if (fromCurrency === toCurrency) return amount;
    if (amount === 0) return 0;
    
    try {
      // ✅ Usar ExchangeRate API directamente (permite CORS)
      const response = await fetch(
        `https://api.exchangerate-api.com/v4/latest/${fromCurrency}`
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.rates && data.rates[toCurrency]) {
        const converted = amount * data.rates[toCurrency];
        console.log(`✅ Converted ${amount} ${fromCurrency} → ${converted} ${toCurrency}`);
        return converted;
      } else {
        throw new Error('Rate not found in response');
      }
    } catch (err) {
      console.warn('API conversion failed, using local rates:', err.message);
      
      if (rates && rates[toCurrency] && rates[fromCurrency]) {
        const rate = rates[toCurrency] / rates[fromCurrency];
        const converted = amount * rate;
        console.log(`⚠️ Fallback: ${amount} ${fromCurrency} → ${converted} ${toCurrency}`);
        return converted;
      }
      
      return amount;
    }
  };

  const quickConvert = (amount, fromCurrency, toCurrency) => {
    if (!rates) return amount;
    if (fromCurrency === toCurrency) return amount;
    if (!rates[fromCurrency] || !rates[toCurrency]) return amount;
    
    const rate = rates[toCurrency] / rates[fromCurrency];
    return amount * rate;
  };

  const formatCurrency = (amount, currency = 'USD') => {
    const symbols = {
      USD: '$',
      EUR: '€',
      GBP: '£',
      JPY: '¥',
      CAD: 'C$',
      AUD: 'A$',
      CHF: 'CHF',
      CNY: '¥',
      MXN: '$',
      COP: 'COL$'
    };
    
    const symbol = symbols[currency] || currency;
    
    if (currency === 'COP') {
      const roundedAmount = Math.round(amount);
      const formattedAmount = roundedAmount.toLocaleString('es-CO');
      return `${symbol} ${formattedAmount}`;
    }
    
    if (currency === 'JPY') {
      return `${symbol}${Math.round(amount)}`;
    }
    
    return `${symbol}${amount.toFixed(2)}`;
  };

  return {
    rates,
    loading,
    error,
    lastUpdate,
    convertCurrency,
    quickConvert,
    formatCurrency,
    refreshRates: fetchRates
  };
}

export default useCurrencyConverter;