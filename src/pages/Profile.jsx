import React, { useContext, useState } from "react";
import { AuthContext } from "../Context/AuthProvider";
import { motion } from "framer-motion";
import { Camera, Edit2, Save, Mail, User, MapPin } from "lucide-react";

export default function Profile() {
  const { user, update } = useContext(AuthContext);
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(user?.displayName || "");
  const [photo, setPhoto] = useState(user?.photoURL || "");

  const handleUpdate = async () => {
    await update(name, photo);
    setEdit(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 px-4 py-10">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="max-w-4xl mx-auto"
      >
        {/* Cover Section */}
        <div className="relative h-48 rounded-2xl bg-gradient-to-r from-green-600 to-lime-500 shadow-lg">
          <img
            src={photo || "https://i.ibb.co/9ZQZ4YF/farmer.png"}
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-white absolute -bottom-16 left-8 object-cover"
          />
          <div className="absolute top-4 right-4 bg-white/90 p-2 rounded-full shadow">
            <Camera className="w-5 h-5 text-green-600" />
          </div>
        </div>

        {/* Profile Card */}
        <div className="bg-white rounded-2xl shadow-xl pt-20 pb-8 px-8 mt-4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-gray-800">My Profile</h2>
            <button
              onClick={() => setEdit(!edit)}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-green-600 text-white hover:bg-green-700"
            >
              <Edit2 size={18} /> {edit ? "Cancel" : "Edit"}
            </button>
          </div>

          {/* Info */}
          <div className="grid md:grid-cols-2 gap-6">
            <motion.div whileHover={{ scale: 1.02 }} className="p-4 border rounded-xl">
              <label className="text-sm text-gray-500">Name</label>
              {edit ? (
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-3 py-2"
                />
              ) : (
                <p className="mt-2 flex items-center gap-2 font-medium">
                  <User size={18} /> {user?.displayName}
                </p>
              )}
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-4 border rounded-xl">
              <label className="text-sm text-gray-500">Email</label>
              <p className="mt-2 flex items-center gap-2 font-medium">
                <Mail size={18} /> {user?.email}
              </p>
            </motion.div>

            <motion.div whileHover={{ scale: 1.02 }} className="p-4 border rounded-xl md:col-span-2">
              <label className="text-sm text-gray-500">Photo URL</label>
              {edit ? (
                <input
                  value={photo}
                  onChange={(e) => setPhoto(e.target.value)}
                  className="w-full mt-2 border rounded-lg px-3 py-2"
                />
              ) : (
                <p className="mt-2 flex items-center gap-2 font-medium break-all">
                  <MapPin size={18} /> {user?.photoURL}
                </p>
              )}
            </motion.div>
          </div>

          {edit && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleUpdate}
              className="mt-6 flex items-center gap-2 px-6 py-3 bg-lime-600 text-white rounded-xl shadow hover:bg-lime-700"
            >
              <Save size={18} /> Save Changes
            </motion.button>
          )}
        </div>
      </motion.div>
    </div>
  );
}
