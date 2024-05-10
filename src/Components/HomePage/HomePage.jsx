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
  const [isGuest, setIsGuest] = useState(false);
  const [isSidebarMinimised, setIsSideBarMinimised] = useState(false);
  const isMobileViewRef = useRef(false);

  if (isMobileViewRef.current === true) {
    // console.log(`isSidebarMinimised: ${isSidebarMinimised}`);
  }

  // Fetches chats and logged in user data.
  // Chat fetch request checks req.isAuthenticated. If req.isAuthenticated is false, then redirect.
  // Logged in user data additionally checks if user is a guest, which restricts changing profile.

  useEffect(() => {
    async function fetchChats() {
      try {
        const response = await fetchData(`home/get_chats_for_user`, "GET");
        if (response.status === 401) {
          navigate("/login");
        } else if (!response.ok) {
          navigate("error");
        } else {
          const fetchedData = await response.json();
          setChatsList(fetchedData.allChats);
          setUpdateChatsList(false);
        }
      } catch (err) {
        navigate(err);
      }
    }

    async function fetchLoggedInUserData() {
      try {
        const response = await fetchData(`home/get_logged_in_user`, "GET");
        if (response.status === 401) {
          navigate("/login");
        } else if (!response.ok) {
          navigate("error");
        } else {
          const fetchedData = await response.json();
          setLoggedInUser(fetchedData.loggedInUser);
          setIsGuest(fetchedData.isGuest);
        }
      } catch (err) {
        navigate("error");
      }
    }

    if (updateChatsList) fetchChats();
    if (!loggedInUser) fetchLoggedInUserData();

    if (chatsList && loggedInUser) setIsLoaded(true);
  }, [updateChatsList, isLoaded, chatsList, loggedInUser, navigate]);

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
          isMobileView={isMobileViewRef.current}
        />
        {/* vertical stretch */}
        <section className={styles.belowHeader}>
          {/* horizontal stretch */}
          <section className={styles.insideBelowHeader}>
            {isSidebarMinimised ? null : (
              <Sidebar
                chatsList={chatsList}
                isSidebarMinimised={isSidebarMinimised}
                setIsSidebarMinimised={setIsSideBarMinimised}
                isMobileView={isMobileViewRef.current}
              />
            )}

            <section className={styles.content}>
              <Outlet context={{ setUpdateChatsList, isGuest }} />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
