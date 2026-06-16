# 💰 MoneyFlow - Personal Finance Tracker

A modern, full-featured expense tracking application built with React. MoneyFlow helps you manage your personal finances by tracking incomes and expenses, visualizing spending patterns, and converting between multiple currencies.

## 🚀 Live Demo

**Frontend:** [https://moneyflow-frontend-alpha.vercel.app](https://moneyflow-frontend-alpha.vercel.app)

**Backend API:** [https://moneyflow-backend-zybb.onrender.com/api/health](https://moneyflow-backend-zybb.onrender.com/api/health)

## ✨ Features Implemented

### ✅ Completed Features

| Feature | Description |
|---------|-------------|
| **Transaction Management** | Full CRUD operations: Create, Read, Update, Delete transactions |
| **Income vs Expenses** | Differentiate between money coming in and going out with color-coded displays |
| **User Authentication** | Secure registration and login with JWT |
| **Cloud Storage** | All data stored in MongoDB Atlas via REST API |
| **Search & Filters** | Search by name, filter by category, and filter by date range |
| **Analytics Charts** | Interactive pie chart (expenses by category) and bar chart (monthly comparison) |
| **Currency Conversion** | Real-time exchange rates with support for 10+ currencies including USD, EUR, COP |
| **Responsive Design** | Grid layout that adapts to any screen size |
| **BEM CSS Methodology** | Scalable and maintainable styling architecture |
| **Like/Favorite System** | Mark important transactions as favorites |
| **Export to CSV** | Download all transactions as CSV file for Excel/Google Sheets |

### 🗺️ Roadmap - Features to Implement

- [ ] **Budget Categories** - Set monthly budgets per category with alerts
- [ ] **Recurring Transactions** - Automate regular incomes/expenses (subscriptions, salary)
- [ ] **Dark/Light Mode** - Theme toggle for better user experience
- [ ] **Category Icons** - Visual icons for each expense category (🍔, 🚗, 💡)
- [ ] **Trend Line Chart** - See spending trends over time
- [ ] **Mobile App** - React Native version for iOS/Android

## 🛠️ Tech Stack

### Frontend
- **Framework:** React 18
- **Build Tool:** Vite
- **Charts:** Recharts
- **HTTP Client:** Fetch API (native)
- **Currency API:** ExchangeRate API
- **Styling:** CSS with BEM methodology
- **State Management:** React Hooks (useState, useEffect, useContext)
- **Deployment:** Vercel

### Backend
- **Runtime:** Node.js
- **Framework:** Express.js
- **Database:** MongoDB Atlas
- **Authentication:** JWT with bcrypt
- **Deployment:** Render

## 📁 Project Structure
moneyflow-frontend/
├── src/
│ ├── components/
│ │ ├── AddTransactionForm/ # Form to add new incomes/expenses
│ │ ├── Auth/ # Login and Register components
│ │ ├── SearchForm/ # Search and filter UI
│ │ ├── TransactionList/ # Grid container for transactions
│ │ ├── TransactionCard/ # Individual transaction display
│ │ ├── TransactionCharts/ # Analytics charts (pie & bar)
│ │ ├── EditModal/ # Modal popup for editing
│ │ ├── CurrencySelector/ # Currency dropdown selector
│ │ └── ExportCSV/ # CSV export functionality
│ ├── context/
│ │ └── AuthContext.jsx # Authentication context
│ ├── hooks/
│ │ └── useCurrencyConverter.js # Custom hook for exchange rates
│ ├── services/
│ │ ├── api.js # API service layer
│ │ └── auth.js # Authentication service
│ ├── App.jsx # Main application component
│ ├── App.css # Global styles
│ └── main.jsx # Application entry point
├── public/ # Static assets
├── index.html # HTML template
├── package.json # Dependencies
└── vite.config.js # Vite configuration

text

## 🚦 Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn
- MongoDB (local or Atlas) for backend

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/jumonsalve7/moneyflow-frontend.git
   cd moneyflow-frontend
Install dependencies

bash
npm install
Start development server

bash
npm run dev
Open your browser at http://localhost:5173

Building for Production
bash
npm run build
🔗 Backend Repository
The backend for this project is available at:
https://github.com/jumonsalve7/moneyflow-backend

🎯 How to Use
Register an account - Create a new user with email and password

Login - Access your personal expense tracker

Add a transaction - Click "+ Add New Transaction", fill the form (select Income or Expense)

View your balance - Dashboard shows Total Income, Total Expenses, and Balance

Search & Filter - Click "🔍 Show Filters" to search by name, category, or date range

Edit a transaction - Click the ✏️ Edit button on any card

Delete a transaction - Click the Delete button (confirmation modal included)

Like transactions - Click the heart icon 🤍 to mark as favorite ❤️

Change currency - Use the currency dropdown in the header (supports USD, EUR, COP, etc.)

View analytics - Charts automatically update with your data

Export to CSV - Download your transaction history

🔄 Currency API
The application uses the ExchangeRate API for real-time exchange rates. Rates are updated every hour.

Supported currencies: USD, EUR, GBP, JPY, CAD, AUD, CHF, CNY, MXN, COP

🌐 Live URLs
Service	URL
Frontend (Vercel)	https://moneyflow-frontend-alpha.vercel.app
Backend API (Render)	https://moneyflow-backend-zybb.onrender.com/api/health
Frontend Repository	https://github.com/jumonsalve7/moneyflow-frontend
Backend Repository	https://github.com/jumonsalve7/moneyflow-backend
🐛 Known Issues
None currently. Please report issues on GitHub.

🤝 Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

Fork the repository

Create your feature branch (git checkout -b feature/AmazingFeature)

Commit your changes (git commit -m 'Add some AmazingFeature')

Push to the branch (git push origin feature/AmazingFeature)

Open a Pull Request

📝 License
This project is for educational purposes as part of the TripleTen bootcamp.

👨‍💻 Author
Juan Pablo Monsalve

GitHub: @jumonsalve7

🙏 Acknowledgments
TripleTen bootcamp for project guidance

ExchangeRate API for free currency API

Recharts for excellent charting library

Vercel for frontend hosting

Render for backend hosting

🎓 What I Learned Building This
React Hooks (useState, useEffect, custom hooks, useContext)

Lifting state up and prop drilling

Component composition and reusability

BEM methodology for scalable CSS

Working with external APIs and CORS

Data visualization with Recharts

Responsive design with CSS Grid

JWT authentication and secure API integration

Full-stack development (frontend + backend)

Deployment on Vercel and Render

Built with 💰 at TripleTen

text

---
