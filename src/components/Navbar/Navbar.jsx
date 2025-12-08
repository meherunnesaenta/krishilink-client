import React, { useContext } from 'react';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";
import MyNavLink from '../MyAddition/MyNavLink';
import { AuthContext } from '../../Context/AuthProvider';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const links = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-crops">All Crops</NavLink></li>
            <li><NavLink to="/register">Register</NavLink></li>


        </>

    );

    const links2 = (
        <>
            <li><NavLink to="/">Home</NavLink></li>
            <li><NavLink to="/all-crops">All Crops</NavLink></li>
            <li><NavLink to="/profile">Profile</NavLink></li>
            <li><NavLink to="/add-crop">Add Crop</NavLink></li>
            <li><NavLink to="/my-posts">My Posts</NavLink></li>
            <li><NavLink to="/my-interests">My Interests</NavLink></li>

        </>
    )
    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Logged out successfully");
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-10 mt-3 w-52 p-2 shadow">
                        {user ? (
                            <div>
                             {links2}
                            </div>
                        ) : (
                            <div>
                                {links}
                            </div>
                        )}

                    </ul>
                </div>
                <Link to="/" className="flex items-center gap-3 ml-2">
                    <img src={logo} alt="logo" className="h-10 w-10" />
                    <span className="text-xl font-bold">KrishiLink</span>
                </Link>
            </div>

            <div className="navbar-center hidden lg:flex">
                
                    {user ? (
                            <ul className="menu menu-horizontal px-1">
                             {links2}
                            </ul>
                        ) : (
                           <ul className="menu menu-horizontal px-1">
                                {links}
                            </ul>
                        )}
                
            </div>

            <div className="navbar-end flex gap-4 items-center">

                {user ? (
                    <div className="flex items-center gap-3">
                        <img
                            src={user.photoURL || "https://i.ibb.co.com/4pBQ0zZ/user.png"}
                            alt="User"
                            className="w-10 h-10 rounded-full border-2 border-green-700 object-cover"
                            title={user.displayName || user.email}
                        />
                        <p className="hidden md:block">
                            Hi, <span className="font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">
                                {user.displayName || user.email.split('@')[0]}
                            </span>
                        </p>
                    </div>
                ) : (
                    <div className="w-10 h-10 rounded-full border-2 border-green-700 bg-gray-200"></div>
                )}


                {user ? (
                    <button
                        onClick={handleLogout}
                        className="btn border-green-600 text-green-700 hover:bg-green-700 hover:text-white"
                    >
                        Logout
                    </button>
                ) : (
                    <MyNavLink
                        to="/login"
                        className="btn border-green-600 text-green-700 hover:bg-green-700 hover:text-white"
                    >
                        Get Started
                    </MyNavLink>
                )}
            </div>
        </div>
    );
}