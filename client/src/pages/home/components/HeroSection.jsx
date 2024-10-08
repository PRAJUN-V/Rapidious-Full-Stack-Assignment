import React from 'react';
import Banner from '../../../assets/images/banner.png'
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate('/recipes');
    };

    return (
        <div className="flex items-center justify-center bg-blue-100 p-4">
            <div className="flex flex-col lg:flex-row items-center w-full max-w-6xl">
                {/* Text Section */}
                <div className="w-full lg:w-1/2 text-center lg:text-left mb-8 lg:mb-0">
                    <h1 className="text-3xl md:text-4xl font-bold mb-4 text-brown-800">
                        Cook with top chefs<br className="hidden md:inline" />anytime, anywhere
                    </h1>
                    <p className="text-base md:text-lg mb-6 max-w-md mx-auto lg:mx-0">
                        At Epi Recipe, our goal is to bring you the best recipes from expert chefs around the world, helping you cook delicious meals whenever and wherever you like.
                    </p>
                    <button
                        onClick={handleClick}
                        className="bg-brown-400 font-semibold text-white py-3 px-6 rounded hover:bg-brown-600 transition duration-300"
                    >
                        Recipes
                    </button>
                </div>

                {/* Image Section - Hidden on smaller screens */}
                <div className="hidden lg:block w-full lg:w-1/2">
                    <img src={Banner} alt="Instructor" className="w-full h-auto rounded" />
                </div>
            </div>
        </div>
    );
}

export default HeroSection;