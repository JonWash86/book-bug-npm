import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";


function BookDetail(props){
  const [activeBook, setActiveBook] = useState('');

  let history = useHistory();

  if (!props.activeBook){
    return(
      <div>
      </div>
    );
  }

  const returnToSearch = event => {
    console.log('return!');
    history.push('/results');
  }

  return(
    <div class='contentArea'>
      <a onClick={returnToSearch}>
        <ArrowBackIosIcon />
      </a>
      <p>The Active Book Page!</p>
      <></>
      <img
        class='volume-thumbnail'
        src={props.activeBook.imageLinks ? props.activeBook.imageLinks.thumbnail: 'null'}
      />
      <div>{props.activeBook.title} by {props.activeBook.authors[0]}</div>
      <div>{props.activeBook.publishedDate}</div>
      <Rating
        name="hover-feedback"
        value="3"

      />
    </div>
  )
}

export default BookDetail;
