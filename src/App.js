import './App.css';
import React, { useEffect, useState } from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";

import HomePage from './components/HomePage';
import SearchBar from './components/SearchBar';
import Results from './components/Results';
import BookDetail from './components/BookDetail';

function App(props) {

  const [searchValue, setSearch] = useState('search for something');
  const [results, updateResults] = useState(null);
  const [activeBook, setActiveBook] = useState(null);
  // const [] = useState();

  let history = useHistory();

  useEffect(() => {
    if (activeBook && activeBook.id){
      history.push('/volume/' + activeBook.id);
    }
  }, [activeBook]);

  const searchForBook = searchValue => {
    setSearch(searchValue);
    let searchString = 'https://www.googleapis.com/books/v1/volumes?q='
    + searchValue.searchValue + '&key=' +
    process.env.REACT_APP_GOOGLE_BOOKS_KEY;

    fetch(searchString)
      .then(res => res.json())
        .then(
          (result) =>
          {
            let resultItems = result.items.map(obj => {
              let newObj = {};
              // reduce our search results to the volume info
              newObj = obj.volumeInfo;
              // make sure the gBooks-specific id carries over
              newObj.id = obj.id;
              return newObj;
            });
            updateResults(resultItems);
            console.log({results});
          }
        )
  }

  const displayBookPage = book => {
    console.log(book);
    setActiveBook(book);
    console.log(activeBook);
    // history.push('/volume/' + id);
  }

  return (
    <div className='App'>
      <header className='App-header'>
        <p id='title'>BookBug</p>
        <SearchBar searchForBook={searchForBook}/>
      </header>
        <div className='body'>
          <Route path='/'
            render={(props) => (
              <HomePage />
            )}
          />
          <Results
            results={results}
            displayBookPage={displayBookPage}
          />
          <Route path='/volume/:id'
            render={(props) => (
              <BookDetail activeBook={activeBook} />
            )}
          />
        </div>
    </div>
  );
}

export default App;
