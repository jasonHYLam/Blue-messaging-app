const TOGGLE_SIDEBAR_ICON_PATH = "../../../../menu.svg";

export function ToggleSidebar({ setIsSidebarMinimised, isSidebarMinimised }) {
  return (
    <button onClick={() => {setIsSidebarMinimised(!isSidebarMinimised)}}>
      <img src={TOGGLE_SIDEBAR_ICON_PATH} alt="" />
    </button>
  )
}