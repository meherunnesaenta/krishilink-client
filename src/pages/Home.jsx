// src/pages/Home.jsx
import {useEffect} from "react";
import { Link } from "react-router-dom";
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
      <section className="relative">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          loop={true}
          className="h-96 md:h-screen"
        >
          <SwiperSlide>
            <div className="hero h-full" style={{ backgroundImage: `url(${Banner1})` }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-white">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold">Join the Farmer directly</h1>
                  <p className="py-6 text-lg md:text-2xl">Sell ​​crops, find buyers – without intermediaries!</p>
                  <Link to="/all-crops" className="btn btn-accent btn-lg">See all crops</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero h-full" style={{ backgroundImage: `url(${Banner2})` }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-white">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold">Get the right price for your crops.</h1>
                  <p className="py-6 text-lg md:text-2xl">Talk directly to Sar through Krishilink</p>
                  <Link to="/register" className="btn btn-accent btn-lg">Join now</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>

          <SwiperSlide>
            <div className="hero h-full" style={{ backgroundImage: `url(${Banner3})` }}>
              <div className="hero-overlay bg-opacity-60"></div>
              <div className="hero-content text-center text-white">
                <div className="max-w-2xl">
                  <h1 className="text-4xl md:text-6xl font-bold">Thousands of buyers with one click</h1>
                  <p className="py-6 text-lg md:text-2xl">Post a picture of your crop, interested buyers will find you.</p>
                  <Link to="/add-crop" className="btn btn-accent btn-lg">Add crops</Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>

        
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10">
          <div className="swiper-pagination"></div>
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

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-4xl font-bold text-center text-green-800 mb-16">কীভাবে কাজ করে কৃষিলিংক?</h2>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center">
              <img src=  "https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?q=80&w=1089&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
 alt="" className="mx-auto mb-6 h-32" />
              <h3 className="text-2xl font-bold text-green-800">১. ফসল যোগ করুন</h3>
              <p className="mt-4 text-gray-600">আপনার ফসলের ছবি, দাম, পরিমাণ দিয়ে পোস্ট করুন</p>
            </div>
            <div className="text-center">
              <img src= "https://images.unsplash.com/photo-1603833665858-e61d17a86224?q=80&w=627&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
 alt="" className="mx-auto mb-6 h-32" />
              <h3 className="text-2xl font-bold text-green-800">২. আগ্রহ দেখান</h3>
              <p className="mt-4 text-gray-600">পছন্দের ফসলে "আগ্রহী" বাটন চাপুন</p>
            </div>
            <div className="text-center">
              <img src= "https://images.unsplash.com/photo-1611080626919-7cf5a9dbab5b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8b3JhbmdlfGVufDB8fDB8fHww" alt="" className="mx-auto mb-6 h-32" />
              <h3 className="text-2xl font-bold text-green-800">৩. সরাসরি যোগাযোগ</h3>
              <p className="mt-4 text-gray-600">কৃষকের সাথে চ্যাট করে দাম ঠিক করুন</p>
            </div>
          </div>
        </div>
      </section>

      {/* Extra 2 Sections (তোর এসাইনমেন্টে লাগবে) */}
      <section className="py-20 bg-lightbg">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold text-green-800 mb-8">কেন কৃষিলিংক বেছে নেবেন?</h2>
          <div className="grid md:grid-cols-4 gap-8 mt-12">
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-5xl font-bold text-accent">১০০০+</h3>
              <p className="mt-4 text-xl">সক্রিয় কৃষক</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-5xl font-bold text-accent">৫০+</h3>
              <p className="mt-4 text-xl">জেলায় পৌঁছে গেছে</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-5xl font-bold text-accent">১০০%</h3>
              <p className="mt-4 text-xl">মধ্যস্থতাকারী মুক্ত</p>
            </div>
            <div className="bg-white p-8 rounded-2xl shadow-lg">
              <h3 className="text-5xl font-bold text-accent">২৪/৭</h3>
              <p className="mt-4 text-xl">সাপোর্ট</p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;