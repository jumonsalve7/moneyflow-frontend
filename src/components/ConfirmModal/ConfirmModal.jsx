import './ConfirmModal.css';

function ConfirmModal({ isOpen, onClose, onConfirm, title, message, transactionName, amount }) {
  if (!isOpen) return null;

  return (
    <div className="confirm-modal-overlay" onClick={onClose}>
      <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="confirm-modal__icon">
          <span className="confirm-modal__icon-emoji">⚠️</span>
        </div>
        
        <h3 className="confirm-modal__title">{title || 'Delete Transaction'}</h3>
        
        <p className="confirm-modal__message">{message || 'Are you sure you want to delete this transaction?'}</p>
        
        {transactionName && (
          <div className="confirm-modal__details">
            <div className="confirm-modal__detail-item">
              <span className="confirm-modal__detail-label">Transaction:</span>
              <span className="confirm-modal__detail-value">{transactionName}</span>
            </div>
            {amount && (
              <div className="confirm-modal__detail-item">
                <span className="confirm-modal__detail-label">Amount:</span>
                <span className="confirm-modal__detail-value confirm-modal__detail-value--highlight">
                  {amount}
                </span>
              </div>
            )}
          </div>
        )}
        
        <p className="confirm-modal__warning">This action cannot be undone.</p>
        
        <div className="confirm-modal__actions">
          <button 
            className="confirm-modal__button confirm-modal__button--cancel"
            onClick={onClose}
          >
            Cancel
          </button>
          <button 
            className="confirm-modal__button confirm-modal__button--confirm"
            onClick={onConfirm}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;