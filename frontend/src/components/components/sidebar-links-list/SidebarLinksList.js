import "./SidebarLinksList.css";

const linksList = [
  {
    name: "Grundrechenarten",
  },
  {
    name: "Aufgabenbereich",
  },
];

export default function SidebarLinksList({ activeLink, onLinkClick }) {
  return (
    <div className="sidebar-links-list">
      <span className="sidebar-area-text">Navigation</span>
      <div className="sidebar-links-container">
        {linksList.map((link) =>
				// Womöglich im späterem Zeitpunkt eigene Komponente 'SidebarLink' erstellen
          link.name === activeLink ? (
            <button
              type="button"
              key={link.name}
              onClick={(e) => onLinkClick(e.target.innerText)}
							className="active-link"
            >
              {link.name}
            </button>
          ) : (
            <button
              type="button"
              key={link.name}
              onClick={(e) => onLinkClick(e.target.innerText)}
            >
              {link.name}
            </button>
          )
        )}
      </div>
    </div>
  );
}
