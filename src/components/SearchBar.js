import React, { useEffect, useState } from 'react';

function SearchBar(props){
  const [searchValue, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.target.value);
  };

  const handleClick = event => {
    props.searchForBook(searchValue);
  }

  return(
    <div className='searchBar'>
      <input
        id='bookSearch'
        placeholder={searchValue}
        value={searchValue}
        onChange={handleChange}
      />&nbsp;
      <button
        className='search-button'
        onClick={handleClick}
      >Search</button>
    </div>);
};

export default SearchBar;
