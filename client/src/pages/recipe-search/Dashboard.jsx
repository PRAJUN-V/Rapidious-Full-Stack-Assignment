import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import FilterMenu from './components/FilterMenu';
import RecipeList from './components/RecipeList';

// Mock data and functions
const mockRecipes = [
    { id: 1, name: "Spaghetti Carbonara", cuisine: "Italian", mealType: "Dinner", ingredients: ["pasta", "eggs", "cheese", "bacon"] },
    { id: 2, name: "Chicken Tikka Masala", cuisine: "Indian", mealType: "Dinner", ingredients: ["chicken", "yogurt", "spices", "tomato sauce"] },
    { id: 3, name: "Caesar Salad", cuisine: "American", mealType: "Lunch", ingredients: ["lettuce", "croutons", "parmesan", "caesar dressing", "caesar dressing", "caesar dressing", "caesar dressing"] },
];

const Filters = {
    cuisine: ["Italian", "Indian", "American", "Chinese", "Mexican"],
    mealType: ["Breakfast", "Lunch", "Dinner", "Snack"],
    dietaryRestrictions: ["Vegetarian",],
};

const mockSearchRecipes = (searchTerm, activeFilters) => {
    return new Promise((resolve) => {
        setTimeout(() => {
            let filteredRecipes = mockRecipes;
            if (searchTerm) {
                filteredRecipes = filteredRecipes.filter(recipe =>
                    recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                    recipe.ingredients.some(ing => ing.toLowerCase().includes(searchTerm.toLowerCase()))
                );
            }
            if (Object.keys(activeFilters).length > 0) {
                Object.entries(activeFilters).forEach(([filterType, values]) => {
                    if (values.length > 0) {
                        filteredRecipes = filteredRecipes.filter(recipe => values.includes(recipe[filterType]));
                    }
                });
            }
            resolve(filteredRecipes);
        }, 300);
    });
};

const Dashboard = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [recipes, setRecipes] = useState([]);
    const [filters, setFilters] = useState({});
    const [activeFilters, setActiveFilters] = useState({});
    const [isFilterMenuOpen, setIsFilterMenuOpen] = useState(false);

    useEffect(() => {
        fetchRecipes();
        fetchFilters();
    }, [searchTerm, activeFilters]);

    const fetchRecipes = async () => {
        const result = await mockSearchRecipes(searchTerm, activeFilters);
        setRecipes(result);
    };

    const fetchFilters = async () => {
        setFilters(Filters);
    };

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center text-brown-500">EpiRecipes</h1>

            <div className="mb-8">
                <SearchBar
                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    onSearch={fetchRecipes}
                />
            </div>

            {/* Filter Menu */}
            <div className="mb-8">
                <FilterMenu
                    filters={filters}
                    activeFilters={activeFilters}
                    setActiveFilters={setActiveFilters}
                    isFilterMenuOpen={isFilterMenuOpen}
                    setIsFilterMenuOpen={setIsFilterMenuOpen}
                />
            </div>

            <RecipeList recipes={recipes} />
        </div>
    );
};

export default Dashboard;