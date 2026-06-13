import { useState, useEffect, useMemo } from "react";
import "./App.css";
import "../Header/Header.css";
import AddTransactionForm from "../AddTransactionForm/AddTransactionForm";
import SearchForm from "../SearchForm/SearchForm";
import TransactionList from "../TransactionList/TransactionList";
import TransactionCharts from "../TransactionCharts/TransactionCharts";
import EditModal from "../EditModal/EditModal";
import CurrencySelector from "../CurrencySelector/CurrencySelector";
import useCurrencyConverter from "../../hooks/useCurrencyConverter";
import ExportCSV from "../ExportCSV/ExportCSV";
import Login from "../Auth/Login";
import Register from "../Auth/Register";
import { useAuth, AuthProvider } from "../../context/AuthContext";
import {
  getTransactions,
  createTransaction,
  updateTransaction,
  deleteTransaction,
} from "../../services/api";

// Componente interno que tiene acceso al contexto de autenticación
function AppContent() {
  const [transactions, setTransactions] = useState([]);
  const [editingTransaction, setEditingTransaction] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [loading, setLoading] = useState(true);
  const [authMode, setAuthMode] = useState("login"); // "login" o "register"

  const { user, loading: authLoading } = useAuth();
  const {
    rates,
    loading: ratesLoading,
    error,
    formatCurrency,
  } = useCurrencyConverter();

  const normalizeTransaction = (transaction) => ({
    ...transaction,
    id: transaction._id || transaction.id,
    _id: transaction._id,
  });

  const normalizeTransactions = (transactions) =>
    transactions.map(normalizeTransaction);

  const loadTransactions = async () => {
    setLoading(true);
    try {
      const data = await getTransactions();
      setTransactions(normalizeTransactions(data));
    } catch (error) {
      console.error("Error loading transactions:", error);
    } finally {
      setLoading(false);
    }
  };

  // Cargar transacciones desde el backend cuando el usuario está autenticado
  useEffect(() => {
    if (user) {
      // eslint-disable-next-line react-hooks/set-state-in-effect
      loadTransactions();
    }
  }, [user]);

  // ✅ Transacciones con conversión de moneda
  const displayTransactions = useMemo(() => {
    if (!rates || selectedCurrency === "USD") {
      return transactions.map((t) => ({
        ...t,
        displayAmount: t.amount,
        displayCurrency: "USD",
      }));
    }

    const rate = rates[selectedCurrency];
    return transactions.map((t) => ({
      ...t,
      displayAmount: t.amount * rate,
      displayCurrency: selectedCurrency,
      originalAmount: t.amount,
      originalCurrency: "USD",
    }));
  }, [transactions, rates, selectedCurrency]);

  // ✅ Transacciones filtradas
  const filteredTransactions = useMemo(() => {
    let filtered = [...displayTransactions];

    if (searchTerm) {
      filtered = filtered.filter((t) =>
        t.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    }

    if (categoryFilter !== "all") {
      filtered = filtered.filter((t) => t.category === categoryFilter);
    }

    if (startDate) {
      filtered = filtered.filter((t) => t.date >= startDate);
    }

    if (endDate) {
      filtered = filtered.filter((t) => t.date <= endDate);
    }

    return filtered;
  }, [displayTransactions, searchTerm, categoryFilter, startDate, endDate]);

  // ✅ Estadísticas
  const { totalIncome, totalExpenses, balance } = useMemo(() => {
    const totalIncome = displayTransactions
      .filter((t) => t.type === "income")
      .reduce((sum, t) => sum + t.displayAmount, 0);

    const totalExpenses = displayTransactions
      .filter((t) => t.type === "expense")
      .reduce((sum, t) => sum + t.displayAmount, 0);

    const balance = totalIncome - totalExpenses;

    return { totalIncome, totalExpenses, balance };
  }, [displayTransactions]);

  // CRUD operations con API
 const handleAddTransaction = async (newTransaction) => {
  try {
    const created = await createTransaction(newTransaction);
    setTransactions([normalizeTransaction(created), ...transactions]);
  } catch (error) {
    console.error("Error creating transaction:", error);
  }
};

  const handleDeleteTransaction = async (id) => {
    try {
      const transactionToDelete = transactions.find((t) => t.id === id);
      if (!transactionToDelete) {
        console.error("Transaction not found in state");
        return;
      }

      await deleteTransaction(transactionToDelete._id || id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting transaction:", error);
      alert("Failed to delete transaction. Please try again.");
    }
  };

  const handleCardLike = async (id) => {
    const transaction = transactions.find((t) => t.id === id);
    if (transaction) {
      const updated = { ...transaction, isLiked: !transaction.isLiked };
      try {
        await updateTransaction(transaction._id, updated);
        setTransactions(transactions.map((t) => (t.id === id ? updated : t)));
      } catch (error) {
        console.error("Error updating like:", error);
      }
    }
  };

  const handleEditTransaction = (transaction) => {
    setEditingTransaction(transaction);
  };

  const handleSaveEdit = async (updatedTransaction) => {
    try {
      await updateTransaction(updatedTransaction.id, updatedTransaction);
      setTransactions(
        transactions.map((t) =>
          t.id === updatedTransaction.id ? updatedTransaction : t,
        ),
      );
      setEditingTransaction(null);
    } catch (error) {
      console.error("Error updating transaction:", error);
      alert("Failed to update transaction. Please try again.");
    }
  };

  const handleCurrencyChange = (newCurrency) => {
    setSelectedCurrency(newCurrency);
  };

  // Mostrar pantalla de carga mientras se verifica autenticación
  if (authLoading || (user && loading)) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  // Si no está autenticado, mostrar login/registro
  if (!user) {
    if (authMode === "login") {
      return <Login onSwitchToRegister={() => setAuthMode("register")} />;
    } else {
      return <Register onSwitchToLogin={() => setAuthMode("login")} />;
    }
  }

  // Usuario autenticado - mostrar la aplicación principal
  return (
    <div className="page">
      <header className="header">
        <div className="header__top">
          <div className="header__title-container">
            <h1 className="header__title">MoneyFlow</h1>
            <p className="header__subtitle">Your personal expense tracker</p>
          </div>

          <div className="header__right">
            <div className="header__user">
              <span className="header__user-name">👋 {user.name}</span>
              <button
                onClick={() => {
                  localStorage.removeItem("token");
                  window.location.reload();
                }}
                className="header__logout-btn"
              >
                Logout
              </button>
            </div>
            <CurrencySelector
              onCurrencyChange={handleCurrencyChange}
              currentCurrency={selectedCurrency}
            />
          </div>
        </div>
      </header>

      <main className="content">
        <section className="dashboard">
          {rates && selectedCurrency !== "USD" && (
            <div className="dashboard__rate-info">
              💱 1 USD = {rates[selectedCurrency]} {selectedCurrency}
              {ratesLoading && (
                <span className="dashboard__rate-loading"> (updating...)</span>
              )}
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
              <p
                className={`dashboard__stat-amount ${
                  balance >= 0
                    ? "dashboard__stat-amount--positive"
                    : "dashboard__stat-amount--negative"
                }`}
              >
                {formatCurrency(balance, selectedCurrency)}
              </p>
            </div>
          </div>

          <TransactionCharts transactions={displayTransactions} />

          <div className="dashboard__info">
            <p className="dashboard__stats">
              Showing {filteredTransactions.length} of{" "}
              {displayTransactions.length} transactions
            </p>
          </div>

          <ExportCSV
            transactions={displayTransactions}
            selectedCurrency={selectedCurrency}
            formatCurrency={formatCurrency}
          />

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
            transactions={filteredTransactions}
            onDeleteTransaction={handleDeleteTransaction}
            onCardLike={handleCardLike}
            onEditTransaction={handleEditTransaction}
            formatCurrency={formatCurrency}
            selectedCurrency={selectedCurrency}
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

// Componente principal que envuelve todo con el proveedor de autenticación
function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
