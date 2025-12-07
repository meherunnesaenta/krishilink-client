import React from 'react';
import MyNavLink from '../MyAddition/MyNavLink';
import MyContainer from '../MyAddition/MyContainer';
import { FaFacebook, FaInstagramSquare, FaPinterest } from "react-icons/fa";

const Footer = () => {
    return (
        <footer className="bg-green-900 text-green-100 py-6 ">
            <MyContainer className=" flex flex-col md:flex-row items-center justify-between px-4 gap-4">
                <MyNavLink to='/'><h2 className='font-bold bg-gradient-to-r from-green-100 to-green-300 bg-clip-text text-transparent '>KrishiLink</h2></MyNavLink>


                <div className="flex justify-center gap-5 text-white text-xl">
                    <FaInstagramSquare />
                    <FaFacebook />
                    <FaPinterest />



                </div>

            </MyContainer>
            <p className="text-xs pt-5 text-green-300 text-center">
                © {new Date().getFullYear()} KrishiLink. All rights reserved.
            </p>
        </footer>


    );
};

export default Footer;