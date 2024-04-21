import styles from "./ViewFriendsModal.module.css";
import { fetchData } from "../../../helper/helperFunctions";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export function ViewFriendsModal({
  chatid,
  usersInChat,
  friendsNotAddedToChat,
  setIsUpdatePending,
}) {
  const DEFAULT_PROFILE_PIC_PATH = "../../../../defaultProfilePic.svg";
  const navigate = useNavigate();

  const [isAddingFriend, setIsAddingFriend] = useState(false);

  async function addFriendToChat(chatid, userid) {
    if (isAddingFriend) return;
    try {
      const response = await fetchData(
        `home/chat/${chatid}/add_user/${userid}`,
        "POST",
      );
      setIsAddingFriend(true);
      if (!response.ok) {
        navigate("error");
      } else {
        setIsAddingFriend(false);
      }
    } catch (err) {
      if (err) navigate("error");
    }
  }

  return (
    <>
      <section className={styles.container}>
        <p>In chat:</p>
        <ul>
          {usersInChat.map((friend) => {
            const profilePicPath = friend.profilePicURL
              ? friend.profilePicURL
              : DEFAULT_PROFILE_PIC_PATH;
            return (
              <>
                <article className={styles.row} key={friend.id}>
                  <img
                    className={styles.profilePicIcon}
                    src={profilePicPath}
                    alt=""
                  />
                  <p>{friend.username}</p>
                </article>
              </>
            );
          })}
        </ul>

        <p>Not In Chat:</p>
        <ul>
          {friendsNotAddedToChat.map((friend) => {
            const profilePicPath = friend.profilePicURL
              ? friend.profilePicURL
              : DEFAULT_PROFILE_PIC_PATH;
            return (
              <>
                <section className={styles.row}>
                  <button
                    onClick={() => {
                      addFriendToChat(chatid, friend.id);
                      setIsUpdatePending(true);
                    }}
                  >
                    Add to chat
                  </button>
                  <img
                    className={styles.profilePicIcon}
                    src={profilePicPath}
                    alt=""
                  />
                  <p>{friend.username}</p>
                </section>
              </>
            );
          })}
        </ul>
      </section>
    </>
  );
}
