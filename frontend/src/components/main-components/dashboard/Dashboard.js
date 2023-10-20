import './Dashboard.css';

import { useState } from 'react';

import Sidebar from "../../components/sidebar/Sidebar";
import DashboardMain from '../../components/dashboard-main/DashboardMain';

export default function Dashboard() {
    const [activeLink, setActiveLink] = useState('Grundrechenarten');

    function handleActiveLinkClick(linkValue) {
        if (activeLink === linkValue) setActiveLink('');
        else setActiveLink(linkValue);
    }

    return (
        <div className="dashboard-container">
            <Sidebar onLinkClick={handleActiveLinkClick} activeLink={activeLink} />
            {activeLink && <DashboardMain activeLink={activeLink} />}
        </div>
    )
}