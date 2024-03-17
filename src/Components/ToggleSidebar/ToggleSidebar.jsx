const TOGGLE_SIDEBAR_ICON_PATH = "../../../../menu.svg";

export function ToggleSidebar({ setIsSidebarMinimised, isSidebarMinimised }) {
  return (
    // <button onClick={() => {setIsSidebarMinimised(!isSidebarMinimised)}}>
      <img 
      onClick={() => {setIsSidebarMinimised(!isSidebarMinimised)}} 
      src={TOGGLE_SIDEBAR_ICON_PATH} 
      style={{
        width: '24px',
        cursor: 'pointer',
      }}
      alt="" />
    // </button>
  )
}