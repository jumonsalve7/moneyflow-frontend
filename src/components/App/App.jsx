import { useState, useEffect } from "react";
import "./App.css";
import "../Header/Header.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import SearchForm from "../SearchForm/SearchForm";
import TransactionList from "../TransactionList/TransactionList";
import TransactionCharts from "../TransactionCharts/TransactionCharts";
import EditModal from "../EditModal/EditModal";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import useCurrencyConverter from "../../hooks/useCurrencyConverter";

function App() {
  const [transactions, setTransactions] = useState(() => {
    const savedTransactions = localStorage.getItem("moneyflow-transactions");
    if (savedTransactions) {
      return JSON.parse(savedTransactions);
    }
    return [];
  });

  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  
  const [selectedCurrency, setSelectedCurrency] = useState('USD');
  
  const { rates, loading, error, convertCurrency, formatCurrency } = useCurrencyConverter();

  useEffect(() => {
    if (transactions.length > 0) {
      localStorage.setItem("moneyflow-transactions", JSON.stringify(transactions));
    } else {
      localStorage.removeItem("moneyflow-transactions");
    }
  }, [transactions]);

  const convertTransaction = (transaction) => {
    if (selectedCurrency === 'USD' || !rates) {
      return transaction;
    }
    
    const convertedAmount = convertCurrency(transaction.amount, 'USD', selectedCurrency);
    return {
      ...transaction,
      originalAmount: transaction.amount,
      amount: convertedAmount,
      currency: selectedCurrency
    };
  };

  const getFinancialStats = () => {
    const convertedTransactions = transactions.map(t => convertTransaction(t));
    
    const totalIncome = convertedTransactions
      .filter(t => t.type === 'income')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const totalExpenses = convertedTransactions
      .filter(t => t.type === 'expense')
      .reduce((sum, t) => sum + t.amount, 0);
    
    const balance = totalIncome - totalExpenses;
    
    return { totalIncome, totalExpenses, balance };
  };
  const getFilteredTransactions = () => {
    let filtered = [...transactions];

    if (searchTerm) {
      filtered = filtered.filter(t =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (categoryFilter !== 'all') {
      filtered = filtered.filter(t => t.category === categoryFilter);
    }

    if (startDate) {
      filtered = filtered.filter(t => t.date >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter(t => t.date <= endDate);
    }

    return filtered;
  };

  const filteredTransactions = getFilteredTransactions();
  const { totalIncome, totalExpenses, balance } = getFinancialStats();

  const handleAddTransaction = (newTransaction) => {
    setTransactions([...transactions, { ...newTransaction, isLiked: false }]);
  };

  const handleDeleteTransaction = (id) => {
    const updatedTransactions = transactions.filter((t) => t.id !== id);
    setTransactions(updatedTransactions);
  };

  const handleCardLike = (id) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === id ? { ...t, isLiked: !t.isLiked } : t,
    );
    setTransactions(updatedTransactions);
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = (updatedTransaction) => {
    const updatedTransactions = transactions.map((t) =>
      t.id === updatedTransaction.id ? updatedTransaction : t
    );
    setTransactions(updatedTransactions);
    setEditingTransaction(null);
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  return (
    <div className="page">
      <header className="header">
        <div className="header__top">
          <div className="header__title-container">
            <h1 className="header__title">MoneyFlow</h1>
            <p className="header__subtitle">Your personal expense tracker</p>
          </div>
  
          <CurrencySelector 
            onCurrencyChange={handleCurrencyChange}
            currentCurrency={selectedCurrency}
          />
        </div>
      </header>

      <main className="content">
        <section className="dashboard">

          {rates && selectedCurrency !== 'USD' && (
            <div className="dashboard__rate-info">
              💱 1 USD = {rates[selectedCurrency]} {selectedCurrency}
              {loading && <span className="dashboard__rate-loading"> (updating...)</span>}
            </div>
          )}
          {error && (
            <div className="dashboard__rate-error">
              ⚠️ {error} - Using USD as fallback
            </div>
          )}

          <div className="dashboard__stats-container">
            <div className="dashboard__stat-card">
              <h3 className="dashboard__stat-title">Total Income</h3>
              <p className="dashboard__stat-amount dashboard__stat-amount--income">
                {formatCurrency(totalIncome, selectedCurrency)}
              </p>
            </div>
            <div className="dashboard__stat-card">
              <h3 className="dashboard__stat-title">Total Expenses</h3>
              <p className="dashboard__stat-amount dashboard__stat-amount--expense">
                {formatCurrency(totalExpenses, selectedCurrency)}
              </p>
            </div>
            <div className="dashboard__stat-card">
              <h3 className="dashboard__stat-title">Balance</h3>
              <p className={`dashboard__stat-amount ${
                balance >= 0 
                  ? 'dashboard__stat-amount--positive' 
                  : 'dashboard__stat-amount--negative'
              }`}>
                {formatCurrency(balance, selectedCurrency)}
              </p>
            </div>
          </div>

          <TransactionCharts transactions={transactions} />

          <div className="dashboard__info">
            <p className="dashboard__stats">
              Showing {filteredTransactions.length} of {transactions.length} transactions
            </p>
          </div>

          <AddTransactionForm onAddTransaction={handleAddTransaction} />
          
          <SearchForm 
            onSearch={setSearchTerm}
            onFilterCategory={setCategoryFilter}
            onFilterDateRange={(start, end) => {
              setStartDate(start);
              setEndDate(end);
            }}
          />
          
          <TransactionList
            transactions={filteredTransactions.map(t => convertTransaction(t))} 
            onDeleteTransaction={handleDeleteTransaction} 
            onCardLike={handleCardLike}
            onEditTransaction={handleEditTransaction}
            selectedCurrency={selectedCurrency}
            formatCurrency={formatCurrency}
          />
        </section>
      </main>

      <footer className="footer">
        <p className="footer__copyright">&copy; 2026 MoneyFlow by Juan Pablo</p>
      </footer>

      {editingTransaction && (
        <EditModal
          transaction={editingTransaction}
          onSave={handleSaveEdit}
          onClose={() => setEditingTransaction(null)}
        />
      )}
    </div>
  );
}

export default App;