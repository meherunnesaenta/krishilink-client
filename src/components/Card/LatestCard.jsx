import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const LatestCard = ({ card }) => {
  return (
    <motion.div
      className="group relative w-full max-w-sm mx-auto bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100 hover:shadow-2xl transition-all duration-700"
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.03,
        rotateY: 5,
        rotateX: 5,
        transition: { duration: 0.6 }
      }}
      style={{ transformStyle: "preserve-3d" }}
    >
      {/* IMAGE WITH PARALLAX */}
      <div className="relative h-72 overflow-hidden">
        <motion.img
          src={card.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={card.name}
          className="h-full w-full object-cover"
          whileHover={{ scale: 1.2, rotate: 2 }}
          transition={{ duration: 1 }}
        />

        {/* Subtle overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60" />

        {/* Name + Type Badge */}
        <div className="absolute bottom-5 left-5 right-5 flex justify-between items-end">
          <motion.h2
            className="text-3xl font-extrabold text-white drop-shadow-2xl"
            initial={{ y: 30, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {card.name}
          </motion.h2>

          <motion.span
            className="px-5 py-2 rounded-full bg-white/20 backdrop-blur-md text-white font-semibold border border-white/30 shadow-lg"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            transition={{ delay: 0.5, type: "spring" }}
          >
            {card.type}
          </motion.span>
        </div>
      </div>

      {/* CONTENT */}
      <motion.div
        className="p-7 space-y-5 bg-gradient-to-b from-white to-green-50"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.8 }}
      >
        {/* Price */}
        <div className="flex items-end gap-3">
          <p className="text-4xl font-bold text-green-800">
            ৳{card.pricePerUnit}
          </p>
          <span className="text-xl text-gray-600 font-medium pb-1">/ {card.unit}</span>
        </div>

        {/* Location - Standard SVG Icon */}
        <div className="flex items-center gap-3 text-gray-700">
          <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-lg">{card.location}</span>
        </div>

        {/* Availability */}
        <p className="text-gray-700 text-lg">
          Available: <span className="font-bold text-green-800">{card.quantity} {card.unit}</span>
        </p>

        {/* Button with Shine */}
        <Link to={`/card/${card._id}`}>
          <motion.button
            className="relative w-full py-4 rounded-2xl overflow-hidden bg-gradient-to-r from-green-600 to-green-800 text-white font-bold text-lg shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="relative z-10">View Details</span>
            <motion.div
              className="absolute inset-0 bg-white/20"
              initial={{ x: "-100%" }}
              whileHover={{ x: "100%" }}
              transition={{ duration: 0.8 }}
            />
          </motion.button>
        </Link>
      </motion.div>
    </motion.div>
  );
};

export default LatestCard;