import { useEffect, useState } from 'react';
import styles from './Sidebar.module.css';
import { useNavigate } from 'react-router-dom';
import { ChatPreview } from './ChatPreview/ChatPreview';
import { ClickableIcon } from '../ClickableIcon/ClickableIcon';

const ADD_FRIEND_ICON_PATH = "../../../user-add.svg";
const CREATE_CHAT_ICON_PATH = "../../../comment.svg";

export function Sidebar({chatsList, isSidebarMinimised }) {

    const [ isLoaded, setIsLoaded ] = useState(false);
    const navigate = useNavigate();

    const sidebarClass = `${styles.sidebar} ${styles.open}` ;

    useEffect(() => {
        setIsLoaded(true);
    },[])


    // so perhaps each chat should have a lastUpdated field. When making a comment, update this field.
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