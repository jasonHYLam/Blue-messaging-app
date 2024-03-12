import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";

export function UserProfileWrapper() {

    // if it is the current user's profile then show:
    // requires logic to compare userID in params, with session info/state currentUser info.
    // should list:
    // user name
    // user password maybe
    // user description
    // user profile image.
    // buttons to change these, which have fetch requests to do that.

    // maybe a friends count.

    // if it is another person's user profile, then show:
    // user name
    // user description
    // button to add them as a friend automatically


    // in order to do this, need to make a fetch request with the userID, which is perhaps derived from the params.

    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();
    const [ isUpdatePending, setIsUpdatePending ] = useState(false);
    const [ isLoaded, setIsLoaded ] = useState(false);
    const [ isCurrentUser, setIsCurrentUser ] = useState(false);
    const [ userData, setUserData ] = useState({});
    const { userId } = useParams();
    const [ imageToUpload, setImageToUpload ] = useState(null);

    // currentStatus takes the following values: "editDescription", "editPassword", "editUsername"
    const [ currentStatus, setCurrentStatus ] = useState('');
    // console.log('checking isCurrent user')
    // console.log(isCurrentUser)
    // console.log('checking userData')
    // console.log(userData)

    useEffect(() => {
        async function fetchUserData() {
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/user_profile/${userId}`, {
                mode: "cors",
                credentials: "include",
                headers: {
                    "Content-Type" : "application/json",
                    // "Accept" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
            })

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
        const fetchURL = `/home/personal_profile/${endRoute}`;
        console.log('checking data')
        console.log(data)

        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }${fetchURL}`, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data)
        })

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
        // console.log('checking file')
        // console.log(e.target.files[0])
        setImageToUpload(e.target.files[0])
    }

    async function uploadImage(e) {

        e.preventDefault();

        const data = new FormData();
        data.append('profilePic', imageToUpload)

        await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/personal_profile/change_image`, {
            method: "PUT",
            mode: "cors",
            credentials: "include",
            headers: {
                "Access-Control-Allow-Credentials": true,
            },
            body: data
        }
        )
    }

    const changeImageButton = (
        <button >Change Image</button>
    )

    const changeImageForm = (
        <>
        <form method="PUT" encType="multipart/form-data" onSubmit={uploadImage}>
            <input type="file" name="profilePic" onChange={selectImageToUpload}/>
            <input type="submit" disabled={!imageToUpload} />
        </form>
        </>
    )

    function logout() {
      navigate('/logout')
    }

    return (
        !isLoaded ? <p>Loading</p> :

        <>
        <p>It's me the user profile page</p>
        <h1>User Profile: {userData.username}</h1>
        <img src={userData.profilePicURL} alt="" />
        <p>Description:</p>

        {currentStatus === "editDescription" 
        ? changeDescriptionForm 
        : <p>{userData.description}</p>
        }
        {isCurrentUser ? changeDescriptionButton : null}

        {changeImageButton}
        {changeImageForm}
        {isCurrentUser ? <button onClick={() => {logout()}}>Logout</button> : null}
        
        </>
    )
}