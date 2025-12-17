// src/pages/CropDetails.jsx
import React, { useContext, useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider";
import Swal from "sweetalert2";
import { motion } from "framer-motion";
import { Leaf, MapPin, Package, User } from "lucide-react";

const CropDetails = () => {
  const loadedData = useLoaderData();
  const crop = loadedData?.data || loadedData?.result || loadedData || {};
  const { user, loading: authLoading } = useContext(AuthContext);

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [interests, setInterests] = useState([]);

  const totalPrice = quantity * (crop.pricePerUnit || 0);
  const isOwner = user?.email === crop?.owner?.ownerEmail;

  if (!crop || !crop._id) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-red-50 to-pink-50">
        <span className="loading loading-spinner loading-lg text-error mb-6"></span>
        <p className="text-4xl font-bold text-red-600">Crop Not Found!</p>
        <p className="text-xl text-gray-600 mt-4">
          The crop you are looking for does not exist.
        </p>
      </div>
    );
  }

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

const alreadyInterested = Array.isArray(interests)
  ? interests.some((i) => {
      const isMatch = i.buyer_email === user?.email;
      console.log("Checking:", i.buyer_email, "vs", user?.email, "→", isMatch);
      return isMatch; // এটা আবশ্যক!
    })
  : false;

    

  const handleSubmitInterest = async (e) => {
    e.preventDefault();
    const qty = e.target.quantity.value;
    const msg = e.target.message.value;

    const confirmResult = await Swal.fire({
      title: "Confirm Interest?",
      text: "Do you want to send this interest request?",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Yes, Send",
    });

    if (!confirmResult.isConfirmed) return;

    const newInterest = {
      cropId: crop._id,
      product: crop.name,
      buyer_email: user?.email,
      buyer_name: user?.displayName || user?.email || "Anonymous",
      ownerName: crop.owner?.ownerName || "Anonymous",
      price: totalPrice,
      quantity: Number(qty),
      message: msg || "Interested in this crop",
      status: "pending",
    };

    fetch("https://krishilink-xi.vercel.app/interest", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newInterest),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success || data.insertedId) {
          Swal.fire({
            title: "Sent!",
            html: `
              <p>Quantity: <strong>${qty} ${crop.unit}</strong></p>
              <p>Total Price: <strong>৳${totalPrice.toLocaleString()}</strong></p>
            `,
            icon: "success",
            timerProgressBar: true,
          });

          // Update interests locally
          const updatedInterests = [...interests, { ...newInterest, _id: data.insertedId || data.success }];
          updatedInterests.sort((a, b) => b.quantity - a.quantity);
          setInterests(updatedInterests);
        }
      });
  };

  useEffect(() => {
    if (!user || !crop?._id) return;

    fetch(`https://krishilink-xi.vercel.app/card/interest/${crop._id}`,{
      headers: {
        Authorization: `Bearer ${user && user.accessToken}`
      }
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("Received interests:", data);
        setInterests(Array.isArray(data) ? data : []);

      })
      .catch((err) => {
        console.error(err);
        setInterests([]);
      });
  }, [crop._id, user]);

const handleStatusChange = async (interestId, newStatus) => {
  const confirmResult = await Swal.fire({
    title: "Are you sure?",
    text: `Do you want to ${newStatus} this interest request?`,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: newStatus === "accepted" ? "#22c55e" : "#ef4444",
    confirmButtonText: `Yes, ${newStatus === "accepted" ? "Accept" : "Reject"}`,
    cancelButtonText: "Cancel",
  });

  if (!confirmResult.isConfirmed) return;

  // Loading spinner
  Swal.fire({
    title: "Processing...",
    text: "Please wait",
    allowOutsideClick: false,
    didOpen: () => {
      Swal.showLoading();
    },
  });

  let response; 

  try {
    const idToken = await user.getIdToken();

    response = await fetch(`https://krishilink-xi.vercel.app/interest/${interestId}/status`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${idToken}`,
      },
      body: JSON.stringify({ status: newStatus }),
    });

    const data = await response.json();

    // Debug logs (এগুলো এখন কাজ করবে)
    console.log("Frontend: Response status:", response.status);
    console.log("Frontend: Response OK?", response.ok);
    console.log("Frontend: Response data:", data);

    Swal.close(); // লোডিং বন্ধ

    if (response.ok && data.success) {
      Swal.fire({
        title: "Success!",
        text: data.message || `Interest has been ${newStatus}!`,
        icon: "success",
        timer: 2000,
        showConfirmButton: false,
      });

      // UI আপডেট
      setInterests((prev) =>
        prev.map((interest) =>
          interest._id === interestId
            ? { ...interest, status: newStatus }
            : interest
        )
      );
    } else {
      const errorMsg = data.message || "Failed to update status.";
      Swal.fire({
        title: "Error",
        text: errorMsg,
        icon: "error",
      });
    }
  } catch (err) {
    console.error("Status update error:", err);
    Swal.close();

    // যদি response না পাওয়া যায় (network error ইত্যাদি)
    Swal.fire({
      title: "Error",
      text: "Network error or something went wrong. Please try again.",
      icon: "error",
    });
  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Main Hero Card */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <div className="grid md:grid-cols-2 gap-0 bg-white rounded-3xl shadow-2xl overflow-hidden relative">
            {/* Background Effects */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute top-10 left-10 w-80 h-80 bg-green-400 rounded-full blur-3xl animate-pulse"></div>
              <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            {/* Image */}
            <div className="relative overflow-hidden">
              <motion.img
                src={crop.image || "/no-image.jpg"}
                alt={crop.name}
                className="w-full h-96 md:h-full object-cover transition-transform duration-700 hover:scale-110"
                initial={{ scale: 1.2 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
              <motion.h1
                initial={{ y: 50, opacity: 0 }}
                whileInView={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="absolute bottom-8 left-8 text-5xl md:text-7xl font-extrabold text-white drop-shadow-2xl bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent"
              >
                {crop.name}
              </motion.h1>
              <motion.div
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.6, type: "spring" }}
                className="absolute top-8 left-8"
              >
                <Leaf className="w-16 h-16 text-green-400" />
              </motion.div>
            </div>

            {/* Details */}
            <div className="p-8 md:p-12 lg:p-16 space-y-8 bg-gradient-to-br from-gray-50 to-green-50">
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
              >
                <div className="flex items-baseline gap-4 p-6 bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl shadow-2xl border-4 border-white/30">
                  <span className="text-7xl font-black text-white">৳{crop.pricePerUnit}</span>
                  <span className="text-2xl font-bold text-green-100">/ {crop.unit}</span>
                </div>
              </motion.div>

              <div className="space-y-6 text-lg">
                {[
                  { icon: Leaf, label: "Type", value: crop.type },
                  { icon: MapPin, label: "Location", value: crop.location },
                  { icon: Package, label: "Available", value: `${crop.quantity} ${crop.unit}`, highlight: true },
                  { icon: User, label: "Farmer", value: crop.owner?.ownerName || "Anonymous" },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ x: -50, opacity: 0 }}
                    whileInView={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.7 + i * 0.1 }}
                    className="flex items-center gap-5 p-5 rounded-2xl bg-white/80 backdrop-blur-sm shadow-lg hover:shadow-xl transition-all border-l-4 border-green-400"
                  >
                    <div className="p-3 rounded-full bg-gradient-to-br from-green-100 to-emerald-100">
                      <item.icon className="w-8 h-8 text-green-600" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">{item.label}:</p>
                      <p className={`font-bold text-lg ${item.highlight ? "text-2xl text-green-700" : ""}`}>
                        {item.value}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="text-gray-700 text-lg italic pt-6 border-t-2 border-dashed border-green-200"
              >
                ❝ {crop.description || "No description available"} ❞
              </motion.p>

              <div className="absolute -top-5 -right-5">
                <div className="bg-gradient-to-r from-orange-500 to-red-600 text-white px-10 py-4 rounded-full text-xl font-bold shadow-2xl rotate-12 border-4 border-white">
                  100% FRESH!
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Owner View: Received Interests */}
        {isOwner ? (
          <div className="mt-16 bg-white rounded-3xl shadow-2xl p-10">
            <h2 className="text-4xl font-bold text-center mb-8 text-green-700">
              Received Interests ({interests?.length || 0})
            </h2>
            {!Array.isArray(interests) || interests.length === 0 ? (
              <div className="text-center text-red-500 text-lg">No interests received yet.</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table table-zebra table-lg">
                  <thead>
                    <tr>
                      <th>Serial Number</th>
                      <th>Buyer</th>
                      <th>Quantity</th>
                      <th>Message</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {interests.map((i, index) => (
                      <tr key={i._id}>
                        <td className="font-bold">{index + 1}</td>
                        <td className="font-bold">{i.buyer_name}</td>
                        <td>{i.quantity} {crop.unit}</td>
                        <td>{i.message || "-"}</td>
                        <td>
                          <span
                            className={`badge badge-lg ${
                              i.status === "accepted"
                                ? "badge-success"
                                : i.status === "rejected"
                                ? "badge-error"
                                : "badge-warning"
                            }`}
                          >
                            {i.status}
                          </span>
                        </td>
                        <td>
                          {i.status === "pending" && (
                            <div className="flex gap-2">
                              <button
                                onClick={() => handleStatusChange(i._id, "accepted")}
                                className="btn btn-success btn-sm"
                              >
                                Accept
                              </button>
                              <button
                                onClick={() => handleStatusChange(i._id, "rejected")}
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
        ) : (
          /* Buyer View: Show Interest Form */
          <div className="mx-auto mt-20 max-w-2xl">
            <h3 className="text-4xl font-bold text-center mb-8 text-green-700">Show Your Interest</h3>

            {alreadyInterested ? (
              <p className="text-error text-center font-bold text-2xl">
                You’ve already sent an interest for this crop.
              </p>
            ) : (
              <form onSubmit={handleSubmitInterest} className="space-y-6">
                <div>
                  <label className="label text-lg font-semibold">Your Name</label>
                  <input
                    type="text"
                    defaultValue={user?.displayName || user?.email}
                    readOnly
                    className="input input-bordered w-full"
                  />
                </div>

                <div>
                  <label className="label text-lg font-semibold">Quantity ({crop.unit})</label>
                  <input
                    type="number"
                    name="quantity"
                    min="1"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, Number(e.target.value) || 1))}
                    className="input input-bordered input-lg w-full"
                    required
                  />
                </div>

                <div>
                  <label className="label text-lg font-semibold">Message (Optional)</label>
                  <textarea
                    name="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="textarea textarea-bordered w-full h-32"
                    placeholder="যেমন: আমি ১০০ কেজি কিনতে চাই..."
                  ></textarea>
                </div>

                <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-8 rounded-2xl text-center">
                  <p className="text-4xl font-black text-green-800">
                    Total: ৳{totalPrice.toLocaleString()}
                  </p>
                </div>

                <button
                  type="submit"
                  className="btn btn-success btn-lg w-full text-xl"
                >
                  Send Interest Request
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CropDetails;