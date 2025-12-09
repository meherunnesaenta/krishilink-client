// src/components/Card/CardDetails.jsx
import { useState, useEffect, useContext } from "react";
import { useLoaderData } from "react-router-dom";
import Swal from "sweetalert2";
import { AuthContext } from "../../Context/AuthProvider";
import { motion } from "framer-motion";
import { Leaf, MapPin, Package, User, Sparkles, Wheat } from "lucide-react";
const CardDetails = () => {
  const loadedData = useLoaderData();
  const crop = loadedData?.data || loadedData?.result || loadedData || {};

  const { user, loading: authLoading } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);
  const [interests, setInterests] = useState(crop.interests || []);

  const totalPrice = quantity * (crop.pricePerUnit || 0);
  const isOwner = user?.email === crop.owner?.ownerEmail;

  if (!crop || !crop._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <span className="loading loading-spinner loading-lg text-error mb-6"></span>
        <p className="text-3xl font-bold text-red-600">Crop Not Found!</p>
        <p className="text-gray-600 mt-2">The crop you are looking for does not exist.</p>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  useEffect(() => {
    if (user && interests.length > 0) {
      const sent = interests.find((i) => i.userEmail === user.email);
      setAlreadySent(!!sent);
    }
  }, [user, interests]);

  // Submit Interest
  const handleSubmitInterest = () => {
    if (quantity < 1) {
      Swal.fire("Error", "Quantity must be at least 1", "error");
      return;
    }

    Swal.fire({
      title: "Confirm Interest?",
      text: `You want ${quantity} ${crop.unit} of ${crop.name}?`,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Send!",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        const interestData = {
          cropId: crop._id,
          userEmail: user.email,
          userName: user.displayName || "Anonymous",
          quantity: Number(quantity),
          message,
          status: "pending",
        };

        fetch("http://localhost:3000/card", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interestData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Success!", "Interest sent successfully!", "success");
              setAlreadySent(true);
              // Refresh interests
              fetch(`http://localhost:3000/card/${crop._id}`)
                .then((res) => res.json())
                .then((updated) => {
                  const newCrop = updated?.data || updated?.result || updated || {};
                  setInterests(newCrop.interests || []);
                });
            } else {
              Swal.fire("Failed", data.message || "Something went wrong", "error");
            }
          })
          .catch(() => {
            Swal.fire("Error", "Failed to send interest", "error");
          });
      }
    });
  };

  // Accept / Reject Interest
  const handleStatusChange = (interestId, status) => {
    Swal.fire({
      title: `Are you sure to ${status} this interest?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: status === "accepted" ? "#22c55e" : "#ef4444",
      confirmButtonText: `Yes, ${status}!`,
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/interest/status", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interestId, cropId: crop._id, status }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              Swal.fire("Updated!", `Interest ${status}!`, "success");
              // Refresh interests
              fetch(`http://localhost:3000/card/${crop._id}`)
                .then((res) => res.json())
                .then((updated) => {
                  const newCrop = updated?.data || updated?.result || updated || {};
                  setInterests(newCrop.interests || []);
                });
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="group relative max-w-6xl mx-auto"
        >
          {/* Main Card */}
          <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Floating Background Elements */}
            <div className="absolute inset-0 opacity-5">
              <div className="absolute top-10 left-10 w-72 h-72 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-400 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Image Section */}
            <div className="relative overflow-hidden">
              <motion.img
                src={crop.image || "/no-image.jpg"}
                alt={crop.name}
                className="w-full h-96 md:h-full object-cover transition-transform duration-700 group-hover:scale-110"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>

              {/* Sparkles Effect */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-6 right-6"
              >
                <Sparkles className="w-12 h-12 text-yellow-400 opacity-60" />
              </motion.div>

              {/* Crop Name with Glow */}
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 left-8 text-5xl md:text-6xl font-extrabold text-white 
                       drop-shadow-2xl tracking-tight
                       bg-clip-text bg-gradient-to-r from-green-400 to-emerald-300 
                       text-transparent animate-pulse"
                style={{
                  textShadow: "0 0 30px rgba(34,197,94,0.7)"
                }}
              >
                {crop.name}
              </motion.h1>

              {/* Leaf Icon Decoration */}
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                className="absolute top-8 left-8"
              >
                <Leaf className="w-16 h-16 text-green-400 opacity-80" />
              </motion.div>
            </div>

            {/* Details Section */}
            <div className="p-8 md:p-12 lg:p-16 space-y-8 relative z-10 bg-gradient-to-br from-gray-50 to-green-50">
              {/* Price Badge - Animated */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                className="inline-block"
              >
                <div className="flex items-baseline gap-4 p-6 bg-gradient-to-r from-green-600 to-emerald-600 
                          rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300
                          border-4 border-white/20">
                  <span className="text-6xl font-black text-white tracking-tighter">
                    ৳{crop.pricePerUnit || 0}
                  </span>
                  <span className="text-2xl font-bold text-green-100">
                    / {crop.unit || "unit"}
                  </span>
                </div>
              </motion.div>

              {/* Info Grid */}
              <div className="space-y-6 text-lg">
                {[
                  { icon: Leaf, label: "Type", value: crop.type || "N/A", color: "text-green-600" },
                  { icon: MapPin, label: "Location", value: crop.location || "Not specified", color: "text-blue-600" },
                  { icon: Package, label: "Available", value: `${crop.quantity || 0} ${crop.unit || ""}`, color: "text-emerald-600", highlight: true },
                  { icon: User, label: "Posted by", value: crop.owner?.ownerName || "Farmer", color: "text-purple-600" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-5 p-4 rounded-2xl bg-white/70 backdrop-blur-sm 
                           shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1
                           border border-green-100"
                  >
                    <div className={`p-3 rounded-full bg-gradient-to-br from-green-100 to-emerald-100`}>
                      <item.icon className={`w-7 h-7 ${item.color}`} />
                    </div>
                    <div className="flex-1">
                      <span className="font-semibold text-gray-700">{item.label}:</span>
                      <span className={`ml-3 font-bold ${item.highlight ? "text-2xl text-green-700" : "text-gray-900"}`}>
                        {item.value}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Description */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 1 }}
                className="pt-6 border-t-2 border-dashed border-green-200"
              >
                <p className="text-gray-700 leading-relaxed text-lg italic">
                  "{crop.description || "No description available"}"
                </p>
              </motion.div>

              {/* Fresh Badge */}
              <div
                className="absolute -top-4 -right-4"
              >
                <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white px-8 py-3 
                          rounded-full text-lg font-bold shadow-2xl rotate-12">
                  FRESH!
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Interest Form - Only for non-owners */}
        {!isOwner && user && !alreadySent && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Show Your Interest</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="label"><span className="label-text text-lg">Quantity ({crop.unit || "unit"})</span></label>
                <input
                  type="number"
                  min="1"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  className="input input-bordered input-lg w-full"
                />
              </div>
              <div className="md:col-span-2">
                <label className="label"><span className="label-text text-lg">Message (Optional)</span></label>
                <input
                  type="text"
                  placeholder="e.g. I am interested in buying..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="input input-bordered input-lg w-full"
                />
              </div>
            </div>

            <div className="mt-6 p-6 bg-green-50 rounded-xl border-2 border-green-200">
              <p className="text-2xl font-bold text-green-800 text-center">
                Total Price: ৳{totalPrice.toLocaleString()}
              </p>
            </div>

            <button
              onClick={handleSubmitInterest}
              className="mt-8 btn btn-success btn-lg w-full text-xl"
            >
              Send Interest Request
            </button>
          </div>
        )}

        {/* Already Sent Message */}
        {!isOwner && alreadySent && (
          <div className="mt-12 alert alert-success shadow-lg text-center text-xl">
            You have already sent an interest request for this crop.
          </div>
        )}

        {/* Owner: Received Interests */}
        {isOwner && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">
              Received Interests ({interests.length})
            </h2>

            {interests.length === 0 ? (
              <div className="text-center py-16 text-gray-500 text-xl">
                No interests received yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                  <thead>
                    <tr className="text-lg">
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interests.map((interest) => (
                      <tr key={interest._id}>
                        <td className="font-semibold">{interest.userName || interest.userEmail}</td>
                        <td>{interest.quantity} {crop.unit}</td>
                        <td>{interest.message || "-"}</td>
                        <td>
                          <span
                            className={`badge ${interest.status === "pending"
                                ? "badge-warning"
                                : interest.status === "accepted"
                                  ? "badge-success"
                                  : "badge-error"
                              }`}
                          >
                            {interest.status}
                          </span>
                        </td>
                        <td>
                          {interest.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStatusChange(interest._id, "accepted")}
                                className="btn btn-success btn-sm"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleStatusChange(interest._id, "rejected")}
                                className="btn btn-error btn-sm"
                              >
                                Reject
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CardDetails;