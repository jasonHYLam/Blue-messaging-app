import { fetchData } from "../../helper/helperFunctions"

export function GuestLogin() {

  async function loginToGuestAccount() {
    fetchData()
  }

  return (
    <>
    <p onClick={() => {}}>
    Try guest account!
    </p>
    </>
  )
}