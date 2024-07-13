import React from 'react';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

const RatingStar = ({ rating }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 !== 0;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  return (
    <div className="flex items-center">
      {[...Array(fullStars)].map((_, index) => (
        <FaStar key={index} className="text-yellow-400" />
      ))}
      {hasHalfStar && <FaStarHalfAlt className="text-yellow-400" />}
      {[...Array(emptyStars)].map((_, index) => (
        <FaRegStar key={index} className="text-yellow-400" />
      ))}
    </div>
  );
};

export default RatingStar;
