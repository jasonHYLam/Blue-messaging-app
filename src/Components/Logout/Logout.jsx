import { useEffect } from "react";
import { fetchData } from "../../helper/helperFunctions";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  useEffect(() => {

    async function logout() {
      await fetchData(`logout`, 'DELETE')
    }

    logout()
    navigate('/login')
  }, [])
  return
}