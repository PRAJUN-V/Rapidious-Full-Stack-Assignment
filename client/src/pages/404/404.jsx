import React from 'react';
import { useNavigate } from 'react-router-dom'; // Use useNavigate for React Router v6
import notFoundImage from '../../assets/images/404-image.png'; // Replace with your image path
import Header from '../home/components/Header'; // Import your Header component

const NotFoundPage = () => {
      const navigate = useNavigate(); // Using useNavigate from React Router v6

      const handleGoHome = () => {
        navigate('/'); // Navigate back to home
      };

    return (
        <div className="flex flex-col h-screen bg-white">
            {/* Header Component */}
            <Header />

            {/* Main Content Area */}
            <div className="flex flex-col md:flex-row flex-grow">
                {/* Left Side: Image */}
                <div className="md:w-1/2 flex items-center justify-center">
                    <img src={notFoundImage} alt="404 Not Found" className="max-w-full h-auto" />
                </div>

                {/* Right Side: Message and Button */}
                <div className="md:w-1/2 flex flex-col items-center justify-center p-6">
                    <h1 className="text-8xl font-bold" style={{ color: '#5B3A29' }}>404</h1> {/* Larger 404 Text */}
                    <h4 className="text-3xl font-bold" style={{ color: '#5B3A29' }}>Looks like this page is still cooking!</h4> {/* Dark brown color */}
                    <br />
                    <br />
                    <button
                        onClick={handleGoHome} // Added the onClick handler to navigate home
                        className="bg-transparent hover:bg-[#5B3A29] text-[#5B3A29] font-semibold hover:text-white py-2 px-4 border border-[#5B3A29] hover:border-transparent rounded"
                    >
                        Go Back to Home
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
