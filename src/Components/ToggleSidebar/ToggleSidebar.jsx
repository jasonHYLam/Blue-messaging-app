import { ClickableIcon } from "../ClickableIcon/ClickableIcon";

const TOGGLE_SIDEBAR_ICON_PATH = "../../../../menu.svg";


export function ToggleSidebar({ setIsSidebarMinimised, isSidebarMinimised }) {
  return (
    <>

    <ClickableIcon 
     onClick={() => setIsSidebarMinimised(!isSidebarMinimised)}
     imgPath={TOGGLE_SIDEBAR_ICON_PATH}
    />
    </>
  )
}