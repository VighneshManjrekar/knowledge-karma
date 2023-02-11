import React from "react";
import styles from './Navbar.module.css';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";


const Navbar = () => {

    const { user } = useSelector(state => state.auth)
    return (
        <div className={styles.navWrapper}>
            <div className={styles.logo}>KnowledgeKarma</div>
            <div className={styles.navTabs}>
                <div className={`${styles.navTab} ${styles.active}`}>
                    <span><Link to='/marketplace' style={{ textDecoration: 'none' }}>Marketplace</Link> </span>
                </div>
                <div className={`${styles.navTab}`}>
                    <span><Link to='/community' style={{ textDecoration: 'none' }}>Community</Link> </span>
                </div>
                <div className={`${styles.navTab}`}>
                    <span><Link to='/contributers' style={{ textDecoration: 'none' }}>Contributers</Link> </span>
                </div>
            </div>
            {
                user ? (
                    <div className={styles.userSection}>

                    </div>
                ) : (<button className={styles.registerBtn}>
                    Login
                </button>)
            }
        </div>
    );
};

export default Navbar;