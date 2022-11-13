import './Navbar.css'

function Navbar() {
    //Properties
    //Hooks
    //context
    //Methods
    //View
    return (
        <nav>
            <div className="navItem">
                <a href='/'>Home</a>
            </div>
            <div className="navItem">
                <a href='/signin'>Sign In</a>
            </div>
            <div className="navItem">
                <a href='/contact'>Contact us</a>
            </div>
        </nav>
    )
}

export default Navbar;