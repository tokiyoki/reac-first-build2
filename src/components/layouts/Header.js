import { Link } from 'react-router-dom';

import './Header.css'

function Header() {
    //Properties
    //Hooks
    //context
    //Methods
    //View
    return (
        <header>
            <Link to="/">
                <img src = ""/>
            </Link>
            <Link to="/">
                <h1>React First Build</h1>
            </Link>
            <div className='login'>
                <p>Welcome Jamal!</p>
            </div>
        </header>
    )
}

export default Header;