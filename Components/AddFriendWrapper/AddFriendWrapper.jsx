import { useState } from "react";
import { useForm } from "react-hook-form"

export function AddFriendWrapper() {

    const [ matchingUsers, setMatchingUsers ] = useState([]);

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(data) {
        console.log('checking data for searching friend')
        console.log(data)

        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/user_profile/search`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                // "Accept" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data),
        })
        const returnedData = await response.json();
        console.log(' checking returned data from database')
        console.log(returnedData)
        setMatchingUsers(returnedData.matchingUsers)
    }

    async function addFriend(user) {
        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/user_profile/${user.id}`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                // "Accept" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        })

        const returnedData = await response.json();
        console.log(returnedData)


    }

    return (
        <>
            <p>Hi it's me, add friend wrapper</p>

            <p>Search for users to add:</p>

            <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username")}/>
                <input type="submit" />
            </form>

            {
                matchingUsers.map(userData => {
                    return (
                        <>
                        <section>
                            <p>{userData.username}</p>
                            <button onClick={() => addFriend(userData)}>Add user</button>
                        </section>
                        
                        </>
                    )
                })
            }
        
        </>
    )
}