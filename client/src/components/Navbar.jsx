import React from "react";
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ changeTab, currentTab }) => {
  const user = true;
  return (
    <div className={styles.navWrapper}>
      <div className={styles.logo}>KnowledgeKarma</div>
      <div className={styles.navTabs}>
        <div className={`${styles.navTab} ${currentTab === 'marketplace' ? styles.active : ''}`} onClick={() => changeTab('marketplace')}>
          <span><Link to='/marketplace' style={{ textDecoration: 'none' }}>Marketplace</Link> </span>
        </div>
        <div className={`${styles.navTab} ${currentTab === 'community' ? styles.active : ''}`} onClick={() => changeTab('community')}>
          <span><Link to='/community' style={{ textDecoration: 'none' }}>Community</Link> </span>
        </div>
        <div className={`${styles.navTab} ${currentTab === 'contributors' ? styles.active : ''}`} onClick={() => changeTab('contributors')}>
          <span><Link to='/contributers' style={{ textDecoration: 'none' }}>Contributers</Link> </span>
        </div>
      </div>
      {
        user ? (<button className={styles.registerBtn}>
          Login
        </button>) : (
          <div className={styles.userSection}>

          </div>
        )
      }
    </div>
  );
};

export default Navbar;