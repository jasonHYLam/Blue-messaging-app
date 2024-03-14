import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header({loggedInUser}) {
    // left and right container

    // home icon on the left

    // links
    // user profile
    return (

        <>
        <header className={styles.header}>

          <Link to={`/home/user_profile/${loggedInUser.id}`}>
            <section className={styles.profile}>
              <img className={styles.profilePic} src={loggedInUser.profilePicURL} alt="" />
              <p>{loggedInUser.username}</p>
            </section>
          </Link>
        </header>
        </>
    )
}