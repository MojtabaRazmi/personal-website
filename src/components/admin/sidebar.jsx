import React, { Component } from 'react';
import getAdminNavLinks from './../../services/fakeAdminNavLinks'
import {Link} from "react-router-dom";

class Sidebar extends Component {
    render() { 
        const navLinks = getAdminNavLinks();
        return ( 
            <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
                <div className="sidebar-sticky">
                    <ul className='nav flex-column'>
                        {navLinks.map(navLink=>(
                            <li className='nav-item' key={navLink.id}>
                                <Link className='nav-link' to={navLink.link}>
                                    <span className={navLink.icon}/>
                                    <span className='m-2'>{navLink.text}</span>
                                    <hr className='shadow'/>

                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </nav>
         );
    }
}

export default Sidebar;