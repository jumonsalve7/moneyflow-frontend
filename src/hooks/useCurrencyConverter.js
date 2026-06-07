import { useState, useEffect } from 'react';

function useCurrencyConverter() {
  const [rates, setRates] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState(null);
  const API_URL = 'https://api.exchangerate.host/latest?base=USD';

  const fetchRates = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(API_URL);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setRates(data.rates);
      setLastUpdate(new Date());
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch exchange rates. Please try again later.');
      setLoading(false);
      console.error('Error fetching rates:', err);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchRates();
    
    const interval = setInterval(fetchRates, 60 * 60 * 1000);
    
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const convertCurrency = (amount, fromCurrency = 'USD', toCurrency = 'EUR') => {
    if (!rates) return amount;
    if (fromCurrency === toCurrency) return amount;
    
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
      return `${symbol} ${Math.round(amount).toLocaleString('es-CO')}`;
    }
    
    return `${symbol}${amount.toFixed(2)}`;
  };

  return {
    rates,
    loading,
    error,
    lastUpdate,
    convertCurrency,
    formatCurrency,
    refreshRates: fetchRates
  };
}

export default useCurrencyConverter;