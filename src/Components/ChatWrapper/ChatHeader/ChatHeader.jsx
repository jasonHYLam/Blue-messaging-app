import styles from './ChatHeader.module.css';

export function ChatHeader({ chatName, setShowViewFriendsModal, showViewFriendsModal}) {
  return (

          <section className={styles.chatHeader}>
            <h2 className={styles.title}>{chatName}</h2>
            <button onClick={() => {setShowViewFriendsModal(!showViewFriendsModal)}}>View Friends</button>
          </section>
  )
}