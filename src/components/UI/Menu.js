import { useState } from 'react';
import './Menu.scss';
import MenuItem from '../UI/MenuItem.js';
  

function Menu({heading, items}) {
    // Inititalise
    // State
    const [menuHeading, setHeading] = useState(heading);
    const [menuItems, setMenuItems] = useState(items);
    // Context
    // Methods
    // View
    return (
        <div className = "menuContainer"> 
            <h1 className = "menuHeading">{menuHeading}</h1>
            <div className = "menu">
                {
                    menuItems.map((menuItem) => 
                        <MenuItem
                            key = {menuItem.order}
                            mainText = {menuItem.text}/>
                        )
                }
            </div>
        </div>
    )
}

export default Menu;