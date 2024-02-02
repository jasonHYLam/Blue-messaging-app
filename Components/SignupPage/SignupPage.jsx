
import { useForm } from "react-hook-form"
import { Link } from "react-router-dom"

export function SignupPage() {

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm();

    return (
        <>
            <h1>Signup</h1>
            <form action="">

                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {required: true})} />
                { errors.username && errors.username.type === "required" && <span>Please provide username</span> }
                
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})} />
                { errors.password && errors.password.type === "required" && <span>Please provide password</span> }

                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" id="confirmPassword" {...register("confirmPassword", {
                    required: true,
                    validate: (val) => {
                        if (getValues('password') !== val) return "Passwords don't match"
                    }

                    })} />
                { errors.confirmPassword && errors.confirmPassword.type === "required" && <span>Please provide password</span> }
                { errors.confirmPassword && errors.confirmPassword.type === "validate" && <span>{errors.confirmPassword.message}</span> }

                <input type="submit" />

            </form>
            <Link to={'/login'}>Got an account? Login</Link>
        </>
    )
}