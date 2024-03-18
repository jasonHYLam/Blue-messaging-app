import { fetchData, fetchDataWithImageUpload } from '../../helper/helperFunctions'
import styles from "./UserProfileWrapper.module.css";
import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export function UserProfileWrapper() {

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [ isUpdatePending, setIsUpdatePending ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ isCurrentUser, setIsCurrentUser ] = useState(false);
    const [ userData, setUserData ] = useState({});
    const { userId } = useParams();
    const [ imageToUpload, setImageToUpload ] = useState(null);

    // currentStatus takes the following values: "editDescription"
    const [ currentStatus, setCurrentStatus ] = useState('');

    useEffect(() => {
        async function fetchUserData() {
          const response = await fetchData(`home/user_profile/${userId}`, "GET")
            const fetchedData = await response.json();
            setUserData(fetchedData.matchingUser)
            setIsCurrentUser(fetchedData.isCurrentUserProfile)
        }

        fetchUserData();

        if (!isLoaded) setIsLoaded(true);
        if (isUpdatePending) setIsUpdatePending(false)

    }, [isUpdatePending])

    async function submitChange(data) {
        const endRoute = (currentStatus === "editDescription") ? "change_description" : "";
        const fetchURL = `home/personal_profile/${endRoute}`;
        const dataToSubmit = JSON.stringify(data);

        const response = await fetchData(`${fetchURL}`, "PUT", dataToSubmit);

        setIsUpdatePending(true);
        setCurrentStatus("");
    }

    const cancelChangeButton = <button onClick={() => setCurrentStatus('')}>Cancel</button>
    const changeDescriptionButton = (
        currentStatus === 'editDescription' ? null 
        : <button onClick={() => setCurrentStatus('editDescription')}>Change description</button>
    )
    const changeDescriptionForm = (
        <>
        <form onSubmit={handleSubmit(submitChange)}>
            <input type="text" {...register('changeToSubmit')} />
            <input type="submit" />
        </form>
        {cancelChangeButton}
        </>
    )

    function selectImageToUpload(e) {
        setImageToUpload(e.target.files[0])
    }

    async function uploadImage(e) {

        e.preventDefault();
        if (!imageToUpload) return;

        const data = new FormData();
        data.append('profilePic', imageToUpload)

        const response = await fetchDataWithImageUpload(`home/personal_profile/change_image`, "PUT", data);
    }

    const changeImageForm = (
        <>
        <form method="PUT" encType="multipart/form-data" onSubmit={uploadImage}>
            <label >
              <p>Change image</p>
              <input className={styles.imageInput} type="file" name="profilePic" onChange={selectImageToUpload}/>
            </label>
            {
              !imageToUpload ? null : <input type="submit" disabled={!imageToUpload} />
            }
        </form>
        </>
    )

    function logout() {
      navigate('/logout')
    }

    return (
        !isLoaded ? <p>Loading</p> :

        <>
        <main>

          <h2>User Profile: {userData.username}</h2>
          <img className={styles.profilePic} src={userData.profilePicURL} alt="" />
          <p>Description: { userData.description }</p>

          {currentStatus === "editDescription" ? changeDescriptionForm : null }
          {isCurrentUser ? changeDescriptionButton : null}

          {changeImageForm}
          {isCurrentUser ? <button onClick={() => {logout()}}>Logout</button> : null}
          </main>
        
        </>
    )
}