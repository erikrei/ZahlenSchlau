import { Link } from "react-router-dom";
import { getRightHeaderText } from "../../../helper-functions/header-text";

import "./MainHeader.css";

export default function MainHeader({ headerText }) {
  const headerTextDisplay = getRightHeaderText(headerText);
  return (
    <header className="main-header">
      <Link to="/dashboard">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
        Zum Dashboard
      </Link>
      <h1>{headerTextDisplay}</h1>
    </header>
  );
}
