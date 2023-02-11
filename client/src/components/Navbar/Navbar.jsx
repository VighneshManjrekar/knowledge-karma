import React from "react";
import styles from './Navbar.module.css';

const Navbar = ({ changeTab, currentTab }) => {
    const user = true;
    return (
        <div className={styles.navWrapper}>
            <div className={styles.logo}>KnowledgeKarma</div>
            <div className={styles.navTabs}>
                <div className={`${styles.navTab} ${currentTab === 'marketplace' ? styles.active : ''}`} onClick={() => changeTab('marketplace')}>
                    <span>Marketplace</span>
                </div>
                <div className={`${styles.navTab} ${currentTab === 'community' ? styles.active : ''}`} onClick={() => changeTab('community')}>
                    <span>Community</span>
                </div>
                <div className={`${styles.navTab} ${currentTab === 'contributors' ? styles.active : ''}`} onClick={() => changeTab('contributors')}>
                    <span>Contributors</span>
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
