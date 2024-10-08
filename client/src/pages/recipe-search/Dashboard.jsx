import React, { useState, useEffect } from 'react';
import api from '../../api';
import recipeIcon from '../../assets/icons/recipe.png'; // Import your icon image here
import searchIcon from '../../assets/icons/search.png';

const Filters = {
    'Ingredients': ['chicken', 'milk', 'oil', 'Fish', 'Pasta'],
    'Cuisine': ['Italian', 'Chinese', 'Mexican', 'Indian'],
    'Type': ['Vegetarian', 'Non Vegetarian'],
};

const RecipeSearch = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [filters, setFilters] = useState({});
    const [activeFilters, setActiveFilters] = useState({});
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false); // For modal state
    const [selectedRecipe, setSelectedRecipe] = useState(null); // For selected recipe
    const [currentPage, setCurrentPage] = useState(1);
    const [totalRecipes, setTotalRecipes] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const recipesPerPage = 9;

    useEffect(() => {
        fetchFilters();
    }, []);

    useEffect(() => {
        fetchRecipes();
    }, [activeFilters, searchTerm, currentPage]);

    const fetchRecipes = async () => {
        try {
            const filterValues = Object.entries(activeFilters)
                .flatMap(([key, values]) => values)
                .join(',');

            const response = await api.get(`/api/recipes/search-and-filter/?query=${searchTerm}&filters=${filterValues}&size=${recipesPerPage}&page=${currentPage}`);

            setRecipes(response.data.recipes.map(recipe => ({
                id: recipe._id,
                name: recipe._source.title,
                desc: recipe._source.desc, // Add description
                cuisine: recipe._source.categories.join(', '),
                mealType: recipe._source.categories.find(category => ['Breakfast', 'Lunch', 'Dinner', 'Snack'].includes(category)) || 'Other',
                ingredients: recipe._source.ingredients,
                directions: recipe._source.directions // Add directions
            })));

            setTotalRecipes(response.data.total);
            setTotalPages(Math.ceil(response.data.total / recipesPerPage));
        } catch (error) {
            console.error("Error fetching recipes:", error);
        }
    };

    const fetchFilters = () => {
        setFilters(Filters);
    };

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

    const toggleFilterMenu = () => {
        setIsFilterMenuOpen(!isFilterMenuOpen);
    };

    const handleSearchSubmit = (e) => {
        e.preventDefault();
        setCurrentPage(1);
        fetchRecipes();
    };

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    const handleShowRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    const renderPagination = () => {
        const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);
        const displayedPages = pageNumbers.slice(Math.max(0, currentPage - 3), Math.min(totalPages, currentPage + 2));

        return (
            <div className="flex justify-center mt-4">
                {currentPage > 1 && (
                    <button onClick={() => handlePageChange(currentPage - 1)} className="mx-2">
                        &laquo; Prev
                    </button>
                )}
                {displayedPages.map((number) => (
                    <button
                        key={number}
                        onClick={() => handlePageChange(number)}
                        className={`mx-2 ${number === currentPage ? 'font-bold' : ''}`}
                    >
                        {number}
                    </button>
                ))}
                {currentPage < totalPages && (
                    <button onClick={() => handlePageChange(currentPage + 1)} className="mx-2">
                        Next &raquo;
                    </button>
                )}
            </div>
        );
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-brown-500">EpiRecipes</h1>

            {/* Search Bar */}
            <div className="mb-8">
                <form onSubmit={handleSearchSubmit} className="flex flex-col sm:flex-row gap-2">
                    <input
                        type="text"
                        placeholder="Search for recipes..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="w-1/2 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-brown-500"
                    />
                    <button type="submit">
                        <img src={searchIcon} alt="Search" className="h-10 w-10" />
                    </button>
                </form>
            </div>

            {/* Filter Menu */}
            <div className="mb-8">
                <button
                    onClick={toggleFilterMenu}
                    className="w-1/2 px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 transition duration-300"
                >
                    Filters
                </button>

                {isFilterMenuOpen && (
                    <div className="mt-2 p-4 bg-white rounded-md shadow-lg absolute z-10 w-1/2">
                        {Object.entries(filters).map(([filterType, options]) => (
                            <div key={filterType} className="mb-4">
                                <h3 className="font-semibold mb-2 cursor-pointer">{filterType}</h3>
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
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Recipe List */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {recipes.map((recipe) => (
                    <div key={recipe.id} className="border rounded-lg shadow-lg p-4 bg-white flex flex-col justify-between">
                        <div>
                            <h2 className="text-lg font-bold mb-2">{recipe.name}</h2>
                            <p className="text-sm mb-4">{recipe.desc}</p>
                            <h3 className="font-semibold">Ingredients:</h3>
                            <ul className="list-disc ml-5">
                                {recipe.ingredients.slice(0, 4).map((ingredient, i) => (
                                    <li key={i} className="text-sm">{ingredient}</li>
                                ))}
                                {recipe.ingredients.length > 4 && (
                                    <li className="text-sm">...and more</li>
                                )}
                            </ul>
                        </div>
                        <button
                            className="mt-4 px-4 py-2 bg-blue-400 text-white rounded hover:bg-blue-500 self-start"
                            onClick={() => handleShowRecipe(recipe)}
                        >
                            Show Recipe
                        </button>
                    </div>
                ))}
            </div>

            {/* Recipe Modal */}
            {isModalOpen && selectedRecipe && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
                        <button
                            className="absolute top-2 right-2 text-xl font-bold"
                            onClick={handleCloseModal}
                        >
                            &times;
                        </button>
                        <h2 className="text-2xl font-bold mb-4">{selectedRecipe.name}</h2>
                        <div className="overflow-y-auto max-h-[75vh] pr-4"> {/* Scrollable content */}
                            <h3 className="font-semibold mb-2">Ingredients:</h3>
                            <ul className="list-disc ml-5 mb-4">
                                {selectedRecipe.ingredients.map((ingredient, i) => (
                                    <li key={i} className="text-sm">{ingredient}</li>
                                ))}
                            </ul>
                            <h3 className="font-semibold mb-2">Preparation:</h3>
                            <ol className="list-decimal ml-5">
                                {selectedRecipe.directions.map((direction, i) => (
                                    <li key={i} className="text-sm mb-2">{direction}</li>
                                ))}
                            </ol>
                        </div>
                    </div>
                </div>
            )}

            {/* Pagination */}
            {totalRecipes > 0 && renderPagination()}
        </div>
    );
};

export default RecipeSearch;
