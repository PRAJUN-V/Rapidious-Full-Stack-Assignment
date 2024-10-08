import React, { useEffect, useState } from 'react';
import api from '../../../api';

const TopRecipe = () => {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    // Fetch the top 3 recipes from the API
    useEffect(() => {
        api.get('/api/recipes/best-rated-recipes/')
            .then((response) => {
                setRecipes(response.data.recipes.slice(0, 3)); // Get the top 3 recipes
            })
            .catch((error) => {
                console.error('Error fetching recipes:', error);
            });
    }, []);

    // Open the modal and show the recipe details
    const handleShowRecipe = (recipe) => {
        setSelectedRecipe(recipe);
        setIsModalOpen(true);
    };

    // Close the modal
    const handleCloseModal = () => {
        setIsModalOpen(false);
        setSelectedRecipe(null);
    };

    return (
        <>
            <br />
            <h1 className="text-2xl text-brown-700 font-bold mb-6 text-center">Top 3 Rated Recipes</h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {recipes.map((recipe, index) => (
                    <div
                        key={index}
                        className="border rounded-lg shadow-lg p-4 bg-white flex flex-col justify-between"
                    >
                        <div>
                            <h2 className="text-lg font-bold mb-2">{recipe._source.title}</h2>
                            <p className="text-sm mb-4">{recipe._source.desc}</p>
                            <h3 className="font-semibold">Ingredients:</h3>
                            <ul className="list-disc ml-5">
                                {recipe._source.ingredients.slice(0, 4).map((ingredient, i) => (
                                    <li key={i} className="text-sm">{ingredient}</li>
                                ))}
                                {recipe._source.ingredients.length > 4 && (
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

                {isModalOpen && selectedRecipe && (
                    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
                        <div className="bg-white p-6 rounded-lg shadow-lg max-w-3xl w-full relative">
                            <button
                                className="absolute top-2 right-2 text-xl font-bold"
                                onClick={handleCloseModal}
                            >
                                &times;
                            </button>
                            <h2 className="text-2xl font-bold mb-4">{selectedRecipe._source.title}</h2>
                            <div className="overflow-y-auto max-h-[75vh] pr-4"> {/* Scrollable content */} 
                                <h3 className="font-semibold mb-2">Ingredients:</h3>
                                <ul className="list-disc ml-5 mb-4">
                                    {selectedRecipe._source.ingredients.map((ingredient, i) => (
                                        <li key={i} className="text-sm">{ingredient}</li>
                                    ))}
                                </ul>
                                <h3 className="font-semibold mb-2">Preparation:</h3>
                                <ol className="list-decimal ml-5">
                                    {selectedRecipe._source.directions.map((direction, i) => (
                                        <li key={i} className="text-sm mb-2">{direction}</li>
                                    ))}
                                </ol>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default TopRecipe;
