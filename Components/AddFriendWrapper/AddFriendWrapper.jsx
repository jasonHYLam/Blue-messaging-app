import { useForm } from "react-hook-form"

export function AddFriendWrapper() {

    const {
        register,
        handleSubmit,
    } = useForm();

    async function onSubmit(data) {
        console.log('checking data for searching friend')
        console.log(data)

        const response = await fetch(``, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                // "Accept" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
        })

    }
    return (
        <>
        <p>Hi it's me, add friend wrapper</p>

        <p>Search for users to add:</p>

        <form action="">
            <input type="text" {...register("username")}/>
            <input type="submit" />
        </form>
        
        </>
    )
}