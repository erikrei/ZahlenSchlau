import './SidebarImage.css';
import logo from '../../../../assets/logo.png';

export default function SidebarImage() {
    return (
        <div className='sidebar-image-container'>
            <img src={logo} alt="Logo von ZahlenSchlau" />
        </div>
    )
}