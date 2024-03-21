import { fetchData } from "../../helper/helperFunctions";
import styles from "./SignupPage.module.css";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { GuestLogin } from "../GuestLogin/GuestLogin";

export function SignupPage() {
  const USERNAME_MAX_LENGTH = 20;

  const [backendErrors, setBackendErrors] = useState(null);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm();

  async function onSubmit(data) {
    const dataToSubmit = JSON.stringify(data);

    try {
      const response = await fetchData(`signup`, "POST", dataToSubmit);

      if (!response.ok) {
        return;
      }
      navigate("/login");
    } catch (err) {}
  }

  return (
    <>
      <section className={styles.page}>
        <h1>Signup</h1>
        <section className={styles.wrapper}>
          <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
            <section className={styles.row}>
              <input
                placeholder="Username"
                type="text"
                id="username"
                {...register("username", {
                  required: true,
                  maxLength: USERNAME_MAX_LENGTH,
                })}
              />
            </section>

            <section className={styles.row}>
              <input
                placeholder="Password"
                type="password"
                id="password"
                {...register("password", { required: true })}
              />
            </section>

            <section className={styles.row}>
              <input
                placeholder="Confirm password"
                type="password"
                id="confirmPassword"
                {...register("confirmPassword", {
                  required: true,
                  validate: (val) => {
                    if (getValues("password") !== val)
                      return "Passwords don't match";
                  },
                })}
              />
            </section>
            <section className={styles.errors}>
              {errors.username && errors.username.type === "required" && (
                <span>Please provide username</span>
              )}
              {errors.password && errors.password.type === "required" && (
                <span>Please provide password</span>
              )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "required" && (
                  <span>Please confirm password</span>
                )}
              {errors.confirmPassword &&
                errors.confirmPassword.type === "validate" && (
                  <span>{errors.confirmPassword.message}</span>
                )}
              {errors.username && errors.username.type === "maxLength" && (
                <span>Username exceeds max length (20 characters)</span>
              )}
              {backendErrors ? <p>{backendErrors}</p> : null}
            </section>

            <input className={styles.submit} type="submit" value="Signup" />
          </form>

          <section className={styles.links}>
            <Link to={"/login"}>Got an account? Login</Link>
            <GuestLogin />
          </section>
        </section>
      </section>
    </>
  );
}
