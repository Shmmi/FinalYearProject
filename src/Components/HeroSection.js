// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Modal from 'react-modal'; // Import the Modal component from the react-modal library
import Slider from 'react-slick'; // Import the Slider component from the react-slick library
import 'slick-carousel/slick/slick.css'; // Import the slick-carousel CSS files
import 'slick-carousel/slick/slick-theme.css';

// Importing the hero.module.css file as a JavaScript object
import hero from '../CSS/hero.module.css';

// Defining constants for the API key and base URL
const apiKey = '499d99db6ce23991d21afde0deede0f1';
const baseUrl = 'https://api.themoviedb.org/3';

// Defining the HeroSection component
function HeroSection({ addToWatchlist }) {
  // Setting up state for the list of movies, selected movie, and trailer video
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerVideo, setTrailerVideo] = useState(null);

  // Defining a function to fetch popular movies from the TMDB API
  const fetchPopularMovies = async () => {
    // Fetching the popular movies from the TMDB API
    const response = await axios.get(`${baseUrl}/movie/popular`, {
      params: {
        api_key: apiKey,
      },
    });

    // Setting the state with the list of popular movies
    setMovies(response.data.results);
  };

  // Defining a function to play the trailer for a movie
  const playTrailer = async (movie) => {
    setSelectedMovie(movie);

    // Fetching the videos for the selected movie from the TMDb API
    const response = await axios.get(
      `${baseUrl}/movie/${movie.id}/videos`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    // Finding the first video with type "Trailer"
    const trailer = response.data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    // Setting the trailer video state
    setTrailerVideo(trailer);
  };

  // Defining a function to close the trailer modal
  const closeTrailer = () => {
    setSelectedMovie(null);
    setTrailerVideo(null);
  };

  // Using an effect hook to fetch popular movies when the component mounts
  useEffect(() => {
    fetchPopularMovies();
  }, []);

return (
   <div>
     <div className={hero.HeroSection}>
      <Slider>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className={hero.MovieContainer}>
              <img className={hero['hero-img']} src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
              <div className={hero.HeroContent}>
                <h1 className={hero.Heading}>{movie.title}</h1>
                <h2 className={hero.Subheading}>{movie.overview}</h2>
                <h3 className={hero.ReleaseDate}>Release date: {movie.release_date}</h3>
                <button className={hero.AddButton} onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                <button className={hero.PlayButton} onClick={() => playTrailer(movie)}>Play Trailer</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
     <Modal isOpen={trailerVideo !== null} onRequestClose={closeTrailer}>
       {trailerVideo && (
         <iframe
           width="560"
           height="315"
           src={`https://www.youtube.com/embed/${trailerVideo.key}`}
           title="YouTube video player"
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
         ></iframe>
       )}
     </Modal>
   </div>
  );
}

  /*
  return (
   <div>
     <div className={styles.HeroSection}>
      <Slider>
        {movies.map((movie) => (
          <div key={movie.id}>
            <div className={styles.MovieContainer}>
              <img className='hero-img' src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`} alt={movie.title} />
              <div className={styles.HeroContent}>
                <h1 className={styles.Heading}>{movie.title}</h1>
                <h2 className={styles.Subheading}>{movie.overview}</h2>
                <h3 className={styles.ReleaseDate}>Release date: {movie.release_date}</h3>
                <button className={styles.AddButton} onClick={() => addToWatchlist(movie)}>Add to Watchlist</button>
                <button className={styles.PlayButton} onClick={() => playTrailer(movie)}>Play Trailer</button>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
     <Modal isOpen={trailerVideo !== null} onRequestClose={closeTrailer}>
       {trailerVideo && (
         <iframe
           width="560"
           height="315"
           src={`https://www.youtube.com/embed/${trailerVideo.key}`}
           title="YouTube video player"
           frameBorder="0"
           allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
           allowFullScreen
         ></iframe>
       )}
     </Modal>
   </div>
  );
}
*/
export default HeroSection;
