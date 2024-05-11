import styles from "./ProfilePic.module.css";

const DEFAULT_PROFILE_PIC_PATH = "../../../defaultProfilePic.svg";

export function ProfilePic({ imgPath, size }) {
  const cssSize = size;
  return (
    <>
      {!imgPath ? (
        <img
          className={styles.defaultProfilePic}
          src={DEFAULT_PROFILE_PIC_PATH}
          alt=""
        />
      ) : (
        <img
          className={`${styles.profilePic} ${styles[cssSize]} `}
          src={imgPath}
          alt=""
        />
      )}
    </>
  );
}
