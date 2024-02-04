import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, Outlet } from 'react-router-dom';

export function Sidebar() {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const navigate = useNavigate();

    const [ allChats, setAllChats ] = useState([]);

    useEffect(() => {
        setIsLoaded(true);
    },[])

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/get_chats_for_user`, {
                // mode: "cors",
                // not sure if withCredentials is required
                // withCredentials: "true",
                credentials: "include",
            })

            if (response.status === 401) navigate('/login');

            const data = await response.json();
            console.log('checking data')
            console.log(data)
            setAllChats(data.allChats)
        }

        fetchData()
    }, [])
    // to store list of chatLinks
    // should make fetch request to get all chats, perhaps updated by time (most recently accessed at the top)
    // so perhaps each chat should have a lastUpdated field. When making a comment, update this field.
    // requires useState and useEffect frankly
    // perhaps the chat should also have a field for the number of members.
    return (
        !isLoaded ? <p>Loading</p> :

        <>
        <p>It's me, the sidebar</p>

        <p>Chats:</p>
        {allChats.map(chat => {
            return (
                <>
                <p>{chat.name}</p>
                </>

            )
        })}

        <>
        <section>
            <button onClick={() => navigate(`/home/create_chat`)}>Create new chat</button>
        </section>
        
        </>

        
        </>
    )
}