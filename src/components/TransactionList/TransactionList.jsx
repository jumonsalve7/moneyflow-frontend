import TransactionCard from "../TransactionCard/TransactionCard";
import "./TransactionList.css";

function TransactionList({
  transactions,
  onDeleteTransaction,
  onCardLike,
  onEditTransaction,
  formatCurrency,
}) {
  if (transactions.length === 0) {
    return (
      <div className="transaction-list transaction-list--empty">
        <p className="transaction-list__message">
          No transactions added yet. Start tracking your money flow!
        </p>
      </div>
    );
  }

  return (
    <div className="transaction-list">
      <h3 className="transaction-list__title">Recent Transactions</h3>
      <div className="transaction-list__grid">
        {transactions.map((transaction) => (
          <TransactionCard
            key={transaction.id}
            transaction={transaction}
            onDeleteTransaction={onDeleteTransaction}
            onCardLike={onCardLike}
            onEditTransaction={onEditTransaction}
            formatCurrency={formatCurrency}
          />
        ))}
      </div>
    </div>
  );
}

export default TransactionList;
