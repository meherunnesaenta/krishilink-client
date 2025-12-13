import React, { useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, NavLink } from 'react-router-dom';
import logo from "../../assets/logo.png";
import MyNavLink from '../MyAddition/MyNavLink';
import { AuthContext } from '../../Context/AuthProvider';

// Animation Variants
const navbarVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

const linkVariants = {
  hover: { scale: 1.08, color: "#166534" },
  tap: { scale: 0.95 },
};

const dropdownVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.4 } },
};

const staggerContainer = {
  visible: { transition: { staggerChildren: 0.08 } },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.4 } },
};

const buttonVariants = {
  hover: { scale: 1.05, boxShadow: "0 8px 25px rgba(34, 197, 94, 0.3)" },
  tap: { scale: 0.95 },
};

const avatarVariants = {
  hidden: { scale: 0, rotate: -180 },
  visible: { scale: 1, rotate: 0, transition: { type: "spring", stiffness: 200 } },
};

export default function Navbar() {
    const { user, logout } = useContext(AuthContext);

    const links = (
        <>
            <li><NavLink to="/" className="text-green-800 hover:text-green-600 font-medium">Home</NavLink></li>
            <li><NavLink to="/all-crops" className="text-green-800 hover:text-green-600 font-medium">All Crops</NavLink></li>
            <li><NavLink to="/register" className="text-green-800 hover:text-green-600 font-medium">Register</NavLink></li>
        </>
    );

    const links2 = (
        <>
            <li><NavLink to="/" className="text-green-800 hover:text-green-600 font-medium">Home</NavLink></li>
            <li><NavLink to="/all-crops" className="text-green-800 hover:text-green-600 font-medium">All Crops</NavLink></li>
            <li><NavLink to="/profile" className="text-green-800 hover:text-green-600 font-medium">Profile</NavLink></li>
            <li><NavLink to="/add-crop" className="text-green-800 hover:text-green-600 font-medium">Add Crop</NavLink></li>
            <li><NavLink to="/my-posts" className="text-green-800 hover:text-green-600 font-medium">My Posts</NavLink></li>
            <li><NavLink to="/my-interests" className="text-green-800 hover:text-green-600 font-medium">My Interests</NavLink></li>
        </>
    );

    const handleLogout = () => {
        logout()
            .then(() => {
                console.log("Logged out successfully");
            })
            .catch(err => {
                console.log(err.message);
            });
    };

    const currentLinks = user ? links2 : links;

    return (
        <motion.div
            className="navbar bg-gradient-to-r from-green-50 via-green-100 to-green-50 shadow-lg sticky top-0 z-50 backdrop-blur-sm"
            variants={navbarVariants}
            initial="hidden"
            animate="visible"
        >
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <motion.ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-white rounded-box z-10 mt-4 w-64 p-4 shadow-2xl border border-green-200"
                        variants={dropdownVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        <motion.div variants={staggerContainer} initial="hidden" animate="visible">
                            {currentLinks}
                        </motion.div>
                    </motion.ul>
                </div>

                <Link to="/" className="flex items-center gap-3 ml-2">
                    <motion.img
                        src={logo}
                        alt="logo"
                        className="h-12 w-12 rounded-lg shadow-md"
                        whileHover={{ scale: 1.1, rotate: 5 }}
                        transition={{ type: "spring" }}
                    />
                    <motion.span
                        className="text-2xl font-extrabold bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent"
                        whileHover={{ scale: 1.05 }}
                    >
                        KrishiLink
                    </motion.span>
                </Link>
            </div>

            {/* Desktop Menu - Fixed nested <li> error */}
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-4 gap-4">
                    {React.Children.map(currentLinks.props.children, (child, index) => (
                        <motion.li
                            key={index}
                            variants={itemVariants}
                            initial="hidden"
                            animate="visible"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="rounded-lg"
                        >
                            <motion.div
                                variants={linkVariants}
                                whileHover="hover"
                                whileTap="tap"
                            >
                                {child.props.children}
                            </motion.div>
                        </motion.li>
                    ))}
                </ul>
            </div>

            <div className="navbar-end flex gap-6 items-center pr-4">
                <AnimatePresence>
                    {user ? (
                        <motion.div
                            className="flex items-center gap-4"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <motion.img
                                src={user.photoURL || "https://i.ibb.co.com/4pBQ0zZ/user.png"}
                                alt="User"
                                className="w-12 h-12 rounded-full border-4 border-green-600 shadow-lg object-cover"
                                title={user.displayName || user.email}
                                variants={avatarVariants}
                                initial="hidden"
                                animate="visible"
                            />
                            <p className="hidden md:block text-lg">
                                Hi, <span className="font-bold bg-gradient-to-r from-green-600 to-green-900 bg-clip-text text-transparent">
                                    {user.displayName || user.email.split('@')[0]}
                                </span>
                            </p>
                        </motion.div>
                    ) : (
                        <div className="w-12 h-12 rounded-full border-4 border-dashed border-green-400 bg-green-50"></div>
                    )}
                </AnimatePresence>

                {user ? (
                    <motion.button
                        onClick={handleLogout}
                        className="btn bg-green-600 text-white border-none hover:bg-green-700 shadow-md"
                        variants={buttonVariants}
                        whileHover="hover"
                        whileTap="tap"
                    >
                        Logout
                    </motion.button>
                ) : (
                    <MyNavLink to="/login">
                        <motion.div
                            className="btn bg-green-600 text-white border-none hover:bg-green-700 shadow-md"
                            variants={buttonVariants}
                            whileHover="hover"
                            whileTap="tap"
                        >
                            Get Started
                        </motion.div>
                    </MyNavLink>
                )}
            </div>
        </motion.div>
    );
}