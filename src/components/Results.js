import React, { useEffect, useState } from 'react';

function Results(props){
  const [searchValue, setSearch] = useState('');
  const [selectedBook, setSelection] = useState('');

  const handleClick = event => {
    let activeBook = props.results.find(x => x.id === event.target.id);
    console.log(activeBook);
    props.displayBookPage(activeBook);
  }

  // prevent loading before results load
  if (!props.results){
    return (null);
  }

  return(
    <div className='contentArea'>
      <ul>
        {props.results.map(book => (
          <li
            id={book.id}
            className='bookResult'
            onClick={handleClick}
          >
            <img
              className='bookThumb'
              height='125'
              src={book.imageLinks ? book.imageLinks.thumbnail : 'null'}
            />
            <div className='resultInfo'>
              {book.title}
              <br/>
              by {book.authors}
            </div>
          </li>
        ))}
      </ul>
    </div>
)}

export default Results;
