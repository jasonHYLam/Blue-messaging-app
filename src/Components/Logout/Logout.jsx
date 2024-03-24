import { useEffect } from "react";
import { fetchData } from "../../helper/helperFunctions";
import { useNavigate } from "react-router-dom";

export function Logout() {
  const navigate = useNavigate();
  useEffect(() => {
    async function logout() {
      try {
        const response = await fetchData(`logout`, "DELETE");
        if (!response.ok) navigate("error");
      } catch (err) {
        if (err) navigate("error");
      }
    }

    logout();
    navigate("/login");
  }, []);
  return;
}
