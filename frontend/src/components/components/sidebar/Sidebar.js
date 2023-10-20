import "./Sidebar.css";

import SidebarImage from "../sidebar-image/SidebarImage";
import SidebarLinksList from "../sidebar-links-list/SidebarLinksList";

export default function Sidebar({ activeLink, onLinkClick }) {
  return (
    <aside className="sidebar">
      <SidebarImage />
      <SidebarLinksList onLinkClick={onLinkClick} activeLink={activeLink} />
    </aside>
  );
}
