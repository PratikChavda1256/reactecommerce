import React from 'react';
import { Link } from 'react-router-dom';
import { Avatar } from '@material-ui/core';
import { useSelector, useDispatch } from 'react-redux';
import { logoutUser } from '../../Actions/User';

const Header = () => {
    const { isAuthenticated, user } = useSelector((state) => state.user);
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser());
    };

    return (
        <header className="bg-gradient-to-r from-red-500 via-yellow-500 to-yellow-900 text-white py-4">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
                <Link to="/" className="flex items-center space-x-4">
                    <h1 className="text-2xl font-bold">Shop</h1>
                </Link>
                
                <nav className="hidden md:flex space-x-4 self-center">
                    <Link to="/" className="hover:text-gray-300 mt-3">Shop</Link>
                    <Link to="/cart" className="hover:text-gray-300 mt-3">Cart</Link>
                    {isAuthenticated ? (
                        <button
                            onClick={handleLogout}
                            className="hover:text-gray-300 mt-3 focus:outline-none"
                        >
                            Logout
                        </button>
                    ) : (
                        <Link to="/login" className="hover:text-gray-300 mt-3">Login</Link>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
