import styles from "./AddFriendWrapper.module.css";
import { fetchData } from "../../helper/helperFunctions";
import { useEffect, useState } from "react";
import { ProfilePic } from "../ProfilePic/ProfilePic";

export function AddFriendWrapper() {
  const [isChanging, setIsChanging] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [allFriends, setAllFriends] = useState([]);
  const [allNonFriends, setAllNonFriends] = useState([]);

  async function getAndSetUserData(searchQuery) {
    if (searchQuery === "") return;
    const dataToSubmit = JSON.stringify({ searchQuery });

    const response = await fetchData(
      `home/user_profile/search`,
      "POST",
      dataToSubmit,
    );

    const returnedData = await response.json();
    setAllFriends(returnedData.friends);
    setAllNonFriends(returnedData.nonFriends);
  }

  async function addFriend(user) {
    const response = await fetchData(`home/user_profile/${user.id}`, "POST");
    const returnedData = await response.json();
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
            <>
              <section>
                <p>{userData.username}</p>
                <p>Added</p>
              </section>
            </>
          );
        })}

        {allNonFriends.map((userData) => {
          return (
            <>
              <section className={styles.row}>
                <button
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
            </>
          );
        })}
      </section>
    </>
  );
}
