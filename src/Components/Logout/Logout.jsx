import { useEffect } from "react";
import { fetchData } from "../../helper/helperFunctions";

export function Logout() {
  useEffect(() => {

    async function logout() {
      await fetchData(`logout`, 'DELETE')
    }

    logout()
  }, [])
  return
}