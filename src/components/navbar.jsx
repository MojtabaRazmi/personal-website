import React from 'react';
import '../css/navbar.css'
import Searchbar from './searchar';
import {Link} from 'react-router-dom'


const Navbar = () => {
    return (
        <nav className="rtl navbar navbar-dark fixed-top bg-dark flex-md-nowrap shadow">
            <a className="navbar-brand col-sm-3 col-md-2 mr-0" href="#">
                وب سایت شخصی
            </a>

            <Searchbar/>

            <ul className="navbar-nav px-3">
                <li className="nav-item text-nowrap">
                    <Link className="nav-link" to="/login">
                        ورود
                    </Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
