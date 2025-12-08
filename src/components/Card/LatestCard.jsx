import React from 'react';
import { Link } from 'react-router-dom';

const LatestCard = ({ card }) => {
  return (
    <div className="group relative w-full max-w-sm mx-auto overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 bg-white border border-green-200">

      {/* IMAGE */}
      <div className="relative h-56 w-full overflow-hidden">
        <img
          src={card.image || "https://via.placeholder.com/400x300?text=No+Image"}
          alt={card.name}
          className="h-full w-full object-cover group-hover:scale-110 transition-all duration-500"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

        {/* Title */}
        <h2 className="absolute bottom-3 left-4 text-xl font-semibold text-white drop-shadow-lg">
          {card.name}
        </h2>
      </div>

      {/* CONTENT */}
      <div className="p-4 space-y-3">

        {/* Type */}
        <p className="text-sm font-medium text-green-700">
          {card.type}
        </p>

        {/* Price */}
        <p className="text-lg font-bold text-gray-900">
          ৳{card.pricePerUnit}
          <span className="text-sm font-medium text-gray-500"> / {card.unit}</span>
        </p>

        {/* Location */}
        <p className="text-sm text-gray-700 flex items-center gap-1">
          <span>📍</span> {card.location}
        </p>

        {/* Quantity */}
        <p className="text-sm text-gray-600">
          Available: <span className="font-semibold text-green-700">{card.quantity} {card.unit}</span>
        </p>

        {/* Button */}
        <Link to={`/card/${card._id}`}>
          <button className="mt-3 w-full py-2 rounded-xl bg-green-600 text-white font-semibold hover:bg-green-700 transition">
            View Details
          </button>
        </Link>
      </div>

    </div>
  );
};

export default LatestCard;
