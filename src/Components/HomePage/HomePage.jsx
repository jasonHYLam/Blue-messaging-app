import styles from "./HomePage.module.css";
import { fetchData, checkIsMobileView } from "../../helper/helperFunctions";

import { useEffect, useState, useRef } from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";

export function HomePage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatsList, setChatsList] = useState([]);
  const [updateChatsList, setUpdateChatsList] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isSidebarMinimised, setIsSideBarMinimised] = useState(false);
  const isMobileViewRef = useRef(false);

  console.log("checking isMobileViewRef");
  console.log(isMobileViewRef);
  // Creates fetch request for req.isAuthenticated. If req.isAuthenticated is false, then redirect.

  useEffect(() => {
    async function fetchChats() {
      const response = await fetchData(`home/get_chats_for_user`, "GET");
      if (response.status === 401) navigate("/login");
      const fetchedData = await response.json();
      setChatsList(fetchedData.allChats);
      setUpdateChatsList(false);
    }

    async function fetchLoggedInUserData() {
      const response = await fetchData(`home/get_logged_in_user`, "GET");
      const fetchedData = await response.json();
      setLoggedInUser(fetchedData.loggedInUser);
    }

    if (updateChatsList) fetchChats();
    if (!loggedInUser) fetchLoggedInUserData();

    if (chatsList && loggedInUser) setIsLoaded(true);
  }, [updateChatsList, isLoaded, chatsList, loggedInUser]);

  useEffect(() => {
    isMobileViewRef.current = checkIsMobileView();
  }, []);

  return !isLoaded ? (
    <p>Loading</p>
  ) : (
    <>
      <main className={styles.homePage}>
        <Header
          loggedInUser={loggedInUser}
          setIsSidebarMinimised={setIsSideBarMinimised}
          isSidebarMinimised={isSidebarMinimised}
        />
        {/* vertical stretch */}
        <section className={styles.belowHeader}>
          {/* horizontal stretch */}
          <section className={styles.insideBelowHeader}>
            {isSidebarMinimised ? null : (
              <Sidebar
                chatsList={chatsList}
                isSidebarMinimised={isSidebarMinimised}
              />
            )}

            <section className={styles.content}>
              <Outlet context={[setUpdateChatsList]} />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
