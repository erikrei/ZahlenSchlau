import './DashboardMain.css';

import DashboardMainHeader from '../dashboard-main-header/DashboardMainHeader';
import DashboardGrundrechenarten from '../dashboard-grundrechenarten/DashboardGrundrechenarten';
import DashboardAufgabenbereich from '../dashboard-aufgabenbereich/DashboardAufgabenbereich';

export default function DashboardMain({ activeLink }) {
    return (
        <div className="dashboard-main-container">
            <DashboardMainHeader activeLink={activeLink} />
            {activeLink === 'Grundrechenarten' && <DashboardGrundrechenarten />}
            {activeLink === 'Aufgabenbereich' && <DashboardAufgabenbereich />}
        </div>
    )
}