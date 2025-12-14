import React, { useContext, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider'; 
import { useNavigate } from 'react-router-dom';
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import { app } from '../Firebase/Firebase.config'; 

const storage = getStorage(app);

const AddCrops = () => {
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

  const [imageFile, setImageFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleImageChange = (e) => {
    if (e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const uploadImage = async () => {
    if (!imageFile) return null;

    const storageRef = ref(storage, `crop-images/${Date.now()}_${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);

    return new Promise((resolve, reject) => {
      setUploading(true);
      uploadTask.on(
        'state_changed',
        (snapshot) => {
         
        },
        (error) => {
          setUploading(false);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          setUploading(false);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to create a post.');
      return;
    }

    setSubmitting(true);
    setError('');
    setSuccess('');

    try {
      
      let imageUrl = '';
      if (imageFile) {
        imageUrl = await uploadImage();
      }

    
      const payload = {
        name: formData.name,
        type: formData.type,
        pricePerUnit: Number(formData.pricePerUnit),
        unit: formData.unit,
        quantity: Number(formData.quantity),
        description: formData.description,
        location: formData.location,
        image: imageUrl || formData.image, 
        owner: {
          ownerEmail: user.email,
          ownerName: user.displayName || 'Anonymous',
        },
      };

      // Backend-এ POST রিকোয়েস্ট
      const response = await fetch('http://localhost:3000/card', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',

        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errData = await response.json();
        throw new Error(errData.message || 'Failed to create crop post');
      }

      setSuccess('Crop post created successfully!');

      setTimeout(() => {
        navigate('/add-crop'); 
      }, 2000);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setSubmitting(false);
    }
  };

  if (authLoading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (!user) {
    return <div className="text-center py-10 text-red-600">Please log in to create a crop post.</div>;
  }

  return (
    <div className="max-w-2xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-8 text-center">Create New Crop Post</h2>

      {success && (
        <div className="mb-6 p-4 bg-green-100 text-green-800 rounded-lg text-center">
          {success}
        </div>
      )}

      {error && (
        <div className="mb-6 p-4 bg-red-100 text-red-800 rounded-lg text-center">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium mb-1">Crop Name</label>
          <input
            type="text"
            name="name"
            required
            value={formData.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Type</label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          >
            <option value="Vegetable">Vegetable</option>
            <option value="Fruit">Fruit</option>
            <option value="Grain">Grain</option>
            <option value="Other">Other</option>
          </select>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Price per Unit</label>
            <input
              type="number"
              name="pricePerUnit"
              required
              min="0"
              step="0.01"
              value={formData.pricePerUnit}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Unit</label>
            <select
              name="unit"
              value={formData.unit}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="kg">kg</option>
              <option value="ton">ton</option>
              <option value="bag">bag</option>
              <option value="piece">piece</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Estimated Quantity</label>
          <input
            type="number"
            name="quantity"
            required
            min="1"
            value={formData.quantity}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <textarea
            name="description"
            rows="4"
            required
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            required
            value={formData.location}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Crop Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full px-4 py-2 border rounded-lg"
          />
          {uploading && <p className="text-blue-600 mt-2">Uploading image...</p>}
          {imageFile && !uploading && (
            <p className="text-green-600 mt-2">Image selected: {imageFile.name}</p>
          )}
        </div>

        <button
          type="submit"
          disabled={submitting || uploading}
          className={`w-full py-3 rounded-lg text-white font-semibold ${
            submitting || uploading
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-green-600 hover:bg-green-700'
          }`}
        >
          {submitting ? 'Creating Post...' : 'Create Post'}
        </button>
      </form>
    </div>
  );
};

export default AddCrops;