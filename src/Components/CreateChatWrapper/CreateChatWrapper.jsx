import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./CreateChatWrapper.module.css";

export function CreateChatWrapper() {

  const [ setUpdateChatsList ] = useOutletContext();

  const navigate = useNavigate();

    const [ isLoaded, setIsLoaded ] = useState(false);
    // optional
    const [ chatName, setChatName ] = useState('');
    // users to add (at least one)
    const [ usersNotAddedToChat, setUsersNotAddedToChat ] = useState([]);
    const [ usersToAddToChat, setUsersToAddToChat ] = useState([]);

    async function postToCreateChat() {

        const addToChatUserIds = usersToAddToChat.map(userFriendRelation => userFriendRelation.friendUser._id)
        const dataToPost = {
            chatName,
            // what exactly is this... if anything this is a wrapper. this is wrapper that contains friendId (in friendUser)
            addToChatUserIds: addToChatUserIds,
        }


        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/create_new_chat`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(dataToPost),
        })

        const data = await response.json();

        navigate(`/home/chats/${data.chatid}`)
    }

    async function getAndSetFriendsDataOnMount() {
        // must be similar to that of searchUser
        // I guess I need to create new backend callback for addingFriendsToChat
        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/show_friends_for_initial_chat_creation`, {
            mode: "cors",
            credentials: "include",
        })

        const fetchedData = await response.json();
        setUsersNotAddedToChat(fetchedData.friends)
    }

    function markUserToAddToChat(user) {
        setUsersToAddToChat([
            ...usersToAddToChat,
            user
        ])
    }


    function removeUserFromNotAddedToChat(userToRemove) {
        const usersNotAdded = usersNotAddedToChat.filter(user => {
            return user._id !== userToRemove._id
        })
        setUsersNotAddedToChat(usersNotAdded)
    }

    // useEffect hook to: 
    // enable component to be loaded via state variable isLoaded.
    // fetch data on first load
    useEffect(() => {
        setIsLoaded(true)

        async function getAndSetDataOnLoad () {
            await getAndSetFriendsDataOnMount()
        }
        getAndSetDataOnLoad();
    },[isLoaded])
    
    return (
        !isLoaded ? <p>Loading</p>  :
        <>
        <main>
            <label> Name your chat
                <input type="text" value={chatName} onChange={(e) => setChatName(e.target.value)}/>
            </label>
            <p>Add to chat:</p>
            {usersNotAddedToChat.map(user => {
                return (
                    <>
                    <section className={styles.row}>

                    <button onClick={() => {
                        removeUserFromNotAddedToChat(user);
                        markUserToAddToChat(user);
                        }}>Add to chat</button>

                    <p>{user.friendUser.username}</p>
                    </section>
                    </>
                )
                
            })}

            <p>Added to chat:</p>
            {usersToAddToChat.map(user => {
                return (
                    <>
                    <p>{user.friendUser.username}</p>
                    </>
                )
            })}

            
            {/* try and disable this if no users are added */}
            <button onClick={async() => {await postToCreateChat()}}>Start Talking</button>

        </main>
        
        </>
    )
}