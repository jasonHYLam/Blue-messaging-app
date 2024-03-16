import styles from './ChatWrapper.module.css'

import { useEffect, useState } from "react"
import { ChatHeader } from './ChatHeader/ChatHeader';
import { TypeBar } from "./TypeBar/TypeBar"
import { ChatMessage } from "./ChatMessage/ChatMessage";
import { useParams, Link, useOutletContext, useNavigate } from "react-router-dom";
import { fetchData } from '../../helper/helperFunctions';

export function ChatWrapper() {


    // rendered in HomePage component
    // needs to make fetch request, requires .env variable and credentials.
    // should return list of messages, that are ordered by time sent regardless of sender.

    // so, the mongoose query should be:
    // find the comments that match the chat ID. sort them by time.

    // this'll return a list of message objects. 
    // perhaps limit this to the 50 most recent comments.
    // Need to convert these into chatMessage Components
    // perhaps on each message, there are several options that I can do, for example reply to it or react.

    // need a input component. perhaps make it not overflow.
    // need a button to add image file.
    const navigate = useNavigate();
    const [ isUpdatePending, setIsUpdatePending ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ chatName, setChatName ] = useState('');
    const [ chatMessages, setChatMessages ] = useState([]);
    const [ messageToReplyTo, setMessageToReplyTo ] = useState(null);
    const [ allUsersInChat, setAllUsersInChat ] = useState([]);
    const [ friendsNotInChat, setFriendsNotInChat ] = useState([]);

    const [ showViewFriendsModal, setShowViewFriendsModal ] = useState(false);
    const {chatId} = useParams();

    const [ setUpdateChatsList ] = useOutletContext();
    
    useEffect(() => {
        // console.log('checking ChatWrapper useEffect:')
        async function fetchMessages() {
            const response = await fetchData(`home/chat/${chatId}`, "GET")
            if(!response.ok) navigate('/error');
            const fetchedData = await response.json();

            setChatMessages(fetchedData.chat.chatMessages)

            if (chatName !== fetchedData.chat.name) {
                setChatName(fetchedData.chat.name)
            }
        }

        // ADDED THIS JUST NOW
        async function fetchFriends() {
          const response = await fetchData(`home/chat/${chatId}/show_friends_in_chat`, "GET")
          const fetchedData = await response.json(); 
          setAllUsersInChat(fetchedData.allUsersInChat)
          setFriendsNotInChat(fetchedData.friendsNotAddedToChat)
        }

        fetchMessages();
        fetchFriends();

        if (!isLoaded) setIsLoaded(true);

        setIsUpdatePending(false);
    }, [ isUpdatePending, isLoaded, chatId ])

    return (
        !isLoaded ? <p>Loading</p> :
        <>
        <section className={styles.chatWrapper}>

          <ChatHeader 
            chatName={chatName}
            setShowViewFriendsModal={setShowViewFriendsModal}
            showViewFriendsModal={showViewFriendsModal}
            chatid={chatId}
            usersInChat={allUsersInChat}
            friendsNotInChat={friendsNotInChat}
            setIsUpdatePending={setIsUpdatePending}
          />

          <section className={styles.messagesContainer}>

             <section className={styles.chatMessages}>
              {chatMessages.map(message => {
                  return (< ChatMessage 
                      message={message} 
                      setMessageToReplyTo={setMessageToReplyTo}
                      />)
                  })}
             </section>

          </section>

            < TypeBar 
              isUpdatePending={isUpdatePending}
              setIsUpdatePending={setIsUpdatePending} 
              messageToReplyTo={messageToReplyTo}
              setMessageToReplyTo={setMessageToReplyTo}
              setUpdateChatsList={setUpdateChatsList}
            />

        </section>
        </>
    )
}