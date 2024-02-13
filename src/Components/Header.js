import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBars,
  faBookmark,
  faSearch,
  faUser,
  faHome,
  faMoon,
  faSun,
} from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import Menu from './Menu';
import headerStyles from '../CSS/header.module.css';

function Header({ loggedInUser, setLoggedInUser, fetchUserData }) {
  const [showSearchInput, setShowSearchInput] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const navigate = useNavigate();
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
  const handleSearchIconClick = () => {
    setShowSearchInput(!showSearchInput);
    navigate('/SearchResults');
  };

  const handleMenuClick = () => {
    setShowMenu(true);
  };

  const handleCloseMenu = () => {
    setShowMenu(false);
  };

return (
    <>
      <header>
        <div className={headerStyles.logo}>
          <img src="../images/MovieMate-icon.png" alt="logo" />
          <h3>MovieMate</h3>
        </div>
        <div className={headerStyles.nav} id="small_menu">
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li>
              <a onClick={handleMenuClick}>
                {' '}
                <FontAwesomeIcon icon={faBars} /> Menu
              </a>
            </li>
            <li>
              <Link to="/WatchList">
                {' '}
                <FontAwesomeIcon icon={faBookmark} /> Watchlist
              </Link>
            </li>
          </ul>
        </div>
        <div className={headerStyles.user}>
          <div ><FontAwesomeIcon icon={faSearch} onClick={handleSearchIconClick} /> </div>
          {loggedInUser ? (
            <>
              <div>{loggedInUser.name}</div>
                {loggedInUser && <span>{loggedInUser.username}</span>}
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </>
          )}
        </div>
      </header>
      <Menu isOpen={showMenu} onRequestClose={handleCloseMenu} />
    </>
  );
}


/*
  return (
    <>
      <header>
        <div className="logo">
          <img src="../images/MovieMate-icon.png" alt="logo" />
          <h3>MovieMate</h3>
        </div>
        <div className="nav" id="small_menu">
          <ul>
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li>
              <a onClick={handleMenuClick}>
                {' '}
                <FontAwesomeIcon icon={faBars} /> Menu
              </a>
            </li>
            <li>
              <Link to="/WatchList">
                {' '}
                <FontAwesomeIcon icon={faBookmark} /> Watchlist
              </Link>
            </li>
          </ul>
        </div>
        <div className="user">
          <div ><FontAwesomeIcon icon={faSearch} onClick={handleSearchIconClick} /> </div>
          {loggedInUser ? (
            <>
              <div>{loggedInUser.name}</div>
                {loggedInUser && <span>{loggedInUser.username}</span>}
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <FontAwesomeIcon icon={faUser} />
              </Link>
            </>
          )}
        </div>
      </header>
      <Menu isOpen={showMenu} onRequestClose={handleCloseMenu} />
    </>
  );
}
*/
export default Header;
