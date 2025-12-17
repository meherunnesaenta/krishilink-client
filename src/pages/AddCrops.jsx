import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider'; 
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'; 

const AddCrop = () => {
  const { user, loading: authLoading } = useContext(AuthContext);
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    type: 'Vegetable',
    pricePerUnit: '',
    unit: 'kg',
    quantity: '',
    description: '',
    location: '',
    image: '', 
  });

  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      toast.error('You must be logged in!');
      return;
    }

    setSubmitting(true);

    try {
      // Firebase ID token
      const token = await user.getIdToken();

      const payload = {
        name: formData.name,
        type: formData.type,
        pricePerUnit: Number(formData.pricePerUnit),
        unit: formData.unit,
        quantity: Number(formData.quantity),
        description: formData.description,
        location: formData.location,
        image: formData.image, 
        owner: {
          ownerEmail: user.email,
          ownerName: user.displayName || 'Anonymous',
        },
      };

      const response = await fetch('http://localhost:3000/card', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create crop post');
      }

      toast.success('Crop post created successfully!');

      // Redirect
      setTimeout(() => navigate('/my-posts'), 1500);

    } catch (err) {
      toast.error(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return <div className="text-center py-20 text-xl">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-20 text-red-600 text-xl">Please log in to add a crop post.</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-lime-100 py-10 px-4">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-10 text-green-800">Add New Crop Post</h2>

        <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-xl p-8 space-y-6">
          {/* Name */}
          <div>
            <label className="block text-lg font-medium mb-2">Crop Name *</label>
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Tomato, Rice, Mango"
            />
          </div>

          {/* Type */}
          <div>
            <label className="block text-lg font-medium mb-2">Type *</label>
            <select
              name="type"
              value={formData.type}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="Vegetable">Vegetable</option>
              <option value="Fruit">Fruit</option>
              <option value="Grain">Grain</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Price & Unit */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-lg font-medium mb-2">Price per Unit (BDT) *</label>
              <input
                type="number"
                name="pricePerUnit"
                required
                min="0"
                step="0.01"
                value={formData.pricePerUnit}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </div>
            <div>
              <label className="block text-lg font-medium mb-2">Unit *</label>
              <select
                name="unit"
                value={formData.unit}
                onChange={handleChange}
                className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="kg">kg</option>
                <option value="ton">ton</option>
                <option value="bag">bag</option>
                <option value="piece">piece</option>
              </select>
            </div>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-lg font-medium mb-2">Estimated Quantity *</label>
            <input
              type="number"
              name="quantity"
              required
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. 500"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-lg font-medium mb-2">Description *</label>
            <textarea
              name="description"
              rows="4"
              required
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="Short details about the crop, quality, etc."
            />
          </div>

          {/* Location */}
          <div>
            <label className="block text-lg font-medium mb-2">Location *</label>
            <input
              type="text"
              name="location"
              required
              value={formData.location}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="e.g. Bogura, Rajshahi"
            />
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-lg font-medium mb-2">Crop Image URL *</label>
            <input
              type="url"
              name="image"
              required
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-3 border rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
              placeholder="https://example.com/tomato.jpg"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting}
            className={`w-full py-4 rounded-xl text-white font-bold text-lg ${
              submitting
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-green-600 hover:bg-green-700 shadow-lg'
            }`}
          >
            {submitting ? 'Adding Crop...' : 'Add Crop Post'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCrop;
