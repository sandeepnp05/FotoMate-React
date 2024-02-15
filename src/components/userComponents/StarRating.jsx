import React from 'react';
import StarRatings from 'react-star-ratings';

export function StarRating({ totalRating }) {
  return (
    <StarRatings
      rating={totalRating}
      numberOfStars={5}
      starRatedColor="orange"
      starDimension="20px"
      starSpacing="2px"
    />
  );
}


