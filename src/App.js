// Importing necessary modules and components
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import axios from 'axios';
import Home from './pages/Home';
import WatchlistPage from './pages/WatchlistPage';
import SearchResultsPage from './pages/SearchResultsPage';
import Signup from './pages/Signup';
import Login from './pages/Login'; 
import Profile from './pages/Profile';
import MoviesList from './Components/MoviesList';
import MoviePage from './pages/MoviePage'; 
import './App.css';
import ReleaseCalendar from './Components/MenuComponents/ReleaseCalendar';
import MovieNews from './Components/MenuComponents/MovieNews';
import TopRatedMovies from './Components/MenuComponents/TopRatedmovies';
import BrowseMoviesByGenre from './Components/MenuComponents/BrowseMoviesByGenre';
import TopBoxOffice from './Components/MenuComponents/TopBoxOffice';
import IndianMovieSpotlight from './Components/MenuComponents/IndianMovieSpotlight';
import MostPopularMovies from './Components/MenuComponents/MostPopularMovies';
import PopularCelebrities from './Components/MenuComponents/MostPopularCelebs';
import CelebsNews from './Components/MenuComponents/CelebsNews';

function App() {

  const [watchlist, setWatchlist] = useState([]);
  const [loggedInUser, setLoggedInUser] = useState(null);
  useEffect(() => {
    const storedLoggedInUser = localStorage.getItem('loggedInUser');
    console.log('storedLoggedInUser:', storedLoggedInUser); 
    if (storedLoggedInUser) {
      setLoggedInUser(JSON.parse(storedLoggedInUser));
    }
  }, []);

  const addToWatchlist = (movie) => {
    setWatchlist((prevWatchlist) => [...prevWatchlist, movie]);
  };

  const removeFromWatchlist = (movieToRemove) => {
    setWatchlist((prevWatchlist) =>
      prevWatchlist.filter((movie) => movie.id !== movieToRemove.id)
    );
  };


  useEffect(() => {
    console.log('loggedInUser:', loggedInUser); 
    localStorage.setItem('loggedInUser', JSON.stringify(loggedInUser));
  }, [loggedInUser]);

  const fetchUserData = (userId) => {
    axios
      .get(`/user/${userId}`)
      .then((response) => {
        setLoggedInUser(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  };
const handleSignIn = (e) => {
  e.preventDefault();
  axios
    .post('/signin', { email: email, password: password })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem('token', token);
      fetchUserData(token);
    })
    .catch((error) => {
      console.error(error);
    });
};
const handleLogOut = () => {
  localStorage.removeItem('token');
  setLoggedInUser(null);
};
useEffect(() => {
  const token = localStorage.getItem('token');
  if (token) {
    fetchUserData(token);
  }
}, []); 
return (
  <Router>
    <Routes>
      <Route
        path="/"
        element={
          <Home
            watchlist={watchlist}
            addToWatchlist={addToWatchlist}
            loggedInUser={loggedInUser}
            setLoggedInUser = {setLoggedInUser}
            fetchUserData={fetchUserData} 
          />
        }
      />
      <Route
        path="/watchlist"
        element={
          <WatchlistPage
            watchlist={watchlist}
            setWatchlist={setWatchlist}
            removeFromWatchlist={removeFromWatchlist}
            loggedInUser={loggedInUser} 
            setLoggedInUser = {setLoggedInUser} 
            fetchUserData={fetchUserData} 
          />
        }
      />
      <Route
        path="/searchresults"
        element={
          <SearchResultsPage
            addToWatchlist={addToWatchlist}
            loggedInUser={loggedInUser} 
            setLoggedInUser = {setLoggedInUser}
            fetchUserData={fetchUserData} 
          />
        }
      />
      <Route path="/signup" element={<Signup />} /> // Adding a Route for the Signup page
      <Route
        path="/login"
        element={<Login setLoggedInUser={setLoggedInUser} />}
      />
      <Route
        path="/profile"
        element={
          <Profile loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
        }
      />
      <Route exact path="/" component={MoviesList} />
      <Route
        path="/movie/:id"
        element={<MoviePage loggedInUser={loggedInUser}  setLoggedInUser = {setLoggedInUser} fetchUserData={fetchUserData} />}
      />
         <Route path="/release-calendar" element={<ReleaseCalendar/>} />
         <Route path="/top-rated-movies" element={<TopRatedMovies addToWatchlist={addToWatchlist}/>} />
         <Route path="/browse-movies-by-genre" element={<BrowseMoviesByGenre/>} />
         <Route path="/top-box-office" element={<TopBoxOffice addToWatchlist={addToWatchlist}/>} />
         <Route path="/movie-news" element={<MovieNews/>} />
         <Route path="/indian-movie-spotlight" element={<IndianMovieSpotlight/>} />
         <Route path="/most-popular-movies" element={<MostPopularMovies/>} />
         
         <Route path="/most-popular-celebs" element={<PopularCelebrities/>} />
         <Route path="/celebrity-news" element={<CelebsNews/>} />

    </Routes>
  </Router>
);
}
export default App;
