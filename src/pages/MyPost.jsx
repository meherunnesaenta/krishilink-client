import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../Context/AuthProvider'; // AuthContext ইম্পোর্ট করো
import LatestCard from '../components/Card/LatestCard';

export default function MyPost() {
  const { user } = useContext(AuthContext); // এটাই সঠিক উপায়
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.log('my posts data', data);
        setPosts(data);
        setLoading(false);
      })
      .catch(err => {
        console.error('Fetch error:', err);
        setLoading(false);
      });
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 w-full max-w-7xl mx-auto p-6">
      {posts.map(card => (
        <LatestCard key={card._id} card={card} />
      ))}
    </div>
  );
}