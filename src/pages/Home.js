// Importing necessary modules and components
import React, { useState } from 'react';
import Header from '../Components/Header';
import HeroSection from '../Components/HeroSection';
import MoviesList from '../Components/MoviesList';
import Footer from '../Components/Footer';

// Defining the Home component
function Home({ addToWatchlist, loggedInUser, fetchUserData }) {
  // Rendering the home page with a header, hero section, and lists of movies
  return (
    <div>
      <div
        className="content-wrapper"
        style={{ margin: '10px', display: 'flex', flexDirection: 'column' }}
      >
        <Header loggedInUser={loggedInUser} fetchUserData={fetchUserData} />
        <HeroSection />
        <MoviesList category="hollywood" addToWatchlist={addToWatchlist} />
        <MoviesList category="bollywood" addToWatchlist={addToWatchlist} />
        <MoviesList category="lollywood" addToWatchlist={addToWatchlist} />
      </div>
      <Footer />
    </div>
  );
}

// Exporting the Home component as the default export
export default Home;
