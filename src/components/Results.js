import React, { useEffect, useState } from 'react';

function Results(props){
  const [searchValue, setSearch] = useState('');
  const [selectedBook, setSelection] = useState('');

  useEffect(() => {
    if(props.match.params.query && !props.results){
      console.log('we have a query!');
      console.log(props.match.params.query);
      props.searchForBook(props.match.params.query);
    }
  })

  function handleClick(event)
  {
    event.preventDefault();
    let activeBook = props.results.find(x => x.id === event.target.id);
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
          <div
            onClick={handleClick}
          >
          <li
            id={book.id}
            className='bookResult'
          >
            <img
              id={book.id}
              className='bookThumb'
              height='125'
              src={book.imageLinks ? book.imageLinks.thumbnail : 'null'}
            />
            <div
              id={book.id}
              className='resultInfo'
            >
              {book.title}
              <br/>
              by {book.authors}
            </div>
          </li>
          </div>
        ))}
      </ul>
    </div>
)}

export default Results;
