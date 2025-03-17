import React from 'react';
import EvangadiLogo from '../../assets/black-logo.png';
import styles from './header.module.css'

const Header = () => {
  return (
    <div className={styles.header}>
      <div className={styles.header_container}>
        <div className={styles.header_logo}>
          <a href="/">
            <img src={EvangadiLogo} alt="img" />
          </a>
        </div>
        <div className={styles.header_right}>
          <nav className="right">
            <ul>
              <li className={styles.home}>
                <a href="/">Home</a>
              </li>
              <li className={styles.work}>
                <a href="/">How it Works</a>
              </li>
              <button className={styles.button}>JOIN THE COMMUNITY</button>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default Header