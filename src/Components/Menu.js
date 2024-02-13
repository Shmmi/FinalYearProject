import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../CSS/menu.css'

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Setting the app element for the Modal component
Modal.setAppElement('#root');

function Menu({ isOpen, onRequestClose }) {
   // Rendering the modal menu with links to different pages
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
    
      <button onClick={onRequestClose}>Close</button>
      <div className="container">
      <div className="column">
          <h2>Movies</h2>
          <Link to="/release-calendar">Release Calendar</Link>
          
          <Link to="/top-rated-movies">Top Rated Movies</Link>
          <Link to="/browse-movies-by-genre">Browse Movies by Genre</Link>
          <Link to="/top-box-office">Top Box Office</Link>
          <Link to="/movie-news">Movie News</Link>
          <Link to="/most-popular-movies">Most Popular Movies</Link>
          <Link to="/indian-movie-spotlight">Indian Movie Spotlight</Link>
        </div>
        <div className="column">
          <h2>Celebs</h2>
          <Link to="/celebrity-news">Celebs News</Link>
          <Link to="/most-popular-celebs">Popular Celebrity</Link>
          <Link to="/born-today">Born Today</Link>
        </div>
        <div className="column">
          <h2>Tv Shows</h2>
          <Link to="/top-rated-tv-shows">Top Rated TV Shows</Link>
          <Link to="/most-popular-tv-shows">Most Popular TV Shows</Link>
          <Link to="/top-box-office">Top Box Office</Link>
          <Link to="/in-theaters">In Theaters</Link>
          <Link to="/coming-soon">Coming Soon</Link>
          <Link to="/tv-show-news">TV Show News</Link>
          <Link to="/india-tv-show-spotlight">India TV Show Spotlight</Link>
        </div>
        <div className="column">
          <h2>Awards & Events</h2>
          <Link to="/release-calendar">Release Calendar</Link>
          <Link to="/dvd-bluray-releases">DVD & Blu-ray Releases</Link>
          <Link to="/top-rated-movies">Top Rated Movies</Link>
          <Link to="/browse-movies-by-genre">Browse Movies by Genre</Link>
          <Link to="/top-box-office">Top Box Office</Link>
          <Link to="/in-theaters">In Theaters</Link>
          <Link to="/coming-soon">Coming Soon</Link>
          <Link to="/most-popular-movie">Most Popular Movie</Link>
        </div>
        <div className="column">
          <h2>Community</h2>
          <Link to="/top-box-office">Top Box Office</Link>
          <Link to="/in-theaters">In Theaters</Link>
          <Link to="/coming-soon">Coming Soon</Link>
        </div>
      </div>
    </Modal>
  );
}

export default Menu;
/*
import React from 'react';
import Modal from 'react-modal';
import { Link } from 'react-router-dom';
import '../CSS/menu.css';

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Setting the app element for the Modal component
Modal.setAppElement('#root');

function Menu({ isOpen, onRequestClose }) {
  // Rendering the modal menu with links to different pages
  return (
    <Modal isOpen={isOpen} onRequestClose={onRequestClose}>
      
      <button onClick={onRequestClose}>Close</button>
      <div className="container">
        < div className="column">
        
          <h2>Movies</h2>
          <Link to="/release-calendar">Release Calendar</Link><br></br>
          <Link to="/top-rated-movies">Top Rated Movies</Link><br></br>
          <Link to="/browse-movies-by-genre">Browse Movies by Genre</Link><br></br>
          <Link to="/top-box-office">Top Box Office</Link><br></br>
          
          <Link to="/movie-news">Movie News</Link><br></br>
          <Link to="/most-popular-movies">Most Popular Movies</Link><br></br>
          <Link to="/all-movie-spotlight">All Movie Spotlight</Link><br></br>
        
        
          <h2>Celebs</h2>
        
          <Link to="/most-popular-celebs">Most Popular Celebs</Link><br></br>
          <Link to="/celebrity-news">Celebrity News</Link><br></br>
        </div>
        < div  className="card">
          <h2>Tv Shows</h2>
          <Link to="/top-rated-tv-shows">Top Rated TV Shows</Link><br></br>
          <Link to="/most-popular-tv-shows">Most Popular TV Shows</Link><br></br>
          <Link to="/top-box-office">Top Box Office</Link><br></br>
          <Link to="/in-theaters">In Theaters</Link><br></br>
          <Link to="/coming-soon">Coming Soon</Link><br></br>
          <Link to="/tv-show-news">TV Show News</Link><br></br>
          <Link to="/india-tv-show-spotlight">India TV Show Spotlight</Link><br></br>
        
        
          <h2> Watch</h2>
          <Link to="/What to watch">What to watch</Link><br></br>
          <Link to="/latest-trailers">Latest Trailers</Link><br></br>
          <Link to="/imdb-originals">IMDb Originals</Link><br></br>
          <Link to="/imdb-picks">IMDb Picks</Link><br></br>
          <Link to="/imdb-podcasts">IMDb Podcasts</Link><br></br>
        </div>
        <div className="event">
          <h2>Awards & Events</h2>
          <Link to="/release-calendar">Release Calendar</Link><br></br>
          <Link to="/dvd-bluray-releases">DVD & Blu-ray Releases</Link><br></br>
          <Link to="/top-rated-movies">Top Rated Movies</Link><br></br>
          <Link to="/browse-movies-by-genre">Browse Movies by Genre</Link><br></br>
          <Link to="/top-box-office">Top Box Office</Link><br></br>
          <Link to="/in-theaters">In Theaters</Link><br></br>
          <Link to="/coming-soon">Coming Soon</Link><br></br>
          <Link to="/most-popular-movie">Most Popular Movie</Link><br></br>
        
          <h2>Community</h2>
          <Link to="/top-box-office">Top Box Office</Link><br></br>
          <Link to="/in-theaters">In Theaters</Link><br></br>
          <Link to="/coming-soon">Coming Soon</Link><br></br>
        </div>
      </div>
    </Modal>
  );
}

export default Menu;

*/