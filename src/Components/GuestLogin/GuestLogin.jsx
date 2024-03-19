import styles from "./GuestLogin.module.css";
import { fetchData } from "../../helper/helperFunctions"

export function GuestLogin() {

  async function loginToGuestAccount() {
    fetchData()
  }

  return (
    <>
    <p className={styles.link} onClick={() => {}}>
    Try guest account!
    </p>
    </>
  )
}