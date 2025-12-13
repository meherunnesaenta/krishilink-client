import React from 'react';
import MyNavLink from '../MyAddition/MyNavLink';
import MyContainer from '../MyAddition/MyContainer';
import { FaFacebook, FaInstagramSquare, FaPinterest, FaTwitter } from "react-icons/fa";
import { motion } from 'framer-motion';

const Footer = () => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
    };

    const iconVariants = {
        hover: { scale: 1.2, rotate: 5, transition: { duration: 0.3 } },
    };

    return (
        <footer className="bg-gradient-to-b from-green-950 to-green-900 text-green-100 py-12 relative overflow-hidden">
            {/* Top subtle border gradient */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-green-500 to-green-600"></div>

            <MyContainer className="relative z-10">
                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.3 }}
                    className="flex flex-col md:flex-row items-center justify-between gap-8"
                >
                    {/* Logo & Quick Links */}
                    <motion.div variants={itemVariants} className="text-center md:text-left">
                        <MyNavLink to='/'>
                            <h2 className='text-3xl font-bold bg-gradient-to-r from-green-200 to-green-400 bg-clip-text text-transparent mb-4'>
                                KrishiLink
                            </h2>

                        </MyNavLink>
                        <div className="flex flex-wrap justify-center md:justify-start gap-6 text-sm text-green-300">
                            <MyNavLink to='/profile' className="hover:text-green-100 transition">Profile</MyNavLink>
                            <MyNavLink to='/my-posts' className="hover:text-green-100 transition">My Posts</MyNavLink>
                            <MyNavLink to='/my-interests' className="hover:text-green-100 transition">My Interests</MyNavLink>
                            <MyNavLink to='/all-crops' className="hover:text-green-100 transition">All Crops</MyNavLink>
                        </div>
                    </motion.div>

                    {/* Social Icons */}
                    <motion.div variants={itemVariants} className="flex justify-center gap-8 text-3xl">
                        <motion.a
                            href="#"
                            variants={iconVariants}
                            whileHover="hover"
                            className="text-green-200 hover:text-white transition"
                        >
                            <FaInstagramSquare />
                        </motion.a>
                        <motion.a
                            href="#"
                            variants={iconVariants}
                            whileHover="hover"
                            className="text-green-200 hover:text-white transition"
                        >
                            <FaFacebook />
                        </motion.a>
                        <motion.a
                            href="#"
                            variants={iconVariants}
                            whileHover="hover"
                            className="text-green-200 hover:text-white transition"
                        >
                            <FaPinterest />
                        </motion.a>
                        <motion.a
                            href="#"
                            variants={iconVariants}
                            whileHover="hover"
                            className="text-green-200 hover:text-white transition"
                        >
                            <FaTwitter />
                        </motion.a>
                    </motion.div>
                </motion.div>

                {/* Copyright */}
                <motion.p
                    variants={itemVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    className="text-center text-sm text-green-400 mt-10 pt-8 border-t border-green-800"
                >
                    © {new Date().getFullYear()} KrishiLink. All rights reserved.
                </motion.p>
            </MyContainer>
        </footer>
    );
};

export default Footer;