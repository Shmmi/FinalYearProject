import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import Modal from 'react-modal';
import Header from '../Components/Header';
import Footer from '../Components/Footer';
import moviePageStyles from '../CSS/moviepage.module.css';

// Defining constants for the API key and base URL
const apiKey = '499d99db6ce23991d21afde0deede0f1';
const baseUrl = 'https://api.themoviedb.org/3';

function MoviePage({ loggedInUser,fetchUserData }) {
  // Using the useParams hook to get the ID of the selected movie from the URL parameter
  const { id } = useParams();
  const navigate = useNavigate();

  // Setting up state for the movie details, cast, reviews, and trailer video
  const [movieDetails, setMovieDetails] = useState(null);
  const [cast, setCast] = useState([]);
  const [showAllCast, setShowAllCast] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [trailerVideoKey, setTrailerVideoKey] = useState(null);
  const [similarMovies, setSimilarMovies] = useState([]);
  const [recommendedMovies, setRecommendedMovies] = useState([]);
  const [popularMovies, setPopularMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [trailerVideo, setTrailerVideo] = useState(null);

  // Setting up state for the review form
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);

  // Using an effect hook to fetch data from the API when the component mounts
  useEffect(() => {
    const fetchData = async () => {
      // Fetching the details for the selected movie from the TMDb API
      const detailsResponse = await axios.get(
        `${baseUrl}/movie/${id}`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setMovieDetails(detailsResponse.data);

      // Fetching the credits for the selected movie from the TMDb API
      const creditsResponse = await axios.get(
        `${baseUrl}/movie/${id}/credits`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setCast(creditsResponse.data.cast);

      // Fetching videos for the selected movie from the TMDb API
      const videosResponse = await axios.get(
        `${baseUrl}/movie/${id}/videos`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      // Finding a trailer video and setting its key in state
      const trailerVideo = videosResponse.data.results.find(
        (video) => video.type === 'Trailer'
      );
      if (trailerVideo) {
        setTrailerVideoKey(trailerVideo.key);
      }
      // Fetching similar movies for the selected movie from the TMDb API
      const similarMoviesResponse = await axios.get(
        `${baseUrl}/movie/${id}/similar`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setSimilarMovies(similarMoviesResponse.data.results);

      // Fetching recommended movies for the selected movie from the TMDb API
      const recommendedMoviesResponse = await axios.get(
        `${baseUrl}/movie/${id}/recommendations`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setRecommendedMovies(recommendedMoviesResponse.data.results);

      // Fetching popular movies from the TMDb API
      const popularMoviesResponse = await axios.get(
        `${baseUrl}/movie/popular`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setPopularMovies(popularMoviesResponse.data.results);

      // Fetching top-rated movies from the TMDb API
      const topRatedMoviesResponse = await axios.get(
        `${baseUrl}/movie/top_rated`,
        {
          params: {
            api_key: apiKey,
          },
        }
      );
      setTopRatedMovies(topRatedMoviesResponse.data.results);


      // TODO: Fetch existing reviews for the selected movie from the server
    };
    fetchData();
  }, [id]);

  // Handling form submission
  const submitReview = async (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      navigate('/login');
    } else {
      // TODO: Submit review data to server and update reviews state with new review

      alert('Review submitted!');
      setReviewText('');
      setRating(0);
    }
  };

  // Rendering a review component
  const Review = ({ review }) => (
    <div>
      {/* TODO: Render user profile picture and name */}
      <p>{review.text}</p>
      <div>
        {[1, 2, 3, 4, 5].map((star) => (
          <span key={star} style={{ color: star <= review.rating ? 'gold' : 'gray' }}>
            ★
          </span>
        ))}
      </div>
    </div>
  );
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

  // Rendering the Header, movie details, cast, reviews, review form, and Footer
  return (
    <>
      <Header loggedInUser={loggedInUser} fetchUserData={fetchUserData} />
      <div className={moviePageStyles['movie-page']}>
        <div className={moviePageStyles['trailer-and-details']}>
          {trailerVideoKey && (
            <div className={moviePageStyles['trailer-container']}>
              <iframe
                width="100%"
                height="100%"
                src={`https://www.youtube.com/embed/${trailerVideoKey}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          )}
        <div className={moviePageStyles['movie-details']}>
          {movieDetails && (
            <>
              <h1>{movieDetails.title}</h1>
              <p>{movieDetails.overview}</p>
            </>
          )}
        </div>
      </div>
      <h2>Cast</h2>
        <div className={moviePageStyles['cast-list']}>
          {(showAllCast ? cast : cast.slice(0, 5)).map((actor) => (
            <div key={actor.id}>
              <img
              className={moviePageStyles['cast-img']}
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={actor.name}
              />
              <p>{actor.name}</p>
            </div>
          ))}
          {cast.length > 5 && (
            <button onClick={() => setShowAllCast(!showAllCast)}>
              More
            </button>
          )}
        </div>
        <h2>Similar Movies</h2>
        <div className={moviePageStyles['movies-list']}>
          <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('left')}>
            {'<'}
          </button>
          <div className={moviePageStyles['movies-container']}>
            {similarMovies.map((movie) => (
          <div key={movie.id} className={moviePageStyles['movie-card']}>
            <Link to={`/movie/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
              />
              <h3>{movie.title}</h3>
            </Link>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => addToWatchlist(movie)}>
                Watchlist <span>+</span>
              </button>
              <button onClick={() => playTrailer(movie)}>
                <span>▶</span> Play
              </button>
            </div>
          </div>
          ))}
          </div>
          <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('right')}>
            {'>'}
          </button>
        </div>

        
        {/* Rendering recommended movies */}
        <h2>Recommended Movies</h2>
        <div className={moviePageStyles['movies-list']}>
          <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('left')}>
            {'<'}
          </button>
          <div className={moviePageStyles['movies-container']}>
            {recommendedMovies.map((movie) => (
            <div key={movie.id} className={moviePageStyles['movie-card']}>
              <Link to={`/movie/${movie.id}`}>
                <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <h3>{movie.title}</h3>
              </Link>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <button onClick={() => addToWatchlist(movie)}>
                Watchlist <span>+</span>
              </button>
              <button onClick={() => playTrailer(movie)}>
                <span>▶</span> Play
              </button>
            </div>
          </div>
            ))}
          </div>
            <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('right')}>
              {'>'}
            </button>
        </div>
        {/* Rendering popular movies */}
        <h2>Popular Movies</h2>
<div className={moviePageStyles['movies-list']}>
  <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('left')}>
    {'<'}
  </button>
  <div className={moviePageStyles['movies-container']}>
    {popularMovies.map((movie) => (
      <div key={movie.id} className={moviePageStyles['movie-card']}>
        <Link to={`/movie/${movie.id}`}>
          <img
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />
          <h3>{movie.title}</h3>
        </Link>
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <button onClick={() => addToWatchlist(movie)}>
            Watchlist<span>+</span>
          </button>
          <button onClick={() => playTrailer(movie)}>
            Play<span>▶</span> 
          </button>
        </div>
      </div>
    ))}
  </div>
  <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('right')}>
    {'>'}
  </button>
</div>

        {/* Rendering top-rated movies */}
        <h2>Top-Rated Movies</h2>
        <div className={moviePageStyles['movies-list']}>
          <button className={moviePageStyles['scroll-button']} onClick={() => handleScrollClick('left')}>
            {'<'}
            </button>
            <div className={moviePageStyles['movies-container']}>
              {topRatedMovies.map((movie) => (
              <div key={movie.id} className={moviePageStyles['movie-card']}>
                <Link to={`/movie/${movie.id}`}>
                  <img
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  />
                  <h3>{movie.title}</h3>
                  </Link>
                  <div style={{ display: 'flex', flexDirection: 'column' }}>
                    <button onClick={() => addToWatchlist(movie)}>
                      Watchlist<span>+</span>
                      </button>
                      <button onClick={() => playTrailer(movie)}>
                        Play<span>▶</span> 
                        </button>
                        </div>
                        </div>
            ))}
          </div>
        </div>
      {/* Rendering a modal to display the trailer video */}
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
      <Footer />
    </div>
  </>
  );
}

export default MoviePage;
