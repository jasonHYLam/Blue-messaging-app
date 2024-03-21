import styles from "./ClickableIcon.module.css";

export function ClickableIcon({ onClick, imgPath }) {
  return (
    <>
      <img className={styles.icon} onClick={onClick} src={imgPath} alt="" />
    </>
  );
}
