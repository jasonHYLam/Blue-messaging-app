import styles from "./GuestLogin.module.css";
import { useNavigate } from "react-router-dom"
import { fetchData } from "../../helper/helperFunctions"

export function GuestLogin() {

  const navigate = useNavigate();
  const guestLoginDetails = JSON.stringify({
    username: import.meta.env.VITE_GUEST_USER,
    password: import.meta.env.VITE_GUEST_PASSWORD,
  });

  async function loginToGuestAccount() {
    console.log(guestLoginDetails)
    const response = await fetchData('login', "POST", guestLoginDetails)
    navigate('/home');
  }

  return (
    <>
    <p className={styles.link} onClick={loginToGuestAccount}>
    Try guest account!
    </p>
    </>
  )
}