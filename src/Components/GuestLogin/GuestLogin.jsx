import styles from "./GuestLogin.module.css";
import { fetchData } from "../../helper/helperFunctions"

export function GuestLogin() {

  const guestLoginDetails = JSON.stringify({
    username: import.meta.env.VITE_GUEST_USER,
    password: import.meta.env.VITE_GUEST_PASSWORD,
  });

  async function loginToGuestAccount() {
    fetchData('login', "POST", guestLoginDetails)
  }

  return (
    <>
    <p className={styles.link} onClick={loginToGuestAccount}>
    Try guest account!
    </p>
    </>
  )
}