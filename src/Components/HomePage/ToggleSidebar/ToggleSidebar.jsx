const toggleSidebarIconPath = require("../../../../public/menu.svg")

export function ToggleSidebar() {
  return (
    <button>
      <img src={toggleSidebarIconPath} alt="" />
    </button>
  )
}