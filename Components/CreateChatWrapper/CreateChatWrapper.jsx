import { useEffect, useState } from "react";

export function CreateChatWrapper() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ chatName, setChatName ] = useState('');
    // name of chat (optional)
    // users to add (at least one)
    const [ usersNotAddedToChat, setUsersNotAddedToChat ] = useState([]);
    const [ usersAddedToChat, setUsersAddedToChat ] = useState([]);
    // probably just list em out, like i did for searchUser
    console.log('checking usersNotAddedToChat')
    console.log(usersNotAddedToChat)

    async function getAndSetData() {
        // must be similar to that of searchUser
        // I guess I need to create new backend callback for addingFriendsToChat
        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/show_friends_for_chat`, {
            mode: "cors",
            credentials: "include",
        })

        const fetchedData = await response.json();
        console.log(fetchedData)
        setUsersNotAddedToChat(fetchedData.friends)
    }

    function markUserToAddToChat(user) {
        setUsersAddedToChat([
            ...usersAddedToChat,
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
            await getAndSetData()
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
                    <p>{user.friendUser.username}</p>
                    <button onClick={() => {
                        removeUserFromNotAddedToChat(user);
                        markUserToAddToChat(user);
                        }}>Add to chat</button>
                    </>
                )
                
            })}

            <p>Added to chat:</p>
            {usersAddedToChat.map(user => {
                return (
                    <>
                    <p>{user.friendUser.username}</p>
                    <p>Added</p>
                    </>
                )
            })}

            
            {/* try and disable this if no users are added */}
            <button>Start Talking</button>

        </main>
        
        </>
    )
}