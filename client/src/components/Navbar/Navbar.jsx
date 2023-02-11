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
                <span>
                    <Link to='/marketplace' style={{ textDecoration: 'none' }}>
                        <div className={`${styles.navTab} ${styles.active}`}>Marketplace</div>
                    </Link> 
                </span>
                <span>   
                    <Link to='/community' style={{ textDecoration: 'none' }}> 
                       <div className={`${styles.navTab}`}>Community</div>
                    </Link>                
                </span>
                <span>
                    <Link to='/contributers' style={{ textDecoration: 'none' }}> 
                       <div className={`${styles.navTab}`}>Contributers</div>
                    </Link>
                </span>
            </div>
            {
                user ? (
                    <div className={styles.userSection}>
                        
                    </div>
                ) : (<button className={styles.registerBtn}>
                    <Link to='/'>Login</Link>
                </button>)
            }
        </div>
    );
};

export default Navbar;