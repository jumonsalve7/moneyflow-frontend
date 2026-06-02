import "./ExpenseCard.css";

function ExpenseCard({ expense, onDeleteExpense }) {
  const isNegative = expense.amount < 0;
  const amountClassName = `expense-card__amount ${
    isNegative
      ? "expense-card__amount_type_negative"
      : "expense-card__amount_type_positive"
  }`;
  return (
    <div className="expense-card">
      <div className="expense-card__info">
        <span className="expense-card__date">{expense.date}</span>
        <h4 className="expense-card__name">{expense.name}</h4>
        <span className="expense-card__category">{expense.category}</span>
      </div>
      <div className="expense-card__actions">
        <span className={amountClassName}>
          ${expense.amount.toFixed(2)}
        </span>
        <button
          className="expense-card__delete-btn"
          onClick={() => onDeleteExpense(expense.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default ExpenseCard;
