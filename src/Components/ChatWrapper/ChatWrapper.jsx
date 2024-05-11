import styles from "./ChatWrapper.module.css";

import { useEffect, useRef, useState } from "react";
import { ChatHeader } from "./ChatHeader/ChatHeader";
import { TypeBar } from "./TypeBar/TypeBar";
import { ChatMessage } from "./ChatMessage/ChatMessage";
import { ViewFriendsModal } from "./ViewFriendsModal/ViewFriendsModal";
import { Loading } from "../Loading/Loading";
import {
  useParams,
  Link,
  useOutletContext,
  useNavigate,
} from "react-router-dom";
import { fetchData } from "../../helper/helperFunctions";

export function ChatWrapper() {
  const navigate = useNavigate();
  const { chatId } = useParams();
  const { setUpdateChatsList } = useOutletContext();

  const [isUpdatePending, setIsUpdatePending] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatName, setChatName] = useState("");
  const [chatMessages, setChatMessages] = useState([]);
  const [messageToReplyTo, setMessageToReplyTo] = useState(null);
  const [allUsersInChat, setAllUsersInChat] = useState([]);
  const [friendsNotInChat, setFriendsNotInChat] = useState([]);
  const [showViewFriendsModal, setShowViewFriendsModal] = useState(false);

  const chatWrapperRef = useRef(null);
  // useEffect(() => {
  //   chatWrapperRef.current
  // })

  useEffect(() => {
    async function fetchMessages() {
      try {
        const response = await fetchData(`home/chat/${chatId}`, "GET");
        if (!response.ok) navigate("/error");
        const fetchedData = await response.json();

        setChatMessages(fetchedData.chat.chatMessages);

        if (chatName !== fetchedData.chat.name) {
          setChatName(fetchedData.chat.name);
        }
      } catch (err) {
        navigate("error");
      }
    }

    async function fetchFriends() {
      try {
        const response = await fetchData(
          `home/chat/${chatId}/show_friends_in_chat`,
          "GET",
        );
        if (!response.ok) navigate("/error");
        const fetchedData = await response.json();
        setAllUsersInChat(fetchedData.allUsersInChat);
        setFriendsNotInChat(fetchedData.friendsNotAddedToChat);
      } catch (err) {
        navigate("error");
      }
    }

    fetchMessages();
    fetchFriends();

    if (!isLoaded) setIsLoaded(true);

    setIsUpdatePending(false);
  }, [isUpdatePending, isLoaded, chatId, chatName, navigate]);

  return !isLoaded ? (
    <Loading />
  ) : (
    <>
      <section className={styles.chatWrapper} ref={chatWrapperRef}>
        <ChatHeader
          chatName={chatName}
          setShowViewFriendsModal={setShowViewFriendsModal}
          showViewFriendsModal={showViewFriendsModal}
        />

        {showViewFriendsModal ? (
          <ViewFriendsModal
            chatid={chatId}
            usersInChat={allUsersInChat}
            friendsNotAddedToChat={friendsNotInChat}
            setIsUpdatePending={setIsUpdatePending}
          />
        ) : (
          <>
            <section className={styles.messagesContainer}>
              {chatMessages.map((message) => {
                return (
                  <ChatMessage
                    key={message.id}
                    message={message}
                    setMessageToReplyTo={setMessageToReplyTo}
                  />
                );
              })}
            </section>

            <TypeBar
              isUpdatePending={isUpdatePending}
              setIsUpdatePending={setIsUpdatePending}
              messageToReplyTo={messageToReplyTo}
              setMessageToReplyTo={setMessageToReplyTo}
              setUpdateChatsList={setUpdateChatsList}
            />
          </>
        )}
      </section>
    </>
  );
}
