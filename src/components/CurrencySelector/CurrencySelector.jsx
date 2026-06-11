import './CurrencySelector.css';

function CurrencySelector({ onCurrencyChange, currentCurrency }) {
  // Monedas soportadas por la API (ExchangeRate-API)
  const supportedCurrencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD', 'CHF', 'CNY', 'MXN', 'COP'];

  // Mapa de símbolos para mostrar
  const currencySymbols = {
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

  const handleCurrencyChange = (e) => {
    const newCurrency = e.target.value;
    onCurrencyChange(newCurrency);
  };

  return (
    <div className="currency-selector">
      <label className="currency-selector__label">Currency:</label>
      <select 
        className="currency-selector__select"
        value={currentCurrency}
        onChange={handleCurrencyChange}
      >
        {supportedCurrencies.map(currency => (
          <option key={currency} value={currency}>
            {currency} ({currencySymbols[currency]})
          </option>
        ))}
      </select>
    </div>
  );
}

export default CurrencySelector;