// src/pages/Home.jsx
import {useEffect} from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import Banner1 from '../assets/banner1.jpg'
import Banner2 from '../assets/banner2.jpg'
import Banner3 from '../assets/banner3.jpg'
import '../index.css';

import "swiper/css";
import "swiper/css/pagination";
import Card from "../components/Card/Card";

const cardPromise = fetch('http://localhost:3000/latest-products').then(res=>res.json());


const Home = () => {
  return (
    <>
      {/* Hero Slider */}
      <section className="relative overflow-hidden">
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 5000, disableOnInteraction: false }}
    pagination={{ clickable: true, dynamicBullets: true }}
    loop={true}
    className="h-96 md:h-screen"
  >
    {/* Slide 1 */}
    <SwiperSlide>
      <div 
        className="hero h-full relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Banner1})` }}
      >
        {/* Enhanced Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="hero-content text-center text-white z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
              Join the Farmer directly
            </h1>
            <p className="py-8 text-lg md:text-3xl font-medium opacity-95">
              Sell crops, find buyers – without intermediaries!
            </p>
            <Link to="/all-crops">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none shadow-2xl text-xl px-10"
              >
                See all crops
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </SwiperSlide>

    {/* Slide 2 */}
    <SwiperSlide>
      <div 
        className="hero h-full relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Banner2})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="hero-content text-center text-white z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
              Get the right price for your crops.
            </h1>
            <p className="py-8 text-lg md:text-3xl font-medium opacity-95">
              Talk directly to buyers through Krishilink
            </p>
            <Link to="/register">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none shadow-2xl text-xl px-10"
              >
                Join now
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </SwiperSlide>

    {/* Slide 3 */}
    <SwiperSlide>
      <div 
        className="hero h-full relative bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${Banner3})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>

        <div className="hero-content text-center text-white z-10 px-4">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-7xl font-extrabold leading-tight drop-shadow-2xl">
              Thousands of buyers with one click
            </h1>
            <p className="py-8 text-lg md:text-3xl font-medium opacity-95">
              Post a picture of your crop, interested buyers will find you.
            </p>
            <Link to="/add-crop">
              <motion.button
                whileHover={{ scale: 1.08 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-lg bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white border-none shadow-2xl text-xl px-10"
              >
                Add crops
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </div>
    </SwiperSlide>
  </Swiper>

  {/* Beautiful Pagination at Bottom */}
  <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20">
    <div className="swiper-pagination !w-auto"></div>
  </div>
</section>

      {/* Latest Crops Section */}
      <section className="py-16 bg-lightbg">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-green-800 mb-4">Latest crops</h2>
            <p className="text-lg text-gray-600">What are farmers selling right now?</p>
          </div>

          
          <div>
              <Card cardPromise={cardPromise}></Card>
          </div>

          <div className="text-center mt-10">
            <Link to="/all-crops" className="btn btn-outline bg-green-100 hover:bg-green-800 hover:text-white btn-lg">
             See all crops →
            </Link>
          </div>
        </div>
      </section>

<section className="py-20 bg-white">
  <div className="container mx-auto px-6">
    <h2 className="text-4xl md:text-5xl font-bold text-center text-green-800 mb-16">
      How KrishiLink Works
    </h2>
    <div className="grid md:grid-cols-3 gap-12">
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl font-bold text-green-600">1</span>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">Post Your Crops</h3>
        <p className="text-gray-600">Upload photos, set price, quantity, and details of your harvest.</p>
      </div>
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl font-bold text-green-600">2</span>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">Show Interest</h3>
        <p className="text-gray-600">Browse crops and express interest with quantity and message.</p>
      </div>
      <div className="text-center">
        <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-green-100 flex items-center justify-center">
          <span className="text-5xl font-bold text-green-600">3</span>
        </div>
        <h3 className="text-2xl font-bold text-green-800 mb-4">Direct Connection</h3>
        <p className="text-gray-600">Chat directly with farmers to finalize deals and delivery.</p>
      </div>
    </div>
  </div>
</section>

{/* Why Choose KrishiLink */}
<section className="py-20 bg-gradient-to-br from-green-50 to-emerald-100">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-16">
      Why Choose KrishiLink?
    </h2>
    <div className="grid md:grid-cols-4 gap-10">
      <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
        <h3 className="text-6xl font-bold text-green-600 mb-4">1,000+</h3>
        <p className="text-xl font-semibold text-gray-700">Active Farmers</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
        <h3 className="text-6xl font-bold text-green-600 mb-4">50+</h3>
        <p className="text-xl font-semibold text-gray-700">Districts Covered</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
        <h3 className="text-6xl font-bold text-green-600 mb-4">100%</h3>
        <p className="text-xl font-semibold text-gray-700">No Middlemen</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl hover:shadow-2xl transition-all">
        <h3 className="text-6xl font-bold text-green-600 mb-4">24/7</h3>
        <p className="text-xl font-semibold text-gray-700">Support</p>
      </div>
    </div>
  </div>
</section>

{/* Extra Section 1: Our Farmers */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-16">
      Meet Our Farmers
    </h2>
    <div className="grid md:grid-cols-3 gap-12">
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg">
        <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=500" alt="Farmer" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-green-500" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Rahim Hossain</h3>
        <p className="text-gray-600">Tomato & Vegetable Farmer, Jessore</p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg">
        <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500" alt="Farmer" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-green-500" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Karim Ahmed</h3>
        <p className="text-gray-600">Rice Farmer, Bogura</p>
      </div>
      <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-3xl shadow-lg">
        <img src="https://images.unsplash.com/photo-1552058544-f2b08422138a?w=500" alt="Farmer" className="w-32 h-32 rounded-full mx-auto mb-6 object-cover border-4 border-green-500" />
        <h3 className="text-2xl font-bold text-green-800 mb-2">Selim Khan</h3>
        <p className="text-gray-600">Potato Farmer, Rangpur</p>
      </div>
    </div>
  </div>
</section>

{/* Extra Section 2: Success Stories */}
<section className="py-20 bg-gradient-to-br from-emerald-50 to-green-50">
  <div className="container mx-auto px-6 text-center">
    <h2 className="text-4xl md:text-5xl font-bold text-green-800 mb-16">
      Success Stories
    </h2>
    <div className="grid md:grid-cols-2 gap-12">
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <p className="text-lg italic text-gray-700 mb-6">
          "Thanks to KrishiLink, I sold 2 tons of rice directly to buyers and got 20% more profit without any middlemen!"
        </p>
        <p className="font-bold text-green-700">— Rahim Hossain, Bogura</p>
      </div>
      <div className="bg-white p-10 rounded-3xl shadow-xl">
        <p className="text-lg italic text-gray-700 mb-6">
          "I found fresh organic tomatoes at the best price. The direct connection saved time and money!"
        </p>
        <p className="font-bold text-green-700">— Karim Ahmed, Dhaka</p>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Home;