import { useState } from "react";
import "./EditModal.css";

function EditModal({ transaction, onSave, onClose }) {
  const [name, setName] = useState(transaction.name);
  const [amount, setAmount] = useState(transaction.amount);
  const [type, setType] = useState(transaction.type);
  const [category, setCategory] = useState(transaction.category);
  const [date, setDate] = useState(transaction.date); 

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const updatedTransaction = {
      ...transaction,
      name: name,
      amount: parseFloat(amount),
      type: type,
      category: category,
      date: date // Mantener ISO
    };
    
    onSave(updatedTransaction);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Transaction</h2>
        <form onSubmit={handleSubmit}>
          <div className="modal-field">
            <label>Description:</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="modal-field">
            <label>Amount ($):</label>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="modal-field">
            <label>Type:</label>
            <select value={type} onChange={(e) => setType(e.target.value)}>
              <option value="expense">Expense 💸</option>
              <option value="income">Income 💰</option>
            </select>
          </div>

          <div className="modal-field">
            <label>Category:</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
            />
          </div>

          <div className="modal-field">
            <label>Date:</label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="submit" className="save-btn">Save Changes</button>
            <button type="button" onClick={onClose} className="cancel-btn">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditModal;