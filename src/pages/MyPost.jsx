import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
export default function MyPost() {
  const { user, getToken } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingCrop, setEditingCrop] = useState(null); // যেই crop edit হচ্ছে
  const [editData, setEditData] = useState({}); // edited values
  const [showEdit, setShowEdit] = useState(false); // modal visibility


  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    fetch(`http://localhost:3000/myposts?email=${user.email}`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('accessToken') || ''}`
      }
    })
      .then(res => res.json())
      .then(data => {
        setPosts(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [user?.email]);

  if (loading) {
    return <div className="text-center py-10 text-xl">Loading your posts...</div>;
  }

  if (!user) {
    return <div className="text-center py-10 text-xl text-red-600">Please log in to see your posts</div>;
  }

  if (posts.length === 0) {
    return <div className="text-center py-10 text-xl text-gray-600">You haven't posted any crops yet.</div>;
  }

  // ✅ Delete handler
  const handleDelete = async (id) => {
    const token = await getToken(); // Firebase token
    if (!token) {
      alert("You must be logged in to perform this action");
      return;
    }

    fetch(`http://localhost:3000/card/${id}`, {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log("delete response:", data);
        if (data.success) {
          setPosts(prev => prev.filter(p => p._id !== id));
        } else {
          alert("Delete failed");
        }
      });
  };

  // ✅ Edit handler
  const handleEditSubmit = async (id) => {
    const token = await user.getIdToken();

    const updated = {
      name: editData.cropName,        // <-- cropName → name
      pricePerUnit: editData.price    // <-- price → pricePerUnit
    };

    const original = posts.find(p => p._id === id);
    if (original.name === updated.name && original.pricePerUnit === updated.pricePerUnit) {
      alert("No changes detected");
      return;
    }

    const res = await fetch(`http://localhost:3000/card/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify(updated)
    });

    const data = await res.json();
    console.log("edit response:", data);

    if (data.modifiedCount > 0) {
      setPosts(prev => prev.map(p => p._id === id ? { ...p, ...updated } : p));
      setShowEdit(false);
    } else {
      alert("Update failed");
    }
  };





  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto p-6">
      {posts.map(card => (
        <div key={card._id} className="border rounded p-4 space-y-3">

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

          <div className="flex gap-3 mt-3">
            <button
              onClick={() => {
                setEditingCrop(card);
                setEditData({
                  cropName: card.name,
                  price: card.pricePerUnit
                });
                setShowEdit(true);
              }}
              className="px-4 py-2 bg-yellow-400 text-white font-semibold rounded-lg shadow-md hover:bg-yellow-500 hover:scale-105 transition-transform duration-200"
            >
              Edit
            </button>

            <button
              onClick={() => handleDelete(card._id)}
              className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 hover:scale-105 transition-transform duration-200"
            >
              Delete
            </button>
          </div>


        </div>
      ))}

      {showEdit && (
        <motion.div
          className="fixed inset-0 flex items-center justify-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          {/* Background overlay */}
          <div
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setShowEdit(false)} // background click এ close
          ></div>

          {/* Modal content */}
          <motion.div
            className="relative bg-white rounded-3xl w-96 p-6 shadow-2xl z-10"
            initial={{ scale: 0.8, opacity: 0, y: -50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -50 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 120 }}
          >
            <h2 className="text-2xl font-bold mb-4 text-green-800">Edit Crop</h2>

            <label className="block mb-2 font-semibold text-gray-700">Crop Name</label>
            <input
              type="text"
              value={editData.cropName || ''}
              onChange={e => setEditData({ ...editData, cropName: e.target.value })}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <label className="block mb-2 font-semibold text-gray-700">Price</label>
            <input
              type="number"
              value={editData.price || 0}
              onChange={e => setEditData({ ...editData, price: parseFloat(e.target.value) })}
              className="border border-gray-300 rounded-lg p-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />

            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowEdit(false)}
                className="px-4 py-2 rounded-lg bg-gray-300 hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => handleEditSubmit(editingCrop._id)}
                className="px-4 py-2 rounded-lg bg-green-600 text-white hover:bg-green-700 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}


    </div>
  );
}
