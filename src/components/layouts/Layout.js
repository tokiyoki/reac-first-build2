import Header from './Header.js'
import Navbar from './Navbar.js'
import Footer from './Footer.js'

import './Layout.css';

function Layout(props) {
    //Properties
    console.log(props.user);
    //Hooks
    //context
    //Methods
    //View
    return (
        <div className="centrepane">
            <Header user={props.user} changeUser={props.changeUser} userDependentIDs={props.userDependentIDs}/>
            <Navbar />
            <main>
                {props.children}
            </main> 
            <Footer />
        </div>
    )
}

export default Layout;