// Importing necessary modules and components
import React, { useState } from 'react';
import Header from '../Components/Header';
import SearchResults from '../Components/SearchResults';
import Footer from '../Components/Footer';
import searchPageStyles from '../CSS/searchPage.module.css';

// Defining the SearchResultsPage component
function SearchResultsPage({ loggedInUser,addToWatchlist,fetchUserData }) {
  // Setting up state for the search query and results
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  // Defining a function to handle changes to the search input
  const handleSearchInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  // Defining a function to handle key presses in the search input
  const handleSearchInputKeyPress = (event) => {
    if (event.key === 'Enter') {
      fetchSearchResults();
    }
  };

  // Defining a function to fetch search results from the API
  const fetchSearchResults = async () => {
    const apiKey = '499d99db6ce23991d21afde0deede0f1';
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchQuery}`
    );
    const data = await response.json();
    setSearchResults(data.results);
  };

// Rendering the search input and search results
return (
  <>
    <Header loggedInUser={loggedInUser} fetchUserData={fetchUserData} />
    <input
      className={searchPageStyles['search-input']}
      type="text"
      onChange={handleSearchInputChange}
      onKeyPress={handleSearchInputKeyPress}
      value={searchQuery}
    />

    {searchResults.length > 0 && (
      <>
        <h2>Search Results</h2>
        <SearchResults searchResults={searchResults} addToWatchlist={addToWatchlist} customContainerClass={searchPageStyles['search-results-container']} />
      </>
    )}
    <Footer className={searchPageStyles['footer']} />
  </>
);
}
// Exporting the SearchResultsPage component as the default export
export default SearchResultsPage;

