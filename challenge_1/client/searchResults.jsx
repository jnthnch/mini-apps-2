import React from 'react';

function SearchResults(props) {
  const searchResults = props.searchResults.map((result, idx) => {
    return (
      <div key={idx}>{result.date}</div>
    )
  })
  return (
    <div>
      <h1>Search Results</h1>
      {searchResults}
    </div>
  )
}

export default SearchResults;