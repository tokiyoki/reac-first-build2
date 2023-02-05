import { useState } from 'react';
import './MenuItem.scss'

function MenuItem({mainText}) {
    // Inititalise
    // State
    const [text, setText] = useState(mainText);

    // Context
    // Methods
    const goToFormsPage = () => {
        const event = new Event('formMenuItemChosen');
        window.dispatchEvent(event);
    };
    // View
    return (
        <div className = "menuItem" onClick={() => goToFormsPage()}>{text}</div>
    )
}

export default MenuItem;