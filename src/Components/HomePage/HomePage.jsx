import styles from "./HomePage.module.css";
import { fetchData } from "../../helper/helperFunctions";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Header } from "../Header/Header";
import { Loading } from "../Loading/Loading";
import { useMobileView } from "../../helper/hooks";

export function HomePage() {
  const navigate = useNavigate();
  const [isLoaded, setIsLoaded] = useState(false);
  const [chatsList, setChatsList] = useState([]);
  const [updateChatsList, setUpdateChatsList] = useState(true);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [isGuest, setIsGuest] = useState(false);
  const [isSidebarMinimised, setIsSideBarMinimised] = useState(false);
  const { isMobileView } = useMobileView();

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

  return !isLoaded ? (
    <Loading />
  ) : (
    <>
      <main className={styles.homePage}>
        <Header
          loggedInUser={loggedInUser}
          setIsSidebarMinimised={setIsSideBarMinimised}
          isSidebarMinimised={isSidebarMinimised}
          isMobileView={isMobileView}
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
                isMobileView={isMobileView}
              />
            )}

            <section className={styles.content}>
              <Outlet
                context={{
                  setUpdateChatsList,
                  isGuest,
                  isSidebarMinimised,
                  isMobileView,
                }}
              />
            </section>
          </section>
        </section>
      </main>
    </>
  );
}
