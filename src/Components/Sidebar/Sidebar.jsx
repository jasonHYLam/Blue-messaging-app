import { useEffect, useState } from "react";
import styles from "./Sidebar.module.css";
import { useNavigate } from "react-router-dom";
import { ChatPreview } from "./ChatPreview/ChatPreview";
import { ClickableIcon } from "../ClickableIcon/ClickableIcon";

const ADD_FRIEND_ICON_PATH = "../../../user-add.svg";
const CREATE_CHAT_ICON_PATH = "../../../comment.svg";

// When a new chat or new chat message is created, this will be updated.
export function Sidebar({
  chatsList,
  isSidebarMinimised,
  setIsSidebarMinimised,
  isMobileView,
}) {
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const sidebarClass = `${styles.sidebar} ${styles.open}`;

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  return !isLoaded ? (
    <p>Loading</p>
  ) : (
    <>
      <section className={sidebarClass}>
        {isSidebarMinimised ? null : (
          <>
            <section className={styles.buttonsContainer}>
              <article className={styles.sidebarAction}>
                <ClickableIcon
                  onClick={() => {
                    navigate(`/home/add_friend`);
                    if (isMobileView) setIsSidebarMinimised(true);
                  }}
                  imgPath={ADD_FRIEND_ICON_PATH}
                />
                <p>Add friend</p>
              </article>
              <article className={styles.sidebarAction}>
                <ClickableIcon
                  onClick={() => {
                    navigate(`create_chat`);
                    if (isMobileView) setIsSidebarMinimised(true);
                  }}
                  imgPath={CREATE_CHAT_ICON_PATH}
                />
                <p>Create chat</p>
              </article>
            </section>

            <p>Chats:</p>

            {chatsList.length === 0 ? (
              <p>No chats!</p>
            ) : (
              <ul className={styles.chatPreviewList}>
                {chatsList.map((chat) => (
                  <ChatPreview
                    key={chat.id}
                    chat={chat}
                    isMobileView={isMobileView}
                    setIsSidebarMinimised={setIsSidebarMinimised}
                    // onClick={() => {
                    //   console.log("checking isMobileView");
                    //   console.log(isMobileView);
                    //   if (isMobileView) setIsSidebarMinimised(true);
                    // }}
                  />
                ))}
              </ul>
            )}
          </>
        )}
      </section>
    </>
  );
}
