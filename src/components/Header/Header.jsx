import { useAuth } from '../../context/AuthContext';
import CurrencySelector from '../CurrencySelector/CurrencySelector';
import './Header.css';

function Header({ selectedCurrency, onCurrencyChange }) {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__top">
        <div className="header__title-container">
          <h1 className="header__title">MoneyFlow</h1>
          <p className="header__subtitle">Your personal expense tracker</p>
        </div>
        
        <div className="header__right">
          <div className="header__user">
            <span className="header__user-name">👋 {user?.name}</span>
            <button onClick={logout} className="header__logout-btn">
              Logout
            </button>
          </div>
          <CurrencySelector
            onCurrencyChange={onCurrencyChange}
            currentCurrency={selectedCurrency}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;