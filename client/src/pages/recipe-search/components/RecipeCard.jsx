import React from 'react';
import recipeIcon from '../../../assets/icons/recipe.png'; // Import your icon image here

const RecipeCard = ({ recipe }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden flex flex-col">
      <div className="p-6 flex-grow">
        <div className="flex items-center">
          <h2 className="text-xl font-bold mb-2 text-custom-blue">{recipe.name}</h2>
          <img src={recipeIcon} alt="Recipe Icon" className="h-8 w-8 ml-2" /> {/* No margin left here */}
        </div>
        <p className="text-sm text-gray-600 mb-4">{recipe.cuisine} • {recipe.mealType}</p>
        <p className="text-sm text-gray-700">
          <span className="font-medium">Ingredients:</span> {recipe.ingredients.join(', ')}
        </p>
      </div>
      <div className="px-6 py-4 bg-gray-50 flex flex-col">
        <button className="w-full mb-2 h-12 bg-brown-500 text-white rounded-md hover:bg-brown-600 transition duration-300">
          View Recipe
        </button>
        <button className="w-full h-12 bg-transparent hover:bg-custom-blue text-custom-blue font-semibold hover:text-white py-2 px-4 border border-custom-blue hover:border-transparent rounded">
          Add To Favourite
        </button>
      </div>
    </div>
  );
};

export default RecipeCard;
