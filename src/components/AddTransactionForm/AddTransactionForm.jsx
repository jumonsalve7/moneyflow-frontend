import { useState } from 'react';
import './AddTransactionForm.css';
import useCurrencyConverter from '../../hooks/useCurrencyConverter';

function AddTransactionForm({ onAddTransaction }) {
  const [isOpen, setIsOpen] = useState(false);
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [type, setType] = useState('expense');
  const [category, setCategory] = useState('Food');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [currency, setCurrency] = useState('USD');
  const [isConverting, setIsConverting] = useState(false);
  
  const { convertCurrency, rates, loading } = useCurrencyConverter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    const finalCategory = category === 'custom' ? customCategory : category;
    if (category === 'custom' && !customCategory.trim()) return;

    const amountValue = parseFloat(amount);
    setIsConverting(true);
    
    try {
      // ✅ Convertir el monto a USD si es necesario (usando await)
      let amountInUSD = amountValue;
      if (currency !== 'USD') {
        if (rates) {
          // Usar la API para conversión precisa
          amountInUSD = await convertCurrency(amountValue, currency, 'USD');
          console.log(`💰 Converting ${amountValue} ${currency} → ${amountInUSD} USD`);
        } else {
          // Fallback si no hay tasas disponibles
          const fallbackRates = { 
            USD: 1, 
            EUR: 1.08, 
            GBP: 1.27, 
            COP: 0.00026 
          };
          amountInUSD = amountValue * fallbackRates[currency];
          console.warn(`⚠️ Using fallback rate: ${amountValue} ${currency} → ${amountInUSD} USD`);
        }
      }

      const newTransaction = {
        name: name,
        amount: parseFloat(amountInUSD.toFixed(2)),
        originalAmount: amountValue,
        originalCurrency: currency,
        type: type,
        category: finalCategory,
        date: date,
        isLiked: false
      };

      console.log('📦 Saving transaction:', newTransaction);
      await onAddTransaction(newTransaction);

      // Reset form
      setName('');
      setAmount('');
      setType('expense');
      setCustomCategory('');
      setCategory('Food');
      setDate(new Date().toISOString().split('T')[0]);
      setCurrency('USD');
      setIsOpen(false);
    } catch (error) {
      console.error('Error converting currency:', error);
      alert('Error converting currency. Please try again.');
    } finally {
      setIsConverting(false);
    }
  };

  if (!isOpen) {
    return (
      <div className="add-transaction__toggle-container">
        <button 
          type="button" 
          className="add-transaction__toggle-button"
          onClick={() => setIsOpen(true)}
        >
          + Add New Transaction
        </button>
      </div>
    );
  }

  return (
    <form className="add-transaction-form" onSubmit={handleSubmit}>
      <h3 className="add-transaction-form__title">Add New Transaction</h3>
      
      {/* Selector de tipo (Income/Expense) */}
      <div className="add-transaction-form__field">
        <label className="add-transaction-form__label">Transaction Type:</label>
        <div className="add-transaction-form__type-group">
          <button
            type="button"
            className={`add-transaction-form__type-btn ${
              type === 'expense' ? 'add-transaction-form__type-btn--active-expense' : ''
            }`}
            onClick={() => setType('expense')}
          >
            💸 Expense
          </button>
          <button
            type="button"
            className={`add-transaction-form__type-btn ${
              type === 'income' ? 'add-transaction-form__type-btn--active-income' : ''
            }`}
            onClick={() => setType('income')}
          >
            💰 Income
          </button>
        </div>
      </div>

      <div className="add-transaction-form__field">
        <input 
          type="text" 
          className="add-transaction-form__input" 
          placeholder="Description (e.g., Groceries, Salary)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      {/* Monto con selector de moneda */}
      <div className="add-transaction-form__field">
        <label className="add-transaction-form__label">Amount:</label>
        <div className="add-transaction-form__amount-group">
          <input 
            type="number" 
            step="0.01"
            className="add-transaction-form__input add-transaction-form__input--amount" 
            placeholder="0.00"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
          <select 
            className="add-transaction-form__currency-select"
            value={currency}
            onChange={(e) => setCurrency(e.target.value)}
            disabled={loading}
          >
            <option value="USD">USD ($)</option>
            <option value="EUR">EUR (€)</option>
            <option value="GBP">GBP (£)</option>
            <option value="COP">COP (COL$)</option>
          </select>
        </div>
        {loading && (
          <small className="add-transaction-form__rate-warning">
            Loading exchange rates...
          </small>
        )}
      </div>

      <div className="add-transaction-form__field">
        <input 
          type="date" 
          className="add-transaction-form__input" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="add-transaction-form__field">
        <select 
          className="add-transaction-form__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Salary">Salary</option>
          <option value="Freelance">Freelance</option>
          <option value="custom">✨ Create category...</option>
        </select>
      </div>

      {category === 'custom' && (
        <div className="add-transaction-form__field">
          <input 
            type="text" 
            className="add-transaction-form__input add-transaction-form__input--custom" 
            placeholder="Write your custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        </div>
      )}

      <div className="add-transaction-form__actions">
        <button 
          type="submit" 
          className="add-transaction-form__button"
          disabled={isConverting || loading}
        >
          {isConverting ? 'Converting...' : 'Add Transaction'}
        </button>
        <button 
          type="button" 
          className="add-transaction-form__cancel-button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default AddTransactionForm;