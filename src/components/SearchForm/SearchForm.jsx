import { useState } from 'react';
import './SearchForm.css';

function SearchForm({ onSearch, onFilterCategory, onFilterDateRange }) {
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearch(value);
  };

  const handleCategoryChange = (e) => {
    const value = e.target.value;
    setSelectedCategory(value);
    onFilterCategory(value);
  };

  const handleStartDateChange = (e) => {
    const value = e.target.value;
    setStartDate(value);
    onFilterDateRange(value, endDate);
  };

  const handleEndDateChange = (e) => {
    const value = e.target.value;
    setEndDate(value);
    onFilterDateRange(startDate, value);
  };

  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setStartDate('');
    setEndDate('');
    onSearch('');
    onFilterCategory('all');
    onFilterDateRange('', '');
  };

  const toggleFilters = () => {
    setIsFiltersOpen(!isFiltersOpen);
  };

  return (
    <div className="search-form">
      <button 
        className="search-form__toggle-btn"
        onClick={toggleFilters}
      >
        {isFiltersOpen ? '▲ Hide Filters' : '🔍 Show Filters'}
      </button>

      {isFiltersOpen && (
        <div className="search-form__filters">
          <div className="search-form__field">
            <input
              type="text"
              className="search-form__input"
              placeholder="Search by name..."
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>

          <div className="search-form__field">
            <select
              className="search-form__select"
              value={selectedCategory}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              <option value="Food">Food</option>
              <option value="Transport">Transport</option>
              <option value="Utilities">Utilities</option>
              <option value="Entertainment">Entertainment</option>
            </select>
          </div>

          <div className="search-form__date-range">
            <div className="search-form__field">
              <label>From:</label>
              <input
                type="date"
                className="search-form__input"
                value={startDate}
                onChange={handleStartDateChange}
              />
            </div>
            <div className="search-form__field">
              <label>To:</label>
              <input
                type="date"
                className="search-form__input"
                value={endDate}
                onChange={handleEndDateChange}
              />
            </div>
          </div>

          <button 
            className="search-form__clear-btn"
            onClick={handleClearFilters}
          >
            Clear Filters
          </button>
        </div>
      )}
    </div>
  );
}

export default SearchForm;