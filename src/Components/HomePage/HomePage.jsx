import styles from './HomePage.module.css'
import { fetchData } from '../../helper/helperFunctions'

import { useEffect, useState } from "react"
import { Outlet, useNavigate } from "react-router-dom"

import { Sidebar } from "../Sidebar/Sidebar"
import { Header } from "../Header/Header"

export function HomePage() {

  const navigate = useNavigate();
  const [ isLoaded, setIsLoaded ] = useState(false);
  const [ chatsList, setChatsList ] = useState([]);
  const [ updateChatsList, setUpdateChatsList ] = useState(true)
  const [ loggedInUser, setLoggedInUser ] = useState(null);
  const [ isSidebarMinimised, setIsSideBarMinimised ] = useState(false);

  console.log('checking isSidebarMinimised')
  console.log(isSidebarMinimised)

    // create fetch request for req.isAuthenticated. If not, then redirect. Perhaps add this to the route beforehand.
    // needs a check for user authorization. Redirect to login page if not logged in.
    // requires state logic to see if logged in. Perhaps on this component, or the parent component (PageLayout)
    // HomePage contains Sidebar.
    // contains chatWrapper and userProfileWrapper

    // Will need to add an "Add friend" component and "users online" button.

    useEffect(() => {

      async function fetchChats() {
        const response = await fetchData(`home/get_chats_for_user`, "GET")
        if (response.status === 401) navigate('/login');
        const fetchedData = await response.json();
        setChatsList(fetchedData.allChats)
        setUpdateChatsList(false)
      }

      async function fetchLoggedInUserData() {
        const response = await fetchData(`home/get_logged_in_user`, "GET")
        const fetchedData = await response.json();
        setLoggedInUser(fetchedData.loggedInUser)
      }

      if(updateChatsList) fetchChats();
      if(!loggedInUser) fetchLoggedInUserData();

      if (chatsList && loggedInUser) setIsLoaded(true)

    }, [updateChatsList, isLoaded, chatsList, loggedInUser])


    return (
      !isLoaded ? <p>loading heh</p> :

        <>
        <main className={styles.homePage}>
            < Header 
            loggedInUser={loggedInUser} 
            setIsSidebarMinimised={setIsSideBarMinimised} 
            isSidebarMinimised={isSidebarMinimised}
            />
            {/* vertical stretch */}
            <section className={styles.belowHeader}> 
            {/* horizontal stretch */}
              <section className={styles.insideBelowHeader}>
                {isSidebarMinimised ? null : 
                
                  < Sidebar 
                  chatsList={chatsList} 
                  isSidebarMinimised={isSidebarMinimised}
                  />
                }

                  <section className={styles.content}>
                    < Outlet context={[ setUpdateChatsList ]} />
                  </section>
              </section>
            </section>
        </main>


        </>
    )
}