// Importing necessary modules
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookSquare, faYoutube, faInstagram, faPinterest } from '@fortawesome/free-brands-svg-icons';

import footerStyles from '../CSS/footer.module.css';

// Defining the Footer component
function Footer() {

return (
    <div className={footerStyles.footer}>
      <div className={footerStyles['inside-footer']}>
        <div className={footerStyles['footer-container']}>
          <div className={footerStyles.logopart}>
            <h1>MovieMate</h1>
          </div>
          <div className={footerStyles.copyright}>
            <p>
              copyright © <span>Shmmi </span>,All Rights Reserved-2021.
            </p>
          </div>
          <div className={footerStyles.socials}>
            <a href="https://www.facebook.com/MovieMate" target="_blank" rel="noopener noreferrer" aria-label="Movie Mate on Facebook">
              <FontAwesomeIcon icon={faFacebookSquare} />
            </a>
            <a href="https://www.youtube.com/MovieMate" target="_blank" rel="noopener noreferrer" aria-label="Movie Mate on YouTube">
              <FontAwesomeIcon icon={faYoutube} />
            </a>
            <a href="https://www.instagram.com/MovieMate" target="_blank" rel="noopener noreferrer" aria-label="Movie Mate on Instagram">
              <FontAwesomeIcon icon={faInstagram} />
            </a>
            <a href="https://www.pinterest.com/MovieMate" target="_blank" rel="noopener noreferrer" aria-label="Movie Mate on Pinterest">
              <FontAwesomeIcon icon={faPinterest} />
            </a>
          </div>
          <div className={footerStyles.btn4}>
            <a href>Subscribe Now</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
