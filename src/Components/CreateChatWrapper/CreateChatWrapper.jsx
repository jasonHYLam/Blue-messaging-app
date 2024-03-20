import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import styles from "./CreateChatWrapper.module.css";
import { fetchData } from "../../helper/helperFunctions";
import { ProfilePic } from "../ProfilePic/ProfilePic";

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
            // this is a wrapper that contains friendId (in friendUser)
            addToChatUserIds: addToChatUserIds,
        }

        const response = await fetchData(`home/create_new_chat`, "POST", JSON.stringify(dataToPost))
        const data = await response.json();
        setUpdateChatsList(true);
        navigate(`/home/chats/${data.chatid}`)
    }

    async function getAndSetFriendsDataOnMount() {

        const response = await fetchData(`home/show_friends_for_initial_chat_creation`, "GET")
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

                        <ProfilePic imgPath={user.profilePicURL}/>

                    <p>{user.friendUser.username}</p>
                    </section>
                    </>
                )
                
            })}

            <p>Added to chat:</p>
            {usersToAddToChat.map(user => {
                return (
                    <>
                    <section className={styles.row}>
                      <ProfilePic imgPath={user.profilePicURL}/>
                      <p>{user.friendUser.username}</p>
                    </section>
                    </>
                )
            })}

            {!usersToAddToChat.length ? null : 
            <button onClick={async() => {await postToCreateChat()}}>Start Talking</button>
            }

        </main>
        
        </>
    )
}