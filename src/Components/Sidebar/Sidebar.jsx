import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { ChatPreview } from './ChatPreview/ChatPreview';
import { ToggleSidebar } from '../ToggleSidebar/ToggleSidebar';

// import icon from "../../../public/user-add"
const ADD_FRIEND_ICON_PATH = "../../../user-add.svg";
const CREATE_CHAT_ICON_PATH = "../../../comment.svg";

export function Sidebar({chatsList, setIsSidebarMinimised, isSidebarMinimised }) {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const navigate = useNavigate();

    const sidebarClass = isSidebarMinimised ? `${styles.sidebar} ${styles.closed}` : `${styles.sidebar} ${styles.open}` ;

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

            <section className={sidebarClass}>

              <ToggleSidebar 
              setIsSidebarMinimised={setIsSidebarMinimised} 
              isSidebarMinimised={isSidebarMinimised}
              />

              {isSidebarMinimised ? null :
              
              <>
              
                <section>
                  <button onClick={() => navigate(`/home/add_friend`)}>
                    <img src={ADD_FRIEND_ICON_PATH} alt="" />
                  </button>
                  <button onClick={() => navigate(`create_chat`)}>
                    <img src={CREATE_CHAT_ICON_PATH} alt="" />
                  </button>
                </section>


                <p>Chats:</p>

                {
                  chatsList.length === 0 ? <p>No chats!</p> :
                  <ul>
                    {chatsList.map(chat => <ChatPreview chat={chat}/>)}
                  </ul>
                }
              </>

              }

            </section>
        </>
    )
}