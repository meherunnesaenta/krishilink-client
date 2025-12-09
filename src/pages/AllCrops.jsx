// src/pages/AllCrops.jsx
import React, { useState, useEffect } from "react";
import Card from "../components/Card/Card";

const cardPromise = fetch('http://localhost:3000/latest-products')
  .then(res => res.json());

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  // Load crops from cardPromise (same as Home)
  useEffect(() => {
    cardPromise.then(data => {
      setCrops(data);
      setFilteredCrops(data);
    });
  }, []);

  // Search filter
useEffect(() => {
  const term = searchTerm.toLowerCase().trim();

  if (!term) {
    setFilteredCrops(crops);
    return;
  }

  const filtered = crops.filter((crop) => {
    const searchable = [
      crop.name,
      crop.location,
      crop.type,
      crop.description, 
    ]
      .filter(Boolean)
      .map(field => field.toString().toLowerCase())
      .join(" ");

    return searchable.includes(term);
  });

  setFilteredCrops(filtered);
}, [searchTerm, crops]);
  // If crops empty but still loading
  if (!crops.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-20 bg-lightbg min-h-screen">
      <div className="container mx-auto px-6">

        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-4">
          All Crops
        </h1>
        <p className="text-center text-gray-600 mb-12 text-lg">
          Browse fresh crops directly from farmers across the country
        </p>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="relative">
            <input
              type="text"
              placeholder="Search by crop name, location, or type..."
              className="input input-bordered input-lg w-full pl-12 text-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />

            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-7 w-7 absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* No Results */}
        {filteredCrops.length === 0 && (
          <div className="text-center py-20">
            <h3 className="text-3xl font-semibold text-gray-500 mb-4">
              No crops found
            </h3>
            <p className="text-gray-600">
              Try searching with different keywords
            </p>
          </div>
        )}

        {/* SAME AS HOME.JSX */}
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center min-h-96">
              <span className="loading loading-spinner loading-lg text-primary"></span>
            </div>
          }
        >
          <Card cardPromise={cardPromise} searchTerm={searchTerm} />
        </React.Suspense>
      </div>
    </section>
  );
};

export default AllCrops;
