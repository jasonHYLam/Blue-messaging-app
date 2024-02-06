import { useEffect, useState } from "react"

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
    const [ userData, setUserData ] = useState({});

    useEffect(() => {
        async function fetchUserData() {

        }

        fetchUserData();

        if (!isLoaded) setIsLoaded(true);

    }, [])


    return (
        !isLoaded ? <p>Loading</p> :

        <>
        <p>It's me the user profile page</p>
        
        </>
    )
}
