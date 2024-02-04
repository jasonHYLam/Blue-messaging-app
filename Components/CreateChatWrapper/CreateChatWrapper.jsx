import { useEffect, useState } from "react";

export function CreateChatWrapper() {

    const [ isLoaded, setIsLoaded ] = useState(false);
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
        // ugh
        // add the users that do NOT match the user argument to usersNotAddedToChat
        // maybe it's filter, and comparing ids
        // for now, use map to test
        const usersNotAdded = usersNotAddedToChat.filter(user => {
            return user._id !== userToRemove._id
        })
        console.log(usersNotAdded)
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

    // Fetches data and sets in state.
    useEffect(() => {
        // async function getAndSetDataOnChange() {
        //     await getAndSetData()
        // }
        // getAndSetDataOnChange();
        // will need to put something in the dependency array
    }, [])
    
    return (
        !isLoaded ? <p>Loading</p>  :
        <>
        <main>
            <p>Add to chat:</p>
            {usersNotAddedToChat.map(user => {
                return (
                    <>
                    <p>{user.friendUser.username}</p>
                    <button onClick={() => {
                        removeUserFromNotAddedToChat(user);
                        // markUserToAddToChat(user);
                        }}>Add to chat</button>
                    </>
                )
                
            })}

            
            <button>Start Talking</button>

        </main>
        
        </>
    )
}