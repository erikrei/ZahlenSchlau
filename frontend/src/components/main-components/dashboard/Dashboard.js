import './Dashboard.css';

import { useState } from 'react';

import Sidebar from "../../components/sidebar/Sidebar"

export default function Dashboard() {
    const [activeLink, setActiveLink] = useState('');

    function handleActiveLinkClick(linkValue) {
        if (activeLink === linkValue) setActiveLink('');
        else setActiveLink(linkValue);
    }

    return (
        <div className="dashboard-container">
            <Sidebar onLinkClick={handleActiveLinkClick} activeLink={activeLink} />
        </div>
    )
}