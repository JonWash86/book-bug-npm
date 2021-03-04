import React, {useEffect, useState} from 'react';
import Rating from '@material-ui/lab/Rating';

function BookDetail(props){
  const [activeBook, setActiveBook] = useState('');

  if (!props.activeBook){
    return(
      <div>
      </div>
    );
  }

  return(
    <div class='contentArea'>
      <p>The Active Book Page!</p>
      <></>
      <img src={props.activeBook.imageLinks ? props.activeBook.imageLinks.thumbnail: 'null'} />
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
