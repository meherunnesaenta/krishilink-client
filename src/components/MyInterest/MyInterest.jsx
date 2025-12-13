import React, { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../Context/AuthProvider';

const MyInterest = () => {
  const { user } = useContext(AuthContext);
  const [interest, setInterest] = useState([]);

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:3000/interest?email=${user.email}`)
        .then(res => res.json())
        .then(data => setInterest(data));
    }
  }, [user?.email]);

  return (
    <div className="min-h-screen bg-green-50 py-12 px-6">
      <div className="max-w-5xl mx-auto bg-white p-8 rounded-3xl shadow-xl">

        {/* Page Title */}
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-green-700 to-green-900 bg-clip-text text-transparent">
          My Interests
        </h1>

        {/* Empty State */}
        {interest.length === 0 ? (
          <p className="text-center text-xl text-gray-600 py-10">
            You have not sent any interests yet.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-green-100 text-left text-green-900">
                  <th className="py-3 px-4">#</th>
                  <th className="py-3 px-4">Crop Name</th>
                  <th className="py-3 px-4">Owner</th>
                  <th className="py-3 px-4">Quantity</th>
                  <th className="py-3 px-4">Message</th>
                  <th className="py-3 px-4">Status</th>
                </tr>
              </thead>

              <tbody>
                {interest.map((item, idx) => (
                  <tr
                    key={item._id}
                    className="border-b hover:bg-green-50 transition"
                  >
                    <td className="py-3 px-4">{idx + 1}</td>
                    <td className="py-3 px-4 font-semibold">
                      {item.product}
                    </td>
                    <td className="py-3 px-4">{item.buyer_name}</td>
                    <td className="py-3 px-4">{item.quantity}</td>
                    <td className="py-3 px-4">{item.message || "-"}</td>

                    {/* Status Badge */}
                    <td className="py-3 px-4">
                      <span
                        className={`
                          px-3 py-1 rounded-full text-white text-sm font-semibold
                          ${item.status === "accepted" && "bg-green-600"}
                          ${item.status === "rejected" && "bg-red-600"}
                          ${item.status === "pending" && "bg-yellow-500"}
                        `}
                      >
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyInterest;
