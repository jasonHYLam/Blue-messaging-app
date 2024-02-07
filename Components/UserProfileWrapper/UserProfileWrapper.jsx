import { useEffect, useState } from "react"
import { useParams } from "react-router-dom";

export function UserProfileWrapper() {

    // if it is the current user's profile then show:
    // requires logic to compare userID in params, with session info/state currentUser info.
    // should list:
    // user name
    // user password maybe
    // user description
    // user profile image.
    // buttons to change these, which have fetch requests to do that.

    // maybe a friends count.

    // if it is another person's user profile, then show:
    // user name
    // user description
    // button to add them as a friend automatically


    // in order to do this, need to make a fetch request with the userID, which is perhaps derived from the params.

    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ isCurrentUser, setIsCurrentUser ] = useState(false);
    const [ userData, setUserData ] = useState({});
    const { userId } = useParams();
    console.log('checking isCurrent user')
    console.log(isCurrentUser)

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/user_profile/${userId}`, {
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json",
                    // "Accept" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })

            const fetchedData = await response.json();
            // console.log('checking data for userProfileWrapper:')
            // console.log(fetchedData)
            setUserData(fetchedData.matchingUser)
            setIsCurrentUser(fetchedData.isCurrentUserProfile)
        }

        fetchUserData();

        if (!isLoaded) setIsLoaded(true);

    }, [])

    const changeDescriptionButton = (<button>Change description</button>)
    


    return (
        !isLoaded ? <p>Loading</p> :

        <>
        <p>It's me the user profile page</p>
        <h1>User Profile: {userData.username}</h1>
        <p>Description:</p>
        <p>{userData.description}</p>
        {isCurrentUser ? changeDescriptionButton : null}

        
        </>
    )
}