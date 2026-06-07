import "./TransactionCard.css";

function TransactionCard({ 
  transaction, 
  onDeleteTransaction, 
  onCardLike, 
  onEditTransaction,
  formatCurrency 
}) {
  const isIncome = transaction.type === 'income';
  
  const formatDate = (isoDate) => {
    if (!isoDate) return '';
    const [year, month, day] = isoDate.split('-');
    return `${day}/${month}/${year}`;
  };
  
  const amountClassName = `transaction-card__amount ${
    isIncome
      ? "transaction-card__amount--income"
      : "transaction-card__amount--expense"
  }`;
  
  const typeIcon = isIncome ? "💰" : "💸";
  const displayAmount = formatCurrency(transaction.amount, transaction.currency || 'USD');
  
  return (
    <div className="transaction-card">
      <div className="transaction-card__info">
        <div className="transaction-card__header">
          <span className="transaction-card__date">{formatDate(transaction.date)}</span>
          <span className="transaction-card__type-icon">{typeIcon}</span>
        </div>
        <h4 className="transaction-card__name">{transaction.name}</h4>
        <span className="transaction-card__category">{transaction.category}</span>
      </div>
      <div className="transaction-card__actions">
        <span className={amountClassName}>
          {isIncome ? "+" : "-"}{displayAmount}
        </span>
        <button
          className="transaction-card__like-btn"
          onClick={() => onCardLike(transaction.id)}
        >
          {transaction.isLiked ? "❤️" : "🤍"}
        </button>
        <button
          className="transaction-card__edit-btn"
          onClick={() => onEditTransaction(transaction)}
        >
          ✏️ Edit
        </button>
        <button
          className="transaction-card__delete-btn"
          onClick={() => onDeleteTransaction(transaction.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TransactionCard;