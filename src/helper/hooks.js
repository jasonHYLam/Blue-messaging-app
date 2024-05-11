import { useEffect, useState } from "react";

export function useMobileView() {
  const [isMobileView, setIsMobileView] = useState(window.innerWidth <= 500);
  function handleWindowSizeChange() {
    setIsMobileView(window.innerWidth <= 500);
  }
  useEffect(() => {
    window.addEventListener("resize", handleWindowSizeChange);
    return () => {
      window.removeEventListener("resize", handleWindowSizeChange);
    };
  }, []);
  return { isMobileView };
}
