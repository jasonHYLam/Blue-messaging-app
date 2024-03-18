import styles from './ChatHeader.module.css';
import { ViewFriendsModal } from '../ViewFriendsModal/ViewFriendsModal';

export function ChatHeader({ chatName, setShowViewFriendsModal, showViewFriendsModal, chatid, usersInChat, friendsNotInChat, setIsUpdatePending}) {
  return (

          <section className={styles.chatHeader}>
            <h2 className={styles.title}>{chatName}</h2>
            <button onClick={() => {setShowViewFriendsModal(!showViewFriendsModal)}}>View Friends</button>
          </section>
  )
}