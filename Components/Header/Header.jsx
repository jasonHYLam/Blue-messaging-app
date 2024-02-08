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
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/personal_profile/get_logged_in_user`, {
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json",
                    // "Accept" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })
            
            const returnedData = await response.json();

            console.log(' checking returned data from database')
            console.log(returnedData)
            // setLoggedInUser
        }
        getLoggedInUser()

    }, [])

    // links
    // user profile
    return (
        !isLoaded ? <p>Loading</p> : 

        <>
        {/* <Link to={loggedInUser}>Profile</Link> */}
        
        </>
    )
}