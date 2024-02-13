import React from 'react';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import axios from 'axios';
import moviesListStyles from '../CSS/movieslist.module.css';

const apiKey = '499d99db6ce23991d21afde0deede0f1';
const baseUrl = 'https://api.themoviedb.org/3';

function SearchResults({ searchResults, addToWatchlist }) {
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerVideo, setTrailerVideo] = useState(null);

  const playTrailer = async (movie) => {
    setSelectedMovie(movie);

    const response = await axios.get(
      `${baseUrl}/movie/${movie.id}/videos`,
      {
        params: {
          api_key: apiKey,
        },
      }
    );

    const trailer = response.data.results.find(
      (video) => video.type === 'Trailer' && video.site === 'YouTube'
    );

    setTrailerVideo(trailer);
  };

  const closeTrailer = () => {
    setSelectedMovie(null);
    setTrailerVideo(null);
  };

  const handleScrollClick = (direction) => {
    const container = document.querySelector('.movies-container');
    if (direction === 'left') {
      container.scrollBy({ left: -300, behavior: 'smooth' });
    } else if (direction === 'right') {
      container.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div>
      <div className={moviesListStyles['movies-list']}>
      <button className={moviesListStyles['scroll-button']} onClick={() => handleScrollClick('left')}>
        {'<'}
      </button>
      <div className={moviesListStyles['movies-container']}>
        {searchResults.map((result) => (
          <div key={result.id} className={moviesListStyles['movie-card']}>
            <Link to={`/movie/${result.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${result.poster_path}`}
                alt={result.title}
                style={{ height: '300px' }}
              />
              <h3 style={{ height: '40px', zIndex: 1 }}>{result.title}</h3>
            </Link>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <button onClick={() => addToWatchlist(result)}>
                  Watchlist <span>+</span>
                </button>
                <button onClick={() => playTrailer(result)}>
                  <span>▶</span> Play
                </button>
              </div>
            </div>
          ))}
        </div>
        <button className="scroll-button" onClick={() => handleScrollClick('right')}>
          {'>'}
        </button>
      </div>
      {trailerVideo && (
        <>
          <Modal
            isOpen={true}
            onRequestClose={closeTrailer}
            style={{
              overlay: {
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
              content: {
                top: '50%',
                left: '50%',
                right: 'auto',
                bottom: 'auto',
                marginRight: '-50%',
                transform: 'translate(-50%, -50%)',
                width: '80%',
                height: '80%',
                padding: 0,
                overflow : 'hidden'
              },
            }}
          >
            <iframe
              width="100%"
              height="100%"
              src={`https://www.youtube.com/embed/${trailerVideo.key}`}
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </Modal>
        </>
      )}
    </div>
  );
}

export default SearchResults;
