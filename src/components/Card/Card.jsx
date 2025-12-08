"use client";
import React, { use } from 'react';
import LatestCard from './LatestCard';

const Card = ({ cardPromise, searchTerm = "" }) => {

  const latestCards = use(cardPromise);

  const filtered = latestCards.filter(card =>
    card.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.location?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    card.type?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
      {filtered.map(card => (
        <LatestCard key={card._id} card={card} />
      ))}
    </div>

  );
};

export default Card;
