import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.css';

export function Header() {
    // left and right container

    // home icon on the left
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ loggedInUser, setLoggedInUser ] = useState({});

    useEffect(() => {
        async function getLoggedInUser() {
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/get_logged_in_user`, {
                // mode: "cors",
                credentials: "include",
                // headers: {
                //     "Content-Type" : "application/json",
                //     // "Accept" : "application/json",
                //     "Access-Control-Allow-Credentials": true,
                // },
            })
            
            const returnedData = await response.json();

            console.log(' checking returned data from database')
            // console.log(returnedData)
            console.log(returnedData.loggedInUser.id)
            setLoggedInUser(returnedData.loggedInUser)
        }

        getLoggedInUser()

        setIsLoaded(true)

    }, [])

    // links
    // user profile
    console.log('checking loggedInUser.id')
    console.log(`${loggedInUser.id}`)
    return (
        !isLoaded ? <p>Loading</p> : 

        <>
        <p>It's me the header</p>

        <Link to={`/home/user_profile/${loggedInUser.id}`}>Profile</Link>
        
        </>
    )
}