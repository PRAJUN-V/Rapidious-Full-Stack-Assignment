import React, { useState } from 'react';

const FilterMenu = ({ filters, activeFilters, setActiveFilters, isFilterMenuOpen, setIsFilterMenuOpen }) => {
  const [openFilters, setOpenFilters] = useState({});

  const handleFilterChange = (filterType, value) => {
    setActiveFilters(prev => {
      const updatedFilters = { ...prev };
      if (!updatedFilters[filterType]) {
        updatedFilters[filterType] = [value];
      } else if (updatedFilters[filterType].includes(value)) {
        updatedFilters[filterType] = updatedFilters[filterType].filter(v => v !== value);
      } else {
        updatedFilters[filterType].push(value);
      }
      return updatedFilters;
    });
  };

  const toggleFilterGroup = (filterType) => {
    setOpenFilters(prev => ({
      ...prev,
      [filterType]: !prev[filterType],
    }));
  };

  return (
    <div className="relative">
      {/* Button to toggle filters */}
      <button
        onClick={() => setIsFilterMenuOpen(!isFilterMenuOpen)}
        className="w-1/2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300"
      >
        Filters
      </button>

      {/* Dropdown filter menu */}
      {isFilterMenuOpen && (
        <div className="mt-2 p-4 bg-white rounded-md shadow-lg absolute z-10 w-1/2">
          {Object.entries(filters).map(([filterType, options]) => (
            <div key={filterType} className="mb-4">
              <h3
                className="font-semibold mb-2 cursor-pointer"
                onClick={() => toggleFilterGroup(filterType)}
              >
                {filterType} {openFilters[filterType] ? '▲' : '▼'}
              </h3>
              {/* Show options only if the filter type is open */}
              {openFilters[filterType] && (
                <div className="ml-4">
                  {options.map((option) => (
                    <label key={option} className="flex items-center mb-2">
                      <input
                        type="checkbox"
                        checked={activeFilters[filterType]?.includes(option)}
                        onChange={() => handleFilterChange(filterType, option)}
                        className="mr-2"
                      />
                      {option}
                    </label>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FilterMenu;
