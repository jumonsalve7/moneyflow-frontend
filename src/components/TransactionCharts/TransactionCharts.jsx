import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import './TransactionCharts.css';

function TransactionCharts({ transactions }) { 
  const getExpensesByCategory = () => {
    const expensesByCategory = {};
    
    transactions
      .filter(t => t.type === 'expense')
      .forEach(expense => {
        const category = expense.category;
        if (expensesByCategory[category]) {
          expensesByCategory[category] += expense.amount;
        } else {
          expensesByCategory[category] = expense.amount;
        }
      });
    
    return Object.entries(expensesByCategory).map(([name, value]) => ({
      name,
      value: parseFloat(value.toFixed(2))
    }));
  };

  const getMonthlyData = () => {
    const monthlyDataMap = {}; 
    
    transactions.forEach(transaction => {

      const [year, month, day] = transaction.date.split('-');
      const monthKey = `${year}-${month}`;
      const date = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      const monthName = date.toLocaleString('default', { month: 'long' });
      const displayMonth = `${monthName} ${year}`;
      
      if (!monthlyDataMap[monthKey]) {
        monthlyDataMap[monthKey] = { 
          month: displayMonth,
          monthKey: monthKey,
          income: 0, 
          expense: 0 
        };
      }
      
      if (transaction.type === 'income') {
        monthlyDataMap[monthKey].income += transaction.amount;
      } else {
        monthlyDataMap[monthKey].expense += transaction.amount;
      }
    });
    
    return Object.values(monthlyDataMap) 
      .sort((a, b) => a.monthKey.localeCompare(b.monthKey))
      .map((data) => ({
        month: data.month,
        income: parseFloat(data.income.toFixed(2)),
        expense: parseFloat(data.expense.toFixed(2))
      }));
  };

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', '#82CA9D', '#FF6B6B', '#4ECDC4'];

  const expensesByCategory = getExpensesByCategory();
  const monthlyData = getMonthlyData();  

  if (transactions.length === 0) {
    return (
      <div className="charts-container">
        <div className="charts-empty">
          <p>📊 Add some transactions to see charts!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="charts-container">
      <h2 className="charts-title">Financial Analytics</h2>
      
      <div className="charts-grid">
        <div className="chart-card">
          <h3 className="chart-card__title">Expenses by Category</h3>
          {expensesByCategory.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={expensesByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {expensesByCategory.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <p className="chart-card__empty">No expenses to display</p>
          )}
        </div>

        <div className="chart-card">
          <h3 className="chart-card__title">Income vs Expenses by Month</h3>
          {monthlyData.length > 0 ? (
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip formatter={(value) => `$${value}`} />
                <Legend />
                <Bar dataKey="income" fill="#4CAF50" name="Income 💰" />
                <Bar dataKey="expense" fill="#F44336" name="Expense 💸" />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <p className="chart-card__empty">No monthly data to display</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default TransactionCharts;