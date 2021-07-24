import React, { useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Link from 'react-router-dom';

const AddRating = () => {
  const [book, setBook] = useState();
  const [rating, setRating] = useState();

  const handleClick = (e) => {
    e.preventDefault();

    console.log(`The rating ${rating} was clicked`);
    if (book && rating){
      // ratingServices.addRatingToDb(book, rating);
    }
  };
};
