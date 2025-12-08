// src/components/Card/CardDetails.jsx
import { useState, useEffect } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import useAuth from "../../Context/AuthProvider";

const CardDetails = () => {
  const crop = useLoaderData().data;
  const { user } = useAuth();
  const navigate = useNavigate();

  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState("");
  const [alreadySent, setAlreadySent] = useState(false);
  const [interests, setInterests] = useState(crop.interests || []);

  const totalPrice = quantity * crop.pricePerUnit;
  const isOwner = user?.email === crop.owner?.ownerEmail;

  // Check if user already sent interest
  useEffect(() => {
    if (user && interests.length > 0) {
      const sent = interests.find(i => i.userEmail === user.email);
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
      cancelButtonText: "Cancel"
    }).then((result) => {
      if (result.isConfirmed) {
        const interestData = {
          cropId: crop._id,
          userEmail: user.email,
          userName: user.displayName || "Anonymous",
          quantity: Number(quantity),
          message,
          status: "pending"
        };

        fetch("http://localhost:3000/interest", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(interestData)
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              Swal.fire("Success!", "Interest sent successfully!", "success");
              setAlreadySent(true);
              // Update interests list
              fetch(`http://localhost:3000/card/${crop._id}`)
                .then(res => res.json())
                .then(updated => setInterests(updated.data.interests));
            }
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
      confirmButtonText: `Yes, ${status}!`
    }).then((result) => {
      if (result.isConfirmed) {
        fetch("http://localhost:3000/interest/status", {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ interestId, cropId: crop._id, status })
        })
          .then(res => res.json())
          .then(data => {
            if (data.success) {
              Swal.fire("Updated!", `Interest ${status}!`, "success");
              // Refresh interests
              fetch(`http://localhost:3000/card/${crop._id}`)
                .then(res => res.json())
                .then(updated => setInterests(updated.data.interests));
            }
          });
      }
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">

        {/* Hero Section */}
        <div className="grid md:grid-cols-2 gap-10 bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative">
            <img
              src={crop.image || "/no-image.jpg"}
              alt={crop.name}
              className="w-full h-96 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            <h1 className="absolute bottom-6 left-6 text-4xl md:text-5xl font-bold text-white drop-shadow-2xl">
              {crop.name}
            </h1>
          </div>

          <div className="p-8 space-y-6">
            <div className="flex items-center gap-3">
              <span className="text-5xl font-bold text-green-600">৳{crop.pricePerUnit}</span>
              <span className="text-xl text-gray-600">/ {crop.unit}</span>
            </div>

            <div className="space-y-4 text-lg">
              <p><strong>Type:</strong> <span className="badge badge-success badge-lg">{crop.type}</span></p>
              <p><strong>Location:</strong> {crop.location}</p>
              <p><strong>Available:</strong> <span className="font-bold text-green-700">{crop.quantity} {crop.unit}</span></p>
              <p><strong>Description:</strong> {crop.description}</p>
              <p><strong>Posted by:</strong> {crop.owner?.ownerName || "Farmer"}</p>
            </div>
          </div>
        </div>

        {/* Interest Form - Only for non-owners */}
        {!isOwner && user && !alreadySent && (
          <div className="mt-12 bg-white rounded-2xl shadow-xl p-8">
            <h2 className="text-3xl font-bold text-center mb-8 text-green-700">Show Your Interest</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="label"><span className="label-text text-lg">Quantity ({crop.unit})</span></label>
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
                        <td className="font-semibold">{interest.userName}</td>
                        <td>{interest.quantity} {crop.unit}</td>
                        <td>{interest.message || "-"}</td>
                        <td>
                          <span className={`badge ${
                            interest.status === "pending" ? "badge-warning" :
                            interest.status === "accepted" ? "badge-success" : "badge-error"
                          }`}>
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