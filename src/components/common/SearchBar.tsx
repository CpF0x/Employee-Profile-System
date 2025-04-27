import React, { useState, ChangeEvent, FormEvent } from 'react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = '搜索' 
}) => {
  const [query, setQuery] = useState('');

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder={placeholder}
          value={query}
          onChange={handleChange}
        />
      </form>
    </div>
  );
};

export default SearchBar; 