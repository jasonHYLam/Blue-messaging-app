import { useEffect, useState } from "react";

export function CreateChatWrapper() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    // name of chat (optional)
    // users to add (at least one)
    const [ allFriendsNotAdded, setAllFriendsNotAdded ] = useState([]);
    // probably just list em out, like i did for searchUser

    // hm perhaps show list of those added and those not added amongst friends
    // need fetch request to get friends anyway

    async function getAndSetData() {
        // must be similar to that of searchUser
        // I guess I need to create new backend callback for addingFriendsToChat
        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/show_friends_for_chat`, {
            mode: "cors",
            credentials: "include",
        })

        const fetchedData = await response.json();
        console.log(fetchedData)
        setAllFriendsNotAdded(fetchedData)
    }

    useEffect(() => {
        setIsLoaded(true)
    },[isLoaded])

    useEffect(() => {
        async function getAndSetDataOnChange() {
            await getAndSetData()
        }
        getAndSetDataOnChange();
        // will need to put something in the dependency array
    }, [])


    
    
    return (
        !isLoaded ? <p>Loading</p>  :
        <>
        <main>
            <p>Add to chat:</p>
            {allFriendsNotAdded.map(friend => {
                return (
                    <>
                    <p>{friend.friendUser.username}</p>
                    
                    </>
                )
                
            })}

            
            <button>Start Talking</button>

        </main>
        
        </>
    )
}