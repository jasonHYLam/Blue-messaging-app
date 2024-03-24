import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./CreateChatWrapper.module.css";
import { fetchData } from "../../helper/helperFunctions";
import { ProfilePic } from "../ProfilePic/ProfilePic";

export function CreateChatWrapper() {
  const { setUpdateChatsList } = useOutletContext();
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  // optional
  const [chatName, setChatName] = useState("");
  // users to add (at least one)
  const [usersNotAddedToChat, setUsersNotAddedToChat] = useState([]);
  const [usersToAddToChat, setUsersToAddToChat] = useState([]);

  async function postToCreateChat() {
    const addToChatUserIds = usersToAddToChat.map((user) => user._id);
    const dataToPost = {
      chatName,
      addToChatUserIds: addToChatUserIds,
    };

    try {
      const response = await fetchData(
        `home/create_new_chat`,
        "POST",
        JSON.stringify(dataToPost),
      );
      if (!response.ok) navigate("error");
      const data = await response.json();
      setUpdateChatsList(true);
      navigate(`/home/chats/${data.chatid}`);
    } catch (err) {
      if (err) navigate("error");
    }
  }

  async function getAndSetFriendsDataOnMount() {
    try {
      const response = await fetchData(
        `home/show_friends_for_initial_chat_creation`,
        "GET",
      );

      if (!response.ok) navigate("error");
      const fetchedData = await response.json();
      setUsersNotAddedToChat(fetchedData.friends);
    } catch (err) {
      if (err) navigate("error");
    }
  }

  function markUserToAddToChat(user) {
    setUsersToAddToChat([...usersToAddToChat, user]);
  }

  function removeUserFromNotAddedToChat(userToRemove) {
    const usersNotAdded = usersNotAddedToChat.filter((user) => {
      return user._id !== userToRemove._id;
    });
    setUsersNotAddedToChat(usersNotAdded);
  }

  // useEffect hook to:
  // enable component to be loaded via state variable isLoaded.
  // fetch data on first load
  useEffect(() => {
    setIsLoaded(true);

    async function getAndSetDataOnLoad() {
      await getAndSetFriendsDataOnMount();
    }
    getAndSetDataOnLoad();
  }, [isLoaded]);

  return !isLoaded ? (
    <p>Loading</p>
  ) : (
    <>
      <main>
        <section className={styles.row}>
          <input
            type="text"
            placeholder="Name your chat"
            value={chatName}
            onChange={(e) => setChatName(e.target.value)}
          />

          {chatName.length > 30 ? (
            <p>Chat name is too long (30 characters max)</p>
          ) : !usersToAddToChat.length ? null : (
            <button
              onClick={async () => {
                await postToCreateChat();
              }}
            >
              Start Talking
            </button>
          )}
        </section>
        <p>Add to chat:</p>
        {usersNotAddedToChat.map((user) => {
          return (
            <>
              <section className={styles.row}>
                <button
                  onClick={() => {
                    removeUserFromNotAddedToChat(user);
                    markUserToAddToChat(user);
                  }}
                >
                  Add to chat
                </button>

                <ProfilePic imgPath={user.profilePicURL} />

                <p>{user.username}</p>
              </section>
            </>
          );
        })}

        <p>Added to chat:</p>
        {usersToAddToChat.map((user) => {
          return (
            <>
              <section className={styles.row}>
                <ProfilePic imgPath={user.profilePicURL} />
                <p>{user.username}</p>
              </section>
            </>
          );
        })}
      </main>
    </>
  );
}
