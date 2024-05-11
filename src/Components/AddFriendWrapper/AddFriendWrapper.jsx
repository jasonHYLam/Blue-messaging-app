import styles from "./AddFriendWrapper.module.css";
import { fetchData } from "../../helper/helperFunctions";
import { useEffect, useState } from "react";
import { ProfilePic } from "../ProfilePic/ProfilePic";
import { useNavigate } from "react-router-dom";

export function AddFriendWrapper() {
  const navigate = useNavigate();
  const [isChanging, setIsChanging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allFriends, setAllFriends] = useState([]);
  const [allNonFriends, setAllNonFriends] = useState([]);

  async function getAndSetUserData(searchQuery) {
    if (searchQuery === "") return;
    const dataToSubmit = JSON.stringify({ searchQuery });

    try {
      const response = await fetchData(
        `home/user_profile/search`,
        "POST",
        dataToSubmit,
      );
      if (!response.ok) navigate("error");

      const returnedData = await response.json();
      setAllFriends(returnedData.friends);
      setAllNonFriends(returnedData.nonFriends);
    } catch (err) {
      if (err) navigate("error");
    }
  }

  async function addFriend(user) {
    try {
      const response = await fetchData(`home/user_profile/${user.id}`, "POST");
      if (!response.ok) navigate("error");
    } catch (err) {
      if (err) navigate("error");
    }
  }

  useEffect(() => {
    async function getAndSetDataOnQueryChange() {
      await getAndSetUserData(searchQuery);
    }
    getAndSetDataOnQueryChange();
    setIsChanging(false);
  }, [searchQuery, isChanging]);

  return (
    <>
      <section>
        <p>Search for users to add:</p>

        <input
          type="text"
          value={searchQuery}
          onChange={async (e) => {
            setSearchQuery(e.target.value);
          }}
        />

        {allFriends.map((userData) => {
          return (
            <section className={styles.row} key={userData.id} id={userData.id}>
              <p>{userData.username}</p>
              <ProfilePic imgPath={userData.profilePicURL} />
              <p>Added</p>
            </section>
          );
        })}

        {allNonFriends.map((userData) => {
          return (
            <section className={styles.row} key={userData.id}>
              <button
                disabled={isChanging}
                onClick={async () => {
                  await addFriend(userData);
                  setIsChanging(true);
                }}
              >
                Add user
              </button>
              <ProfilePic imgPath={userData.profilePicURL} />
              <p>{userData.username}</p>
            </section>
          );
        })}
      </section>
    </>
  );
}
