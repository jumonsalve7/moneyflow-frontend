import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onAddExpense }) {
  const [isOpen, setIsOpen] = useState(false);

  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food');
  const [customCategory, setCustomCategory] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !amount || !date) return;

    const finalCategory = category === 'custom' ? customCategory : category;
    if (category === 'custom' && !customCategory.trim()) return;

    const newExpense = {
      id: crypto.randomUUID(),
      name: name,
      amount: parseFloat(amount),
      category: finalCategory,
      date: new Date(date).toLocaleDateString()
    };

    onAddExpense(newExpense);

    setName('');
    setAmount('');
    setCustomCategory('');
    setCategory('Food');
    setDate(new Date().toISOString().split('T')[0]);
    
    setIsOpen(false);
  };

  if (!isOpen) {
    return (
      <div className="search-form__toggle-container">
        <button 
          type="button" 
          className="search-form__toggle-button"
          onClick={() => setIsOpen(true)}
        >
          + Add New Expense
        </button>
      </div>
    );
  }

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      {/* Tu título original e intacto arriba */}
      <h3 className="search-form__title">Add New Expense</h3>
      
      <div className="search-form__field">
        <input 
          type="text" 
          className="search-form__input" 
          placeholder="Expense name (e.g., Groceries)"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="search-form__field">
        <input 
          type="number" 
          className="search-form__input" 
          placeholder="Amount ($)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
      </div>

      <div className="search-form__field">
        <input 
          type="date" 
          className="search-form__input" 
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
      </div>

      <div className="search-form__field">
        <select 
          className="search-form__select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Utilities">Utilities</option>
          <option value="Entertainment">Entertainment</option>
          <option value="custom">✨ Create category...</option>
        </select>
      </div>

      {category === 'custom' && (
        <div className="search-form__field">
          <input 
            type="text" 
            className="search-form__input search-form__input_type_custom" 
            placeholder="Write your custom category"
            value={customCategory}
            onChange={(e) => setCustomCategory(e.target.value)}
            required
          />
        </div>
      )}

      {/* Agrupamos los botones al final para que no rompan el diseño del formulario */}
      <div className="search-form__actions">
        <button type="submit" className="search-form__button">Add Expense</button>
        <button 
          type="button" 
          className="search-form__cancel-button"
          onClick={() => setIsOpen(false)}
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

export default SearchForm;