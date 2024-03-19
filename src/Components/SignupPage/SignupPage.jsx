import styles from "./SignupPage.module.css";
import { useForm } from "react-hook-form"
import { Link, useNavigate, } from "react-router-dom"
import { GuestLogin } from "../GuestLogin/GuestLogin";

export function SignupPage() {

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        formState: {errors},
        getValues,
    } = useForm();

    async function onSubmit(data) {
        console.log('checking data')
        console.log(data)

        try {           
            const response = await fetch(`${ import.meta.env.VITE_BACKEND_URL }/signup`, {
            method: "POST",
            mode: "cors",
            credentials: "include",
            headers: {
                "Content-Type" : "application/json",
                "Access-Control-Allow-Credentials": true,
            },
            body: JSON.stringify(data)
            })

            if (!response.ok) {
                console.log('error! error!')
                return
            }

            navigate('/login');


        } catch(err) {

        }

    }

    return (
        <>
        <section className={styles.page}>

            <h1>Signup</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <section className={styles.row}>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" {...register("username", {required: true})} />
              </section>

              <section className={styles.row}>
                <label htmlFor="password">Password</label>
                <input type="password" id="password" {...register("password", {required: true})} />
              </section>

              <section className={styles.row}>
                <label htmlFor="confirmPassword">Confirm password</label>
                <input type="password" id="confirmPassword" {...register("confirmPassword", {
                    required: true,
                    validate: (val) => {
                        if (getValues('password') !== val) return "Passwords don't match"
                    }
                    })} />
              </section>
              <section className={styles.errors}>
                { errors.username && errors.username.type === "required" && <span>Please provide username</span> }
                { errors.password && errors.password.type === "required" && <span>Please provide password</span> }
                { errors.confirmPassword && errors.confirmPassword.type === "required" && <span>Please confirm password</span> }
                { errors.confirmPassword && errors.confirmPassword.type === "validate" && <span>{errors.confirmPassword.message}</span> }
              </section>

                <input type="submit" />

            </form>
            <Link to={'/login'}>Got an account? Login</Link>
            <GuestLogin />
        </section>
        </>
    )
}