import { ProfilePic } from "../ProfilePic/ProfilePic";
import { ToggleSidebar } from "../ToggleSidebar/ToggleSidebar";
import { Link } from "react-router-dom";
import styles from "./Header.module.css";

export function Header({
  loggedInUser,
  setIsSidebarMinimised,
  isSidebarMinimised,
  isMobileView,
}) {
  return (
    <>
      <header className={styles.header}>
        <ToggleSidebar
          setIsSidebarMinimised={setIsSidebarMinimised}
          isSidebarMinimised={isSidebarMinimised}
        />

        {isMobileView ? (
          <div onClick={() => setIsSidebarMinimised(true)}>
            <Link to={`/home/user_profile/${loggedInUser.id}`}>
              <section className={styles.profile}>
                <ProfilePic imgPath={loggedInUser.profilePicURL} />
                <p className={styles.link}>{loggedInUser.username}</p>
              </section>
            </Link>
          </div>
        ) : (
          <div>
            <Link to={`/home/user_profile/${loggedInUser.id}`}>
              <section className={styles.profile}>
                <ProfilePic
                  imgPath={loggedInUser.profilePicURL}
                  size={"small"}
                />
                <p className={styles.link}>{loggedInUser.username}</p>
              </section>
            </Link>
          </div>
        )}
      </header>
    </>
  );
}
