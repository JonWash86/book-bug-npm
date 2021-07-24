import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { fetchVolumeInfo } from '../services/googleBooksService';

import BookRating from './rating/BookRating';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


function BookDetail(props){
  const [activeBook, setActiveBook] = useState(null);

  let history = useHistory();

  useEffect(() => {
    // Fetch the volume info if user is directly navigating to the volume page by id.
    if(props.match.params.id && !props.activeBook){
      fetchVolumeByUrl();
    }
  });

  const fetchVolumeByUrl = () => {
    // Search for a specific volume by id and return its volume info
    const searchString = 'https://www.googleapis.com/books/v1/volumes/' + props.match.params.id + '?key=' +
    process.env.REACT_APP_GOOGLE_BOOKS_KEY;

    fetch(searchString)
    .then(res => res.json())
    .then(
      (result) =>
      {
        props.displayBookPage(result.volumeInfo);
        return result.volumeInfo;
      });
    };

  if (!props.activeBook){
    return(
      <div>
      </div>
    );
  }

  const returnToSearch = event => {
    history.push('/results/'  + props.searchValue.searchValue);
  }

  return(
    <div className='contentArea'>
      <a
        id='back-arrow'
        onClick={returnToSearch}
      >
        <ArrowBackIosIcon />
      </a>
      <p>The Active Book Page!</p>
      <></>
      <img
        className='volume-thumbnail'
        src={props.activeBook.imageLinks ? props.activeBook.imageLinks.thumbnail: 'null'}
      />
      <div>{props.activeBook.title} by {props.activeBook.authors ? props.activeBook.authors[0]: null}</div>
      <div>{props.activeBook.publishedDate}</div>
      <BookRating activeBook={props.activeBook}/>
    </div>
  )
}

export default BookDetail;
