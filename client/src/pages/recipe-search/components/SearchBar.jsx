import React from 'react';
import searchIcon from '../../../assets/icons/search.png'
const SearchBar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch();
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
      <input
        type="text"
        placeholder="Search for recipes..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
      />
      <button
        type="submit"
      >
        <img src={searchIcon} alt="Search" className="h-10 w-10" /> {/* Adjust size as needed */}
      </button>
    </form>
  );
};

export default SearchBar;
