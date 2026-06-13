import { useState } from 'react';
import ConfirmModal from '../ConfirmModal/ConfirmModal';
import "./TransactionCard.css";

function TransactionCard({ 
  transaction, 
  onDeleteTransaction, 
  onCardLike, 
  onEditTransaction,
  formatCurrency,
  selectedCurrency
}) {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  
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
  
  const amountToShow = transaction.displayAmount !== undefined 
    ? transaction.displayAmount 
    : transaction.amount;
  
  const currencyToShow = transaction.displayCurrency || selectedCurrency || 'USD';
  
  const displayAmount = formatCurrency(amountToShow, currencyToShow);
  const showOriginalCurrency = transaction.originalAmount && 
                               transaction.originalCurrency && 
                               transaction.originalCurrency !== currencyToShow;
  
  const handleDeleteClick = () => {
    setIsDeleteModalOpen(true);
  };
  
  const handleConfirmDelete = () => {
    onDeleteTransaction(transaction.id);
    setIsDeleteModalOpen(false);
  };
  
  const handleCancelDelete = () => {
    setIsDeleteModalOpen(false);
  };
  
  return (
    <>
      <div className="transaction-card">
        <div className="transaction-card__info">
          <div className="transaction-card__header">
            <span className="transaction-card__date">{formatDate(transaction.date)}</span>
            <span className="transaction-card__type-icon">{typeIcon}</span>
          </div>
          <h4 className="transaction-card__name">{transaction.name}</h4>
          <span className="transaction-card__category">{transaction.category}</span>
          
          {showOriginalCurrency && (
            <span className="transaction-card__original-amount">
              ({formatCurrency(transaction.originalAmount, transaction.originalCurrency)} originally)
            </span>
          )}
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
            onClick={handleDeleteClick}
          >
            Delete
          </button>
        </div>
      </div>
      
      <ConfirmModal
        isOpen={isDeleteModalOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Delete Transaction"
        message="Are you sure you want to delete this transaction?"
        transactionName={transaction.name}
        amount={displayAmount}
      />
    </>
  );
}

export default TransactionCard;