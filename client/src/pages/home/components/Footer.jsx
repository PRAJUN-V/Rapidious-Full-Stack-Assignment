import React from 'react';

function Footer() {
    return (
        <footer className="bg-white shadow-md py-4">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <h2 className="text-xl font-bold text-[#5B3A29]">EpiRecipes</h2>
                        <p className="text-gray-600">Your go-to recipe search platform.</p>
                    </div>

                    <div className="flex space-x-4 mb-4 md:mb-0">
                        <a href="/about" className="text-gray-700 hover:text-[#5B3A29]">About Us</a>
                        <a href="/contact" className="text-gray-700 hover:text-[#5B3A29]">Contact</a>
                        <a href="/privacy" className="text-gray-700 hover:text-[#5B3A29]">Privacy Policy</a>
                        <a href="/terms" className="text-gray-700 hover:text-[#5B3A29]">Terms of Service</a>
                    </div>
                </div>

                <div className="text-center mt-4">
                    <p className="text-gray-500">© {new Date().getFullYear()} EpiRecipes. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
