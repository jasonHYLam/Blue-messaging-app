import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"

export function LoginPage() {

    // State for submitted
    const [backendErrors, setBackendErrors ] = useState(null)
    
    const navigate = useNavigate();

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
                    // "Accept" : "application/json",
                    "Access-Control-Allow-Credentials": true,
                },
                body: JSON.stringify(data)
            })

            console.log('checking response')
            console.log(response)

            // if (!response.ok) {
            if (response.status === 401) {
                setBackendErrors("Incorrect username/password")
                return
            }

            navigate('/home');


        } catch(err) {

        }

    }

    return (
        <>
            <h1>Login</h1>
            <form onSubmit={handleSubmit(onSubmit)}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {required: true})} />
                { errors.username && errors.username.type === "required" && <span>Please provide username</span> }
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})} />
                { errors.password && errors.password.type === "required" && <span>Please provide password</span> }
                {backendErrors ? <p>{backendErrors}</p> : null}

                <input type="submit" />
                
            </form>
            <Link to={'/signup'}>New here? Signup</Link>
        </>


    )
}