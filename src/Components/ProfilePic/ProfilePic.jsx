import styles from "./ProfilePic.module.css"

export function ProfilePic({imgPath}) {
  return (
    <>
      <img className={styles.profilePic} src={imgPath} alt="" />
    </>
  )
}