import React from 'react';

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
        className="w-1/2 sm:w-auto px-4 py-2 bg-brown-500 text-white rounded-md hover:bg-brown-600 transition duration-300"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
