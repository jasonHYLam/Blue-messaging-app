import { useEffect, useState } from "react";
import { useForm } from "react-hook-form"

export function AddFriendWrapper() {

    const [ isChanging, setIsChanging ] = useState(false);
    const [ searchQuery, setSearchQuery ] = useState('');
    // const [ matchingUsers, setMatchingUsers ] = useState([]);
    const [ allFriends, setAllFriends ] = useState([]);
    const [ allNonFriends, setAllNonFriends ] = useState([]);

    const {
        register,
        handleSubmit,
    } = useForm();

    async function getAndSetUserData(searchQuery) {

        if (searchQuery === '') return;
        console.log('checking data for searching friend')
        console.log(searchQuery)
        console.log()

        const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/home/user_profile/search`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                // "Accept" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            // body: JSON.stringify(searchQuery),
            body: JSON.stringify({searchQuery}),
        })
        const returnedData = await response.json();
        console.log(' checking returned data from database')
        console.log(returnedData)
        setAllFriends(returnedData.friends)
        setAllNonFriends(returnedData.nonFriends)
    }

    async function addFriend(user) {
        console.log('gonna check user when adding friend')
        console.log(user)
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

    useEffect(() => {
        async function getAndSetDataOnQueryChange() {
            await getAndSetUserData(searchQuery)
        }
        getAndSetDataOnQueryChange();
        setIsChanging(false);
    }, [searchQuery, isChanging])

    return (
        <>
            <p>Hi it's me, add friend wrapper</p>

            <p>Search for users to add:</p>

            {/* <form action="" onSubmit={handleSubmit(onSubmit)}>
                <input type="text" {...register("username")}/>
                <input type="submit" />
            </form> */}

            <input type="text" 
                value={searchQuery}
            
                onChange={ async (e) => {
                    setSearchQuery(e.target.value)
            }} />

            {
                allFriends.map(userData => {
                    return (
                        <>
                        <section>
                            <p>{userData.username}</p>
                            <p>Added</p>
                        </section>
                        
                        </>
                    )
                })
            }
            {
                allNonFriends.map(userData => {
                    return (
                        <>
                        <section>
                            <p>{userData.username}</p>
                            <button onClick={async () => {
                                await addFriend(userData)
                                // await getAndSetUserData(searchQuery)
                                setIsChanging(true);
                            }}>
                                    Add user</button>
                        </section>
                        
                        </>
                    )
                })
            }
        </>
    )
}