import React from "react";
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';


const Navbar = ({ changeTab, currentTab }) => {
  const user = true;
  return (
    <div style={{ position: 'relative', zIndex: 9999 }}>
      <div className={styles.navWrapper}>
        <div className={styles.logo}>KnowledgeKarma</div>
        <div className={styles.navTabs}>
            <Link to='/marketplace' style={{ textDecoration: 'none', width:"100%" }}>
              <div className={`${styles.navTab} ${currentTab === 'marketplace' ? styles.active : ''}`} onClick={() => changeTab('marketplace')}>
                <span>Marketplace</span>          
              </div>
            </Link> 
            <Link to='/community' style={{ textDecoration: 'none', width:"100%" }}>          
              <div className={`${styles.navTab} ${currentTab === 'community' ? styles.active : ''}`} onClick={() => changeTab('community')}>
                <span>Community</span>
              </div>
            </Link> 
            <Link to='/contributers' style={{ textDecoration: 'none', width:"100%" }}>
              <div className={`${styles.navTab} ${currentTab === 'contributors' ? styles.active : ''}`} onClick={() => changeTab('contributors')}>
                <span>Contributers</span>
              </div>
            </Link> 
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

    </div>
  );
};

export default Navbar;