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

    async function getAndSetFriendsData() {
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

    async function postToCreateChat() {
        const dataToPost = {
            chatName,
            // what exactly is this... if anything this is a wrapper. this is wrapper that contains friendId (in friendUser)
            usersAddedToChat,
        }

        console.log('checking dataToPost')
        console.log(dataToPost)

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
            await getAndSetFriendsData()
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
            <button onClick={async() => {await postToCreateChat()}}>Start Talking</button>

        </main>
        
        </>
    )
}