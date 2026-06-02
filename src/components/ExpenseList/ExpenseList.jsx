import ExpenseCard from "../ExpenseCard/ExpenseCard";
import "./ExpenseList.css";

function ExpenseList({ expenses, onDeleteExpense }) {
  if (expenses.length === 0) {
    return (
      <div className="expense-list expense-list_empty">
        <p className="expense-list__message">
          No expenses added yet. Start tracking your money flow!
        </p>
      </div>
    );
  }

  return (
    <div className="expense-list">
      <h3 className="expense-list__title">Recent Expenses</h3>
      <div className="expense-list__grid">
        {expenses.map((expense) => (
          <ExpenseCard
            key={expense.id}
            expense={expense}
            onDeleteExpense={onDeleteExpense}
          />
        ))}
      </div>
    </div>
  );
}

export default ExpenseList;
