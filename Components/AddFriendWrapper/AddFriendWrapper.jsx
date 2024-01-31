import { useForm } from "react-hook-form"

export function AddFriendWrapper() {

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

    }
    return (
        <>
        <p>Hi it's me, add friend wrapper</p>

        <p>Search for users to add:</p>

        <form action="" onSubmit={handleSubmit(onSubmit)}>
            <input type="text" {...register("username")}/>
            <input type="submit" />
        </form>
        
        </>
    )
}