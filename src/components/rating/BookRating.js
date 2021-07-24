import React, { useEffect, useState } from 'react';
import Rating from '@material-ui/lab/Rating';
import Link from 'react-router-dom';
import { addRatingToDb } from '../../services/ratingServices'

const BookRating = (props) => {
  // const [book, setBook] = useState();
  const [rating, setRating] = useState(3);
  const [activeBook, setActiveBook] = useState(null);

  console.log('propsRating!');
  console.log(props);

  const handleClick = (starRating) => {
    // e.preventDefault();
    console.log(starRating);
    setRating(starRating);
    console.log('book');
    console.log(props.activeBook);

    console.log(`The rating ${starRating} was clicked`);
    if (props.activeBook && rating){
      console.log('were ready to use the raitng service');
      addRatingToDb(props.activeBbook, starRating);
    }
    console.log('you needd info to send to the back end!');
  };

  useEffect(() => {
    // TODO For now we're setting a default rating of 4 when the component mounts, but this function will check for the user's rating of a specific volume.
    setRating(4);
    console.log('we set a default!');
  }, []);

  return(
    <Rating
      name="hover-feedback"
      value={rating}
      precision={0.5}
      onChange={(event, newValue) => {
        handleClick(newValue);
      }}
    />
  )
};

export default BookRating;
