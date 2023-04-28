import { NavLink } from 'react-router-dom';
import './Navbar.css'

function Navbar() {
    //Properties
    //Hooks
    //context
    //Methods

    const getLinkStyle = ({ isActive }) => ( isActive ? 'navSelected' : null);
    
    //View
    return (
        <nav>
            <NavLink to='/' className={getLinkStyle}>
                <div className="navItem">Home</div>
            </NavLink>
            <NavLink to='/user' className={getLinkStyle}>
                <div className="navItem">User</div>
            </NavLink>
            <NavLink to='/contactus' className={getLinkStyle}>
                <div className="navItem">Contact us</div>
            </NavLink>
        </nav>
    )
}

export default Navbar;