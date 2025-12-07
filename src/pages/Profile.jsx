// src/pages/Profile.jsx

import { useState } from "react";
import Swal from "sweetalert2";

const Profile = () => {
  const { user } = useAuth();

  const [profile, setProfile] = useState({
    name: user?.displayName || "",
    email: user?.email || "",
    photoURL: user?.photoURL || "",
    phone: "",
    location: "",
    bio: "",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Optional: send to backend later
      // await axios.patch("/api/profile", profile);

      Swal.fire({
        icon: "success",
        title: "Success!",
        text: "Profile updated successfully",
        timer: 2000,
        showConfirmButton: false,
      });
      setIsEditing(false);
    } catch (err) {
      Swal.fire("Oops!", "Something went wrong", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="py-20 bg-lightbg min-h-screen">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-primary mb-12">
          My Profile
        </h1>

        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
            {/* Header Background */}
            <div className="bg-gradient-to-r from-primary to-secondary h-40 relative">
              <div className="absolute -bottom-16 left-1/2 -translate-x-1/2">
                <img
                  src={profile.photoURL || "https://i.ibb.co.com/0jK7gG6/default-avatar.jpg"}
                  alt="Profile"
                  className="w-32 h-32 rounded-full border-8 border-white shadow-xl object-cover"
                />
              </div>
            </div>

            {/* Profile Info */}
            <div className="pt-20 pb-12 px-8 text-center">
              <h2 className="text-3xl font-bold text-gray-800">
                {profile.name || "Your Name"}
              </h2>
              <p className="text-gray-600 mt-2">{profile.email}</p>
              <p className="text-sm text-gray-500 mt-1">
                {profile.location || "Add your location"}
              </p>

              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-8 btn btn-outline btn-primary"
              >
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>

            {/* Edit Form */}
            {isEditing && (
              <div className="px-8 pb-12 border-t pt-8 bg-gray-50">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="label font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="Enter your name"
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Phone</label>
                    <input
                      type="text"
                      name="phone"
                      value={profile.phone}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="+880 17xxx xxxxx"
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Location / District</label>
                    <input
                      type="text"
                      name="location"
                      value={profile.location}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="e.g. Bogura"
                    />
                  </div>
                  <div>
                    <label className="label font-medium">Photo URL (optional)</label>
                    <input
                      type="url"
                      name="photoURL"
                      value={profile.photoURL}
                      onChange={handleChange}
                      className="input input-bordered w-full"
                      placeholder="https://your-photo-link.jpg"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="label font-medium">Bio</label>
                  <textarea
                    name="bio"
                    value={profile.bio}
                    onChange={handleChange}
                    rows="4"
                    className="textarea textarea-bordered w-full"
                    placeholder="Tell everyone about your farm..."
                  />
                </div>

                <div className="text-center mt-8">
                  <button
                    onClick={handleSave}
                    disabled={loading}
                    className="btn btn-primary btn-lg"
                  >
                    {loading ? <span className="loading loading-spinner"></span> : "Save Changes"}
                  </button>
                </div>
              </div>
            )}

            {/* Stats */}
            <div className="bg-gray-100 px-8 py-12 border-t">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                <div>
                  <h3 className="text-4xl font-bold text-primary">12</h3>
                  <p className="text-gray-600">Posts</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-primary">48</h3>
                  <p className="text-gray-600">Interests</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-primary">7</h3>
                  <p className="text-gray-600">Deals</p>
                </div>
                <div>
                  <h3 className="text-4xl font-bold text-primary">2025</h3>
                  <p className="text-gray-600">Joined</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Profile;