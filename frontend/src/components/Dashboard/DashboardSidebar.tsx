import React from "react";
import logo from "../../assets/logo.png";
import { sidebarLinks } from "../../data/data.d";

import { useActiveLinkContext } from "../../contexts/ActiveLinkContext";

export default function DashboardSidebar() {
  const { activeLink, setActiveLink } = useActiveLinkContext();

  function handleLinkClick(
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) {
    const { target } = event;
    // Prüft ob target ein HTMLElement ist
    if (target instanceof HTMLElement) {
      setActiveLink(target.innerText);
    }
    // @TODO
    // Link wird nicht geändert, wenn aufs Icon geklickt wird
  }

  return (
    <aside className="dashboard-sidebar">
      <img src={logo} alt="Logo von ZahlenSchlau" />
      <div className="sidebar-link-container">
        {sidebarLinks.map((link) => (
          <div
            key={link.linkId}
            className={
              activeLink === link.name ? "sidebar-link active" : "sidebar-link"
            }
            onClick={(event) => handleLinkClick(event)}
          >
            <i>{link.icon}</i>
            <span>{link.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}
