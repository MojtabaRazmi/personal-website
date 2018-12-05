import React, { Component } from 'react';
import getNavLinks from './../services/navLinks';
import UserInfo from './common/UserInfo';
import {Link} from "react-router-dom";

class Sidebar extends Component {
    render() { 
        const navLinks = getNavLinks();
        return ( 
            <nav className='col-md-2 d-none d-md-block bg-light sidebar'>
                <div className="sidebar-sticky">
                    <UserInfo
                        imgUrl='https://via.placeholder.com/200x200'
                        fullName='مجتبی رزمی'
                        text='برنامه نویس و طراح وب سایت'
                    />
                    <hr className='shadow'/>
                    <ul className='nav flex-column'>
                        {navLinks.map(navLink=>(
                            <li className='nav-item' key={navLink.id}>
                                <Link className='nav-link' to={navLink.link}>
                                    <span className={navLink.icon}/>
                                    <span className='m-2'>{navLink.text}</span>
                                    {navLink.count>0 ?(
                                        <span className='badge-success badge-pill'>
                                            {navLink.count}
                                        </span>
                                    ):null
                                    }
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