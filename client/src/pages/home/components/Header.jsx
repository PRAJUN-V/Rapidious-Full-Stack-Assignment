import React, { useState, useEffect, useContext } from 'react';
import { Menu, X } from 'lucide-react';
import logo from '../../../assets/images/logo.png';
import Favorite from '../../../assets/icons/favorite.mp4';
import Login from '../../../assets/icons/login.mp4';
import Logout from '../../../assets/icons/logout.mp4';
import Home from '../../../assets/icons/home.mp4';
import Recipe from '../../../assets/icons/recipe-book.mp4';
import About from '../../../assets/icons/information.mp4';
import { Link, useNavigate } from 'react-router-dom';
import api from '../../../api'; // Make sure to import your api instance
import { jwtDecode } from 'jwt-decode';
import { REFRESH_TOKEN, ACCESS_TOKEN } from "../../../constants";

function Header() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [profileImage, setProfileImage] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        checkAuthentication().catch(() => setIsAuthenticated(false));
    }, []);

    const handleUnauthorized = () => {
        localStorage.removeItem(ACCESS_TOKEN);
        localStorage.removeItem(REFRESH_TOKEN);
        setIsAuthenticated(false);
    };

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        try {
            const res = await api.post("/api/account/token/refresh/", {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(ACCESS_TOKEN, res.data.access);
                await checkUserStatus(res.data.access);
            } else {
                handleUnauthorized();
            }
        } catch (error) {
            console.log(error);
            handleUnauthorized();
        }
    };

    const checkUserStatus = async (token) => {
        try {
            const res = await api.get("/api/account/user-status/", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            if (res.status === 200) {
                if (res.data.is_active) {
                    const userProfileImage = res.data.profile.image
                        ? `http://127.0.0.1:8000${res.data.profile.image}`
                        : 'https://t3.ftcdn.net/jpg/03/46/83/96/360_F_346839683_6nAPzbhpSkIpb8pmAwufkC7c5eD7wYws.jpg';
                    setProfileImage(userProfileImage);
                    setIsAuthenticated(true);
                } else {
                    handleUnauthorized();
                }
            } else {
                handleUnauthorized();
            }
        } catch (error) {
            console.log(error);
            handleUnauthorized();
        }
    };

    const checkAuthentication = async () => {
        const token = localStorage.getItem(ACCESS_TOKEN);
        if (!token) {
            handleUnauthorized();
            return;
        }
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            await checkUserStatus(token);
        }
    };

    const handleProfileClick = () => {
        navigate("/profile");
    };

    const handleLogoutClick = () => {
        handleUnauthorized(); // Call to remove tokens and set authenticated state
        navigate("/logout"); // Redirect to logout or home page
    };

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <header className="bg-white shadow-md py-2 px-4 md:px-12">
            <div className="flex justify-between items-center">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img src={logo} alt="Cookify Logo" className="h-20 w-20 rounded-lg" />
                    {/* Full Menu (Visible on Medium Screens and Up) */}
                    <nav className="hidden md:flex items-center space-x-6">
                        <Link to="/" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                            <video
                                src={Home}
                                className="h-12 w-12"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <span className="align-middle ml-2">Home</span>
                        </Link>
                        <Link to="/recipes" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                            <video
                                src={Recipe}
                                className="h-12 w-12"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <span className="align-middle ml-2">Recipes</span>
                        </Link>
                        <Link to="/about" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                            <video
                                src={About}
                                className="h-12 w-12"
                                autoPlay
                                loop
                                muted
                                playsInline
                            />
                            <span className="align-middle ml-2">About</span>
                        </Link>
                    </nav>
                </div>

                {/* Right Side Menu (Cart, Favorite, Login, Logout) */}
                <div className="hidden md:flex items-center space-x-6">
                    {/* <Link to="/favorite" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                        <video
                            src={Favorite}
                            className="h-12 w-12"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle ml-2">Favourite</span>
                    </Link> */}

                    {isAuthenticated ? (
                        <>
                            {/* <button onClick={handleLogoutClick} className="text-xl font-bold text-[#5B3A29]">Signout</button> */}
                            <Link to="/logout" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                                <video
                                    src={Logout}
                                    className="h-12 w-12"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <span className="align-middle ml-2">Signout</span>
                            </Link>
                            <img
                                src={profileImage}
                                alt="Profile"
                                className="h-12 w-12 rounded-full cursor-pointer"
                                onClick={handleProfileClick}
                            />
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                                <video
                                    src={Login}
                                    className="h-12 w-12"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <span className="align-middle ml-2">Signin</span>
                            </Link>
                            {/* <Link to="/register" className="text-xl font-bold text-[#5B3A29]">Signup</Link> */}
                        </>
                    )}
                </div>

                {/* Hamburger Menu Icon (Visible on Small Screens) */}
                <div className="md:hidden">
                    <button onClick={toggleMenu}>
                        {isOpen ? <X className="h-6 w-6 text-[#5B3A29]" /> : <Menu className="h-6 w-6 text-[#5B3A29]" />}
                    </button>
                </div>
            </div>

            {/* Dropdown Menu (Visible only when open on small screens) */}
            {isOpen && (
                <nav className="md:hidden mt-4">
                    <Link to="/" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                        <video
                            src={Home}
                            className="h-12 w-12"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle ml-2">Home</span>
                    </Link>
                    <Link to="/recipes" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                        <video
                            src={Recipe}
                            className="h-12 w-12"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle ml-2">Recipes</span>
                    </Link>
                    <Link to="/about" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                        <video
                            src={About}
                            className="h-12 w-12"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle ml-2">About</span>
                    </Link>
                    {/* <Link to="/v1/user/favorite" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                        <video
                            src={Favorite}
                            className="h-12 w-12"
                            autoPlay
                            loop
                            muted
                            playsInline
                        />
                        <span className="align-middle ml-2">Favourite</span>
                    </Link> */}

                    {isAuthenticated ? (
                        <>
                            {/* <button onClick={handleLogoutClick} className="block py-2 text-xl font-bold text-[#5B3A29]">Signout</button> */}
                            <Link to="/logout" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                                <video
                                    src={Logout}
                                    className="h-12 w-12"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <span className="align-middle ml-2">Signout</span>
                            </Link>
                            <div className="flex items-center">
                                <img
                                    src={profileImage}
                                    alt="Profile"
                                    className="h-12 w-12 rounded-full cursor-pointer"
                                    onClick={handleProfileClick}
                                />
                                <p className="ml-2 text-xl font-bold text-[#5B3A29]">Profile</p> {/* Added ml-2 for spacing */}
                            </div>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="flex items-center py-2 text-xl font-bold text-[#5B3A29]">
                                <video
                                    src={Login}
                                    className="h-12 w-12"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                                <span className="align-middle ml-2">Signin</span>
                            </Link>
                            {/* <Link to="/signup" className="block py-2 text-xl font-bold text-[#5B3A29]">Signup</Link> */}
                        </>
                    )}
                </nav>
            )}
        </header>
    );
}

export default Header;
