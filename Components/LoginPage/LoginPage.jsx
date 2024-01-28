import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export function LoginPage() {
        // State for submitted
        const {
            register,
            handleSubmit,
            formState: {errors},
        } = useForm();

        function onSubmit(data) {
            console.log('checking data')
            console.log(data)

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