import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../../assets/images/logo.png';
import Favorite from '../../../assets/icons/favorite.mp4';
import Login from '../../../assets/icons/login.mp4';

function Header() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-md py-2 px-4 md:px-12">
            <div className="flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Cookify" className="h-20 w-20 rounded-lg" />
                    {/* Full Menu (Visible on Medium Screens and Up) */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <a href="/cuisines" className="text-xl font-bold text-[#5B3A29]">Cuisines</a> {/* Changed to brown */}
                        <a href="/top-rated" className="text-xl font-bold text-[#5B3A29]">Top Rated</a> {/* Changed to brown */}
                        <a href="/deals" className="text-xl font-bold text-[#5B3A29]">Deals of the Day</a> {/* Changed to brown */}
                    </nav>
                </div>

                {/* Right Side Menu (Cart and Login) */}
                <div className="hidden md:flex items-center space-x-6">
                    <a href="/favourite" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]"> {/* Changed to brown */}
                        <video
                            src={Favorite}
                            alt="Favourite Icon"
                            className="h-12 w-12 mr-0"  // Remove margin
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle">Favourite</span> {/* Use align-middle for better alignment */}
                    </a>
                    <a href="/favourite" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]"> {/* Changed to brown */}
                        <video
                            src={Login}
                            alt="Favourite Icon"
                            className="h-12 w-12 mr-0"  // Remove margin
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle">Login</span> {/* Use align-middle for better alignment */}
                    </a>
                </div>

                {/* Hamburger Menu Icon (Visible on Small Screens) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X className="h-6 w-6 text-[#5B3A29]" /> : <Menu className="h-6 w-6 text-[#5B3A29]" />} {/* Changed icon color to brown */}
                    </button>
                </div>
            </div>

            {/* Dropdown Menu (Visible only when open on small screens) */}
            {isOpen && (
                <nav className="md:hidden mt-4">
                    <a href="/cuisines" className="block py-2 text-xl font-bold text-[#5B3A29]">Cuisines</a> {/* Changed to brown */}
                    <a href="/top-rated" className="block py-2 text-xl font-bold text-[#5B3A29]">Top Rated</a> {/* Changed to brown */}
                    <a href="/deals" className="block py-2 text-xl font-bold text-[#5B3A29]">Deals of the Day</a> {/* Changed to brown */}
                    <a href="/favourite" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]"> {/* Changed to brown */}
                        <video
                            src={Favorite}
                            alt="Favourite Icon"
                            className="h-12 w-12 mr-0" 
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle">Favourite</span>
                    </a>
                    <a href="/favourite" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]"> {/* Changed to brown */}
                        <video
                            src={Login}
                            alt="Favourite Icon"
                            className="h-12 w-12 mr-0"  // Remove margin
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle">Login</span> {/* Use align-middle for better alignment */}
                    </a>
                </nav>
            )}
        </header>
    );
};

export default Header;
