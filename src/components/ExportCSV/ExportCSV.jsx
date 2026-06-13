import './ExportCSV.css';

function ExportCSV({ transactions, selectedCurrency, formatCurrency }) {
  const exportToCSV = () => {
    if (!transactions.length) {
      alert('No transactions to export!');
      return;
    }

    const headers = [
      'Date',
      'Description',
      'Category',
      'Type',
      'Original Amount',
      'Original Currency',
      `Amount (${selectedCurrency})`,
      'Liked'
    ];

    const rows = transactions.map(t => [
      t.date,
      t.name,
      t.category,
      t.type === 'income' ? '💰 Income' : '💸 Expense',
      t.originalAmount ? t.originalAmount.toFixed(2) : t.amount.toFixed(2),
      t.originalCurrency || 'USD',
      formatCurrency(t.displayAmount || t.amount, selectedCurrency),
      t.isLiked ? '❤️ Yes' : '🤍 No'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob(["\uFEFF" + csvContent], { type: 'text/csv;charset=utf-8;' });
    
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    
    const now = new Date();
    const fileName = `moneyflow_${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}_${now.getHours()}-${now.getMinutes()}.csv`;
    
    link.setAttribute('href', url);
    link.setAttribute('download', fileName);
    link.style.visibility = 'hidden';
    
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="export-csv">
      <button className="export-csv__button" onClick={exportToCSV}>
        📥 Export to CSV
      </button>
    </div>
  );
}

export default ExportCSV;