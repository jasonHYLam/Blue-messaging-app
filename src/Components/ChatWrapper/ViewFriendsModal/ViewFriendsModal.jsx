import styles from "./ViewFriendsModal.module.css";
import { fetchData } from "../../../helper/helperFunctions";

export function ViewFriendsModal({chatid, usersInChat, friendsNotAddedToChat, setIsUpdatePending}) {

  const DEFAULT_PROFILE_PIC_PATH = "../../../../defaultProfilePic.svg";

  async function addFriendToChat(chatid, userid) {
    await fetchData(`home/chat/${chatid}/add_user/${userid}`, "POST")
  }

  return (
    <>
    <section className={styles.container}>

      <p>In chat:</p>
      <ul>
        {usersInChat.map(friend => {
          const profilePicPath = friend.profilePicURL ? friend.profilePicURL : DEFAULT_PROFILE_PIC_PATH;
          return (
            <>
            <article className={styles.row}>
              <img className={styles.profilePicIcon} src={profilePicPath} alt="" />
              <p>{friend.username}</p>
            </article>
            </>
          )
        })}
      </ul>

      <p>Not In Chat:</p>
      <ul>
        {friendsNotAddedToChat.map(friend => {
          const profilePicPath = friend.profilePicURL ? friend.profilePicURL : DEFAULT_PROFILE_PIC_PATH;
          return (
            <>
            <section className={styles.row}>

              <button onClick={() => {
                addFriendToChat(chatid, friend.id)
                setIsUpdatePending(true)
                }}>
                  Add to chat
                </button>
              <img className={styles.profilePicIcon} src={profilePicPath} alt="" />
              <p>{friend.username}</p>

            </section>
            </>
          )
        })}
      </ul>

    </section>
    </>
  )

}