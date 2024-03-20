import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate, Outlet, Link } from 'react-router-dom';
import { ChatPreview } from './ChatPreview/ChatPreview';
import { ToggleSidebar } from '../ToggleSidebar/ToggleSidebar';
import { ClickableIcon } from '../ClickableIcon/ClickableIcon';

// import icon from "../../../public/user-add"
const ADD_FRIEND_ICON_PATH = "../../../user-add.svg";
const CREATE_CHAT_ICON_PATH = "../../../comment.svg";

export function Sidebar({chatsList, isSidebarMinimised }) {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const navigate = useNavigate();

    const sidebarClass = `${styles.sidebar} ${styles.open}` ;

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

              {isSidebarMinimised ? null :
              
              <>
              
                <section className={ styles.buttonsContainer }>
                  <ClickableIcon onClick={() => navigate(`/home/add_friend`)} imgPath={ADD_FRIEND_ICON_PATH}/>
                  <ClickableIcon onClick={() => navigate(`create_chat`)} imgPath={CREATE_CHAT_ICON_PATH}/>
                </section>


                <p>Chats:</p>

                {
                  chatsList.length === 0 ? <p>No chats!</p> :
                  <ul className={ styles.chatPreviewList }>
                    {chatsList.map(chat => <ChatPreview chat={chat}/>)}
                  </ul>
                }
              </>

              }

            </section>
        </>
    )
}