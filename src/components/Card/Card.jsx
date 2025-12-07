import React from 'react';

const Card = () => {
  return (
                {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="card bg-white shadow-xl hover:shadow-2xl transition">
                <figure className="px-6 pt-6">
                  <div className="skeleton h-48 w-full rounded-xl"></div>
                </figure>
                <div className="card-body">
                  <h3 className="card-title">Tomato – Bogra</h3>
                  <p>৳55 / kg | 400 kg</p>
                  <div className="card-actions justify-end">
                    <button className="btn btn-primary btn-sm">details</button>
                  </div>
                </div>
              </div>
            ))}
  );
};

export default Card;