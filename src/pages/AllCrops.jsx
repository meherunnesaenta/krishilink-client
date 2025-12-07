// src/pages/AllCrops.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router";
import axios from "axios";

const AllCrops = () => {
  const [crops, setCrops] = useState([]);
  const [filteredCrops, setFilteredCrops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch all crops from server
  useEffect(() => {
    axios
      .get("https://krishilink-server.vercel.app/crops") 
      .then((res) => {
        setCrops(res.data);
        setFilteredCrops(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    const filtered = crops.filter(
      (crop) =>
        crop.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
        crop.type.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredCrops(filtered);
  }, [searchTerm, crops]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <section className="py-20 bg-lightbg min-h-screen">
      <div className="container mx-auto px-6">
        {/* Page Title */}
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

        {/* No Results Message */}
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

        {/* Crops Grid */}
        {filteredCrops.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCrops.map((crop) => (
              <div
                key={crop._id}
                className="card bg-white shadow-xl hover:shadow-2xl transition duration-300"
              >
                <figure className="px-6 pt-6">
                  <img
                    src={crop.image || "https://i.ibb.co.com/5Y7h7n8/default-crop.jpg"}
                    alt={crop.name}
                    className="rounded-xl h-56 w-full object-cover"
                  />
                </figure>

                <div className="card-body">
                  <h2 className="card-title text-xl font-bold text-primary">
                    {crop.name}
                  </h2>

                  <div className="flex flex-wrap gap-2 my-2">
                    <span className="badge badge-secondary badge-outline">
                      {crop.type}
                    </span>
                    <span className="badge badge-accent badge-outline">
                      {crop.location}
                    </span>
                  </div>

                  <p className="text-2xl font-bold text-accent">
                    ৳{crop.pricePerUnit} <span className="text-sm font-normal text-gray-600">/ {crop.unit}</span>
                  </p>

                  <p className="text-gray-600">
                    Available: <strong>{crop.quantity} {crop.unit}</strong>
                  </p>

                  <div className="card-actions justify-end mt-4">
                    <Link
                      to={`/crop/${crop._id}`}
                      className="btn btn-primary"
                    >
                      View Details
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default AllCrops;