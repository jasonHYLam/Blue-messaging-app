import { ProfilePic } from '../ProfilePic/ProfilePic';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header({loggedInUser}) {

    return (
        <>
        <header className={styles.header}>

          <div>
            <Link to={`/home/user_profile/${loggedInUser.id}`}>
              <section className={styles.profile}>
                <ProfilePic imgPath={loggedInUser.profilePicURL}/>
                <p className={styles.link}>{loggedInUser.username}</p>
              </section>
            </Link>
          </div>
        </header>
        </>
    )
}