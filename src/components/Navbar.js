import React from 'react';
import {NavLink} from 'react-router-dom';


const Navbar =()=>{
    return (
        <nav>
            <div >
                <ul>
                    <li><NavLink to="/">JSON Viewer</NavLink></li>
                    <li><NavLink to="/repos">Git Repos</NavLink></li>
                </ul>
            </div>
        </nav>
    )
} ;


export default Navbar;