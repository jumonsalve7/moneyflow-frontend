import { useState } from "react";
import "./App.css";
import SearchForm from "../SearchForm/SearchForm";
import ExpenseList from "../ExpenseList/ExpenseList";

function App() {
  const [expenses, setExpenses] = useState([]);

  const handleAddExpense = (newExpense) => {
    setExpenses([...expenses, newExpense]);
  };

  const handleDeleteExpense = (id) => {
    const updatedExpenses = expenses.filter((expense) => expense.id !== id);
    setExpenses(updatedExpenses);
  };

  const totalBalance = expenses.reduce((total, expense) => {
    return total + expense.amount;
  }, 0);

  return (
    <div className="page">
      <header className="header">
        <h1 className="header__title">MoneyFlow</h1>
        <p className="header__subtitle">Your personal expense tracker</p>
      </header>

      <main className="content">
        <section className="dashboard">
          <div className="dashboard__balance">
            <h2>Total Balance: ${totalBalance.toFixed(2)}</h2>
          </div>

          <SearchForm onAddExpense={handleAddExpense} />
          <ExpenseList expenses={expenses} onDeleteExpense={handleDeleteExpense} />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2026 MoneyFlow by Juan Pablo</p>
      </footer>
    </div>
  );
}

export default App;
