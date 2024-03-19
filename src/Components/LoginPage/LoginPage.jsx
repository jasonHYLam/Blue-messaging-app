import styles from "./LoginPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form"
import { Link, useNavigate } from "react-router-dom"
import { GuestLogin } from "../GuestLogin/GuestLogin";
import { fetchData } from "../../helper/helperFunctions";

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
      const dataToSubmit = JSON.stringify(data);

        try {
              const response = await fetchData(`login`, "POST", dataToSubmit)

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
        <section className={styles.page}>
            <h1>Login</h1>
            <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
              <section className={styles.row}>
                <input placeholder="Username" type="text" id="username" {...register("username", {required: true})} />
              </section>

              <section className={styles.row}>
                <input placeholder="Password" type="password" id="password" {...register("password", {required: true})} />
              </section>
              <section className={styles.errors}>
                { errors.username && errors.username.type === "required" && <span>Please provide username</span> }
                { errors.password && errors.password.type === "required" && <span>Please provide password</span> }
                {backendErrors ? <p>{backendErrors}</p> : null}
              </section>

                <input className={styles.submit} type="submit"  value="Login"/>
                
            </form>
            <Link to={'/signup'}>New here? Signup</Link>

            <GuestLogin />
        </section>
        </>


    )
}