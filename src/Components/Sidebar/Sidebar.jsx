import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, Outlet, Link } from 'react-router-dom';

export function Sidebar({chatsList}) {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const navigate = useNavigate();

    // const [ allChats, setAllChats ] = useState([]);

    // console.log('checking allChats')
    // console.log(allChats)

    useEffect(() => {
        setIsLoaded(true);
    },[])


    // to store list of chatLinks
    // should make fetch request to get all chats, perhaps updated by time (most recently accessed at the top)
    // so perhaps each chat should have a lastUpdated field. When making a comment, update this field.
    // requires useState and useEffect frankly
    // perhaps the chat should also have a field for the number of members.
    return (
        !isLoaded ? <p>Loading</p> :

        <>

            <section className={styles.sidebar}>

                <section>
                    <button onClick={() => navigate(`create_chat`)}>Create new chat</button>
                </section>


                <p>Chats:</p>

                {
                  // allChats.length === 0 ? 
                  chatsList.length === 0 ? 
                  <p>No chats!</p>
                  :

                <ul>

                {/* {allChats.map(chat => { */}
                {chatsList.map(chat => {
                    return (

                        <article>
                            <Link to={`chats/${chat.id}`}>
                                <section>
                                  <p>{chat.name}</p>
                                  <p>{chat.lastUpdated}</p>
                                  </section>

                            </Link>
                        </article>
                    )
                })}

                </ul>
                }



            </section>
        </>
    )
}