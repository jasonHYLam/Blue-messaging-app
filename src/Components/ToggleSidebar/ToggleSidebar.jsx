
export function ToggleSidebar({ setIsSidebarMinimised, isSidebarMinimised }) {
  return (
    <button onClick={() => {setIsSidebarMinimised(!isSidebarMinimised)}}>
      <img src="../../../../menu.svg" alt="" />
    </button>
  )
}