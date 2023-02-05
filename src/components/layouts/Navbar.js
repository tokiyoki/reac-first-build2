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
            <div className="navItem">
                <NavLink to='/' className={getLinkStyle}>Home</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/user' className={getLinkStyle}>User</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/signin' className={getLinkStyle}>Sign In</NavLink>
            </div>
            <div className="navItem">
                <NavLink to='/contact' className={getLinkStyle}>Contact us</NavLink>
            </div>
        </nav>
    )
}

export default Navbar;