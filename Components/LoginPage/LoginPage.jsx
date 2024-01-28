import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export function LoginPage() {
        // State for submitted
        const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm();

        async function onSubmit(data) {
            console.log('checking data')
            console.log(data)

            try {
                const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/login`, {
                    method: "POST",
                    mode: "cors",
                    // not sure if withCredentials is required
                    withCredentials: "true",
                    credentials: "include",
                    headers: {
                        "Content-Type" : "application/json",
                        "Access-Control-Allow-Credentials": true,
                    },
                    body: JSON.stringify(data)
                })

                if (!response.ok) {
                    console.log('bad repsonse. really bad in fact.')
                }

            } catch(err) {

            }

        }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {required: true})} />
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})} />

                <input type="submit" />
                
            </form>
            <Link to={'/signup'}>New here? Signup</Link>
        </>


    )
}