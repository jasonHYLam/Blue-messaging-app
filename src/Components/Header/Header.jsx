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
          <p>It's me the header</p>
          <Link to={`/home/user_profile/${loggedInUser.id}`}>Profile</Link>
        </header>
        </>
    )
}