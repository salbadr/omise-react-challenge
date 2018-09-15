import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar =()=>{
    return (
        <nav className="main">
            <h1>Omise Challenge</h1>

            <ul>
                    <li><NavLink to="/">JSON Viewer</NavLink></li>
                    <li><NavLink to="/repos">Git Repos</NavLink></li>
                </ul>

        </nav>
    )
} ;


export default Navbar;